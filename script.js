document.addEventListener('DOMContentLoaded', () => {
    let title = document.querySelector('#title');
    let author = document.querySelector('#author');
    let pages = document.querySelector('#pages');
    let search = document.querySelector('#search');
    let library = document.querySelector('#library');
    let saver = document.querySelector('#saver');
 
    function Book( title_value, author_value, pages_value, read_value) {
        this.title = title_value;
        this.author = author_value;
        this.pages = pages_value;
        this.read = read_value
    }

    let books_array = []

    function renderBooks() {
        library.innerHTML = '';

        for (let book of books_array){

            let book_id = book.title.replaceAll(' ', '-');
            library.innerHTML +=  `
            <div class="book" id='${book_id}'>
                <div class="title-area">
                    <h2>${book.title}</h2>
                </div>
                <div class="author-area">
                    <p>${book.author}</p>
                </div>
                <div class="pages-area">
                    <p>${book.pages}</p>
                </div>
                <div class="icons">
                    <img src="bookmark_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png" class="icon">
                    <img src="delete_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png" class="icon delete-icon">
            </div>
             `;
        }
        let deleteIcons = Array.from(document.querySelectorAll('.delete-icon'));

        for(let delete_icon of deleteIcons) {
            delete_icon.addEventListener('click', () => {
                books_array = books_array.filter((b) => {
                    b.title.replaceAll(' ', '-') != delete_icon.parentElement.id;
                })
                renderBooks();
            })
        }
    }
        

    saver.addEventListener('click', (e) => {
        e.preventDefault();

        let new_book = new Book(title.value, author.value, pages.value);
        books_array.push(new_book);

        renderBooks();
    })

})