var newlyAcquired = 0
var needRepairing = 0
var selectedRow = null

function onFormSubmit() {
    var formData = readFormData();
    if (selectedRow == null)
        insertNewRecord(formData);
    else
        updateRecord(formData)
    resetForm();
    newBooks.innerHTML = newlyAcquired
    needRepair.innerHTML = needRepairing
}

function readFormData() {
    var formData = {};
    formData["bookName"] = document.getElementById("bookName").value;
    formData["bookGenre"] = document.getElementById("bookGenre").value;
    formData["bookCondition"] = document.getElementById("bookCondition").value;
    if (formData["bookCondition"] == "New") {
        newlyAcquired++
    } else if (formData["bookCondition"] == "Repair"){
        needRepairing++
    }
    return formData;
}

function insertNewRecord(data) {
    var table = document.getElementById("bookList").getElementsByTagName('tbody')[0];
    var newRow = table.insertRow(table.length);
    cell1 = newRow.insertCell(0);
    cell1.innerHTML = data.bookName;
    cell2 = newRow.insertCell(1);
    cell2.innerHTML = data.bookGenre;
    cell3 = newRow.insertCell(2);
    cell3.innerHTML = data.bookCondition;
    cell4 = newRow.insertCell(3);
    cell4.innerHTML = '<p>On Shelf</p>'
    cell5 = newRow.insertCell(4);
    cell5.innerHTML = `<a onClick="onEdit(this)"> Edit</a>
                       <a onClick="onDelete(this)"> Delete</a>
                       <a onClick="onLend(this)"> Lend</a>`;
    
}

function resetForm() {
    document.getElementById("bookName").value = "";
    document.getElementById("bookGenre").value = "";
    document.getElementById("bookCondition").value = "";
    selectedRow = null;
}

function onEdit(td) {
    selectedRow = td.parentElement.parentElement;
    document.getElementById("bookName").value = selectedRow.cells[0].innerHTML;
    document.getElementById("bookGenre").value = selectedRow.cells[1].innerHTML;
    document.getElementById("bookCondition").value = selectedRow.cells[2].innerHTML;
}

function updateRecord(formData) {
    selectedRow.cells[0].innerHTML = formData.bookName;
    selectedRow.cells[1].innerHTML = formData.bookGenre;
    selectedRow.cells[2].innerHTML = formData.bookCondition;

    if (selectedRow.cells[2].innerHTML != "New") {
        if (newlyAcquired != 0)
            newlyAcquired--
    } else if (selectedRow.cells[2].innerHTML != "Repair"){
        if (needRepairing != 0)
            needRepairing--
    }
}

function onDelete(td) {
    selectedRow = td.parentElement.parentElement;
    if (selectedRow.cells[2].innerHTML == "New") {
        if (newlyAcquired != 0)
            newlyAcquired--
    } else if (selectedRow.cells[2].innerHTML == "Repair"){
        if (needRepairing != 0)
            needRepairing--
    }
    if (confirm("Are you sure to delete this record?")) {
        row = td.parentElement.parentElement;
        document.getElementById("bookList").deleteRow(row.rowIndex);
        resetForm();
    }
    newBooks.innerHTML = newlyAcquired
    needRepair.innerHTML = needRepairing
}

function onLend(td) {
    selectedRow = td.parentElement.parentElement;
    selectedRow.cells[3].innerHTML = '<p>Borrowed</p>'
    cell5.innerHTML = `<a onClick="onEdit(this)"> Edit</a>
                       <a onClick="onDelete(this)"> Delete</a>
                       <a onClick="onReturn(this)"> Return</a>`;
    resetForm();
}

function onReturn(td) {
    selectedRow = td.parentElement.parentElement;
    selectedRow.cells[3].innerHTML = '<p>On Shelf</p>'
    cell5.innerHTML = `<a onClick="onEdit(this)"> Edit</a>
                       <a onClick="onDelete(this)"> Delete</a>
                       <a onClick="onLend(this)"> Lend</a>`;
    resetForm();
}