import * as tf from '@tensorflow/tfjs';
/**
 * Initialize a variable of a given shape.
 */
export declare function initializeVariable(shape: number[], scalar?: boolean, init?: 'he' | 'zeros' | 'normal'): tf.Variable;
