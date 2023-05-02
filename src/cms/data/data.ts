// declare const KVDATA: KVNamespace;

function getKey(site, contentType) {
  return `${site}::${getTicksSortKey()}::${contentType}::${getId(7)}`;
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

export function getData(db, prefix = '') {
  return db.list({ prefix});
}

export function putData(db, site, contentType, value) {
  const key = getKey(site, contentType);
  return db.put(key, JSON.stringify(value));
}

function sum(a, b) {
    return a + b;
  }