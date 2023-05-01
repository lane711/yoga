import { Hono } from 'hono'
import { graphql } from "./cms/graphql/router";
import { setAdmin } from "./cms/admin/admin";


const app = new Hono()


declare const KVDATA: KVNamespace;

app.get("/", () => {
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

// 404 for everything else
app.all("*", () => new Response("Not Found.", { status: 404 }));

export default app

