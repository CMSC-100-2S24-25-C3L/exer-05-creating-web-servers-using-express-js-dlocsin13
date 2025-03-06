import needle from "needle";


let book_info1 = { 
    name: "Harry Potter and the Philosopher’s Stone",
    isbn: "978-0-7475-3269-9",
    author: "J.K Rowling",
    year: "1997"
}

let book_info2 = { 
    name: "The Little Prince",
    isbn: "978-0156012195",
    author: "Antoine Saint-Exupery",
    year: "1943"
}

let book_info3 = { 
    name: "Harry Potter and the Chamber of Secrets",
    isbn: "0-7475-3849-2",
    author: "J.K Rowling",
    year: "1998"
}

needle.post(
        'http://localhost:3000/add-book',
        book_info1,
        (err, res) => {
            console.log(res.body);
        }
);

