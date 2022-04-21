const fs = require('fs')
const sha256 = require('crypto-js/sha256');
const encHex = require('crypto-js/enc-hex');
const { exit } = require('process');

try {
  const data = fs.readFileSync('./secret-allowlist.txt', 'utf8')

  var plaintext = [];
  for (var line of data.split('\n')) {
    line = line.trim();
    if (line.startsWith("#") || line.startsWith("//")) {
      continue;
    }
    if (line) {
      plaintext.push(line);
    }
  }

  let encrypted = plaintext.map((val) => {
    let digest = sha256(val.trim().toLowerCase());
    return digest.toString(encHex);
  });

  try {
    fs.writeFileSync('./public/encrypted-allowlist.txt', encrypted.join('\n'));
    console.log("Successfully generated encrypted address allowlist");
  } catch (err) {
    console.error(err)
  }
} catch (err) {
  console.error(err)
}
