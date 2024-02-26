import { CommandCallback } from '@utils/commands/command-callback';

export const generic: CommandCallback = (command) => {
    command
        .name('A(lex) Dudes(cu) CLI')
        .description('CLI to some JavaScript string utilities')
        .version('0.0.1');
}