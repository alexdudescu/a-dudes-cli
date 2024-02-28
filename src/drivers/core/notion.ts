import { execSync } from 'child_process';
import { ConfigManager } from '~/utils/core/config.manager';

import { confirm } from '@clack/prompts';
import { Client } from '@notionhq/client';
import { PageObjectResponse } from '@notionhq/client/build/src/api-endpoints';
import { config } from 'dotenv';

export class Notion {
    private _client!: Client;

    private constructor() { }

    public async searchNote(query: string) {
        const result = await this._client.search({
            query
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

        return props.join('\n');
    }

    public configureClient() { }

    static async init() {
        let instance = new Notion();

        instance._client = new Client({
            auth: await instance._getToken()
        })

        return instance;
    }

    private async _getToken() {
        const config = ConfigManager.getConfig();


        const token = config?.tokens?.notion;
        console.log(config);
        if (token) {
            return token;
        }

        confirm({
            message: "Notion token is not configured. Would you like to sign in with notion?",
        }).then((value) => {
            if (value) {
                this._authorize();
            }
        })
    }

    private _authorize() {
        execSync("open https://google.com");
    }
}
