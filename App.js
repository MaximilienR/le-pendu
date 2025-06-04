import React, { useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Alert,
  SafeAreaView,
} from "react-native";

const ALPHABET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split("");
const WORDS = [
  "REACT",
  "NATIVE",
  "DEVELOPPEUR",
  "MOBILE",
  "JAVASCRIPT",
  "FRONTEND",
  "BACKEND",
  "COMPONENT",
  "STATE",
  "PROPS",
  "HOOKS",
  "REDUX",
  "ANDROID",
  "IOS",
  "NAVIGATION",
  "FIREBASE",
  "DATABASE",
  "DEBUG",
  "BUILD",
  "PERFORMANCE",
  "UI",
  "UX",
  "RESPONSIVE",
  "LAYOUT",
  "STYLE",
  "DESIGN",
  "CODE",
  "PROJECT",
  "GITHUB",
  "VERSION",
  "API",
  "ASYNC",
  "AWAIT",
  "PROMISE",
  "FUNCTION",
  "ARROW",
  "CLASS",
  "OBJECT",
  "ARRAY",
  "STRING",
  "BOOLEAN",
  "NUMBER",
  "NULL",
  "UNDEFINED",
  "IMPORT",
  "EXPORT",
  "MODULE",
  "PACKAGE",
  "NPM",
  "YARN",
  "SCRIPT",
  "EDITOR",
  "IDE",
  "TERMINAL",
  "COMMAND",
  "DEBUGGER",
  "SIMULATOR",
  "EMULATOR",
  "DEVICE",
  "RENDER",
  "COMPILER",
  "BABEL",
  "WEBPACK",
  "TRANSPILE",
  "JSX",
  "TSX",
  "TYPESCRIPT",
  "FLOW",
  "LINTER",
  "FORMATTER",
  "CONSOLE",
  "LOG",
  "ERROR",
  "WARNING",
  "TEST",
  "JEST",
  "MOCHA",
  "ENZYME",
  "COVERAGE",
  "SNAPSHOT",
  "CI",
  "CD",
  "DEPLOY",
  "ENV",
  "VARIABLE",
  "CONFIG",
  "HOOK",
  "CUSTOM",
  "REUSABLE",
  "CONTEXT",
  "PROVIDER",
  "CONSUMER",
  "NAVIGATOR",
  "SCREEN",
  "STACK",
  "TAB",
  "ROUTE",
  "LINK",
  "BUTTON",
  "INPUT",
  "FORM",
  "SUBMIT",
  "VALIDATION",
  "ANIMATION",
  "STYLE",
];
const getRandomWord = () => WORDS[Math.floor(Math.random() * WORDS.length)];

export default function HangmanGame() {
  const [word, setWord] = useState(getRandomWord());
  const [guessedLetters, setGuessedLetters] = useState([]);
  const [attemptsLeft, setAttemptsLeft] = useState(6);

  const handleLetterPress = (letter) => {
    if (guessedLetters.includes(letter)) return;

    const updatedGuesses = [...guessedLetters, letter];
    setGuessedLetters(updatedGuesses);

    if (!word.includes(letter)) {
      const newAttempts = attemptsLeft - 1;
      setAttemptsLeft(newAttempts);
      if (newAttempts === 0) {
        Alert.alert("😢 Perdu", `Le mot était : ${word}`, [
          { text: "Rejouer", onPress: resetGame },
        ]);
      }
    } else {
      const allGuessed = word
        .split("")
        .every((l) => updatedGuesses.includes(l));
      if (allGuessed) {
        Alert.alert("🎉 Bravo !", "Tu as deviné le mot !", [
          { text: "Rejouer", onPress: resetGame },
        ]);
      }
    }
  };

  const resetGame = () => {
    setWord(getRandomWord());
    setGuessedLetters([]);
    setAttemptsLeft(6);
  };

  const renderWord = () =>
    word
      .split("")
      .map((letter, idx) => (guessedLetters.includes(letter) ? letter : "_"))
      .join(" ");

  const renderHangman = () => {
    const parts = [
      "🪢", // corde
      "😵", // tête
      "👕", // torse
      "🦵", // jambe gauche
      "🦿", // jambe droite
      "🖐️", // bras
    ];

    return (
      <View style={styles.hangman}>
        {parts.slice(0, 6 - attemptsLeft).map((part, index) => (
          <Text key={index} style={styles.hangmanPart}>
            {part}
          </Text>
        ))}
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>🎯 Le pendu de max</Text>
      {renderHangman()}
      <Text style={styles.word}>{renderWord()}</Text>
      <Text style={styles.attempts}>Essais restants : {attemptsLeft}</Text>

      <View style={styles.keyboard}>
        {ALPHABET.map((letter) => (
          <TouchableOpacity
            key={letter}
            style={[
              styles.letterButton,
              guessedLetters.includes(letter) && styles.disabledButton,
            ]}
            onPress={() => handleLetterPress(letter)}
            disabled={guessedLetters.includes(letter)}
          >
            <Text style={styles.letter}>{letter}</Text>
          </TouchableOpacity>
        ))}
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1E3A8A",
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 30,
    color: "#FACC15",
    fontWeight: "bold",
    marginBottom: 10,
  },
  word: {
    fontSize: 34,
    color: "#F9FAFB",
    letterSpacing: 10,
    marginVertical: 20,
  },
  attempts: {
    color: "#F9FAFB",
    fontSize: 18,
    marginBottom: 10,
  },
  keyboard: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    marginTop: 10,
  },
  letterButton: {
    width: 40,
    height: 40,
    margin: 4,
    backgroundColor: "#FACC15",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 8,
  },
  disabledButton: {
    backgroundColor: "#9CA3AF",
  },
  letter: {
    fontWeight: "bold",
    fontSize: 16,
    color: "#1F2937",
  },
  hangman: {
    flexDirection: "row",
    justifyContent: "center",
    marginVertical: 10,
  },
  hangmanPart: {
    fontSize: 28,
    marginHorizontal: 2,
  },
});
