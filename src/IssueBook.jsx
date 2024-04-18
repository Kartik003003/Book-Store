import React, { useState, useEffect } from "react";
import axios from "axios";

const IssueBook = () => {
    const [bookData, setBookData] = useState([]);

    const fetchBookDataFromServer = () => {
        axios.get("http://localhost:8080/api/books/all")
            .then(response => {
                setBookData(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error("Error fetching book data:", error);
            });
    };

    useEffect(() => {
        fetchBookDataFromServer();
    }, []);

    return (
        <div className="container">
            <h1 className="text-center mt-4 mb-4">Issue Book</h1>

            <table className="table table-striped table-hover fade-in">
                <thead className="thead-dark">
                    <tr>
                        <th>Book ID</th>
                        <th>Book Name</th>
                        <th>Author Name</th>
                        <th>Publisher Name</th>
                        <th>Book Price</th>
                        <th>Name of User</th>
                    </tr>
                </thead>
                <tbody>
                    {bookData.map((book, index) => (
                        <tr key={index}>
                            <td>{book.bookId}</td>
                            <td>{book.bookName}</td>
                            <td>{book.authorName}</td>
                            <td>{book.publisherName}</td>
                            <td>{book.bookPrice}</td>
                            <td>{book.Name}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default IssueBook;