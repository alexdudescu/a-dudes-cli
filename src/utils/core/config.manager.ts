import {
    existsSync,
    readFileSync,
    writeFileSync,
} from 'fs';

import { IConfig } from './config.models';

const CONFIG_FILE_PATH = `~/.dudeconfig`

export class ConfigManager {
    static isConfigAvailable() {
        return existsSync(CONFIG_FILE_PATH);
    }

    static getConfig(): IConfig | null {
        try {
            if (!ConfigManager.isConfigAvailable()) {
                return null;
            }

            let config = readFileSync(CONFIG_FILE_PATH, { encoding: "utf-8" });
            let parsedConfig = {};

            parsedConfig = JSON.parse(config) as IConfig;
            return parsedConfig;
        }
        catch (e) {
            return null;
        }
    }

    static updateConfig(config: IConfig): void {
        let stringifiedConfig = JSON.stringify(config, null, 2);

        writeFileSync(CONFIG_FILE_PATH, stringifiedConfig, { encoding: 'utf-8', flag: 'wx' });
    }
}