import { startCronJob } from "./cronJob";

let started = false;

export function init() {
    if (!started) {
        started = true;
        startCronJob();
        console.log("Cron job started");
    }
}
