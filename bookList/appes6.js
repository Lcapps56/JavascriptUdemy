class Book{
    constructor(title, author, isbn){
        this.title = title
        this.author = author
        this.isbn = isbn
    }
}

class UI{
    addBookToList(book){
        const list = document.getElementById('book-list')
        const row = document.createElement('tr')
        row.innerHTML = `<td>${book.title}</td>
            <td>${book.title}</td>
            <td>${book.author}</td>
            <td>${book.isbn}</td>
            <td><a href="#" class="delete">X</a></td>`
        list.appendChild(row)


    }
    showAlert(msg, className){
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
    deleteBook(target){
        if(target.className === 'delete'){
            target.parentElement.parentElement.remove()
        }
    }
    clearFields(target){
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }
}

// localstorage class
class Store {
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = []
        }else{
            books = JSON.parse(localStorage.getItem('books'))
        }
        return books
    }
    static displayBooks(){
        const books = Store.getBooks();
 
        books.forEach(function(book){
            const ui = new UI

            ui.addBookToList(book)
        })
    }
    static addBook(book){
        const books = Store.getBooks()
        books.push(book)
        console.log(books)
        localStorage.setItem('books', JSON.stringify(books))
    }
    static removeBooks(isbn){
        console.log(isbn)
        const books = Store.getBooks()
        books.forEach(function(book, index){
           if(book.isbn === isbn){
               books.splice(index, 1)
           }
        })
        localStorage.setItem('books', JSON.stringify(books))
    }
}
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

    Store.removeBooks(e.target.parentElement.previousElementSibling.textContent)

    ui.showAlert('Book removed', 'success')
    e.preventDefault()
})