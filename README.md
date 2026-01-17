# Sinhala Translator

![Project Banner](https://img.shields.io/badge/Status-Active-success)![License](https://img.shields.io/badge/License-MIT-blue)

A modern, fast, and secure English-to-Sinhala translator powered by **Google Gemini AI**.
Built with a focus on clean UI/UX and secure API handling using Serverless Functions.

## Why this project?

As an undergraduate, I wanted to build a translation tool that goes beyond simple word-swapping. Unlike traditional translators, this uses a Large Language Model (LLM) to understand the *context* of the sentence, providing more natural and grammatically correct Sinhala translations.

Plus, it was a great way to experiment with **Netlify Functions** to secure API keys! 

## Key Features

* **Context-Aware Translation:** Uses Google's `Gemini 2.5 Flash` model for high-accuracy results.
* **Secure Backend:** The API key is hidden server-side using Netlify Functions (No exposed keys in frontend code).
* **Glassmorphism UI:** A modern, sleek interface with responsive design.
* **Text-to-Speech:** Listen to the Sinhala pronunciation with one click. 
* **Smart Security:** Includes Origin Checks and Rate Limiting to prevent abuse.

## Tech Stack

* **Frontend:** HTML5, CSS3, Vanilla JavaScript
* **Backend:** Node.js (Netlify Serverless Functions)
* **AI Model:** Google Gemini API
* **Hosting:** Netlify


## Security Measures

This project implements several security best practices:
* **Environment Variables:** API keys are never hardcoded.
* **Proxy Server:** Frontend talks to a backend function, not directly to Google.
* **Input Validation:** Limits character count to prevent token exhaustion.
* **CORS Protection:** Restricts API access to allowed domains only.


*Built with ❤️ by Lakshan Wickramasinghe*
