import needle from "needle";


let book_info = { 
    name: "Harry POtter",
    isbn: "0-7475-3849-2",
    author: "JK Rowling",
    year: "2004"
}

needle.post(
        'http://localhost:3000/add-book',
        book_info,
        (err, res) => {
            console.log(res.body);
        }
);
