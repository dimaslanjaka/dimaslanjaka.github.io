import fs from "fs-extra";
import mkdirp from "mkdirp-no-bin";
import rmdir from "rmdir";
import path from "upath";
import "./JSON";

function exists(dir: fs.PathLike) {
	try {
		fs.accessSync(dir);
	} catch (err) {
		return false;
	}

	return true;
}

function safeCb(cb: { (e: Error, ...args: any[]): any }) {
	if (typeof cb === "function") return cb;

	return function () {
		//
	};
}

/**
 * write to file recursive
 * @param filepath
 * @param content
 * @param callback async callback
 */
function writeFile(
	filepath: string,
	content: string,
	callback?: (...args: any[]) => any
) {
	if (!fs.existsSync(path.dirname(filepath))) {
		fs.mkdirSync(path.dirname(filepath), { recursive: true });
	}

	if (typeof callback === "function") {
		fs.writeFile(filepath, content, callback);
	} else {
		fs.writeFileSync(filepath, content);
	}
}

export interface Opt {
	// [key: string]: any;
	/**
	 * folder cache
	 * @description The base directory where `persistent-cache` will save its caches.
	 *
	 * Defaults to the main modules directory
	 */
	base: string;
	/**
	 * cache instance name
	 * @description The name of the cache. Determines the name of the created folder where the data is stored, which is just `base + name`.
	 *
	 * Defaults to `cache`
	 */
	name: string;
	/**
	 * expired in milliseconds
	 * @description The amount of milliseconds a cache entry should be valid for. If not set, cache entries are not invalidated (stay until deleted).
	 *
	 * Defaults to `undefined` (infinite)
	 */
	duration: number;
	/**
	 * Whether the cache should use memory caching or not (mirrors all cache data in the ram,
	 * saving disk I/O and increasing performance).
	 *
	 * Defaults to `true`
	 */
	memory: boolean;
	/**
	 * Whether the cache should be persistent, aka if it should write its data to the disk
	 * for later use or not. Set this to `false` to create a memory-only cache.
	 *
	 * Defaults to `true`
	 */
	persist: boolean;
}

/**
 * Persistent Cache
 * @param options
 * @returns
 */
