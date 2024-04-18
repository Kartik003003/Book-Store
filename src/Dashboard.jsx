import React, { useState, useEffect } from "react";
import axios from "axios";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import "./Dashboard.css";
import { Link } from 'react-router-dom';


const Dashboard = ({ userEmail1 }) => {
    const [totalAmount, setTotalAmount] = useState(0);
    const [books, setBooks] = useState([]);
    const [cart, setCart] = useState([]);
    const [cartCount, setCartCount] = useState(0);
    const [showCart, setShowCart] = useState(false);


    const fetchDataFromServer = async () => {
        try {
            const response = await axios.get("http://localhost:8080/api/books/all");
            setBooks(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    useEffect(() => {
        fetchDataFromServer();
    }, []);

    // const handleIssueBook = async (bookId, userEmail) => {
    //     try {
    //         const response = await axios.post(`http://localhost:8080/api/issue-books/issue/${bookId}/${userEmail}`);
    //         const book = response.data;
    //         setCart([...cart, book]);
    //         setCartCount(cartCount + 1);
    //     } catch (error) {
    //         console.error("Error issuing book:", error.message);
    //         alert("An error occurred while issuing the book. Please try again later.");
    //     }
    // };
    useEffect(() => {
        const newTotalAmount = cart.reduce((total, book) => total + book.bookPrice * book.quantity, 0);
        setTotalAmount(newTotalAmount);
    }, [cart]);

    const handleIssueBook = (book) => {
        const existingBook = cart.find((item) => item.bookId === book.bookId);

        if (existingBook) {
            setCart(
                cart.map((item) =>
                    item.bookId === book.bookId
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                )
            );
        } else {
            setCart([...cart, { ...book, quantity: 1 }]);
        }

        setCartCount(cartCount + 1);
    };

    const handleRemoveFromCart = (bookId) => {
        const updatedCart = cart.filter((book) => book.bookId !== bookId);
        setCart(updatedCart);
        setCartCount(updatedCart.length);
        setTotalAmount(
            updatedCart.reduce((total, book) => total + parseFloat(book.bookPrice), 0)
        );
    };


    return (
        <div className="container-fluid">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid  " id="nav-c">
                    <Link to="/" className="navbar-brand">
                        <img src="https://i.pinimg.com/originals/dd/64/da/dd64da585bc57cb05e5fd4d8ce873f57.png" alt="" className="animate__animated animate__fadeIn" />
                    </Link>
                    <span className="navbar-text">{userEmail1}</span>
                    <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                        <form className="d-flex">
                            <input
                                className="form-control me-2"
                                type="search"
                                placeholder="Search"
                                aria-label="Search" />
                        </form>
                        <ul className="navbar-nav">
                            <li className="nav-item">
                                <button
                                    className="btn btn-outline-success"
                                    onClick={() => setShowCart(!showCart)}
                                >
                                    Cart ({cartCount})
                                </button>
                            </li>
                            <Link to="/" >
                                <button className="btn btn-outline-danger">Logout</button>
                            </Link>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="row g-2">
                {books.map((book) => (
                    <div className="col-3" key={book.bookId}>
                    <div className="card h-100" style={{ transition: 'background-image 0.3s', backgroundImage: 'url(path/to/your/image.jpg)', backgroundSize: 'cover', backgroundPosition: 'center' }} onMouseEnter={(e) => e.currentTarget.style.backgroundImage = 'url(path/to/your/image.jpg)'} onMouseLeave={(e) => e.currentTarget.style.backgroundImage = 'none'}>
                        <img
                            src={book.bookImage}
                            className="card-img-top"
                            alt={book.bookName}
                        />
                        <div className="card-body">
                            <h5 className="card-title">{book.bookName}</h5>
                            <p className="card-text">
                                {book.authorName} | {book.publisherName}
                            </p>
                            <p className="card-text">
                                <span>Available : </span>{book.noOfBooksAvailable}
                            </p>
                            <p className="card-text">
                                <span>Cost : </span>{book.bookPrice}
                            </p>
                        </div>
                        <div className="card-footer text-center">
                            <button
                                className="btn btn-primary"
                                onClick={() => handleIssueBook(book)}
                            >
                                Add Book
                            </button>
                        </div>
                    </div>
                </div>
                
                ))}
            </div>
            {showCart && (
                <div className="position-fixed bottom-0 start-0 w-100 bg-light">
                    <div className="container-fluid">
                        <table className="table table-striped">
                            <thead>
                                <tr>
                                    <th>Book Name</th>
                                    <th>Author</th>
                                    <th>Publisher</th>
                                    <th>Issue Date</th>
                                    <th>Price</th>
                                </tr>
                            </thead>
                            <tbody>
                                {cart.map((book) => (
                                    <tr key={book.bookId}>
                                        <td>{book.bookName}</td>
                                        <td>{book.authorName}</td>
                                        <td>{book.publisherName}</td>
                                        <td>{new Date().toLocaleDateString()}</td>
                                        <td>{book.bookPrice}</td>
                                        <td>
                                            <button onClick={() => handleRemoveFromCart(book.bookId)}>Remove</button>
                                        </td>
                                    </tr>
                                ))}
                                <tr>
                                    <td colSpan="4" className="text-end">Total Amount:</td>
                                    <td>{totalAmount}</td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            )}

        </div>
    );
};


export default Dashboard;
