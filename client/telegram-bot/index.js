import { Telegraf } from "telegraf";
import { BOT_TOKEN } from './src/config/index.js';
import { userDetail, userRegister } from './src/apis/users.js';

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
                        if (command) {
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

const userInfo = (ctx) => {
    if (ctx?.message) {
        return ctx.message.from;
    } else if (ctx?.update) {
        return ctx.update.callback_query.from;
    }
};

bot.use(async (ctx, next) => {
    let userId = userInfo(ctx).id.toString();
    let name = userInfo(ctx).first_name;

    let userExist = await userDetail(userId);
    if (!userExist) {
        return
    }

    if (userExist == 404) {
        let register = await userRegister(userId, name);
        if (!register) {
            return
        }
    }

    next();
});

loadCommands(bot);

bot.launch()

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"));
process.once("SIGTERM", () => bot.stop("SIGTERM"));
