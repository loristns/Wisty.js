import { Stories, ExtractedValue } from '../utils';
export interface ParsedWistyML {
    stories: Stories;
    extractedValues: {
        [title: string]: ExtractedValue[];
    };
}
/**
 * Parse a source string formatted according the WistyML syntax.
 * Usually, this source string is extracted using fetch or from a file.
 */
export declare function parseWistyML(source: string): ParsedWistyML;
