const about = (ctx) => {
    const description = "✨This project is just for fun and to fill my free time. However, you are welcome to contribute to the project on my GitHub repository:\nhttps://github.com/Shiyinq/quest-by-system";
    ctx.reply(description);
}

export default (bot) => bot.command("about", (ctx) => { about(ctx) });