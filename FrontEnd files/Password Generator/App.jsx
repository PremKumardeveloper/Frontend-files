import { useState } from "react";
import "./App.css";

function App() {
  const [length, setLength] = useState(8);
  const [includeUpperCase, setIncludeUpperCase] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeNumber, setIncludeNumber] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [password, setPassword] = useState("");

  const generatePassword = () => {
    let charset = "";
    if (includeUpperCase) charset += "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
    if (includeLowercase) charset += "abcdefghijklmnopqrstuvwxyz";
    if (includeNumber) charset += "0123456789";
    if (includeSymbols) charset += "!@#$%&*?.<,>";

    if (charset === "") {
      setPassword("Select at least one option!");
      return;
    }

    let generatedPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * charset.length);
      generatedPassword += charset[randomIndex];
    }

    setPassword(generatedPassword);
  };

  const copyToClipboard = () => {
    if (password) {
      navigator.clipboard.writeText(password);
      alert("Password copied to clipboard!");
    }
  };

  return (
    <>
      <div className="container">
        <div className="heading">
          <h1>Password Generator</h1>
          <p>Generate strong, unique passwords</p>
        </div>

        <div className="pass-length">
          <label htmlFor="num">Password length:</label>
          <input
            type="number"
            id="num"
            placeholder="Enter Password Length"
            value={length}
            min="4"
            max="50"
            onChange={(e) => setLength(Math.max(4, parseInt(e.target.value) || 8))}
          />
        </div>

        <div className="options">
          <label>
            <input
              type="checkbox"
              checked={includeUpperCase}
              onChange={(e) => setIncludeUpperCase(e.target.checked)}
            />
            Include UpperCase (ABCDEF)
          </label>

          <label>
            <input
              type="checkbox"
              checked={includeLowercase}
              onChange={(e) => setIncludeLowercase(e.target.checked)}
            />
            Include Lowercase (abcdef)
          </label>

          <label>
            <input
              type="checkbox"
              checked={includeNumber}
              onChange={(e) => setIncludeNumber(e.target.checked)}
            />
            Include Numbers (12345)
          </label>

          <label>
            <input
              type="checkbox"
              checked={includeSymbols}
              onChange={(e) => setIncludeSymbols(e.target.checked)}
            />
            Include Symbols (!@#$&)
          </label>
        </div>

        <button className="gen-btn" onClick={generatePassword}>
          Generate Password
        </button>

        <div className="show-password">
          <input type="text" value={password} readOnly />
          <button className="copy-btn" onClick={copyToClipboard}>
            Copy
          </button>
        </div>
      </div>
    </>
  );
}

export default App;
