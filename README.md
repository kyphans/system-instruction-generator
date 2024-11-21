# System Instruction Generator
#### Created by Ky Phan

## Summary

Project System Instruction Generator is a React-based application that allows users to generate responses based on system instructions and user prompts. The application integrates with the Gemini API to generate content and provides a user-friendly interface for managing prompts, responses, and history.

## Features

- **Prompt Form**: Users can input system instructions, prompts, and API keys to generate responses.
- **Response View**: Displays the generated response with an option to copy the response to the clipboard.
- **History Table**: Keeps track of all generated responses with timestamps, system instructions, and prompts.
- **Settings Popup**: Allows users to input their API key through a settings popup.
- **Skeleton Loading**: Shows a skeleton loading animation while the response is being generated.
- **Local Storage**: Saves the history of prompts and responses in local storage.
- **Toast Notifications**: Provides feedback to users through toast notifications for actions like copying text and errors.

## Components

- **Header**: Displays the header of the application.
- **PromptForm**: Form for inputting system instructions, prompts, and API keys.
- **ResponseView**: Displays the generated response with a copy button.
- **HistoryTable**: Displays the history of generated responses.
- **Footer**: Displays the footer of the application.

## Installation

1. Clone the repository
2. Navigate to the project directory
3. Install dependencies
4. Start the development server

Usage
- Open the application in your browser.
- Enter the system instruction and prompt in the provided form.
- Click the "Generate Response" button to generate a response.
- View the generated response in the Response View section.
- Copy the response to the clipboard using the copy button.
- View the history of generated responses in the History Table section.

## Environment Variables
VITE_GEMINI_API_KEY: Your Gemini API key.

## License
This project is licensed under the MIT License.