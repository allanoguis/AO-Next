import React, { useState } from "react";
import "../styles/App.css";

export function PasswordGenerator() {
  const [length, setLength] = useState(8);
  const [includeNumbers, setIncludeNumbers] = useState(true);
  const [includeSymbols, setIncludeSymbols] = useState(true);
  const [includeLowercase, setIncludeLowercase] = useState(true);
  const [includeUppercase, setIncludeUppercase] = useState(true);
  const [generatedPassword, setGeneratedPassword] = useState("");

  const numbers: string = "0123456789";
  const symbols: string = `!@#$%^&*()_+{}[]:\\";'<>?,./`;
  const lowercase: string = "abcdefghijklmnopqrstuvwxyz";
  const uppercase: string = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  const generatePassword = () => {
    let characterPool: string = "";

    characterPool += includeNumbers ? numbers : "";
    characterPool += includeSymbols ? symbols : "";
    characterPool += includeLowercase ? lowercase : "";
    characterPool += includeUppercase ? uppercase : "";

    if (characterPool.length === 0) {
      setGeneratedPassword("Error: Please select at least one character type");
      return;
    }

    let newPassword = "";
    for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characterPool.length);
      newPassword += characterPool[randomIndex];
    }

    setGeneratedPassword(newPassword);
  };

  return (
    <div className="password-generator">
      <h1>Password Generator</h1>
      <>
        <h2>Length: {length}</h2>
        <input
          type="range"
          min="8"
          max="32"
          value={length}
          onChange={(e) => setLength(Number(e.target.value))}
        />
      </>
      <div className="checkboxes">
        {[
          {
            state: includeNumbers,
            setter: setIncludeNumbers,
            label: "Numbers",
          },
          {
            state: includeSymbols,
            setter: setIncludeSymbols,
            label: "Symbols",
          },
          {
            state: includeLowercase,
            setter: setIncludeLowercase,
            label: "Lowercase",
          },
          {
            state: includeUppercase,
            setter: setIncludeUppercase,
            label: "Uppercase",
          },
        ].map(({ state, setter, label }) => (
          <label className="checklabel" key={label}>
            <input
              type="checkbox"
              checked={state}
              onChange={(e) => setter(e.target.checked)}
            />
            <span>{label}</span>
          </label>
        ))}
      </div>
      <>
        <input id="password" type="text" value={generatedPassword} readOnly />
        <button id="generate" onClick={generatePassword}>
          Generate
        </button>
      </>
    </div>
  );
}

export default PasswordGenerator;
