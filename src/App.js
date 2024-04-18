import React from 'react';
import { BrowserRouter as Router, Route, Routes, Link, useLocation } from 'react-router-dom';
import RegistrationForm from './RegistrationForm';
import LoginForm from './LoginForm';
import AdminDashboard from './AdminDashboard';
import Dashboard from './Dashboard';
import './App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import AddBookForm from './AddBookForm';
import BookList from './BookList';
import IssueBook from './IssueBook';
import HomePage from './HomePage';


function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}

function AppContent() {
  const location = useLocation();
  const showLinks = !['/','/dashboard-admin', '/dashboard', '/add-book', '/book-list', '/issue-book'].includes(location.pathname);

  return (
    <div className="container-fluid">
      <div className="row justify-content-center">
        <div className="col-12">
          {showLinks && (
            <div className="text-center mt-5">
              <Link to="/register" className="btn btn-primary mx-2">Register</Link>
              <Link to="/login" className="btn btn-primary mx-2">Login</Link>
            </div>
          )}
          <Link to="/" className="btn btn-primary home">Home</Link>

          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/register" element={<RegistrationForm />} />
            <Route path="/login" element={<LoginForm />} />
            <Route path="/dashboard-admin" element={<AdminDashboard />} />
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/add-book" element={<AddBookForm />} />
            <Route path="/book-list" element={<BookList />} />
            <Route path="/issue-book" element={<IssueBook />} />
          </Routes>

        </div>
      </div>
    </div>
  );
}

export default App;
