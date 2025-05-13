import { useState } from "react";
import { words } from "../data/index";
import { IWord } from "../types";
import "./button.css";

export default function Arabic() {
  const [currentWord, setCurrentWord] = useState<IWord>(words[0]);
  const [isWordVisible, setIsWordVisible] = useState(false);
  return (
    <div className="center flex h-screen w-full max-w-96 flex-col gap-8 text-5xl">
      <p className="font-urdu">{currentWord.arabic}</p>

      <div
        className={`center flex-col gap-6 p-2 ${isWordVisible ? "" : "blur-sm"}`}
        onClick={() => setIsWordVisible(!isWordVisible)}
      >
        <p className="font-urdu">{currentWord.urdu}</p>
        <p className="font-outfit">{currentWord.english}</p>
      </div>

      <button
        className="my-button w-36!"
        onClick={() => {
          const randomIndex = Math.floor(Math.random() * words.length);
          setCurrentWord(words[randomIndex]);
          setIsWordVisible(false);
        }}
      >
        Next
      </button>
    </div>
  );
}
