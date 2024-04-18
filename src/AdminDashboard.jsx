import React, { useState, useEffect } from "react";
import axios from "axios";
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import './AdminDashboard.css';
import { Link } from "react-router-dom";

const AdminDashboard = () => {
    const [userData, setUserData] = useState([]);

    const fetchDataFromServer = () => {
        axios.get("http://localhost:8080/api/users/all")
            .then(response => {
                setUserData(response.data);
                console.log(response.data);
            })
            .catch(error => {
                console.error("Error fetching data:", error);
            });
    };

    useEffect(() => {
        fetchDataFromServer();
    }, []);

    const handleLogout = () => {
        axios.post("http://localhost:8080/api/users/logout")
            .then(response => {
                console.log("Logout successful");
            })
            .catch(error => {
                console.error("Error logging out:", error);
            });
    };


    return (
        <div className="container">
            <h1 className="text-center mt-4 mb-4">Admin Dashboard</h1>

            <div className="d-flex justify-content-between align-center">
                <button className="btn btn-danger mb-3 " onClick={handleLogout}><Link to="/" className="logout">Logout</Link></button>
                <Link to="/add-book" className="btn btn-primary text-white mb-3">Add Books</Link>
                <Link to="/book-list" className="btn btn-secondary text-white mb-3">Book List</Link>
                <Link to="/issue-book" className="btn btn-success text-white mb-3">Issue Book</Link>
            </div>
            <h2>User Data</h2>

            <table className="table table-striped table-hover fade-in">
                <thead className="thead-dark">
                    <tr>
                        <th>Usern</th>
                        <th>Fullname</th>
                        <th>Email</th>
                        <th>Role</th>
                        <th>Login Date</th>
                        <th>Login Time</th>
                        <th>Logout Time</th>
                    </tr>
                </thead>
                <tbody>
                    {userData.map((data, index) => (
                        <tr key={index}>
                            <td>{data.usern}</td>
                            <td>{data.fullname}</td>
                            <td>{data.email}</td>
                            <td>{data.role}</td>
                            <td>{data.loginDate}</td>
                            <td>{data.loginTime}</td>
                            <td>{data.logoutTime}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

        </div>
    );
};

export default AdminDashboard;
