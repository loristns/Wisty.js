import { Story, State } from '../state';

/**
 * Parse a source string formatted according the Wisty Training Story syntax.
 * Usually, this source string is extracted using fetch or from a file.
 */
export function parseStories(source: string): Story[] {
    const stories: Story[] = [];
    let story: Story = [];
    let inputAnswered = true;

    source.split('\n').forEach((line) => {
        const newStory = /^## *([^#].*)?$/gm.exec(line);
        const newInput = /^> *(.*)$/gm.exec(line);
        const newAction = /^- *(\w*)$/gm.exec(line);

        /*
            New story
            ## Story name
        */
        if (newStory != null && story.length > 0) {
            story.push(<State> { query: '', action: 'LUS' });
            stories.push(story); // Push previous story.
            story = [];

        /*
            New user input
            > user input
        */
        } else if (newInput != null) {
            // Add a LUS action to mark the end of the previous turn.
            if (story.length > 0) story.push(<State> { query: '', action: 'LUS' });

            story.push(<State> { query: newInput[1], action: undefined });
            inputAnswered = false;

        /*
            New bot action
            (> user input)
            (- action_name)
            - action_name
        */
        } else if (newAction != null && inputAnswered) {
            story.push(<State> { query: '', action: newAction[1] });

        /*
            New bot action (first answer)
            (> user input)
            - action_name
        */
        } else if (newAction != null && !inputAnswered) {
            // eslint-disable-next-line prefer-destructuring
            story[story.length - 1].action = newAction[1];
            inputAnswered = true;
        }
    });

    // Finalize the last story
    if (story.length > 0) {
        story.push(<State> { query: '', action: 'LUS' });
        stories.push(story);
    }

    return stories;
}
