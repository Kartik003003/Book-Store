import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

const AddBookForm = () => {
    const navigate = useNavigate();

    const [bookId, setBookId] = useState("");
    const [bookName, setBookName] = useState("");
    const [authorName, setAuthorName] = useState("");
    const [publisherName, setPublisherName] = useState("");
    const [publishingDate, setPublishingDate] = useState("");
    const [noOfBooksAvailable, setNoOfBooksAvailable] = useState("");
    const [noOfBooksIssued, setNoOfBooksIssued] = useState("");
    const [bookImage, setBookImage] = useState("");
    const [bookPrice, setBookPrice] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            await axios.post("http://localhost:8080/api/books/addbooks", {
                bookId,
                bookName,
                authorName,
                publisherName,
                publishingDate,
                noOfBooksAvailable,
                noOfBooksIssued,
                bookImage,
                bookPrice,
            });
            navigate("/dashboard-admin");
        } catch (error) {
            console.error("Error adding book:", error);
        }
    };
// console.log(bookId, bookName, authorName, publisherName, publishingDate, noOfBooksAvailable, noOfBooksIssued, bookImage, bookPrice);


    return (
        <div className="container">
            <h1 className="text-center mt-4 mb-4">Add Book</h1>
            <form onSubmit={handleSubmit} className=" form-control d-grid g-1">
                <div className="form-group">
                    <label htmlFor="bookId">Book ID</label>
                    <input
                        type="text"
                        className="form-control"
                        id="bookId"
                        value={bookId}
                        onChange={(e) => setBookId(e.target.value)}
                        required
                        autoComplete="off"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="bookName">Book Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="bookName"
                        value={bookName}
                        onChange={(e) => setBookName(e.target.value)}
                        required
                        autoComplete="off"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="authorName">Author Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="authorName"
                        value={authorName}
                        onChange={(e) => setAuthorName(e.target.value)}
                        required
                        autoComplete="off"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="publisherName">Publisher Name</label>
                    <input
                        type="text"
                        className="form-control"
                        id="publisherName"
                        value={publisherName}
                        onChange={(e) => setPublisherName(e.target.value)}
                        required
                        autoComplete="off"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="publishingDate">Publishing Date</label>
                    <input
                        type="date"
                        className="form-control"
                        id="publishingDate"
                        value={publishingDate}
                        onChange={(e) => setPublishingDate(e.target.value)}
                        required
                        autoComplete="off"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="noOfBooksAvailable">No. of Books Available</label>
                    <input
                        type="number"
                        className="form-control"
                        id="noOfBooksAvailable"
                        value={noOfBooksAvailable}
                        onChange={(e) => setNoOfBooksAvailable(e.target.value)}
                        required
                        autoComplete="off"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="noOfBooksIssued">No. of Books Issued</label>
                    <input
                        type="number"
                        className="form-control"
                        id="noOfBooksIssued"
                        value={noOfBooksIssued}
                        onChange={(e) => setNoOfBooksIssued(e.target.value)}
                        required
                        autoComplete="off"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="bookImage">Book Image Link</label>
                    <input
                        type="text"
                        className="form-control"
                        id="bookImage"
                        value={bookImage}
                        onChange={(e) => setBookImage(e.target.value)}
                        required
                        autoComplete="off"
                    />
                </div>

                <div className="form-group">
                    <label htmlFor="bookPrice">bookPrice</label>
                    <input
                        type="number"
                        className="form-control"
                        id="bookPrice"
                        value={bookPrice}
                        onChange={(e) => setBookPrice(e.target.value)}
                        required
                        autoComplete="off"
                    />
                </div>

                <div className="form">
                    <button type="submit" className="btn btn-primary">
                        Add Book
                    </button>
                    <Link to="/admin-dashboard" className="btn btn-secondary ml-2">
                        Cancel
                    </Link>
                </div>
            </form>
        </div>
    );
};

export default AddBookForm;
