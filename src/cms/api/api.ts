import { getForm, loadForm } from "../admin/forms/form";

export function setupApi(app) {

  app.get('/api/test', (c) => {
    return c.text('Many posts')
  })

  app.get("/api/forms", async (c) => c.html(await loadForm(c)));

  app.get("/api/form-components", async (c) => {
    return c.json(await getForm());
  });

  app.post("/api/form-components", async (c) => {
    console.log('formComponents', c.req.paramData);
    return c.text('Created!', 201);
  });
}
