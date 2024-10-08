import React, { useState } from 'react';
import { Form, Button } from 'react-bootstrap';
import { useRouter } from 'next/router';
import { useAuth } from '../utils/context/authContext';
import { registerUser } from '../utils/auth';
import UserForm from './Forms/UserForm';

function Signin() {
  const [showRegistration, setShowRegistration] = useState(false);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth();
  const router = useRouter();

  const handleLogin = (e) => {
    e.preventDefault();
    login(username, password, 'username')
      .then(() => router.push('/'));
  };

  const handleRegistration = (userData) => {
    registerUser(userData)
      .then(() => {
        setShowRegistration(false);
        login(userData.name, userData.password, 'username')
          .then(() => router.push('/'));
      });
  };

  return (
    <div
      className="text-center d-flex flex-column justify-content-center align-content-center"
      style={{
        height: '90vh', padding: '30px', margin: '0 auto', zIndex: 1, minHeight: '25rem', width: '100%', minWidth: '30rem', paddingBlock: '0 5rem',
      }}
    >
      <h1>Welcome to Let&apos;s Eat!</h1>
      {!showRegistration ? (
        <>
          <Form onSubmit={handleLogin}>
            <Form.Group className="mb-3">
              <Form.Label>Username</Form.Label>
              <Form.Control
                type="text"
                placeholder="Enter username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
                autoComplete="username"
              />
            </Form.Group>
            <Form.Group className="mb-3">
              <Form.Label>Password</Form.Label>
              <Form.Control
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                autoComplete="current-password"
              />
            </Form.Group>
            <Button variant="primary" type="submit">
              Login
            </Button>
          </Form>
          <Button variant="link" onClick={() => setShowRegistration(true)}>
            New user? Register here
          </Button>
        </>
      ) : (
        <>
          <UserForm onSubmit={handleRegistration} />
          <Button variant="link" onClick={() => setShowRegistration(false)}>
            Already have an account? Login here
          </Button>
        </>
      )}
    </div>
  );
}

export default Signin;
