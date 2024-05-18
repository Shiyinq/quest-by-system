import { userDetail } from "../apis/users.js";

const userInfo = (user) => {
    const formattedDate = (dateStr) => {
        const date = new Date(dateStr);
        return `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
    };
    const goal = user.goal ? user.goal : '-';

    return `📌 *User Information* 📌\n\n🆔 *User ID*: ${user.userId}\n👤 *Name*: ${user.name}\n🎯 *Goal*: ${goal}\n🌐 *Source*: ${user.source}\n📅 *Created At*: ${formattedDate(user.createdAt)}\n🕒 *Updated At*: ${formattedDate(user.updatedAt)}\n\n✨ Stay awesome, ${user.name}! ✨`;
};

const me = async (ctx) => {
    let userId = ctx.message.from.id.toString();
    let user = await userDetail(userId);

    if (!user) {
        ctx.reply("Failed to get user info");
        return;
    }

    let info = userInfo(user);
    ctx.replyWithMarkdown(info);
}

export default (bot) => bot.command("me", async (ctx) => { await me(ctx) });