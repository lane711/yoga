import { getById, getDataByPrefix, putData } from "../../data/data";
import { Top } from "../theme";

export async function loadSites(context) {
//   console.log("mods context", context);
//   console.log("context KVDATA", context.env.KVDATA);


//   const mods = await getDataByPrefix(context.env.KVDATA, "site1::module");
//   console.log("mods site", mods[0]);

//   const data = await getDataByPrefix(context.env.KVDATA, "host::sites::");

//   console.log("data site", data[0]);

  let data = [{id:"123",title:'ipsum'}];
  const list = data.map((item) => {
    console.log("data site", item);

    return {
      title: item.title,
      path: `/admin/sites/${item.id}`,
    };
  });

  return <Top items={list} screenTitle="Sites" />;
}

export async function loadSite(context) {
  const data = await getById(context.env.KVDATA, "host::sites::orange-site");

  console.log("data site", data[0]);
  const list = data.map((item) => {
    return {
      title: item.title,
      path: `/admin/content-types/${item.name}`,
    };
  });

  return <Top items={list} screenTitle="Sites" />;
}
