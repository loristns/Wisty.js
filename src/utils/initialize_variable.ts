import * as tf from '@tensorflow/tfjs';

/**
 * Initialize a variable of a given shape.
 */
export function initializeVariable(shape: number[], scalar: boolean = false,
    init: 'he'|'zeros'|'normal' = 'he'): tf.Variable {
    return tf.tidy(() => {
        let initializer;

        switch (init) {
        case 'he':
            initializer = tf.initializers.heNormal({});
            break;

        case 'zeros':
            initializer = tf.initializers.zeros();
            break;

        case 'normal':
            initializer = tf.initializers.randomNormal({});
            break;

        default:
            throw new Error(
                `Expected parameter init to take value 'he', 'zeros' or 'normal' not '${init}'.`
            );
        }

        let randomTensor = initializer.apply(shape);
        if (scalar) randomTensor = randomTensor.asScalar();

        return randomTensor.variable();
    });
}
