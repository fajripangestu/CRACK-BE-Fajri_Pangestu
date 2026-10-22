const crypto = require("crypto");
const [token, secret] = process.argv.slice(2);
const [h, p, sig] = token.trim().split(".");

console.log("Header :", JSON.parse(Buffer.from(h, "base64url").toString()));
console.log("Payload:", JSON.parse(Buffer.from(p, "base64url").toString()));

const algs = { HS256: "sha256", HS384: "sha384", HS512: "sha512" };
const keys = { "teks biasa": secret };
if (/^[0-9a-fA-F]+$/.test(secret) && secret.length % 2 === 0) {
  keys["hex-decoded"] = Buffer.from(secret, "hex");
}

let found = false;
for (const [alg, hash] of Object.entries(algs)) {
  for (const [name, key] of Object.entries(keys)) {
    const exp = crypto.createHmac(hash, key).update(`${h}.${p}`).digest("base64url");
    if (exp === sig) {
      console.log("COCOK ->", alg, "| kunci:", name);
      found = true;
    }
  }
}
if (!found) console.log("TIDAK ADA YANG COCOK: secret ini bukan yang dipakai untuk menandatangani token.");