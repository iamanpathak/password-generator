# 🔐 Password Generator

[![JavaScript](https://img.shields.io/badge/JavaScript-Vanilla-F7DF1E?logo=javascript&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/JavaScript)
[![HTML5](https://img.shields.io/badge/HTML5-Semantic-E34F26?logo=html5&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/HTML)
[![CSS3](https://img.shields.io/badge/CSS3-Animations-1572B7?logo=css3&logoColor=white)](https://developer.mozilla.org/en-US/docs/Web/CSS)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow)](https://opensource.org/licenses/MIT)

Hey! I'm Aman. I built this project to demonstrate how to engineer a secure, highly interactive web application strictly using DOM APIs and zero external dependencies. Instead of relying on heavy frontend libraries, I used pure Vanilla JS to implement a true-random Fisher-Yates shuffle algorithm, real-time strength validation, and custom math-driven UI animations for a fast, client-side experience.

---

## 📸 App Preview

| Dark Mode | Light Mode |
| :---: | :---: |
| <img src="assets/dark-mode.png" height="450"> | <img src="assets/light-mode.png" height="450">

---

## ✨ Features

* Custom password generation based on:
  * Total length
  * Uppercase letters
  * Lowercase letters
  * Special characters
  * Digits
* Real-time validation for input consistency
* Animated password reveal effect
* Password strength indicator (Weak, Good, Strong)
* Suggested alternative passwords
* Copy to clipboard functionality
* Reset functionality for quick reconfiguration
* Toast notifications for user actions and errors
* Light and Dark theme toggle

---

## 🧠 Technical Highlights

* **Cryptographic Randomness:** Implements the Fisher-Yates shuffle algorithm to ensure true unbiased character distribution.
* **Complex UI Animations:** Uses `setInterval` for a staggered, matrix-style password decoding reveal effect.
* **Math-Driven Particles:** The emoji explosion effect utilizes Sine and Cosine functions (`Math.sin` / `Math.cos`) for precise circular particle scattering.
* **Zero-Dependency:** 100% Vanilla JavaScript, DOM manipulation, and CSS3 Keyframes. No external libraries.

---

## 🛠️ Tech Stack

* **HTML5:** Semantic structure
* **CSS3:** Custom properties, keyframe animations, and flexbox layouts
* **JavaScript (Vanilla):** Core logic, array shuffling, and DOM manipulation

---

## 📁 Project Structure

```text
password-generator/
├── assets/
├── index.html
├── style.css
├── script.js
├── LICENSE
└── README.md
```

---

## 🚀 How to Run

1. Clone or download the repository:
```bash
git clone https://github.com/iamanpathak/password-generator.git
```
2. Open the `index.html` file in any modern web browser.
3. No additional setup or installation is required.

---

## 💡 Notes

This is a fully client-side application. All logic runs in the browser without any backend or external APIs.

---

## 📄 License

This project is licensed under the [MIT License](LICENSE).

<p align="center">
  Made with ❤️ by <a href="https://github.com/iamanpathak">Aman Pathak</a>
</p>