// 1. Book Class: Represents a Book
class Book {
  constructor(name, gender, email, subject, massage, phone) {
    this.name = name;
    this.gender = gender;
    this.email = email;
    this.subject = subject;
    this.massage = massage;
    this.phone = phone;
  }
}

// 2. UI Class: Handle UI Tasks
class UI {
  static displayBooks() {
// 3. predefined books
//     const StoredBooks = [
//       {
//         title: 'Book One',
//         author: 'John Boe',
//         isbn: '11111111'
//       },
//       {
//         title: 'Book One',
//         author: 'John Boe',
//         isbn: '11111111'
//       }
//     ];
//     const books = StoredBooks;
     
    const books = Store.getBooks();

    books.forEach((book) => UI.addBookToList(book));
  }

// 4. add book
  static addBookToList(book) {
    const list = document.querySelector('#book-list');

    const row = document.createElement('tr');

    row.innerHTML = `
      <td>${book.name}</td>
      <td>${book.gender}</td>
      <td>${book.email}</td>
      <td>${book.subject}</td>
      <td>${book.massage}</td>
      <td>${book.phone}</td>
      <td><a href="#" class="btn btn-danger btn-sm delete"> X </a></td>
    `;

    list.appendChild(row);
  }

// 11. delete book  
  static deleteBook(el) {
    // if element contains .delete class
    if(el.classList.contains('delete')) {
    // remove <a> -> <td> -> <tr>       
      el.parentElement.parentElement.remove();
    }
  }

// 13. show alert  
// <div class="alert alert-success/alert-danger>Message</div>
  static showAlert(message, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(message));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);

    // Vanish in 3 seconds
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }

// 9. clear fields  
  static clearFields() {
    document.querySelector('#name').value = '';
    document.querySelector('#gender').value = '';
    document.querySelector('#email').value = '';
    document.querySelector('#subject').value = '';
    document.querySelector('#massage').value = '';
    document.querySelector('#phone').value = '';
  }
}

// Store Class: Handles Storage
class Store {
  static getBooks() {
    let books;
    if(localStorage.getItem('books') === null) {
      books = [];
    } else {
      books = JSON.parse(localStorage.getItem('books'));
    }

    return books;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(phone) {
    const books = Store.getBooks();

    books.forEach((book, index) => {
      if(book.phone === phone) {
        books.splice(index, 1);
      }
    });

    localStorage.setItem('books', JSON.stringify(books));
  }
}

// 4. Event: Display Books
document.addEventListener('DOMContentLoaded', UI.displayBooks);

// 5. Event: Add a Book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  // 7. Prevent actual submit action
  e.preventDefault();

  // Get form values
  const name = document.querySelector('#name').value;
  const gender = document.querySelector('#gender').value;
  const email = document.querySelector('#email').value;
  const subject = document.querySelector('#subject').value;
  const massage = document.querySelector('#massage').value;
  const phone = document.querySelector('#phone').value;

  // 12. Validate
  if(name === '' || gender === '' || email === ''|| subject === '' || massage === '' || phone === '') {
    UI.showAlert('Please fill in all fields', 'danger');
  } else {
    // 6. Instatiate book
    const book = new Book(name, gender, email, subject, massage, phone);
    // console.log(book);

    // 8. Add Book to UI
    UI.addBookToList(book);

    // Add book to store
    Store.addBook(book);

    // 13. Show success message
    UI.showAlert('Contact Added', 'success');

    // 9. Clear fields
    UI.clearFields();
  }
});

// 10. Event: Remove a Book - event propagation by selecting the parent
document.querySelector('#book-list').addEventListener('click', (e) => {
  // console.log(e.target);
  
  // 11. Remove book from UI
  UI.deleteBook(e.target);

  // Remove book from store
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);

  // 13. Show success message
  UI.showAlert('Contact Removed', 'success');
});