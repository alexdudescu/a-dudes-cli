#!/usr/bin/env node

import 'dotenv/config';

import { program } from '~/commands/commands';

program?.parse();