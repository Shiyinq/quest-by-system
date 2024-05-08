require("dotenv").config()

const { Telegraf } = require("telegraf")
const axios = require("axios")

const bot = new Telegraf(process.env.BOT_TOKEN)

function checkUserId(ctx) {
    let userId = "unknown"
    if (ctx?.message){
        userId = ctx.message.from.id.toString()
    }else if(ctx?.update) {
        userId = ctx.update.callback_query.message.from.id.toString()
    }
    return userId
}

function currentEditeMessage(ctx) {
    let edit_message_id = null
    if(ctx?.message) {
        edit_message_id = ctx.message.message_id + 1
    }else if(ctx?.update) {
        edit_message_id = ctx.update.callback_query.message.message_id + 1
    }
    return edit_message_id
}

async function generateQuest(type, ctx) {
    const apiUrl = `${process.env.BASE_URL_BACKEND}/api/quests/generate`;
    const requestData = {
        userId: checkUserId(ctx),
        type: type
    };

    let edit_message_id = currentEditeMessage(ctx)
    try {
        await ctx.reply(`📝 Please wait, generating ${type} quest for you...`)
        await ctx.sendChatAction("typing")

        const response = await axios.post(apiUrl, requestData)
        
        let generated_quest = response.data.quest
        await ctx.editMessageText(generated_quest, {
            message_id: edit_message_id,
            reply_markup: {
                inline_keyboard: [
                    [
                        {
                            text: "✅ Accept", 
                            callback_data: `acceptQuest#${response.data.questId}`, 
                            hide: false
                        },
                        {
                            text: "🔄 Re-generate", 
                            callback_data: `generateQuest#${type}`, 
                            hide: false
                        }
                    ]
                ]
            }
        })
    } catch (error) {
        console.log(error);
        ctx.editMessageText("Failed to generate quest.", {message_id: edit_message_id})
    }
}

async function acceptQuest(questId, ctx) {
    let apiUrl = `${process.env.BASE_URL_BACKEND}/api/quests/${questId}/accept`;
    try {
        const response = await axios.post(apiUrl)
        console.log(response.data)
        let message = `${ctx.update.callback_query.message.text}\n\n\n QUEST ACCEPTED ✅`
        ctx.editMessageText(message, {message_id: ctx.update.callback_query.message.message_id})
    } catch (error) {
        console.log(error)
        ctx.reply("Failed to accept quest")
    }
}

bot.use((ctx, next) => {
    next()
});

bot.command("start", (ctx) => {
    let menu = `🌟 Hello ${ctx.message.from.first_name}! Welcome to our Bot.\n\n🔍 QUESTS 🔍\n/daily         - Daily Quest\n/weekly      - Weekly Ques\n/monthly    - Monthly Quest\n/side           - Side Quest\n\n📜 HISTORY 📜\n/daily_history       - Daily Quest History\n/weekly_history    - Weekly Quest History\n/monthly_history  - Monthly Quest History\n/side_history         - Side Quest History\n\n📊 STATS 📊\n/stats - View Your Stats\n\n🚀 Ready to embark on your journey? Choose a quest above!`;

    ctx.reply(menu)
})

bot.command("daily", async (ctx) => {
    await generateQuest("daily", ctx)
})

bot.command("weekly", async (ctx) => {
    await generateQuest("weekly", ctx)
})

bot.command("monthly", async (ctx) => {
    await generateQuest("monthly", ctx)
})

bot.command("side", async (ctx) => {
    await generateQuest("side", ctx)
})

bot.on("callback_query", async (ctx) => {
	let dataQuery = ctx.callbackQuery.data
	let [action, param] = dataQuery.split("#")

    console.log(action, param)

    switch (action) {
        case "generateQuest":
            ctx.deleteMessage()
            await generateQuest(param, ctx)
            break
        case "acceptQuest":
            acceptQuest(param, ctx)
            break
        default:
            break
    }
})

bot.launch()

// Enable graceful stop
process.once("SIGINT", () => bot.stop("SIGINT"))
process.once("SIGTERM", () => bot.stop("SIGTERM"))