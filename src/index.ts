import { Hono } from "hono";
import { setupGraphQl } from "./cms/graphql/graphql";
import { setAdmin } from "./cms/admin/admin";
// import { serveStatic } from 'hono/cloudflare-workers';
import { setupApi } from "./cms/api/api";

const app = new Hono();

declare const KVDATA: KVNamespace;

app.get('/', (c) => c.redirect('/admin'))


// app.use('/*', serveStatic({ root: './' }))
// app.use('/favicon.ico', serveStatic({ path: './favicon.ico' }))

setupApi(app);
setAdmin(app);
// setupGraphQl(app);



app.get("/about", () => {
  return new Response("About us");
});

// app.all("/graphql", graphql);

// app.all("/admin", adminRouter.handle);



// 404 for everything else
app.all("*", () => new Response("Not Found.", { status: 404 }));

export default app;
