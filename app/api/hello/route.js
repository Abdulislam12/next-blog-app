import { init } from "@/lib/init";

init(); // ensures cron starts once

export async function GET() {
    return Response.json({ message: "API hit, cron running in background" });
}
