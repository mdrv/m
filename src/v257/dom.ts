/**
 * @summary One-liner element with innerHTML
 * @remarks The `el` argument is not mutated.
 *
 * @example
 * ```ts
 * withInnerHtml(document.createElement('p'), '<b>Hello, world!</b>')
 * ```
 */
export const withInnerHtml = <T extends Element>(
	el: T,
	innerHTML: string,
): T => {
	el.innerHTML = innerHTML
	return el
}
