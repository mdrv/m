export type Entries<T> = {
	[K in keyof T]: [K, T[K]]
}[keyof T][]

export type Constructor = new (...args: any[]) => {}
export type GConstructor<T = {}> = new (...args: any[]) => T
