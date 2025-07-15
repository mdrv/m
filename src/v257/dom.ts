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

/**
 * @summary 🔄 Converts/hashes/shortens any string to hex-based string
 * @param message - A plain string
 * @param algorithm - ✨ `'SHA-256'` Digest algorithm
 * @returns Hex-based string with length:
 * + `SHA-1`: 40 bytes
 * + `SHA-256`: 64 bytes ⭐
 * + `SHA-384`: 96 bytes
 * + `SHA-512`: 128 bytes
 * @example
 * ```ts
 * await digestMessage(':)') // 54d626e08c1c802b305dad30b7e54a82f102390cc92c7d4db112048935236e9c
 * await digestMessage(':)', 'SHA-1') // fb17882585bbfe9c55733a6e46a265ddaea6957a
 * ```
 *
 * @see {@link https://developer.mozilla.org/en-US/docs/Web/API/SubtleCrypto/digest#converting_a_digest_to_a_hex_string | SubtleCrypto: digest() method - Web APIs | MDN}
 */
export const digestMessage = async (
    message: string,
    algorithm: 'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512' = 'SHA-256'
) => {
    const msgUint8 = new TextEncoder().encode(message)
    const hashBuffer = await window.crypto.subtle.digest(algorithm, msgUint8)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    return hashArray.map((b) => b.toString(16).padStart(2, '0')).join('')
}

/**
 * @summary A class for fingerprint based on Web Audio API processing
 * @remarks 🚧 This fingerprint can persist between versions and containers (including incognito mode), but **can also have false positives** (ex. _already registered from other devices_).
 * @privateRemarks Does not bypass GDPR law.
 * @example
 * ```ts
 * const audioFingerprint = new AudioFingerprint()
 * audioFingerprint.createFingerPrint(callback)
 * ```
 *
 * @see {@link https://abhisaha.com/blog/no-authentication-like-button/ | No Authentication Like Button | Little Things}
 * @see {@link https://www.reddit.com/r/webdev/comments/1fmpa33/how_i_implemented_a_like_button_without/ | How I implemented a like button without Authentication : r/webdev}
 */
export class AudioFingerprint {
    // private
    #audioContext: OfflineAudioContext | null = null
    #currentTime: number | null = null
    #oscillatorNode: OscillatorNode | null = null
    #compressorNode: DynamicsCompressorNode | null = null
    #fingerprint: string | null = null
    #onCompleteCallback: ((fingerprint: string) => void) | null = null

    createFingerPrint(
        callback: (fingerprint: string) => void,
        debug: boolean = false,
    ): void {
        this.#onCompleteCallback = callback

        try {
            this.#initializeAudioContext()

            if (this.#oscillatorNode && this.#compressorNode && this.#audioContext) {
                this.#oscillatorNode.connect(this.#compressorNode)
                this.#compressorNode.connect(this.#audioContext.destination)

                this.#oscillatorNode.start(0)
                this.#audioContext.startRendering()

                this.#audioContext.oncomplete = this.#handleAudioComplete.bind(this)
            }
        } catch (error) {
            if (debug) {
                console.error('Audio Fingerprinting Error:', error)
            }
        }
    }

    #initializeAudioContext(): void {
        this.#createAudioContext()
        if (this.#audioContext) {
            this.#currentTime = this.#audioContext.currentTime
            this.#createOscillatorNode()
            this.#createCompressorNode()
        }
    }

    #createAudioContext(): void {
        const OfflineContext =
            // @ts-expect-error
            window.OfflineAudioContext || window.webkitOfflineAudioContext
        this.#audioContext = new OfflineContext(1, 5000, 44100)
    }

    #createOscillatorNode(): void {
        if (this.#audioContext) {
            this.#oscillatorNode = this.#audioContext.createOscillator()
            this.#oscillatorNode.type = 'triangle'
            this.#oscillatorNode.frequency.setValueAtTime(
                10000,
                this.#currentTime || 0,
            )
        }
    }

    #createCompressorNode(): void {
        if (this.#audioContext) {
            this.#compressorNode = this.#audioContext.createDynamicsCompressor()

            this.#setCompressorValue(this.#compressorNode.threshold, -50)
            this.#setCompressorValue(this.#compressorNode.knee, 40)
            this.#setCompressorValue(this.#compressorNode.ratio, 12)
            this.#setCompressorValue(this.#compressorNode.attack, 0)
            this.#setCompressorValue(this.#compressorNode.release, 0.25)
        }
    }

    #setCompressorValue(param: AudioParam, value: number): void {
        param.setValueAtTime(value, this.#audioContext!.currentTime)
    }

    #handleAudioComplete(event: OfflineAudioCompletionEvent): void {
        this.#generateFingerprint(event)
        if (this.#compressorNode) {
            this.#compressorNode.disconnect()
        }
    }

    #generateFingerprint(event: OfflineAudioCompletionEvent): void {
        let output = ''
        const channelData = event.renderedBuffer.getChannelData(0)

        for (let i = 4500; i < 5000; i++) {
            output += Math.abs(channelData[i]!)
        }

        this.#fingerprint = output.toString()

        if (typeof this.#onCompleteCallback === 'function' && this.#fingerprint) {
            this.#onCompleteCallback(this.#fingerprint)
        }
    }
}

/**
 * @summary 🔄 Gets a fingerprint based on Web Audio API processing
 * @remarks 🚧 This fingerprint can persist between versions and containers (including incognito mode), but **can also have false positives** (ex. _already registered from other devices_).
 * @privateRemarks Does not bypass GDPR law.
 * @example
 * ```ts
 * await getAudioFp() // 54d626e08c1c802b305dad30b7e54a82f102390cc92c7d4db112048935236e9c
 * ```
 *
 * @see {@link https://abhisaha.com/blog/no-authentication-like-button/ | No Authentication Like Button | Little Things}
 * @see {@link https://www.reddit.com/r/webdev/comments/1fmpa33/how_i_implemented_a_like_button_without/ | How I implemented a like button without Authentication : r/webdev}
 */
export const getAudioFp = async (algorithm: 'SHA-1' | 'SHA-256' | 'SHA-384' | 'SHA-512' = 'SHA-256') => {

    return new Promise((resolve: (fingerprint: string) => void) => {
        const audioFingerprint = new AudioFingerprint()
        audioFingerprint.createFingerPrint(async (fingerprint: string) => {
            fingerprint = window.btoa(fingerprint as string)
            resolve(await digestMessage(fingerprint, algorithm))
        }, true)
    })
}
