import { Story, State } from '../state';

export function parseStories(source: string): Story[] {
    const stories: Story[] = [];

    source.split('\n').forEach((line) => {
        const newStory = line.match(/^## *(.*)$/gm);
        const newInput = line.match(/^> *(.*)$/gm);
        const newAction = line.match(/^- *(\w*)$/gm);
        // wip
    });
}
