const userAgentSupported =
    typeof navigator !== "undefined" && typeof navigator.userAgent === "string"
export type Runtime = "node" | "deno" | "bun" | "workerd" | "other"

export const knownUserAgents: Partial<Record<Runtime, string>> = {
    deno: "Deno",
    bun: "Bun",
    workerd: "Cloudflare-Workers",
    node: "Node.js",
}

export const getRuntime = (): Runtime => {
    const global = globalThis as any

    // check if the current runtime supports navigator.userAgent

    // if supported, check the user agent
    if (userAgentSupported) {
        const userAgent = navigator.userAgent
        for (const [runtimeKey, prefix] of Object.entries(knownUserAgents)) {
            if (userAgent.startsWith(prefix)) {
                return runtimeKey as Runtime
            }
        }
    }
    // userAgent isn't supported before Node v21.1.0; so fallback to the old way
    if (global?.process?.release?.name === "node") {
        return "node"
    }

    // couldn't detect the runtime
    return "other"
}

export const existsPath = async (path: string): Promise<boolean> => {
    return (await import('node:fs')).existsSync(path)
}

export const readFile = async (path: string): Promise<string> => {
    return (await import('node:fs')).readFileSync(path, { encoding: 'utf-8' })
}

export const readFirstLine = async (path: string): Promise<string> => {
    const inputStream = (await import('node:fs')).createReadStream(path);
    try {
        for await (const line of (await import('node:readline')).createInterface(inputStream)) return line;
        return ''; // If the file is empty.
    }
    finally {
        inputStream.destroy(); // Destroy file stream.
    }
}
