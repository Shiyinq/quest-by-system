import { generate } from "./index.js";

const weekly = async (ctx) => {
    await generate("weekly", ctx);
}

export default  (bot) => bot.command("weekly", async (ctx) => { await weekly(ctx)});
