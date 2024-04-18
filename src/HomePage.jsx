import React from 'react';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';


const HomePage = () => {
    return (
        <div className="container">
            <nav className="navbar navbar-expand-lg navbar-light bg-light">
                <div className="container-fluid">
                    <Link to="/" className="navbar-brand">
                        <img src="https://i.pinimg.com/originals/dd/64/da/dd64da585bc57cb05e5fd4d8ce873f57.png" alt="" className="animate__animated animate__fadeIn" />
                    </Link>
                    <div className=" navbar m-3 justify-content-end display-6.3" id="navbarNav">
                        <ul className="navbar-nav list-group ">
                            <li className="list-group-item list-group-item-primary list-group-item-action m-2">
                                <Link to="/register" className="nav-link">Register</Link>
                            </li>
                            <li className="list-group-item list-group-item-success list-group-item-action m-2">
                                <Link to="/login" className="nav-link">Login</Link>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>

            <div className="text-center mt-5">
                <h1>Welcome to the Library</h1>
                <p className="lead">
                    Discover a vast collection of books, ranging from fiction to non-fiction, and everything in between.
                </p>
                <div className="row mt-5">
                    <div className="col-md-4">
                        <div className="card h-100 text-center p-4" style={{ width: "18rem" }}>
                            <div className="card-body">
                                <h5 className="card-title">New Releases</h5>
                                <p className="card-text">
                                    Stay up-to-date with the latest releases in literature and academia.
                                </p>
                                <Link to="/login" className="btn btn-primary">Explore</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card h-100 text-center p-4" style={{ width: "18rem" }}>
                            <div className="card-body">
                                <h5 className="card-title">Best Sellers</h5>
                                <p className="card-text">
                                    Check out the top-selling books across all categories.
                                </p>
                                <Link to="/login" className="btn btn-primary">Explore</Link>
                            </div>
                        </div>
                    </div>
                    <div className="col-md-4">
                        <div className="card h-100 text-center p-4" style={{ width: "18rem" }}>
                            <div className="card-body">
                                <h5 className="card-title">Classics</h5>
                                <p className="card-text">
                                    Immerse yourself in the timeless stories that have shaped literature.
                                </p>
                                <Link to="/login" className="btn btn-primary">Explore</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default HomePage;
