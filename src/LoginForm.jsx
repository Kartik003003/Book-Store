import React, { useState } from 'react';
import axios from 'axios';
import { Button, Form, FormGroup, Label, Input, FormText } from 'reactstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';

const LoginForm = ({ updateUserEmail }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [role, setRole] = useState('user');
    const [message, setMessage] = useState(null);
    const currentDate = new Date();
    const dateString = currentDate.toISOString().split('T')[0];
    const timeString = currentDate.toTimeString().split(' ')[0];

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post('http://localhost:8080/api/users/login', {
                email,
                password,
                role,
                dateString,
                timeString
            });
            console.log(response.data);
            if (response.data) {
                setMessage({ text: 'Welcome admin', style: 'success' });
                if (role === 'admin') {
                    window.location.href = '/dashboard-admin';
                } else {
                    window.location.href = '/dashboard';
                }
            } else {
                setMessage({ text: 'Login failed', style: 'error' });
            }
        } catch (error) {
            setMessage({ text: 'Error logging in: ' + error.message, style: 'error' });
        }
    };

    const messageStyles = {
        success: {
            color: 'green',
            backgroundColor: 'white',
            border: '1px solid green',
            padding: '5px 10px',
            borderRadius: '5px',
        },
        error: {
            color: 'red',
            backgroundColor: 'white',
            border: '1px solid red',
            padding: '5px 10px',
            borderRadius: '5px',
        },
    };

    return (
        <Form onSubmit={handleSubmit} className="w-50 mx-auto">
            <h1 className="text-center mb-4">Login</h1>
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
                Login
            </Button>
            {message && <p className={`text-danger mt-3 ${message.style}`} style={messageStyles[message.style]}>{message.text}</p>}

            <FormText className="text-center mt-3">
                New user? <Link to="/register">Register here</Link>
            </FormText>
        </Form>
    );
};

export default LoginForm;
