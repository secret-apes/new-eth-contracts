const fs = require('fs')
const sha256 = require('sha256');
const { exit } = require('process');

try {
  const data = fs.readFileSync('./secret-allowlist.txt', 'utf8')

  var plaintext = [];
  for (var line of data.split('\n')) {
    line = line.trim();
    if (line) {
      plaintext.push(line);
    }
  }

  let encrypted = plaintext.map((val) => sha256.x2(val));

  try {
    fs.writeFileSync('./public/encrypted-allowlist.txt', encrypted.join('\n'));
    console.log("Successfully generated encrypted address allowlist");
  } catch (err) {
    console.error(err)
  }
} catch (err) {
  console.error(err)
}
