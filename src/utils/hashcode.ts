/* eslint-disable no-bitwise */

/**
 * Hash a string.
 * Based on https://stackoverflow.com/a/7616484
 */
export function hashcode(input: string) {
    let hash = 0;

    for (let i = 0; i < input.length; i += 1) {
        const chr = input.charCodeAt(i);

        hash = ((hash << 5) - hash) + chr;
        hash |= 0; // Convert to 32bit integer
    }

    return hash;
}
