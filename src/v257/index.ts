export * from './log.ts'
export * from './node.ts'
export * from './types.ts'

// smaller and universal stuff

/**
 * @summary Merely add syntax highlighting with named language to your editor (tested on Neovim).
 *
 * @remarks Might support string interpolation, but not tested extensively yet.
 *
 * @example
 * ```ts
 * import { literal as python } from '@mdrv/m'
 * const pyCode = python`print('This is a python code')`
 * ```
 */
export const literal = (
	strings: TemplateStringsArray,
	...expr: any[]
): string => {
	let result = strings[0]!
	for (let i = 0; i < expr.length; i++) {
		result += expr[i]
		result += strings[i + 1]!
	}
	return result
}

/**
 * @summary performance.now wrapper; for benchmarking
 *
 * @example
 * ```ts
 * const x = fromNow()
 * anyFunction()
 * console.log(x()) // returns milliseconds of execution
 * ```
 */
export const fromNow = (): (() => number) => {
	const start = performance.now()
	return () => performance.now() - start
}
