# Receipt Extractor AI

[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-19-blue?logo=react)](https://react.dev/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue?logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-3.x-blue?logo=tailwindcss)](https://tailwindcss.com/)

An intelligent web application that leverages the Google Gemini API to instantly extract structured data from unstructured receipt text.

![Receipt Extractor AI Screenshot](https://storage.googleapis.com/aistudio-web-public-prod/project_showcase/1719522209794_receipt-extractor-ai.png) <!--- Placeholder for a project screenshot or GIF --->

---

## ✨ Key Features

-   **AI-Powered Data Extraction**: Utilizes Google's powerful `gemini-2.5-flash` model to accurately parse receipt details.
-   **Structured JSON Output**: Converts messy text into a clean, predictable JSON object with fields for vendor, date, total, and line items.
-   **Schema Enforcement**: Employs Gemini's JSON mode with a defined schema to ensure consistent and reliable output.
-   **Sleek & Responsive UI**: Modern and user-friendly interface built with React and Tailwind CSS.
-   **Copy to Clipboard**: Easily copy the generated JSON with a single click.
-   **Dark Mode**: Thoughtfully designed for both light and dark viewing modes.

## 🚀 Tech Stack

-   **Frontend**: [React](https://reactjs.org/), [TypeScript](https://www.typescriptlang.org/)
-   **AI**: [Google Gemini API (`gemini-2.5-flash`)](https://ai.google.dev/)
-   **Styling**: [Tailwind CSS](https://tailwindcss.com/)
-   **Icons**: Custom SVG components

## 🛠️ Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

-   A modern web browser.
-   A Google Gemini API Key. You can obtain one from [Google AI Studio](https://aistudio.google.com/).

### Configuration

For this project to function, you need to provide your Gemini API Key. Since this is a client-side application, it's configured to read the key from an environment variable that must be made available to the browser.

1.  **Create a `.env` file** in the root of your project.
2.  Add your API key to the `.env` file as follows:

    ```bash
    # .env
    API_KEY=YOUR_GEMINI_API_KEY_HERE
    ```

> **Security Warning**: The current architecture exposes the API key on the client side. For a production environment, it is **highly recommended** to proxy API calls through a secure backend (e.g., a serverless function) where the key can be stored safely.

### Running the Application

This project is set up to run directly in the browser without a build step, using modern features like import maps.

1.  Clone the repository:
    ```bash
    git clone https://github.com/your-username/receipt-extractor-ai.git
    cd receipt-extractor-ai
    ```
2.  Serve the `index.html` file using a local web server. A simple way to do this is with the `live-server` VS Code extension or by running a simple Python server:
    ```bash
    # If you have Python 3
    python3 -m http.server
    ```
3.  Open your browser and navigate to the local server address (e.g., `http://localhost:8000`).

## 🏛️ Architectural Overview

The application operates entirely on the client-side.

1.  **User Input**: The user pastes raw receipt text into a `textarea` in the UI.
2.  **API Service Call**: The `geminiService.ts` module is responsible for communicating with the Gemini API. It constructs a detailed prompt that includes the user's text and a strict JSON schema for the desired output.
3.  **Gemini API Processing**: The request is sent to the `gemini-2.5-flash` model. The model's `responseMimeType` is set to `application/json` and the `responseSchema` is provided to force a structured, reliable output.
4.  **State Update**: The returned JSON data is used to update the application's state via React hooks.
5.  **Render Result**: The UI re-renders to display the formatted JSON data, a loading state, or any errors that occurred during the process.

## 🤝 Contributing

Contributions are welcome! If you have suggestions for improvements or want to fix a bug, please feel free to open an issue or submit a pull request.

1.  Fork the Project
2.  Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3.  Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4.  Push to the Branch (`git push origin feature/AmazingFeature`)
5.  Open a Pull Request

## 📄 License

This project is distributed under the MIT License. See `LICENSE.txt` for more information.
