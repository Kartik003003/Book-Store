import React, { useState, useEffect } from "react";
import axios from "axios";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './BookList.css';
import { Link } from "react-router-dom";

const BookList = () => {
    const [bookData, setBookData] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [showPopup, setShowPopup] = useState(false);

    const fetchDataFromServer = () => {
        axios.get("http://localhost:8080/api/books/all")
        .then(response => {
            setBookData(response.data);
            console.log(response.data);
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
    };

    useEffect(() => {
        fetchDataFromServer();
    }, []);

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:8080/api/books/delete/${id}`);
            fetchDataFromServer();
        } catch (error) {
            console.error("Error deleting data:", error);
        }
    };

    const handleUpdate = (book) => {
        console.log(book);
        setSelectedBook(book);
        setShowPopup(true);
    };

    const handleSave = async (updatedBook) => {
        try {
            await axios.put(`http://localhost:8080/api/books/update/${updatedBook.bookId}`, updatedBook);
            setShowPopup(false);
            fetchDataFromServer();
        } catch (error) {
            console.error("Error updating data:", error);
        }
    };


    return (
        <div className="container">
            <h1 className="text-center mt-4 mb-4">Book List</h1>

            <Link to="/add-book" className="btn btn-primary text-white mb-3">Add Books</Link>

            <table className="table table-striped table-hover fade-in">
                <thead className="thead-dark">
                    <tr>
                        <th>Book ID</th>
                        <th>Book Name</th>
                        <th>Author Name</th>
                        <th>Publisher Name</th>
                        <th>Publishing Date</th>
                        <th>No. of Books Available</th>
                        <th>No. of Books Issued</th>
                        <th>Image</th>
                        <th>Book Price</th>
                        <th>Actions</th>
                    </tr>
                </thead>
                <tbody>
                    {bookData.map((data, index) => (
                        <tr key={index}>
                            <td>{data.bookId}</td>
                            <td>{data.bookName}</td>
                            <td>{data.authorName}</td>
                            <td>{data.publisherName}</td>
                            <td>{data.publishingDate}</td>
                            <td>{data.noOfBooksAvailable}</td>
                            <td>{data.noOfBooksIssued}</td>
                            <td>
                                <img src={data.bookImage} alt={data.bookName} style={{ width: '100px', height: '100px' }} />
                            </td>
                            <td>{data.bookPrice}</td>
                            <td>
                                <button className="btn btn-secondary" onClick={() => handleUpdate(data)}>Update</button>
                                <button className="btn btn-danger" onClick={() => handleDelete(data.bookId)}>Delete</button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
           <div className="container" id="update">
           {showPopup && selectedBook && (
                <div className="popup">
                    <div className="popup-content">
                        <button onClick={() => setShowPopup(false)}>Close</button><br />
                        <input type="text" value={selectedBook.bookName} placeholder="Book Name" onChange={(e) => setSelectedBook({ ...selectedBook, bookName: e.target.value })} /><br/>
                        <input type="text" value={selectedBook.authorName} placeholder="Author Name" onChange={(e) => setSelectedBook({ ...selectedBook, authorName: e.target.value })} /><br/>
                        <input type="text" value={selectedBook.publisherName} placeholder="publisher Name" onChange={(e) => setSelectedBook({ ...selectedBook, publisherName: e.target.value })} /><br/>
                        <input type="date" value={selectedBook.publishingDate} placeholder="Publishing Date" onChange={(e) => setSelectedBook({ ...selectedBook, publishingDate: e.target.value })} /><br/>
                        <input type="number" value={selectedBook.noOfBooksAvailable} placeholder="no of books available" onChange={(e) => setSelectedBook({ ...selectedBook, noOfBooksAvailable: e.target.value })} /><br/>
                        <input type="number" value={selectedBook.noOfBooksIssued} placeholder="no of books Issued" onChange={(e) => setSelectedBook({ ...selectedBook, noOfBooksIssued: e.target.value })} /><br/>
                        <input type="text" value={selectedBook.bookImage} placeholder="books Image Url" onChange={(e) => setSelectedBook({ ...selectedBook, bookImage: e.target.value })} /><br/>
                        <input type="number" value={selectedBook.bookPrice} placeholder="books Price" onChange={(e) => setSelectedBook({ ...selectedBook, bookPrice: e.target.value })} /><br/>
                        <button onClick={() => handleSave(selectedBook)}>Save</button>
                    </div>
                </div>
            )}
           </div>

        </div>
    );
};

export default BookList;
