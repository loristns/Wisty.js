/**
 * A conversation's step : the user's query (can be an empty string)
 * and the action the bot takes in return.
 * A state may also contain some data that describe it.
 */
export interface State {
    query: string;
    action: string;
    data?: any;
}

/**
 * A whole conversation (array of states).
 */
export type Story = State[];

/**
 * An ensemble of conversations
 */
export type Stories = {[title: string]: Story};
