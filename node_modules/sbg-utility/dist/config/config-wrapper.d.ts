/// <reference types="node" />
import EventEmitter from 'events';
interface createConfigEvents {
    add: (obj: Record<string, any>) => void;
    delete: (changedCount: number) => void;
    update: () => void;
}
export declare interface createConfig<T extends Record<string, any>> {
    on<U extends keyof createConfigEvents>(event: U, listener: createConfigEvents[U]): this;
    emit<U extends keyof createConfigEvents>(event: U, ...args: Parameters<createConfigEvents[U]>): boolean;
    get<U extends Record<string, any>>(): T & U;
}
/**
 * Create/Update config wrapper
 */
export declare class createConfig<T extends Record<string, any>> extends EventEmitter {
    cname: string;
    /**
     * Create/Update config wrapper
     * @param name config name
     * @param value initial config value
     */
    constructor(name: string, value: Record<string, any>);
    /**
     * update config
     * @param value new values should be merged with old values using shallow object merge
     */
    update(value: Record<string, any>): void;
}
export {};
