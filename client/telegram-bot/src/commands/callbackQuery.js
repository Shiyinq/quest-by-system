import { generate } from "./quests/_sharing.js";
import { acceptQuest } from "../apis/quests.js";

const reGenerate = async (type, ctx) => {
    await generate(type, ctx);
}

const accept = async (questId, ctx) => {
    const accept = await acceptQuest(questId);
    
    if (!accept) {
        ctx.reply("Failed to accept quest");
        return
    }

    let message = `${ctx.update.callback_query.message.text}\n\n\n QUEST ACCEPTED ✅`;
    ctx.editMessageText(message, {
        message_id: ctx.update.callback_query.message.message_id,
    });
}

const callback = async (ctx) => {
    let dataQuery = ctx.callbackQuery.data;
    let [action, param] = dataQuery.split("#");

    console.log(action, param);

    switch (action) {
        case "generateQuest":
            ctx.deleteMessage();
            await reGenerate(param, ctx);
            break;
        case "acceptQuest":
            await accept(param, ctx);
            break;
        default:
            break;
    }
}

export default  (bot) => bot.on("callback_query", async (ctx) => { await callback(ctx)});