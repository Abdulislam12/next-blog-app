import cron from "node-cron";

export function startCronJob() {
    // This cron job runs every minute
    cron.schedule("* * * * *", () => {
        console.log("Hello world", Date.now());
    });
}
