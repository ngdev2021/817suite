import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { loginUser } from '../../api/userApi';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await loginUser({ email, password });
      console.log('Login successful:', response);
      localStorage.setItem('token', response.token); // Save token
      alert('Welcome back!');
      window.location.href = '/dashboard'; // Redirect to Dashboard
    } catch (err) {
      console.error('Login error:', err);
      setError('Invalid email or password. Please try again.');
    }
  };

  return (
    <Container>
      <FormWrapper>
        <Title>Welcome Back!</Title>
        <Subtitle>
          Log in to access your workflows and funnels.
        </Subtitle>
        <Form onSubmit={handleSubmit}>
          <Input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit">Log In</Button>
        </Form>
        {error && <Error>{error}</Error>}
        <Switch>
          Don’t have an account?{' '}
          <StyledLink to="/register">Sign Up</StyledLink>
        </Switch>
      </FormWrapper>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #f5f5f5;
`;

const FormWrapper = styled.div`
  max-width: 400px;
  width: 100%;
  padding: 20px;
  background-color: #ffffff;
  border: 1px solid #ddd;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  text-align: center;
`;

const Title = styled.h1`
  font-size: 24px;
  margin-bottom: 10px;
`;

const Subtitle = styled.p`
  color: #666;
  margin-bottom: 20px;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const Input = styled.input`
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
  border: 1px solid #ddd;
`;

const Button = styled.button`
  padding: 10px;
  font-size: 16px;
  font-weight: bold;
  color: #ffffff;
  background-color: #007bff;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  &:hover {
    background-color: #0056b3;
  }
`;

const Error = styled.p`
  margin-top: 10px;
  color: red;
`;

const Switch = styled.p`
  margin-top: 20px;
  color: #666;
`;

const StyledLink = styled(Link)`
  color: #007bff;
  text-decoration: none;
  &:hover {
    text-decoration: underline;
  }
`;

export default Login;
