import express from "express";
import fs from 'fs';
import { parseData, getByAuthor, saveBook, validate, addBook, formatDetails, getByIsbn } from './index.js'


const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));


app.post(
    '/add-book',
    (req, res) => {
            
        if(addBook(req.body)){
            res.send( {success: true} );
        }else{
            res.send( {success: false} );
        }
            
        console.log();
    }
);

app.get(
    '/find-by-isbn-author',
    (req, res) => {
        let author = req.query.author;
        let isbn = req.query.isbn;
        let books = parseData("books.txt");
        let books_details = getByIsbn(author, isbn, books); 
        res.send(`Book name: ${books_details.name}<br>ISBN: ${books_details.isbn}<br>Author: ${books_details.author}<br>Year Published: ${books_details.year}`);
    }
);

app.get(
    '/find-by-author',
    (req, res) => {
        let author = req.query.author;
        let books = parseData("books.txt");
        let books_details = getByAuthor(author, books); 
        res.send(`Books by author: ${author} <br><br> ${formatDetails(books_details)}`);
    }
);
    
app.listen(3000, () => {
    console.log('Server started at port 3000');
});
