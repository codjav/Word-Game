# 🌍 Word Guessing Game

> Guess the word before the last language dies.

## 🎮 About

A twist on the classic Hangman game. You're given a hidden word and must guess it letter by letter. But here's the catch — every wrong guess **kills a language**. Once all languages are extinct, the game is over.

## 📖 How to Play

1. The game picks a random word.
2. You guess one letter at a time.
3. ✅ Correct guess → the letter is revealed.
4. ❌ Wrong guess → a language dies (🪦).
5. You have **N chances** (default: 10).
6. Use all N → **Game Over**. The last language falls silent.
7. Guess the full word → **You Win!**

## 🪦 The Languages

Each mistake extinguishes a language from the list:

| Mistake | Language Lost |
|---------|---------------|
| 1       | HTML          |
| 2       | Python        |
| 3       | CSS           |
| 4       | Javascript    |
| 5       | Java          |
| 6       | **The last one** |

> *"Every time a language dies, a library burns."*

## 🚀 Getting Started

```bash
git clone https://github.com/yourusername/language-hangman.git
cd word-game