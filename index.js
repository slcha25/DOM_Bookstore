
const API_BASE_URL = 'https://bookstore-api-six.vercel.app/api';

// Get all DOM elements first
const title = document.getElementById('title');
const author = document.getElementById('author');
const publisher = document.getElementById('publisher');
const btn = document.querySelector('.btn');
const bookList = document.getElementById('book-list');
const loadMoreBtn = document.getElementById('load-more-btn');

let currentBooks = []; // Array to hold all books fetched from the API
let displayedBooks = 0; // Count of currently displayed books
const booksPerLoad = 10; // Number of books to load each time the button is clicked

// Initialize the page
document.addEventListener('DOMContentLoaded', function() {
    fetchAllBooks();
    // Ensure the load more button is visible when the page loads
    loadMoreBtn.style.display = 'block';
});

async function fetchAllBooks() {
    try {
        bookList.innerHTML = '<div class="loading">Loading books...</div>'; // Show loading message
        loadMoreBtn.disabled = true; // disable the button while loading
        loadMoreBtn.textContent = "Loading...";    // Update button text to indicate loading state
        
        const response = await fetch(`${API_BASE_URL}/books`); // Fetch all books from the API
        // Check if the response is ok (status in the range 200-299)
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        
        currentBooks = await response.json(); // Parse the JSON response
        // Check if there are any books returned
        if (!currentBooks || currentBooks.length === 0) {
            bookList.innerHTML = '<div class="loading">No books found</div>';
            loadMoreBtn.textContent = "No books available";
            return;
        }
        
        displayedBooks = 0;// Reset displayed books count
        loadMoreBooks(); // Load the first set of books
    } catch (error) {
        console.error('Error fetching books:', error);      
        bookList.innerHTML = `<div class="loading">Error: ${error.message}</div>`;
        loadMoreBtn.textContent = "Error loading books";
    } finally {
        loadMoreBtn.disabled = false; // Always show button
    }
}
// Load more books functionality
function loadMoreBooks() {
    const remainingBooks = currentBooks.length - displayedBooks;
    if (remainingBooks <= 0) {
        loadMoreBtn.disabled = true; // Disable instead of hide
        loadMoreBtn.textContent = "No more books";
        return;
    }
// Calculate how many books to show based on the remaining books and the predefined limit
    const booksToShow = Math.min(booksPerLoad, remainingBooks);
    const books = currentBooks.slice(displayedBooks, displayedBooks + booksToShow);
    
    if (displayedBooks === 0) {
        bookList.innerHTML = '';
    }
    
    displayBooks(books); // Display the books in the book list
    displayedBooks += booksToShow; // Update the count of displayed books
    
    // Update button text to show remaining books
    const remaining = currentBooks.length - displayedBooks;
    // Update the button text to reflect how many books are left to load
    loadMoreBtn.textContent = remaining > 0 ?  `Load More (${remaining} remaining)` : "No more books";
    loadMoreBtn.disabled = remaining <= 0; // Disable the button if no more books are left to load
}
// Function to display books in the book list
function displayBooks(books) {
    books.forEach(book => {
        const newRow = document.createElement('section');
        newRow.className = 'book-row';

        // Create title div
        const newTitle = document.createElement('div');
        newTitle.textContent = book.title || 'No title';
        newRow.appendChild(newTitle);

        // Create author div
        const newAuthor = document.createElement('div');
        newAuthor.textContent = book.author || 'Unknown author';
        newRow.appendChild(newAuthor);

        // Create publisher div
        const newPublisher = document.createElement('div');
        newPublisher.textContent = book.publisher || 'Unknown publisher';
        newRow.appendChild(newPublisher);

        // Create delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.addEventListener('click', function() { // Attach click event to delete button
            deleteBook(book.id, newRow); // Pass the book ID and the row element to the delete function
        });
        
        const actionsDiv = document.createElement('div'); // Create a div for actions
        actionsDiv.appendChild(deleteBtn); // Append the delete button to the actions div
        newRow.appendChild(actionsDiv); // Append the actions div to the new row

        bookList.appendChild(newRow); // Append the new row to the book list
    });
}
// Function to delete a book
async function deleteBook(bookId, rowElement) {
    try { // Check if the bookId is valid
        const response = await fetch(`${API_BASE_URL}/books/${bookId}`, { method: 'DELETE' });
        // Check if the response is ok (status in the range 200-299)
        if (!response.ok) throw new Error('Failed to delete book');
        
        rowElement.remove(); // Remove the row element from the DOM
        currentBooks = currentBooks.filter(book => book.id !== bookId); // Update the currentBooks array to remove the deleted book
        displayedBooks--;
        
        // Update button state after deletion
        loadMoreBooks();
    } catch (error) {
        console.error('Error:', error);
        alert(`Error: ${error.message}`);
    }
}

// Form submission
btn.addEventListener('click', async function(e) {
    e.preventDefault(); // Prevent the default form submission behavior
    // Validate form inputs
    if (title.value.trim() === "" || author.value.trim() === "" || publisher.value.trim() === "") {
        alert('Please fill in all fields.');
        return;
    }
// Create a new book object with the form data
    const newBook = {
        title: title.value.trim(),
        author: author.value.trim(),
        publisher: publisher.value.trim()
    };
// Send a POST request to add the new book
    try {
        const response = await fetch(`${API_BASE_URL}/books`, { // Send a POST request to the API
            method: 'POST', 
            headers: {
                'Content-Type': 'application/json', // Set the content type to JSON
            },
            body: JSON.stringify(newBook), // Convert the new book object to a JSON string
        });
        
        if (!response.ok) { 
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        // Parse the response to get the added book
        const addedBook = await response.json();
        currentBooks.unshift(addedBook); // Add the new book to the beginning of the currentBooks array
        displayedBooks = 0; // Reset displayed books count
        loadMoreBooks(); // Load the updated list of books
        
        title.value = "";  // Clear the input fields after adding the book
        author.value = "";
        publisher.value = "";
        
        loadMoreBtn.style.display = 'block'; // Ensure the load more button is visible after adding a book
    } catch (error) {
        console.error('Error adding book:', error);  // Log the error to the console
        alert(`Failed to add book: ${error.message}`); // Show an alert with the error message
    }
});
// Load more books button functionality
loadMoreBtn.addEventListener('click', loadMoreBooks);
// Ensure the load more button is visible when there are books to display
loadMoreBtn.style.display =  'block' ;


