// Creat a class to store books
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
};

// UI Class to handle UI tasks

class UI {
    static displayBooks() {
        // const StoredBooks = [
        //     {
        //         title: 'Book One',
        //         author: 'John Doe',
        //         isbn: '1234'
        //     },
        //     {
        //         title: 'Book Two',
        //         author: 'Marry Doe',
        //         isbn: '5678'
        //     }
        // ];

        const books = Store.getBooks();
        books.forEach((book) => UI.addBookToList(book));
    }

    static addBookToList(book) {
        const list = document.querySelector('#book-list');
        // Create table row

        var row = document.createElement('tr');
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><button class="btn btn-sm btn-outline-danger delete">Delete</button></td>`;

        list.appendChild(row);
    }

    static deleteBook(el) {
        if(el.classList.contains('delete')) {
          el.parentElement.parentElement.remove();
        }
      }

    static showAlert(message, className) {
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container = document.querySelector('#containers');
        const form = document.querySelector('#book-form');

        container.insertBefore(div, form);

        setTimeout(() => {
            document.querySelector('.alert').remove()
        }, 1800);
    }

    static clearAllFields() {
        document.querySelector('#title').value='';
        document.querySelector('#author').value='';
        document.querySelector('#ISBN').value='';
    }

};

  // Store class handle local storage
  class Store{
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books=[];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }

        return books;
    }

    static addBook(book){
        const books = Store.getBooks();
        books.push(book);
        localStorage.setItem('books', JSON.stringify(books));
    }

    static removeBook(isbn){
        const books = Store.getBooks();

        books.forEach((book, index) => {
            if(book.isbn === isbn){
                books.splice(index, 1);
            }
        });

        localStorage.setItem('books', JSON.stringify(books));
    }
};

// To display books after loading
document.addEventListener('DOMContentLoaded', UI.displayBooks);


// Add book

document.querySelector('#book-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#ISBN').value;

    if (title === '' || author === '' || isbn === '') {
        // Show alert
        UI.showAlert('Please Enter All Fields', 'danger');
    } else {
        // Add Book
        const book = new Book(title, author, isbn);

        // Add book to UI
        UI.addBookToList(book);

        // Add book to store
        Store.addBook(book);

        // Show alert message
        UI.showAlert('Book Added Successfully', 'success');

        // Clear all fields
        UI.clearAllFields();
    }
});


// Delete button
document.querySelector('#book-list').addEventListener('click', (e) => {
    UI.deleteBook(e.target);

    Store.removeBook(e.target.parentElement.previousElementSibling.textContent);


    // Show alert
    UI.showAlert('Book Removed Successfully', 'info')
});