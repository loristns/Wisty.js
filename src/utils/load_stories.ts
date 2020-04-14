import { Story, State } from '../state';

export async function loadStories(url: string): Promise<Story[]> {
    const source = await fetch(url).then((res) => res.text());

    let aState: State = { query: undefined, action: undefined };
    let aStory: Story = [];
    const stories: Story[] = [];

    source.split('\n').forEach((line) => {
        const input = line.substring(2);

        // New story declaration
        if (line.startsWith('## ')) {
            if (aStory.length > 0) {
                // Push the last state
                if (aState.action !== undefined) {
                    aStory.push(aState);
                    aState = { query: undefined, action: undefined };
                }

                stories.push(aStory);
            }
            aStory = [];
        // New bot action
        } else if (line.startsWith('- ')) {
            if (aState.action === undefined) {
                aState.action = input;
            } else {
                aStory.push(aState);
                aState = { query: '', action: input };
            }
        // New user query
        } else if (line.startsWith('> ')) {
            // When no query was defined before
            if (aState.query === undefined) {
                aState.query = input;
            // When an action was defined before
            } else if (aState.action !== undefined) {
                aStory.push(aState);
                aStory.push({ query: '', action: 'LUS' });
                aState = { query: input, action: undefined };
            // When a query, but no action was defined before
            } else {
                aState.query += ` ${input}`;
            }
        }
    });

    // Push the last state
    if (aState.action !== undefined) aStory.push(aState);

    aStory.push({ query: '', action: 'LUS' });

    // Push the last story
    if (aStory) stories.push(aStory);

    return stories;
}
