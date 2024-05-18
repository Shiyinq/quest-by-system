const menu = (ctx) => {
    let menu = `🌟 Hello ${ctx.message.from.first_name}! Welcome to our Bot.\n\n👤 ME 👤\n/me - View your profile information\n/quests - Count your quests\n/goal <your goal> - Set your personal goals\n\n\n🔍 QUESTS 🔍\n/daily - Daily quest\n/weekly - Weekly quest\n/monthly - Monthly quest\n/side - Side quest\n\n\n🔄 UPDATE 🔄\n/update - Update current quest status\n\n\n📜 HISTORY 📜\n/daily_history - Daily quest history\n/weekly_history - Weekly quest history\n/monthly_history - Monthly quest history\n/side_history - Side quest history\n\n\n🔹 ETC 🔹\n/ping - Check bot and API server status\n/about - About the project\n\n\n🚀 Ready to embark on your journey? Choose a quest above!\n\n⚠️ LLM can make mistakes. The quests generated are just suggestions.`;
    ctx.reply(menu);
}

export default (bot) => bot.command(["start", "menu", "hi"], (ctx) => { menu(ctx) });