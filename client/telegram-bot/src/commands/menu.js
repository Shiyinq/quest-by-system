const menu = (ctx) => {
    let menu = `🌟 Hello ${ctx.message.from.first_name}! Welcome to our Bot.\n\n👤 ME 👤\n/me - View your profile information\n/goal - Set your personal goals\n\n🔍 QUESTS 🔍\n/daily - Daily Quest\n/weekly - Weekly Quest\n/monthly - Monthly Quest\n/side - Side Quest\n\n🔄 UPDATE 🔄\n/update - Update Current Quest Status\n\n📜 HISTORY 📜\n/daily_history - Daily Quest History\n/weekly_history - Weekly Quest History\n/monthly_history - Monthly Quest History\n/side_history - Side Quest History\n\n📊 STATS 📊\n/stats - View Your Stats\n\n🔹 ETC 🔹\n/ping - Check bot and API server status\n/about - About the project\n\n🚀 Ready to embark on your journey? Choose a quest above!\n\n⚠️ LLM can make mistakes. The quests generated are just suggestions.`;
    ctx.reply(menu);
}

export default (bot) => bot.command(["start", "menu", "hi"], (ctx) => { menu(ctx) });