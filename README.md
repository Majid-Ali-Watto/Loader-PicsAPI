# Loader-PicsAPI

This is a simple project built with `HTML`, `CSS`, and `JavaScript`. It fetches a list of images from an API and displays them on the page. A custom loader is implemented to enhance the user experience while data is being fetched.

## Features

- **Fetch API Integration**: Utilizes the Fetch API to perform GET requests and retrieve image data from a remote server.
- **Custom Loader**: A custom loader is displayed during the API call, ensuring users are informed that data is being loaded. The loader automatically hides once the data retrieval is complete.
- **Image Display**: Dynamically generates and displays image cards based on the fetched data.
- **Image Downloading**: Provides functionality to download images directly by clicking or double-clicking on them. This allows users to save images locally with ease.

## Project Structure

- **HTML**: The basic structure of the webpage.
- **CSS**: Custom styling for the page, including the loader and image cards.
- **JavaScript**: Handles the API calls, loader visibility, dynamic content creation, and image downloading.

## How It Works

1. **Loader Activation**: When an API call is initiated, the custom loader is automatically displayed.
2. **Data Fetching**: The Fetch API is used to send a GET request to the image API.
3. **Loader Deactivation**: Once the API call completes (whether successfully or not), the loader is hidden.
4. **Image Rendering**: The retrieved image data is then displayed in the form of image cards on the webpage.
5. **Image Downloading**:
   - **Single Click**: Downloads the image directly.
   - **Double Click**: Opens the image in a new tab on *picsum* website.

## Usage

To use or modify this project, follow these steps:

1. Clone the repository to your local machine.
2. Open `index.html` in your browser to view the project.
3. Modify the `main.js` file to change the API endpoint, styling, or behavior as needed.

## Technologies Used

- **HTML**
- **CSS**
  - Custom loader styling
- **JavaScript**
  - Fetch API for GET requests
  - DOM manipulation
  - Image download functionality

## Future Enhancements

- Add more interactivity to the image cards (e.g., likes, shares).
- Implement additional API functionalities like search or filter.
- Improve the loader design for a more modern look.
- Enhance the image downloading experience with additional options (e.g., different formats, resolutions).

