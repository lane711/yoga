// declare const KVDATA: KVNamespace;

export function getKey(site, schema, key = "") {
  return key ?? `${site}::${schema}::${getTicksSortKey()}::${getId(7)}`;
}

function getTicksSortKey() {
  return new Date().getTime() * 10000;
}

export function getId(length) {
  const charset = "abcdefghijklmnopqrstuvwxyz0123456789";
  let res = "";
  while (length--) res += charset[(Math.random() * charset.length) | 0];

  return res;
}

export function getDataByPrefix(db, prefix = "") {
  return db.list({ prefix });
}

export function getById(db, key) {
  return db.get(key, { type: "json" });
}

export function putData(db, site, contentType, value, key ="") {
  const generatedKey = getKey(site, contentType, key);
  console.log('generatedKey', generatedKey)
  return db.put(generatedKey, JSON.stringify(value));
}

export function add(a, b) {
  return a + b;
}
