# react-mockapi-starter

This repository provides a starter template for a shopping app built with React and Chakra UI, using MockAPI as the backend for data management. The app allows users to add, edit, and delete products, each with a name, price, and quantity.

## Features
- **Product Management**: Supports creating, editing, and deleting product entries.
- **Modal Popups**: Provides modals for adding/editing products and confirming deletions.
- **Responsive UI**: Built with Chakra UI for a user-friendly design.

## Prerequisites
- **Node.js** and **npm**: Ensure you have Node.js and npm installed.
- **MockAPI Account**: This app requires a MockAPI endpoint to store and manage product data.

## Getting Started

### 1. Clone the Repository
```bash
git clone https://github.com/yourusername/react-mockapi-starter.git
cd react-mockapi-starter
```

### 2. Install Dependencies
Use npm to install the required dependencies:
```bash
npm install
```

### 3. Set Up MockAPI
1. Go to [MockAPI](https://mockapi.io/) and create a new project.
2. Add a new resource (e.g., “products”) to store your product data.
3. Copy your MockAPI **base URL** and replace `baseUrl` in `ShoppingApp.js`:
    ```javascript
    const baseUrl = "https://your-mockapi-url.com/products";
    ```

### 4. Run the App
```bash
npm start
```
The app will start on [http://localhost:3000](http://localhost:3000).

## Customization

### Chakra UI
- Modify the Chakra UI theme settings in `ShoppingApp.js` as needed.
- Use Chakra UI components to expand the UI further.

### Component Customization
To customize components like lists, inputs, or modals:
- Edit `ShoppingApp.js` to adjust properties, styles, or layout.

## Available Scripts

In the project directory, you can run:
- **`npm start`**: Runs the app in development mode.
- **`npm test`**: Launches the test runner.
- **`npm run build`**: Builds the app for production.

## Dependencies
- **React**: Core library for building the UI.
- **Chakra UI**: Component library for styling and layout.
- **React Icons**: Provides icons for edit and delete actions.

## Important Notes
- Ensure the MockAPI base URL is correct; otherwise, data will not load or save.
- For Chakra UI compatibility, use a version lower than `2.8.x` if required.

## License
This project is licensed under the MIT License.