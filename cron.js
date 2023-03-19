const cron = require("node-cron");
const axios = require("axios");

const url = "https://pinger-aa3l.onrender.com/ping";

module.exports = {
    run: ()=>{
        cron.schedule("*/2 * * * *", () => {
            axios.get(url).then((response) => {
                console.log(response.data);
            }).catch((error) => {
                console.error(error);
            });
        });
    }
};
