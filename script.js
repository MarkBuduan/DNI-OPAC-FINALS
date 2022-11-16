/*Declaration of identifiers which are going to be used later in the program.

We've assigned id values to certain html tags which are important in referencing them in scenarios such as this one.

Document method getElementById will return an element with the specified argument. */
const formBook = document.getElementById("formBook"); 
const inputBook = document.getElementById("bookName");
const inputAuthor = document.getElementById("authorName");
const inputGenre = document.getElementById("bookGenre");
const inputCondition = document.getElementById("bookCondition");
const inputStatus = document.getElementById("bookStatus");
const tableBody = document.querySelector("#bookList tbody");

const submitBtn = document.getElementById("submitButton");
const contIdEdit = document.getElementById("contIdEdit");

//Genre||Area Counts
let fictionCount = 0;
let artCount = 0;
let scienceCount = 0;
let filipinianaCount = 0;
let magazineCount = 0;

//Condition Counts
let newCount = 0;
let repairCount = 0;
let giveCount = 0;

//To Return Counts
let returnCount = 0;


/* This class will serve as the blueprint for future objects that will be instantiated in the later
parts of the program. It houses attributes and methods that will be used all throughout the application.*/

class Book {
    //Constructor
    constructor(id, book, author, genre, condition, status) {
        //Attributes
        this.id = id;
        this.book = book;
        this.author = author;
        this.genre = genre;
        this.condition = condition;
        this.status = status;

    }

    //Methods

    //This method will show the data and will execute the showHtml() method that we created which will return the object.
    showData() {
        Book.showHtml(this.id, this.book, this.author, this.genre, this.condition, this.status);
        return this;
    }

    // This method stores the data in the localStorage. (Memory Management)
    storeBook() {
        /*allBook is a javascript object that houses all the data that was passed into it.
        The "??"(double question mark) is called the nullish coalescing operator where it returns its right-side operand
        when left side is null or undefined.*/
        let allBook = JSON.parse(localStorage.getItem("books")) ?? []; 

        //.push method appends the set(s) that were passed inside it. In this case it is a set of key:value pairs
        allBook.push({id:this.id, book:this.book, author:this.author, genre:this.genre, condition:this.condition, status:this.status}) 
        
        //setItem method of localStorage creates a key:value pair where it makes the first argument as the key and the second as value.
        localStorage.setItem("books", JSON.stringify(allBook)) 
        

    }

    /*This method is the one which is responsible for displaying all the recorded books by looping through the localStorage.*/
    static showAllBooks(){
        if(localStorage.getItem("books")){
            const arr = JSON.parse(localStorage.getItem("books")); //array
            arr.forEach(function(item) { //forEach iterates over the elements the previously defined array.
                Book.showHtml(item.id, item.book, item.author, item.genre, item.condition, item.status); //Pass each item as an argument in the showHtml method.
                
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
            document.getElementById("fictionId").innerHTML = fictionCount; // change the display value inside the html into the assigned value 
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
    //This methods updates the values of the edited record and saves it in the localStorage.
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

    /*"static" methods are called directly on the class without the need to instatiate an object of the class.
     This method adds a table row with the corresponding data per column.*/
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

//Event listener on the form when submitting.

formBook.addEventListener("submit", (e)=> {

    // ADD RECORD 
    if(!contIdEdit.value) {
        confirm("Record Added!");
        const id = Math.floor(Math.random() * 1000); //generate random id

        //Instatiate an object
        const newBook = new Book(id, inputBook.value, inputAuthor.value, inputGenre.value, inputCondition.value, inputStatus.value);

        //display the data and store it in the localStorage
        newBook.showData().storeBook();

        location.reload(); //reload webpage
    
    // UPDATE THE EDITED RECORD
    } else {
        const id = contIdEdit.value;
        const editBook = new Book(id, inputBook.value, inputAuthor.value, inputGenre.value, inputCondition.value, inputStatus.value);
        editBook.updateBook(id);

        submitBtn.value = "Submit"; //change the text inside the button from "Edit Record" to "Submit"

        tableBody.innerHTML = '';
        Book.showAllBooks();

        location.reload(); //reload webpage
    
    } 

    //Clear all fields after all procedures.
    inputBook.value = "";
    inputAuthor.value = "";
    inputGenre.value = "";
    inputCondition.value = "";
    inputStatus.value = "";


});

//Event listener on the table body whenever there is a click happening on a certain target.

tableBody.addEventListener("click", (e)=>{

    //DELETE RECORD
    if(e.target.classList.contains("delete")){ //target is the element that contains a class "delete" -see line 153
        if(confirm("Are you sure you want to delete this record?")){ //confirmation alert
            
            //remove from localstorage (Memory Management)
            let id = +e.target.getAttribute("data-id"); //target is the element with a certain id
            let bookItems = JSON.parse(localStorage.getItem("books")) 
            let newData = bookItems.filter(item=>item.id != id); //filter any element that is not equal to id
            localStorage.setItem("books", JSON.stringify(newData))

            //remove from html
            e.target.parentElement.parentElement.remove();

        }
        location.reload(); //reload webpage
    }

    //EDIT RECORD 
    
    //This code block is with correspondence code blocks from line 129 and 182
    if(e.target.classList.contains("edit")){ //target is the element that contains a class "delete" -see line 152
            
            let id = +e.target.getAttribute("data-id");
            let itemFind = JSON.parse(localStorage.getItem("books")).find(item => item.id == id);

            inputBook.value = itemFind.book;
            inputAuthor.value = itemFind.author;
            inputGenre.value = itemFind.genre;
            inputCondition.value = itemFind.condition;
            inputStatus.value = itemFind.status;
            contIdEdit.value = id;

            submitBtn.value = "Edit Record"; //change the text inside the button from "Submit" to "Edit Record"
    }

    

})