function cache(options: Partial<Opt> = {}) {
	options = options || {};

	const base = path.normalize(
		(options.base ||
			(require.main ? path.dirname(require.main.filename) : undefined) ||
			process.cwd()) + "/cache"
	);
	if (!fs.existsSync(path.dirname(base))) {
		fs.mkdirSync(path.dirname(base), { recursive: true });
	}
	const cacheDir = path.normalize(base + "/" + (options.name || "cache"));
	const cacheInfinitely = !(typeof options.duration === "number");
	const cacheDuration = options.duration;
	const ram = typeof options.memory == "boolean" ? options.memory : true;
	const persist = typeof options.persist == "boolean" ? options.persist : true;
	const memoryCache = {};

	if (persist && !exists(cacheDir)) mkdirp.sync(cacheDir);

	function buildFilePath(name: string) {
		return path.normalize(cacheDir + "/" + name + ".json");
	}

	function buildCacheEntry(data: any) {
		return {
			cacheUntil: !cacheInfinitely
				? new Date().getTime() + cacheDuration
				: undefined,
			data: data,
		};
	}

	/**
	 * add cache async callback
	 * @param name
	 * @param data
	 * @param cb
	 * @returns
	 */
	function put(
		name: string,
		data: any,
		cb: { (err: NodeJS.ErrnoException): void; (e: Error, ...args: any[]): any }
	) {
		const entry = buildCacheEntry(data);

		if (persist) {
			writeFile(buildFilePath(name), JSON.stringifyWithCircularRefs(entry), cb);
		}

		if (ram) {
			entry.data = JSON.stringifyWithCircularRefs(entry.data);

			memoryCache[name] = entry;

			if (!persist) return safeCb(cb)(null);
		}
	}

	/**
	 * add cache synchronous
	 * @param name
	 * @param data
	 */
	function putSync(name: string, data: any) {
		const entry = buildCacheEntry(data);

		if (persist) {
			writeFile(buildFilePath(name), JSON.stringifyWithCircularRefs(entry));
		}

		if (ram) {
			memoryCache[name] = entry;
			memoryCache[name].data = JSON.stringifyWithCircularRefs(
				memoryCache[name].data
			);
		}
	}

	/**
	 * get cache by key with async callback
	 * @param name
	 * @param cb
	 * @returns
	 */
	function get(name: string, cb?: (e: Error) => any) {
		if (ram && !!memoryCache[name]) {
			let entry = memoryCache[name];

			if (!!entry.cacheUntil && new Date().getTime() > entry.cacheUntil) {
				return safeCb(cb)(null, undefined);
			}

			try {
				entry = JSON.parse(entry.data);
			} catch (e) {
				return safeCb(cb)(e);
			}

			return safeCb(cb)(null, entry);
		}

		fs.readFile(buildFilePath(name), "utf8", onFileRead);

		function onFileRead(err: any, content: string) {
			if (err != null) {
				return safeCb(cb)(null, undefined);
			}

			let entry: ReturnType<typeof JSON.parse>;
			try {
				entry = JSON.parse(content);
			} catch (e) {
				return safeCb(cb)(e);
			}

			if (!!entry.cacheUntil && new Date().getTime() > entry.cacheUntil) {
				return safeCb(cb)(null, undefined);
			}

			return safeCb(cb)(null, entry.data);
		}
	}

	/**
	 * get cache by key synchronously
	 * @param name
	 * @param fallback
	 * @returns
	 */
	function getSync<T = string>(name: string, fallback?: T): T {
		if (ram && !!memoryCache[name]) {
			const entry = memoryCache[name];

			if (entry.cacheUntil && new Date().getTime() > entry.cacheUntil) {
				return undefined;
			}

			return JSON.parse(entry.data);
		}

		let data: ReturnType<typeof JSON.parse>;
		try {
			data = JSON.parse(fs.readFileSync(buildFilePath(name), "utf8"));
		} catch (e) {
			return undefined;
		}

		if (data.cacheUntil && new Date().getTime() > data.cacheUntil)
			return undefined;

		return data.data;
	}

	function deleteEntry(
		name: string,
		cb: { (e: Error, ...args: any[]): any; (err: NodeJS.ErrnoException): void }
	) {
		if (ram) {
			delete memoryCache[name];

			if (!persist) safeCb(cb)(null);
		}

		fs.unlink(buildFilePath(name), cb);
	}

	function deleteEntrySync(name: string) {
		if (ram) {
			delete memoryCache[name];

			if (!persist) return;
		}

		fs.unlinkSync(buildFilePath(name));
	}

	function unlink(cb: {
		(e: Error, ...args: any[]): any;
		(e: Error, ...args: any[]): any;
	}) {
		if (persist) return rmdir(cacheDir, safeCb(cb));

		safeCb(cb)(null);
	}

	function transformFileNameToKey(fileName: string) {
		return fileName.slice(0, -5);
	}

	function resolveDir(dirPath: fs.PathLike) {
		if (!fs.existsSync(dirPath)) fs.mkdirSync(dirPath, { recursive: true });
	}

	function keys(cb: (e: Error, ...args: any[]) => any) {
		cb = safeCb(cb);

		if (ram && !persist) return cb(null, Object.keys(memoryCache));

		fs.readdir(cacheDir, onDirRead);

		function onDirRead(err: Error, files: string[]) {
			return err ? cb(err) : cb(err, files.map(transformFileNameToKey));
		}
	}

	function keysSync() {
		if (ram && !persist) return Object.keys(memoryCache);
		resolveDir(cacheDir);
		return fs.readdirSync(cacheDir).map(transformFileNameToKey);
	}

	function valuesSync() {
		return keysSync().map((key) => {
			return get(key);
		});
	}

	return {
		/**
		 * insert new data
		 */
		put: put,
		/**
		 * insert new data
		 */
		set: put,
		/**
		 * get data
		 */
		get: get,
		delete: deleteEntry,

		putSync: putSync,
		setSync: putSync,
		getSync: getSync,
		deleteSync: deleteEntrySync,

		keys: keys,
		keysSync: keysSync,
		/**
		 * get all values
		 */
		valuesSync: valuesSync,
		/**
		 * delete the folder and files of a persistent cache
		 */
		unlink,
	};
}

export default cache;
export const persistentCache = cache;
