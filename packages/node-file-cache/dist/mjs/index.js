'use strict';
import database from 'lowdb';
import * as util from 'util';
export function create(options) {
    return new Cache(options || {});
}
export class Cache {
    config;
    db;
    constructor(options) {
        this.config = this._merge({
            file: 'store.json',
            life: 3600 // one hour
        }, options || {});
        this.db = new database(this.config.file);
        this.db.defaults({
            index: []
        }).value();
    }
    set = function (key, value, options) {
        let record = this._createRecord(key, value, options || {});
        this.expire(key); // remove previous
        this.db.get('index').push(record).value();
        return this;
    };
    get = function (key) {
        let record = this.db.get('index').find({ key: key }).value();
        if (!record)
            return null;
        if (record.life < this._createTimestamp()) {
            this.expire(key);
            return null; // expired
        }
        return record.val;
    };
    /**
     * Clears all records from cache storage
     */
    clear = function () {
        this.db.set('index', []).value();
        return this;
    };
    /**
     * Removes records from cache storage
     */
    expire(value) {
        const _ = this.db._;
        let removed, staying;
        switch (true) {
            case util.isFunction(value):
                // remove by filter callback
                removed = this.db.get('index')
                    .filter(value)
                    .map('key')
                    .value();
                break;
            case util.isArray(value):
                // remove by tags
                removed = this.db.get('index')
                    .filter((record) => _.intersection(record.tags, value).length)
                    .map('key')
                    .value();
                break;
            case util.isString(value):
                // remove by key
                removed = this.db.get('index')
                    .filter((record) => record.key === value)
                    .map('key')
                    .value();
                break;
            default:
                throw new Error('Unsupported expiration method: ' + (typeof value));
        }
        staying = this.db.get('index')
            .filter((record) => removed.indexOf(record.key) < 0)
            .value();
        this._set(staying);
        return this;
    }
    size() {
        return this.db.get('index').value().length;
    }
    _set(records) {
        this.db.set('index', records).value();
    }
    _createRecord(key, value, options) {
        let tags = options.tags || [];
        let span = options.life || this.config.life;
        let life = span * 1000 + this._createTimestamp();
        return {
            key: key,
            val: value,
            life: life,
            tags: tags
        };
    }
    _createTimestamp() {
        return new Date().getTime();
    }
    _merge(a, b) {
        for (let p in b) {
            try {
                if (b[p].constructor === Object) {
                    a[p] = this._merge(a[p], b[p]);
                }
                else {
                    a[p] = b[p];
                }
            }
            catch (e) {
                a[p] = b[p];
            }
        }
        return a;
    }
}
