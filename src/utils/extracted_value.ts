/**
 * A text value extracted from a sentence.
 */
export interface ExtractedValue {
    sentence: string;
    extract: string;
    start: number;
    end: number;
}
