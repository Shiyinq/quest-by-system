const ping = (ctx) => {
    const status = "STATUS:\n\n🟢 BOT: OK - 🟢 API: OK";
    ctx.reply(status);
}

export default (bot) => bot.command("ping", (ctx) => { ping(ctx) });