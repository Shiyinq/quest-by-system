const menu = (ctx) => {
    let menu = `🌟 Hello ${ctx.message.from.first_name}! Welcome to our Bot.\n\n🔍 QUESTS 🔍\n/daily         - Daily Quest\n/weekly      - Weekly Ques\n/monthly    - Monthly Quest\n/side           - Side Quest\n\n📜 HISTORY 📜\n/daily_history       - Daily Quest History\n/weekly_history    - Weekly Quest History\n/monthly_history  - Monthly Quest History\n/side_history         - Side Quest History\n\n📊 STATS 📊\n/stats - View Your Stats\n\n🚀 Ready to embark on your journey? Choose a quest above!`;

    ctx.reply(menu);
}

export default  (bot) => bot.command("start", (ctx) => {menu(ctx)});