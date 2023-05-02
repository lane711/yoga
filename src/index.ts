import { Hono } from "hono";
import { setupGraphQl } from "./cms/graphql/graphql";
import { setAdmin } from "./cms/admin/admin";
import { getData } from "./cms/data/data";
const app = new Hono();

declare const KVDATA: KVNamespace;

app.get("/", async ({ env }) => {

  console.log('home env -->', env)
  return new Response(
    "Hello, world! This is the root page of your Worker template."
  );
});

app.get("/about", () => {
  return new Response("About us");
});

// app.all("/graphql", graphql);

// app.all("/admin", adminRouter.handle);

setAdmin(app);
setupGraphQl(app);

// 404 for everything else
app.all("*", () => new Response("Not Found.", { status: 404 }));

export default app;
