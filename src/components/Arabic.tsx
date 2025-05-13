import { useState } from "react";
import { words } from "../data/index";
import { IWord } from "../types";
import "./button.css";

export default function Arabic() {
  const [selectedExercise, setSelectedExercise] = useState<string>("all");
  const [currentWord, setCurrentWord] = useState<IWord>(words[0]);
  const [isWordVisible, setIsWordVisible] = useState(false);

  const filteredWords =
    selectedExercise === "all"
      ? words
      : words.filter(
          (word) => word?.exerciseNumber?.toString() === selectedExercise,
        );

  const getRandomWord = () => {
    const randomIndex = Math.floor(Math.random() * filteredWords.length);
    return filteredWords[randomIndex];
  };

  const exerciseNumbers = [
    ...new Set(
      words
        .map((word) => word.exerciseNumber)
        .filter((num): num is number => typeof num === "number"),
    ),
  ].sort((a, b) => a - b);

  return (
    <div className="center flex h-screen w-full max-w-96 flex-col gap-8 text-5xl">
      <div className="flex w-64 items-center justify-around">
        <label htmlFor="options" className="text-2xl font-medium text-gray-700">
          Exercise
        </label>
        <select
          id="options"
          name="options"
          value={selectedExercise}
          onChange={(e) => {
            setSelectedExercise(e.target.value);
            const newWordList =
              e.target.value === "all"
                ? words
                : words.filter(
                    (w) => w?.exerciseNumber?.toString() === e.target.value,
                  );
            setCurrentWord(
              newWordList[Math.floor(Math.random() * newWordList.length)],
            );
            setIsWordVisible(false);
          }}
          className="focus:ring-primary focus:border-priring-primary block rounded-md border border-gray-300 bg-white px-4 py-2 text-sm text-gray-700 shadow-sm focus:ring-2 focus:outline-none"
        >
          <option value="all">All</option>
          {exerciseNumbers.map((exerciseNumber, i) => (
            <option key={`${exerciseNumber}${i}`} value={exerciseNumber}>
              {exerciseNumber}
            </option>
          ))}
        </select>
      </div>

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
          setCurrentWord(getRandomWord());
          setIsWordVisible(false);
        }}
      >
        Next
      </button>
    </div>
  );
}
