# Real Estate Brochure Generator

Real Estate Brochure Generator is a web application that helps copywriters at marketing agencies generate narrative flows for real estate brochures. It uses AI-powered language models to assist in creating compelling and tailored content based on brand positioning, features of the property, and desired tone.

## Features

- **Brand Positioning**: Define the brand positioning to be reflected in the brochure.
- **Property Features**: Specify the key features of the property to highlight.
- **Tone Selection**: Choose the desired tone for the brochure content (Casual or Professional).
- **Content Length**: Select the desired length of the generated content (Short, Medium, or Long).
- **Text Regeneration**: Allows users to modify and regenerate specific portions of the generated text.
- **Database Integration**: Enables users to insert generated content into a database for future reference.

## Technologies Used

- **Frontend**:
  - React.js
  - Material-UI for styling
  - Fetch API for making HTTP requests to the backend

- **Backend**:
  - Node.js with Express.js for the server
  - Anthropic (Claude 3 Sonnet) LLM for AI-powered text generation
  - Langchain AI Framework to load the LLM Model.
  - MongoDB for storing generated content

## Setup

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/real-estate-brochure-generator.git
   ```
2. Navigate to the project directory:

   ```bash
   cd real-estate-brochure-generator
   ```
3. Install dependencies for frontend:

   ```bash
   cd frontend
   npm install
   ```

4. Install dependencies for backend:

   ```bash
   cd ../backend
   npm install
   ```
5. Create a .env file in the backend folder and add the following environment variables:

   ```bash
   PORT=5000
   ANTHROPIC_API_KEY=YOUR_ANTHROPIC_KEY
   MONGO_URI=YOUR_MONGO_URI
   ```
   Note: To generate the API key, sign in to the Anthropic Console or create a new account on the Anthropic Console.
6. Start the frontend and backend servers:

   ```bash
    # Start frontend (React)
    cd ../frontend
    npm start

    # Start backend (Node.js)
    cd ../backend
    npm start
   ```
7. Access the application at http://localhost:3000 in your web browser.

## Usage
- Fill in the required information such as Brand Positioning, Property Features, Tone, and Length.
- Click on the "Generate" button to generate the brochure content.
- Review the generated content and make any necessary modifications.
- Select a portion of the text and click either "Make it Longer" or "Make it Shorter" to adjust the length.
- Click on the "Insert in DB" button to save the generated content to the database for future reference.

## Live Site

The live version of the Real Estate Brochure Generator can be accessed at [https://ai-market-brochure-generator.netlify.app/](https://ai-market-brochure-generator.netlify.app/).