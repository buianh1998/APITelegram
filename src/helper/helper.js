import moment from "moment";
import { Telegraf } from "telegraf";
import { errors } from "./../services/index.service";
import sendMail from "./../config/sendMail";
require("dotenv").config();
const tokenBotAPI = process.env.APi_BOT_TOKEN;

// Telegraf;
const bot = new Telegraf(tokenBotAPI);
bot.start((ctx) => {
    console.log(ctx);

    ctx.reply("Welcome to Autobot CNPM Group: 9!");
});
bot.telegram.getMe().then((botInfo) => {
    bot.options.username = botInfo.username;
});

bot.hears("hi", (ctx) => {
    console.log("ctx:", ctx.update.message.chat.id);
    ctx.reply("Nay bận rùi không tiếp nghe? ");
});

bot.hears("Show id error on day", async (ctx) => {
    let errorMessageOnDay = await errors.getDataError();
    let item = {};
    for (let i = 0; i < errorMessageOnDay.length; i++) {
        item = {
            IdMessageError: errorMessageOnDay[i].idError,
        };
        ctx.reply(`Id Message Error: ${item.IdMessageError}`);
    }
});
bot.hears(/\/find Id Error: (.+)/, async (ctx) => {
    let changleArray = Object.assign({}, ctx.match);
    let idError = changleArray["1"];
    let dataIdError = await errors.getErrorByIdError(idError);
    if (!dataIdError) {
        return ctx.reply("Không tìm thấy mã lỗi");
    }
    return ctx.reply(
        `Mã Lỗi: ${dataIdError.idError} -- Dạng Lỗi: ${dataIdError.title} -- Nội Dung Lỗi: ${dataIdError.description} -- Thời Gian: ${dataIdError.createdAt}`
    );
});
bot.hears(/\/Export data error to email: (.+)/, async (ctx) => {
    let changleArray = Object.assign({}, ctx.match);
    let emailAdmin = changleArray["1"];
    let errorMessageOnDay = await errors.getDataError();
    sendMail(emailAdmin, errorMessageOnDay);
});
bot.startPolling();
bot.command("oldschool", (ctx) => ctx.reply("Hello"));
bot.command("modern", ({ reply }) => reply("Yo"));
bot.command("hipster", Telegraf.reply("λ"));
bot.launch();
let idErrorMessage = () => {
    let arrErrId = [1, 2, 3, 4, 5, 6, 7, 8, "A", "V", "B", "J", "F", "K"];
    let result = "";
    for (let i = 0; i < 10; i++) {
        let radomError = Math.floor(Math.random() * arrErrId.length);
        result += arrErrId[radomError];
    }
    return result;
};
let renderMoment = (date) => {
    return new Promise((resolve, reject) => {
        if (!date) reject("");
        resolve(moment(date).locale("vi").format("LLLL"));
    });
};
let awaitMessage = (error, description) => {
    return new Promise(async (resolve, reject) => {
        let messageBot = bot.telegram.sendMessage(
            1296171110,
            `${error} - Thời Gian : ${await renderMoment(Date.now())}    Mã Lỗi: ${idErrorMessage()}`
        );
        let item = {
            idError: idErrorMessage(),
            title: error,
            description: description,
            createdAt: await renderMoment(Date.now()),
        };
        await errors.createError(item);
        resolve(messageBot);
    });
};
module.exports = {
    renderMoment,
    awaitMessage,
    idErrorMessage,
};
