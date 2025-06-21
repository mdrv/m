/**
 * @module log
 *
 * Log stuff seamlessly!
 */

import log from 'loglevel'
// import { runtime } from './env.ts'
// import { isDevelopment } from "std-env"

// log.setLevel((runtime === 'other' && import.meta.env.DEV) || isDevelopment ? 'trace' : 'info')

/**
 * loglevel 1 (log/debug)
 * 
 * H: bind not working on server-side (for trace, debug and info), even though already on level 0
 *
 * @remarks Equal to log.debug
 */
export const __: ((...args: any[]) => void) & {
    /**
     * loglevel 0 (trace)
     */
    t: (...args: any[]) => void
    /**
     * loglevel 1 (log/debug)
     */
    d: (...args: any[]) => void
    /**
     * loglevel 2 (info)
     */
    i: (...args: any[]) => void
    /**
     * loglevel 3 (warn)
     */
    w: (...args: any[]) => void
    /**
     * loglevel 4 (error)
     */
    e: (...args: any[]) => void
    /**
     * set level (will output current level if empty)
     *
     * additional:
     * trace / 0 = true / "development"
     * info / 2 = false / "production"
     */
    l: (arg?: boolean | "development" | "production" | log.LogLevelDesc) => void
} = Object.assign(
    (...args: any[]): void => log.log(...args), {
    t: (...args: any[]): void => log.trace(...args),
    d: (...args: any[]): void => log.debug(...args),
    i: (...args: any[]): void => log.info(...args),
    w: (...args: any[]): void => log.warn(...args),
    e: (...args: any[]): void => log.error(...args),
    l: (arg?: boolean | 'development' | 'production' | log.LogLevelDesc): void => {
        if (arg === undefined) {
            return
        }
        const level: log.LogLevelDesc = (arg === true || arg === 'development')
            ? 'trace'
            : (arg === false || arg === 'production')
                ? 'info'
                : arg
        log.setLevel(level)
    },
})
