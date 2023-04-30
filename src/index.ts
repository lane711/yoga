import { Router } from "itty-router";

import { graphql } from "./cms/graphql/router";
import { adminRouter } from "./cms/admin/router";


const router = Router();

declare const KVDATA: KVNamespace;

router.get("/", () => {
  return new Response(
    "Hello, world! This is the root page of your Worker template."
  );
});

router.get("/about", () => {
  return new Response("About us");
});

router.all("/graphql", graphql);

router.all("/admin", adminRouter.handle);


// 404 for everything else
router.all("*", () => new Response("Not Found.", { status: 404 }));

// attach the router "handle" to the event handler
addEventListener("fetch", (event) =>
  event.respondWith(router.handle(event.request))
);
