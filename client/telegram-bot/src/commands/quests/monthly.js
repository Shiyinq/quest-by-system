import { generate } from "./_sharing.js";

const monthly = async (ctx) => {
    await generate("monthly", ctx);
}

export default  (bot) => bot.command("monthly", async (ctx) => { await monthly(ctx)});