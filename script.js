/*

document.addEventListener('DOMContentLoaded', () => {
    let title = document.querySelector('#title');
    let author = document.querySelector('#author');
    let pages = document.querySelector('#pages');
    let read = document.querySelector('#read');
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

            let book_id = book.title.replaceAll(' ', '') + book.author.replaceAll(' ', '');
            let bookHTML = `
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
                    <img src="delete_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png" class="icon delete-icon"> `;
                
                if(book.read){
                    bookHTML += ` <img src="./read.png" class="icon read-icon"> `;
                }else if(!book.read){
                    bookHTML += ` <img src="./not-read.png" class="icon read-icon"> `;
                }
                bookHTML += '</div> </div>'

            library.innerHTML += bookHTML;
                    
        }
        let deleteIcons = Array.from(document.querySelectorAll('.delete-icon'));
        let readIcons = Array.from(document.querySelectorAll('.read-icon'));

        for(let delete_icon of deleteIcons) {
            delete_icon.addEventListener('click', () => {
                books_array = books_array.filter((b) => {
                    let searched = b.title.replaceAll(' ', '') + b.author.replaceAll(' ', '');
                    return searched != delete_icon.parentElement.parentElement.id;
                })
                renderBooks();
            })
        }

        for(let read_icon of readIcons) {
            read_icon.addEventListener('click', () => {
                let book_id = read_icon.parentElement.parentElement.id;
                for(let book of books_array){
                    if(book.title.replaceAll(' ', '') + book.author.replaceAll(' ', '') === book_id){
                        book.read = !book.read;
                    }
                }
                renderBooks();
            })
        }
    } 

    saver.addEventListener('click', (e) => {
        e.preventDefault();
        let read_value = read.checked;
        let new_book = new Book(title.value, author.value, pages.value, read_value);
        books_array.push(new_book);

        renderBooks();
    })

})

*/

document.addEventListener('DOMContentLoaded', () => {
    const titleInput = document.querySelector('#title');
    const authorInput = document.querySelector('#author');
    const pagesInput = document.querySelector('#pages');
    const readCheckbox = document.querySelector('#read');
    const libraryContainer = document.querySelector('#library');
    const saverBtn = document.querySelector('#saver');

    // Utilizzo della sintassi delle classi ES6 per definire un libro
    class Book {
        constructor(title, author, pages, read) {
            // Utilizziamo Date.now() per creare un ID univoco
            this.id = Date.now().toString();
            this.title = title;
            this.author = author;
            this.pages = pages;
            this.read = read;
        }
    }

    let booksArray = [];

    // Funzione per creare e aggiungere un nuovo elemento libro nella libreria
    function renderBooks() {
        // Svuotiamo il contenitore prima di renderizzare i libri
        libraryContainer.innerHTML = '';

        booksArray.forEach(book => {
            // Creazione dell'elemento principale per il libro
            const bookDiv = document.createElement('div');
            bookDiv.classList.add('book');
            // Usiamo un data attribute per conservare l'ID del libro
            bookDiv.dataset.id = book.id;

            // Creazione dell'area del titolo
            const titleArea = document.createElement('div');
            titleArea.classList.add('title-area');
            const titleEl = document.createElement('h2');
            titleEl.textContent = book.title;
            titleArea.appendChild(titleEl);

            // Creazione dell'area dell'autore
            const authorArea = document.createElement('div');
            authorArea.classList.add('author-area');
            const authorEl = document.createElement('p');
            authorEl.textContent = book.author;
            authorArea.appendChild(authorEl);

            // Creazione dell'area delle pagine
            const pagesArea = document.createElement('div');
            pagesArea.classList.add('pages-area');
            const pagesEl = document.createElement('p');
            pagesEl.textContent = book.pages;
            pagesArea.appendChild(pagesEl);

            // Creazione dell'area delle icone (elimina e stato lettura)
            const iconsDiv = document.createElement('div');
            iconsDiv.classList.add('icons');

            // Icona per la rimozione del libro
            const deleteIcon = document.createElement('img');
            deleteIcon.src = 'delete_24dp_FFFFFF_FILL0_wght400_GRAD0_opsz24.png';
            deleteIcon.classList.add('icon', 'delete-icon');
            iconsDiv.appendChild(deleteIcon);

            // Icona per il toggle dello stato "letto"
            const readIcon = document.createElement('img');
            readIcon.src = book.read ? './read.png' : './not-read.png';
            readIcon.classList.add('icon', 'read-icon');
            iconsDiv.appendChild(readIcon);

            // Componiamo il libro e lo aggiungiamo al contenitore
            bookDiv.append(titleArea, authorArea, pagesArea, iconsDiv);
            libraryContainer.appendChild(bookDiv);
        });
    }

    // Event delegation: gestiamo clic su delete e read in un unico listener applicato al contenitore
    libraryContainer.addEventListener('click', (event) => {
        const bookDiv = event.target.closest('.book');
        if (!bookDiv) return; // Se il clic non è all'interno di un elemento libro, usciamo
        const bookId = bookDiv.dataset.id;

        // Se si clicca sull'icona delete, rimuoviamo il libro
        if (event.target.classList.contains('delete-icon')) {
            booksArray = booksArray.filter(book => book.id !== bookId);
            renderBooks();
        }

        // Se si clicca sull'icona read, alterniamo lo stato "letto"
        if (event.target.classList.contains('read-icon')) {
            const book = booksArray.find(book => book.id === bookId);
            if (book) {
                book.read = !book.read;
                renderBooks();
            }
        }
    });

    // Gestione del salvataggio di un nuovo libro
    saverBtn.addEventListener('click', (e) => {
        e.preventDefault();

        const title = titleInput.value.trim();
        const author = authorInput.value.trim();
        const pages = pagesInput.value.trim();
        const read = readCheckbox.checked;

        // Verifica che i campi siano stati compilati
        if (!title || !author || !pages) {
            alert("Compila tutti i campi!");
            return;
        }

        // Controllo per evitare duplicati (basato su titolo e autore, ignorando maiuscole/minuscole)
        if (booksArray.some(book => book.title.toLowerCase() === title.toLowerCase() && book.author.toLowerCase() === author.toLowerCase())) {
            alert("Il libro esiste già!");
            return;
        }

        // Creiamo il nuovo libro e lo aggiungiamo all'array
        const newBook = new Book(title, author, pages, read);
        booksArray.push(newBook);
        renderBooks();

        // Puliamo i campi del form
        titleInput.value = '';
        authorInput.value = '';
        pagesInput.value = '';
        readCheckbox.checked = false;
    });
});
