import { generate } from "./index.js";

const side = async (ctx) => {
    await generate("side", ctx);
}

export default  (bot) => bot.command("side", async (ctx) => { await side(ctx)});
