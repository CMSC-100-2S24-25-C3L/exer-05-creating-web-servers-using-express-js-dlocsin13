import fs from 'fs';

//helper function to read the books.txt file
//takes in the filename as paramter
function parseData(filename){
    let data = fs.readFileSync(filename, "utf8"); //store the whole data in variable
    let books = []; //to store the book details in json format in a list
    let book_info = {}; //to hold the object before storing 
    let line = data.split('\n'); //separate the data per line
    
    //for each line check first if line is not empty
    for(let i = 0; i < line.length; i++){
        if(line[i].length === 0){
            break;
        }

        //split the line into values separated by commas
        let info = line[i].split(',');

        //store the book details in an object
        book_info = {
            name: info[0],
            isbn: info[1],
            author: info[2],
            year: info[3]
        }

        //add it to the list
        books.push(book_info);
    }

    return books;
}

//helper function to search for the book given author name
function getByAuthor(author, books){
    let books_details = []; //to store all the books of the author

    //check all the objects in books list and look for those with the same author
    for(let i = 0; i < books.length; i++){
        if(books[i].author === author){
            books_details.push(books[i]); //add it to the book details list
        }
    }

    return books_details;
}

//helper function to search for the book given isbn and author
function getByIsbn(author, isbn, books){
    for(let i = 0; i < books.length; i++){
        if(books[i].author === author && books[i].isbn === isbn){
            return books[i];
        }
    }

    return null;
}

//helper function to save the book details in a file
function saveBook(book_info){
    //store info in separate variables
    let name = book_info.name;
    let isbn = book_info.isbn;
    let author = book_info.author;
    let year = book_info.year;

    //format string
    let format = `${name},${isbn},${author},${year}\n`;

    //check if the file exists, if not, create a new one, if yes, just append
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

//helper function to check if all fields are present and there are no empty strings
function validate(book_info){
    //check if length of object is 4
    if(Object.keys(book_info).length != 4){
        return false;
    } 

    //check if all fields are not empty strings
    for(const key in book_info){
        if(book_info[key].length === 0){
            return false;
        }
    }

    return true;
}



function addBook(book_info){
    //check first if bookdetails are valid
    if(!validate(book_info)){
        return false;
    }

    //save if yes
    saveBook(book_info);
    return true;
}

//format the book details 
function formatDetails(books_details){
    let str = ''
    for(let i = 0; i < books_details.length; i++){
        str += (`${i+1}. Book name: ${books_details[i].name}<br>ISBN: ${books_details[i].isbn}<br>Author: ${books_details[i].author}<br>Year published: ${books_details[i].year}<br><br>`);
    }

    return str;
}

export { parseData, getByAuthor, saveBook, validate, addBook, formatDetails, getByIsbn }