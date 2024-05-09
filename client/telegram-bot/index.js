import { Telegraf } from "telegraf";
import { BOT_TOKEN } from './src/config/index.js';

const bot = new Telegraf(BOT_TOKEN);

import fs from 'fs/promises';
import path from 'path';

async function loadCommands(bot) {
    try {
        const files = await fs.readdir('src/commands');
        for (const file of files) {
            const filePath = path.join('src/commands', file);
            const fileStat = await fs.stat(filePath);
            if (fileStat.isDirectory()) {
                const subFiles = await fs.readdir(filePath);
                for (const subFile of subFiles) {
                    const subFilePath = path.join(filePath, subFile);
                    const subFileStat = await fs.stat(subFilePath);
                    if (subFileStat.isFile()) {
                        const commandModule = await import(`./${subFilePath}`);
                        const command = commandModule.default;
                        if(command) {
                            command(bot);
                        }
                    }
                }
            } else if (fileStat.isFile()) {
                const commandModule = await import(`./${filePath}`);
                const command = commandModule.default;
                if (command) {
                    command(bot);
                }
            }
        }
    } catch (error) {
        console.error('Error loading commands:', error);
    }
}

bot.use((ctx, next) => {
    next();
});

loadCommands(bot);

bot.launch()

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
