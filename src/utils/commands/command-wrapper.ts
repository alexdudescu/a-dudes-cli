import { Command } from 'commander';

import { CommandCallback } from './command-callback';

export class ProgramBuilder {
    private _command?: Command;

    from(command: Command) {
        this._command = command;
        return this;
    }

    apply(cb: CommandCallback) {
        if (this._command) {
            cb(this._command);
        };

        return this;
    }

    unpack() {
        return this._command
    }
}