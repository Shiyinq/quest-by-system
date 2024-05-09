import { userQuestHistory } from "../../apis/history.js";

export const questHistory = async (ctx, userId, type, page, from = null) => {
    let { metadata, data } = await userQuestHistory(userId, type, page);
    console.log(metadata, data);

    if (metadata.totalPage == 0) {
        ctx.reply(`4️⃣0️⃣4️⃣\n\nSory you don't have history for ${type} quest, you can generate one using command\n\n/${type} - generate ${type} quest`);
        return
    }

    const formattedText = data.reduce((acc, curr, index) => {
        return acc + `${index + 1}. /quest_${curr.questId}\n`;
    }, `🗒️ Here your quest ${type} history\n\n`);

    const finalText = `${formattedText}\nTap on each quest to see details 🔎\n\nPage: ${metadata.page}/${metadata.totalPage}`;

    const paging = [[]]
    if (metadata.prevPage) {
        paging[0].push({
            text: "⏮️ Prev",
            callback_data: `prevHistory#${userId}_${type}_${metadata.prevPage}`,
            hide: false,
        })
    }

    if (metadata.nextPage) {
        paging[0].push(
            {
                text: "⏭️ Next",
                callback_data: `nextHistory#${userId}_${type}_${metadata.nextPage}`,
                hide: false,
            }
        )
    }

    if (from) {
        await ctx.editMessageText(finalText, {
            reply_markup: {
                inline_keyboard: paging
            }
        });
    } else {
        await ctx.reply(finalText, {
            reply_markup: {
                inline_keyboard: paging
            }
        });
    }

}