import React, { useState } from 'react';

const createPolybiusSquare = () => {
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

const polybiusEncrypt = (text) => {
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

const polybiusDecrypt = (encryptedText) => {
  const square = createPolybiusSquare();
  let decryptedText = "";

  for (let i = 0; i < encryptedText.length; i += 2) {
    const row = parseInt(encryptedText[i]) - 1;
    const col = parseInt(encryptedText[i + 1]) - 1;
    decryptedText += square[row][col];
  }

  return decryptedText;
}


function App() {

  const [text, setText] = useState('');
  const [encrypted, setEncrypted] = useState('');
  const [decrypted, setDecrypted] = useState('');

  const handleEncrypt = () => {
    setEncrypted(polybiusEncrypt(text));
  };

  const handleDecrypt = () => {
    setDecrypted(polybiusDecrypt(encrypted));
  };

  return (
    <div className="container">
      <h1>Polybius Cipher</h1>
      <div className='input-container'>
        <input
          type="text"
          className="input"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Enter text to encrypt"
        />
        <button className="button" onClick={handleEncrypt}>Szyfruj</button>
      </div>
      <div className='input-container'>
        <input
          type="text"
          className="input"
          value={encrypted}
          onChange={(e) => setEncrypted(e.target.value)}
          placeholder="Enter text to decrypt"
        />
        <button className="button" onClick={handleDecrypt}>Deszyfruj</button>
      </div>
      <div className="output">
        <p>Tekst zaszyfrowany: <b>{encrypted}</b></p>
        <p>Tekst jawny: <b>{decrypted}</b></p>
      </div>
    </div>
  );
}

export default App
