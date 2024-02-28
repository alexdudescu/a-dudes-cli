import { Notion } from '~/drivers/core/notion';
import { CommandCallback } from '~/utils/commands/command-callback';
import { ProgramBuilder } from '~/utils/commands/command-wrapper';

import { Client } from '@notionhq/client';
import {
    PageObjectResponse,
} from '@notionhq/client/build/src/api-endpoints.js';

const notion = new Client({ auth: process.env.NOTION_KEY })
// check if page was created today


const noteFormatter = (note: string) => `[${new Date().toUTCString()}] ${note}`


const searchNote: CommandCallback = (command) => {
    return command
        .command("search")
        .argument("<query>", "term to search for")
        .description("Searches for the specified note")
        .action(async (args: any) => {

            const notionDriver = await Notion.init();


            const result = await notion.search({
                query: args
            });
            const props = result.results
                .map((r) => (r as PageObjectResponse).properties)
                .map(obj => {
                    const t = Object.keys(obj).find(key => obj[key]?.type === "title") as keyof typeof obj;
                    if (t) {
                        return (obj[t] as any).title
                    }
                })
                .map(t => t[0])
                .map(t => t.text.content)


            console.log(
                props.join('\n')
            )
        })
}

const takeNote: CommandCallback = (command) => {
    return command
        .command('take <args...>')
        .action((args) => {
            console.log(noteFormatter(args.join(" ")));
        })
}

export const notes: CommandCallback = (command) => {
    const notes = command.command('notes');

    new ProgramBuilder()
        .from(notes)
        .apply(takeNote)
        .apply(searchNote);
}