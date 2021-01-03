// book constructor
function Book(title, author, isbn){
    this.title = title;
    this.author = author;
    this.isbn = isbn
}

// UI constructor 
function UI(){}
UI.prototype.addBookToList = function(book){
    const list = document.getElementById('book-list')
    const row = document.createElement('tr')
    row.innerHTML = `<td>${book.title}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X</a></td>`
    list.appendChild(row)
}

UI.prototype.clearFields = function(){
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
}

UI.prototype.showAlert = function(msg, className){
    const div = document.createElement('div')
    div.className = `alert ${className}`
    div.appendChild(document.createTextNode(msg))
    const container = document.querySelector('.container')
    const form = document.querySelector('#book-form')
    container.insertBefore(div, form)

    setTimeout(function(){
        document.querySelector('.alert').remove()
    }, 3000)
}

UI.prototype.deleteBook = function(target){
    if(target.className === 'delete'){
        target.parentElement.parentElement.remove()
    }
}

function Store(){}
Store.prototype.getbooks = function(){
    let books;
    if(localStorage.getItem('books') === null){
        books = []
    } else{
        books = JSON.parse(localStorage.getItem('books'))
    }
    return books
}
Store.prototype.displayBooks = function(){
    const books = Store.getbooks()

    books.forEach(function(book){
        const ui = new UI()

        ui.addBookToList(book)
    })
}
Store.prototype.addBook = function(book){
    const books = Store.getbooks()
    books.push(book)
    localStorage.setItem('books', JSON.stringify(books))
}
Store.prototype.removeBook = function(isbn, index){
    const books = Store.getBooks()
    books.forEach(function(){
        if(books.isbn === isbn){
            books.splice(index, 1)
        }
    })

}

// event listeners
document.addEventListener('DOMContentLoaded', Store.displayBooks)


document.getElementById('btn').addEventListener('click', function(e){
    e.preventDefault()
    const title = document.querySelector('#title').value,
         author = document.querySelector('#author').value,
         isbn = document.querySelector('#isbn').value


    const book = new Book(title, author, isbn)
    const ui = new UI
    if(title === '' || author === '' || isbn === ''){
        ui.showAlert('Please fill in all fields', 'error')
    }else{


    ui.addBookToList(book)

    Store.addBook(book)

    ui.showAlert('Book added!', 'success')
    ui.clearFields()

    console.log(book)
    }
})

document.getElementById('book-list').addEventListener('click', function(e){
    const ui = new UI
    ui.deleteBook(e.target)
    Store.removeBook(e.target.parentElement.previousElementSibling.textContent)
    ui.showAlert('Book removed', 'success')
    e.preventDefault()
})
