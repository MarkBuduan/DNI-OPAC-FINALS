const formBook = document.getElementById("formBook");
const inputBook = document.getElementById("bookName");
const inputAuthor = document.getElementById("authorName");
const inputGenre = document.getElementById("bookGenre");
const inputCondition = document.getElementById("bookCondition");
const inputStatus = document.getElementById("bookStatus");
const tableBody = document.querySelector("#bookList tbody");

const submit = document.getElementById("submit");
const contIdEdit = document.getElementById("contIdEdit");

const allBook = [];

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
        
        //const allBookItems = [JSON.parse(localStorage.getItem("books"))] ?? [];
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
                                <button class="edit">Edit</button>
                                <button class="delete" data-id="${id}">Delete</button>
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

tableBody.addEventListener("click", (e)=>{
    if(e.target.classList.contains("delete")){
        if(confirm("Are you sure you want to delete this record?")){
            //remove from localstorage
            let id = +e.target.getAttribute("data-id");
            let bookItems = JSON.parse(localStorage.getItem("books"))
            let newData = bookItems.filter(item=>item.id != id);
            localStorage.setItem("books", JSON.stringify(newData))

            //remove from html
            e.target.parentElement.parentElement.remove();
        }
    }

    if(e.target.classList.contains("edit")){
            
            let id = e.target.getAttribute("data-id");
            let itemFind = JSON.parse(localStorage.getItem("books")).find(item => item.id == id);

            inputBook.value = itemFind.book;
            inputAuthor.value = itemFind.author;
            inputGenre.value = itemFind.genre;
            inputCondition.value = itemFind.condition;
            inputStatus.value = itemFind.status;
            contIdEdit.value = id;
            submit.value = "Edit This Item";
        
    }
})