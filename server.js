import express from "express";
import fs from 'fs';
import { parseData, getByAuthor, saveBook, validate, addBook, formatDetails, getByIsbn } from './index.js'


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//post method to save the book details in books.txt file
app.post(
    '/add-book', //route name 
    (req, res) => {
        //will use the addBook function to check if the given fields are valid and saved.
        if(addBook(req.body)){
            res.send( {success: true} ); //the response message
        }else{
            res.send( {success: false} );
        }
    }
);

//get method to to get the book details using isbn and author
app.get(
    '/find-by-isbn-author', //route name
    (req, res) => {
        let author = req.query.author; //store the author parameter from the address bar
        let isbn = req.query.isbn; //store the isbn parameter from the address bar
        let books = parseData("books.txt"); //use helper function to read the books.txt file and store in a list
        let books_details = getByIsbn(author, isbn, books);  //use helper function to search for the book
        //response method to show the book details 
        res.send(`Book name: ${books_details.name}<br>ISBN: ${books_details.isbn}<br>Author: ${books_details.author}<br>Year Published: ${books_details.year}`);
    }
);

//get method to get the book details of all the books given an author from the address bar
app.get(
    '/find-by-author', //route name
    (req, res) => {
        let author = req.query.author; //store author parameter from the address bar
        let books = parseData("books.txt"); //read file and store in a list
        let books_details = getByAuthor(author, books); //store the book details in a list
        res.send(`Books by author: ${author} <br><br> ${formatDetails(books_details)}`); //use helper function to format the string to be displayed
    }
);
    
app.listen(3000, () => {
    console.log('Server started at port 3000');
});
