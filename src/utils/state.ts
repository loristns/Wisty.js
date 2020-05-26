/**
 * A conversation's step : the user's query (can be an empty string)
 * and the action the bot takes in return.
 */
export interface State {
    query: string;
    action: string;
}

/**
 * A whole conversation (array of states).
 */
export type Story = State[];
