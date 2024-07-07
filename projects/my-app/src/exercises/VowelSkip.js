import { useState, useEffect } from "react";

export default function VowelSkip() {
  const [inputWords, setInputWords] = useState("");
  const [outputWords, setOutputWords] = useState("");

  const nonVowels = (word) => {
    let newWord = "";
    let vowels = "aeiou";
    for (let char of word) {
      if (!vowels.includes(char.toLowerCase())) {
        newWord += char;
      }
    }
    return newWord;
  };

  useEffect(() => {
    if (inputWords) {
      setOutputWords(nonVowels(inputWords));
    } else {
      setOutputWords("");
    }
  }, [inputWords]);

  return (
    <>
      <h2>Text Without Vowels</h2>
      <p>{outputWords}</p>
      <label htmlFor="inputWords">Enter Text Here</label>
      <input
        type="text"
        id="inputWords"
        value={inputWords}
        onChange={(e) => setInputWords(e.target.value)}
      />
    </>
  );
}
