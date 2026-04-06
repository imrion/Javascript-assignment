// select elements
const bookName = document.getElementById("bookName");
const authorName = document.getElementById("authorName");
const saveBtn = document.getElementById("saveBtn");
const bookList = document.getElementById("bookList");

// array to store books
let books = [];

// load books from localStorage
if(localStorage.getItem("books")) {
    books = JSON.parse(localStorage.getItem("books"));
    books.forEach(book => addBookToTable(book));
}

// function to add book row
function addBookToTable(book) {
    const tr = document.createElement("tr");

    tr.innerHTML = `
        <td>${book.name}</td>
        <td>${book.author}</td>
        <td><button class="deleteBtn">Delete</button></td>
    `;

    bookList.appendChild(tr);
}

// save button click
saveBtn.addEventListener("click", function() {
    const name = bookName.value.trim();
    const author = authorName.value.trim();

    if(name === "" || author === "") {
        alert("Please fill both fields!");
        return;
    }

    const book = {name, author};
    books.push(book);

    // save to localStorage
    localStorage.setItem("books", JSON.stringify(books));

    addBookToTable(book);

    bookName.value = "";
    authorName.value = "";
});

// delete row (Event Delegation)
bookList.addEventListener("click", function(e){
    if(e.target.classList.contains("deleteBtn")) {
        const row = e.target.parentElement.parentElement;
        const bookNameText = row.children[0].innerText;

        // remove from array
        books = books.filter(b => b.name !== bookNameText);

        // update localStorage
        localStorage.setItem("books", JSON.stringify(books));

        // remove from table
        row.remove();
    }
});