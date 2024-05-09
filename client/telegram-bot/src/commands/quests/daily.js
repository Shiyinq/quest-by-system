import { generate } from "./_sharing.js";

const daily = async (ctx) => {
    await generate("daily", ctx);
}

export default (bot) => bot.command("daily", async (ctx) => { await daily(ctx) });
