function createPolybiusSquare() {
  const alphabet = "abcdefghiklmnopqrstuvwxyz"; // Note: 'j' is omitted
  let square = [];
  let idx = 0;

  for (let i = 0; i < 5; i++) {
    square[i] = [];
    for (let j = 0; j < 5; j++) {
      square[i][j] = alphabet[idx++];
    }
  }

  return square;
}

function polybiusEncrypt(text) {
  const square = createPolybiusSquare();
  let encryptedText = "";

  for (let char of text.toLowerCase()) {
    if (char === 'j') char = 'i'; // Treat 'j' as 'i'
    for (let i = 0; i < 5; i++) {
      for (let j = 0; j < 5; j++) {
        if (square[i][j] === char) {
          encryptedText += `${i + 1}${j + 1}`;
        }
      }
    }
  }

  return encryptedText;
}

function polybiusDecrypt(encryptedText) {
  const square = createPolybiusSquare();
  let decryptedText = "";

  for (let i = 0; i < encryptedText.length; i += 2) {
    const row = parseInt(encryptedText[i]) - 1;
    const col = parseInt(encryptedText[i + 1]) - 1;
    decryptedText += square[row][col];
  }

  return decryptedText;
}

// Example usage
const text = "hello";
const encrypted = polybiusEncrypt(text);
console.log(`Encrypted: ${encrypted}`);
const decrypted = polybiusDecrypt(encrypted);
console.log(`Decrypted: ${decrypted}`);
