import { generate } from "./index.js";

const monthly = async (ctx) => {
    await generate("monthly", ctx);
}

export default  (bot) => bot.command("monthly", async (ctx) => { await monthly(ctx)});