import { Command } from 'commander';
import { notes } from 'modules/notes/notes';
import { ProgramBuilder } from '~/utils/commands/command-wrapper';

import { generic } from './generic';

const builder = new ProgramBuilder();

export const program = builder.from(new Command())
    .apply(generic)
    .apply(notes)
    .unpack()