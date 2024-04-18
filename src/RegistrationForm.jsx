import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom'; 
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

const RegistrationForm = () => {
    const [fullname, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [message, setMessage] = useState('');
    const [role, setRole] = useState('user'); 

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (password !== confirmPassword) {
            setMessage('Passwords do not match');
            return;
        }

        if (password.length < 8) {
            setMessage('Password must be at least 8 characters long');
            return;
        }

        try {
            const response = await axios.post('http://localhost:8080/api/users/register', {
                email,
                password,
                fullname,
                role
            });
            console.log(response);
            if (response.data.success) {
                setMessage('User registered successfully');
            } else {
                setMessage(' user registered');
            }
        } catch (error) {
            setMessage('Error registering user' + error);
        }
    };

    return (
        <Form onSubmit={handleSubmit} className="w-50 mx-auto">
            <h1 className="text-center mb-4">Register</h1>
            <FormGroup>
                <Label for="fullName">Full Name</Label>
                <Input
                    type="text"
                    name="fullname"
                    id="fullname"
                    value={fullname}
                    onChange={(e) => setFullName(e.target.value)}
                />
            </FormGroup>
            <FormGroup>
                <Label for="email">Email</Label>
                <Input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                />
            </FormGroup>
            <FormGroup>
                <Label for="password">Password</Label>
                <Input
                    type="password"
                    name="password"
                    id="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                />
            </FormGroup>
            <FormGroup>
                <Label for="confirmPassword">Confirm Password</Label>
                <Input
                    type="password"
                    name="confirmPassword"
                    id="confirmPassword"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                />
            </FormGroup>
            <FormGroup>
                <Label for="role">Role</Label>
                <div className="form-check">
                    <Input
                        type="radio"
                        name="role"
                        id="userRole"
                        className="form-check-input"
                        value="user"
                        checked={role === 'user'}
                        onChange={() => setRole('user')}
                    />
                    <Label for="userRole" className="form-check-label">User</Label>
                </div>
                <div className="form-check">
                    <Input
                        type="radio"
                        name="role"
                        id="adminRole"
                        className="form-check-input"
                        value="admin"
                        checked={role === 'admin'}
                        onChange={() => setRole('admin')}
                    />
                    <Label for="adminRole" className="form-check-label">Admin</Label>
                </div>
            </FormGroup>
            <Button color="primary" block>
                Register
            </Button>
            {message && <p className="text-danger mt-3">{message}</p>}

            <FormText className="text-center mt-3">
                Already have an account? <Link to="/login">Login here</Link> 
            </FormText>
        </Form>
    );
};

export default RegistrationForm;
