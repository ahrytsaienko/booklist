// Book constructor
function Book(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;

}

// UI constructor
function UI() { }

UI.prototype.addBookToList = function (book) {
    const list = document.getElementById('book-list');
    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class ="delete" >X</a></td>
    `;

    list.appendChild(row);

};

// Clear fields
UI.prototype.clearFields = function () {
    document.getElementById('title').value = '';
    document.getElementById('author').value = '';
    document.getElementById('isbn').value = '';
};

UI.prototype.showAlert = function (msg, className) {
    const div = document.createElement('div');
    // Add classes
    div.className = `alert ${className}`;
    div.appendChild(document.createTextNode(msg));

    //Get parent
    const container = document.querySelector('.container');

    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);

    setTimeout(function () {
        document.querySelector('.alert').remove();
    }, 3000);
};

UI.prototype.deleteBook = function (target) {
    if (target.className === 'delete') {
        target.parentElement.parentElement.remove();
    };
};

// Event listeners
document.getElementById('book-form').addEventListener('submit',
    function (e) {
        // Get form values
        const title = document.getElementById('title').value,
            author = document.getElementById('author').value,
            isbn = document.getElementsByClassName('isbn').value;

        const book = new Book(title, author, isbn);
        const ui = new UI();

        // Validate
        if (title === '' || author === '' || isbn === '') {
            // Error alert
            ui.showAlert('Please fill in all fields', 'error');
        } else {

            // Add book to list
            ui.addBookToList(book);
            ui.showAlert('Book Added!', 'success');
            // Clear fields
            ui.clearFields()
        }

        e.preventDefault();

    });

// Event listener for delete
document.getElementById('book-list').addEventListener('click',
    function (e) {

        const ui = new UI();
        ui.deleteBook(e.target);

        e.preventDefault();
    });


