const formBook = document.getElementById("formBook");
const inputBook = document.getElementById("bookName");
const inputAuthor = document.getElementById("authorName");
const inputGenre = document.getElementById("bookGenre");
const inputCondition = document.getElementById("bookCondition");
const inputStatus = document.getElementById("bookStatus");
const tableBody = document.querySelector("#bookList tbody")

class Book {
    constructor(id, book, author, genre, condition, status) {
        this.id = id;
        this.book = book;
        this.author = author;
        this.genre = genre;
        this.condition = condition;
        this.status = status;

    }

    showData() {
        Book.showHtml(this.id, this.book, this.author, this.genre, this.condition, this.status);
        return this;
    }

    storeBook() {
        const allBook = [JSON.parse(localStorage.getItem("books"))] ?? [];
        allBook.push({id:this.id, book:this.book, author:this.author, genre:this.genre, condition:this.condition, status:this.status})
        localStorage.setItem("books", JSON.stringify(allBook))

    }

    static showAllBooks(){
        if(localStorage.getItem("books")){
            const arr = JSON.parse(localStorage.getItem("books"));
            arr.forEach(function(item) {
                Book.showHtml(item.id, item.book, item.author, item.genre, item.condition, item.status);
            });
        }
    }

    static showHtml(id, book, author, genre, condition, status) {
        const trEl = document.createElement("tr");
        trEl.innerHTML = `
                        <tr>
                            <td>${id}</td>
                            <td>${book}</td>
                            <td>${author}</td>
                            <td>${genre}</td>
                            <td>${condition}</td>
                            <td>${status}</td>
                            <td>
                                <button>Edit</button>
                                <button>Delete</button>
                            </td>
                        </tr>`
        tableBody.appendChild(trEl);
    }
}

Book.showAllBooks();

formBook.addEventListener("submit", (e)=> {
    e.preventDefault();

    let id = Math.floor(Math.random() * 1000);
    const newBook = new Book(id, inputBook.value, inputAuthor.value, inputGenre.value, inputCondition.value, inputStatus.value);
    newBook.showData().storeBook();

    inputBook.value = "";
    inputAuthor.value = "";
    inputGenre.value = "";
    inputCondition.value = "";
    inputStatus.value = "";
});