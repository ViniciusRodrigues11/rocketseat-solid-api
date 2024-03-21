import { app } from "@/app";
import { env } from "@/env";

app.listen({
  port: env.PORT,
  host: "0.0.0.0",
  listenTextResolver: (address) => {
    return `🚀 Server listening on ${address}`;
  },
});
