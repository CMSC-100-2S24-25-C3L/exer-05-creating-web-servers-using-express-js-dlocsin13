import fs from 'fs';


function parseData(filename){
    let data = fs.readFileSync(filename, "utf8");
    let books = [];
    let book_info = {};
    let line = data.split('\n');
    
    for(let i = 0; i < line.length; i++){
        if(line[i].length === 0){
            break;
        }

        let info = line[i].split(',');

        book_info = {
            name: info[0],
            isbn: info[1],
            author: info[2],
            year: info[3]
        }

        books.push(book_info);
    }

    return books;
}


function getByAuthor(author, books){
    let books_details = [];

    for(let i = 0; i < books.length; i++){
        if(books[i].author === author){
            books_details.push(books[i]);
        }
    }

    return books_details;
}

function getByIsbn(author, isbn, books){
    for(let i = 0; i < books.length; i++){
        if(books[i].author === author && books[i].isbn === isbn){
            return books[i];
        }
    }

    return null;
}

function saveBook(book_info){
    let name = book_info.name;
    let isbn = book_info.isbn;
    let author = book_info.author;
    let year = book_info.year;

    let format = `${name},${isbn},${author},${year}\n`;

    if(fs.existsSync('./books.txt')){
        fs.appendFile('./books.txt', format, function (err) {
            if (err) throw err;
            console.log('Book added!');
        });
    }else{
        fs.writeFile('./books.txt', format, function (err) {
            if (err) throw err;
            console.log('Book added and books.txt file is created!');
        }); 
    }
}

function validate(book_info){
    if(Object.keys(book_info).length < 4){
        return false;
    } 

    for(const key in book_info){
        if(book_info[key].length === 0){
            return false;
        }
    }

    return true;
}


function addBook(book_info){
    if(!validate(book_info)){
        return false;
    }

    saveBook(book_info);
    return true;
}

function formatDetails(books_details){
    let str = ''
    for(let i = 0; i < books_details.length; i++){
        str += (`${i+1}. Book name: ${books_details[i].name}<br>ISBN: ${books_details[i].isbn}<br>Author: ${books_details[i].author}<br>Year published: ${books_details[i].year}<br><br>`);
    }

    return str;
}

export { parseData, getByAuthor, saveBook, validate, addBook, formatDetails, getByIsbn }