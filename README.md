# San's Bookstore (DOM)
San's Bookstore is a website was bulit by HTML, CSS ,JavaScript(DOM).

## Project Structure
```text
sans-bookstore/
├── index.html        # Main HTML file
├── style.css         # CSS styles
├── index.js          # JavaScript functionality
└── README.md         # This file
```
## Usage
  1. Fill in the form to add a new book
  2. view your book colleciton in the table below
  3. click "Delete" to remove books
  4. Use "load more" to see additional books if you have many entires
     
## Features
- **Vanilla** - no external dependency and no additional library required.
- **Dynamic Typing Animation** : auto-typing header welcomes the guests.
- **Book Management**:
  - add new books with title,author, and publiser
  - delete books from your collection
- **Reponsive Design**: Works on all device sizes
- **Sticky Elements**: Form and table headers stay visible while scrolling.
- **Modern UI**: Beautiful gradient background and smooth hover effects
## Technologies Used
- **Frontend**:
  - Html, CSS, JavaScript
  - Typed.js for typing animations
  - CSS flexbox for layout
- **Backend API**:
  - [Bookstore API](https://bookstore-api-six.vercel.app/api) external service
  
## Using a fake and reliable API for testing and prototyping. 
   - hide API API keys using a .env.local or .env file.
   - use local env to fetch API in ADD and Delete function
```JavaScript
const API_BASE_URL = 'https://bookstore-api-six.vercel.app/api';

const response = await fetch(`${API_BASE_URL}/books`); // Fetch all books from the API in the add book function

// Function to delete a book
async function deleteBook(bookId, rowElement) {
    try { // Check if the bookId is valid
        const response = await fetch(`${API_BASE_URL}/books/${bookId}`, { method: 'DELETE' });
```

## Credits
- Fonts from [Google Fonts](https://fonts.google.com/)
- Typing animation by [Typed.js](https://github.com/mattboldt/typed.js/)
- color palette inspried by pastel themes
  
## Contact
Created by [Sandra Chan](https://www.linkedin.com/in/sok-chan/) - feel free to contact me
