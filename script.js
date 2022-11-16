const formBook = document.getElementById("formBook");
const inputBook = document.getElementById("bookName");
const inputAuthor = document.getElementById("authorName");
const inputGenre = document.getElementById("bookGenre");
const inputCondition = document.getElementById("bookCondition");
const inputStatus = document.getElementById("bookStatus");
const tableBody = document.querySelector("#bookList tbody");

const submitBtn = document.getElementById("submitButton");
const contIdEdit = document.getElementById("contIdEdit");

//Genre||Area
let fictionCount = 0;
let artCount = 0;
let scienceCount = 0;
let filipinianaCount = 0;
let magazineCount = 0;

let totalCount = fictionCount + artCount + scienceCount + filipinianaCount + magazineCount;

//Condition
let newCount = 0;
let repairCount = 0;
let giveCount = 0;

//To Return
let returnCount = 0;



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
        let allBook = JSON.parse(localStorage.getItem("books")) ?? [];
        allBook.push({id:this.id, book:this.book, author:this.author, genre:this.genre, condition:this.condition, status:this.status})
        localStorage.setItem("books", JSON.stringify(allBook))

    }

    static showAllBooks(){
        if(localStorage.getItem("books")){
            const arr = JSON.parse(localStorage.getItem("books"));
            arr.forEach(function(item) {
                Book.showHtml(item.id, item.book, item.author, item.genre, item.condition, item.status);
                
                //Book Counting Genre
                if (item.genre == "Fiction"){
                    fictionCount++;
                } else if (item.genre == "Arts"){
                    artCount++;
                } else if (item.genre == "Sciences") {
                    scienceCount++;
                } else if (item.genre == "Filipiniana") {
                    filipinianaCount++;
                } else if (item.genre == "Magazine") {
                    magazineCount++;
                }

                //Book Counting Condition
                if (item.condition == "New"){
                    newCount++;
                } else if (item.condition == "Repair"){
                    repairCount++;
                } else if (item.condition == "Giving") {
                    giveCount++;
                }

                //Book Return Counting
                if (item.status == "Borrowed"){
                    returnCount++;
                } 
            });
            
            //Book Count Printing
            document.getElementById("fictionId").innerHTML = fictionCount;
            document.getElementById("artsId").innerHTML = artCount;
            document.getElementById("sciencesId").innerHTML = scienceCount;
            document.getElementById("filipinianaId").innerHTML = filipinianaCount;
            document.getElementById("magazineId").innerHTML = magazineCount;

            document.getElementById("totalId").innerHTML = fictionCount + artCount + scienceCount + filipinianaCount + magazineCount;

            //Book Condition Count Printing
            document.getElementById("newAcquireId").innerHTML = newCount;
            document.getElementById("repairId").innerHTML = repairCount;
            document.getElementById("giveId").innerHTML = giveCount;

            //Book to Return Count Printing
            document.getElementById("returnId").innerHTML = returnCount;
        }
    }

    //Update Book
    updateBook(id) {
        const newBookItem = {id: id, book:this.book, author:this.author, genre:this.genre, condition:this.condition, status:this.status};
        const UpdatedBookData = JSON.parse(localStorage.getItem("books")).map((item) => {
            if(item.id == id) {
                return newBookItem;
            }
            return item;
        })

        localStorage.setItem("books", JSON.stringify(UpdatedBookData));
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
                                <button class="edit" data-id="${id}">Edit</button>
                                <button class="delete" data-id="${id}">Delete</button>
                            </td>
                        </tr>`
        tableBody.appendChild(trEl);
    }
}

Book.showAllBooks();

formBook.addEventListener("submit", (e)=> {
    //e.preventDefault();
    console.log(contIdEdit.value);

    if(!contIdEdit.value) {
        confirm("Record Added!");
        const id = Math.floor(Math.random() * 1000);
        const newBook = new Book(id, inputBook.value, inputAuthor.value, inputGenre.value, inputCondition.value, inputStatus.value);
        newBook.showData().storeBook();

        location.reload();
    
    } else {
        const id = contIdEdit.value;
        const editBook = new Book(id, inputBook.value, inputAuthor.value, inputGenre.value, inputCondition.value, inputStatus.value);
        editBook.updateBook(id);

        submitBtn.value = "Submit";

        tableBody.innerHTML = '';
        Book.showAllBooks();

        location.reload();
    
    } 

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
        location.reload();
    }

    if(e.target.classList.contains("edit")){
            
            let id = +e.target.getAttribute("data-id");
            let itemFind = JSON.parse(localStorage.getItem("books")).find(item => item.id == id);

            inputBook.value = itemFind.book;
            inputAuthor.value = itemFind.author;
            inputGenre.value = itemFind.genre;
            inputCondition.value = itemFind.condition;
            inputStatus.value = itemFind.status;
            contIdEdit.value = id;

            submitBtn.value = "Edit Record";
    }

    

})
