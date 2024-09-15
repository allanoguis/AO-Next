import React, { useState } from "react";
import "../styles/App.css";

const AgeHook: React.FC = () => {
  let [myAge, setMyAge] = useState<number>(0);
  let [result, setResult] = useState<string>("");

  // if age is a float, set it to whole number
  let handleAgeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    let value = parseInt(e.target.value, 10);
    setMyAge(isNaN(value) ? 0 : value);
  };

  let handleClick = (): void => {
    try {
      if (
        typeof myAge !== "number" ||
        isNaN(myAge) ||
        !Number.isInteger(myAge)
      ) {
        throw new Error("Please enter a valid whole number for age");
      }

      let over500 = [
        "Dude you are bored. Go out and touch grass.",
        "Are you a time traveler?",
        "You must have seen some things.",
        "Ancient one, share your wisdom.",
        "How many centuries have you seen?",
        "You are probably.. Idk, immortal?",
        `You're are a dragon aren't you?`,
        `Aren't you going to die?`,
        `I'm getting tired of this.`,
        `Okay, you're done.`,
        `Alright, stop it. You're embarrassing me.`,
        `You're old.`,
        `I'm getting real tired of this.`,
        `Your age is.. Over 9000! (meme reference)`,
      ];

      switch (true) {
        case myAge < 0:
          setResult("Call Doc. You are travelling back in time!");
          break;
        case myAge === 0:
          setResult("Tell your mom and dad to make you");
          break;
        case myAge < 18:
          setResult('"You shall not pass!" - Gandalf');
          break;
        case myAge < 100:
          setResult("Ok! You passed");
          break;
        case myAge < 200:
          setResult("You have achieved wizard level");
          break;
        case myAge < 300:
          setResult("You are probably an elf");
          break;
        case myAge < 500:
          setResult("You have achieved god level");
          break;
        case myAge >= 500:
          const randomIndex = Math.floor(Math.random() * over500.length);
          setResult(over500[randomIndex]);
          break;
        default:
          throw new Error("Unexpected age value");
      }
    } catch (error) {
      console.error("Error in handleClick:", error);
      setResult(
        error instanceof Error ? error.message : "An unexpected error occurred"
      );
    }
  };

  return (
    <div className="GatekeeperContainer">
      <h4>Gatekeeper (R18) Age: {myAge}</h4>
      <input
        className="inputAge"
        type="number"
        value={myAge.toString()}
        onChange={handleAgeChange}
        onFocus={() => setMyAge(0)}
      />
      <p className="AgeResult">Result: {result}</p>
      <button onClick={handleClick} className="SubmitAge">
        Submit
      </button>
    </div>
  );
};

export default AgeHook;
