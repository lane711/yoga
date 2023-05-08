import { getForm, loadForm } from "../admin/forms/form";
import { putData } from "../data/data";

export function setupApi(app) {

  app.get('/api/test', (c) => {
    return c.text('Many posts')
  })

  app.get("/api/forms", async (c) => c.html(await loadForm(c)));

  app.get("/api/form-components", async (c) => {
    return c.json(await getForm());
  });

  app.post("/api/form-components", async (c) => {
    const param = await c.req.json()

    console.log('formComponents-->', param);
    //put in kv
    const result = await putData(c.env.KVDATA, 'site1', 'content-type', param, "site1::content-type::blog-post");

    console.log('form put', result);
    return c.text('Created!', 201);
  });
}
