import { Story } from '../utils';
/**
 * Parse a source string formatted according the Wisty Training Story syntax.
 * Usually, this source string is extracted using fetch or from a file.
 */
export declare function parseStories(source: string): Story[];
