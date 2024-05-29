import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import MockAdapter from 'axios-mock-adapter';
import axios from 'axios';
import { LINK } from '../config';

const mock = new MockAdapter(axios);
mock.onPost(LINK + '/api/signIn').reply(200, 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJzdWIiOiI5YWNjNmFhZC1jMzk1LTQxMGItYWFlNi05NTk5MzIzZmY4MmYiLCJleHAiOjE3MTY4NDMwNDQsImlhdCI6MTcxNjgzOTQ0NH0.7gJTsBtsVPdzN8h2YLYi9qH8ZqEHqLKvJ1RWMPf_mDw' );
mock.onPost(LINK + '/api/getUserInfo').reply(200, {userId: "743478", userName: "TestName", });
mock.onPost(LINK + '/api/register').reply(200, { });

test('renders home page by default', () => {
  render(
    <App />
  );
  const homePageContent = screen.getByText(/How to Play?/i);
  expect(homePageContent).toBeInTheDocument();
});

test('renders register page when navigating to /register', () => {
  render(
    <App />
  );

  fireEvent.click(screen.getByRole('link', { name: /Register/i }));
  expect(screen.getByText(/Username:/i)).toBeInTheDocument();
});

test('redirects to sign in page after successful registration', async () => {
  render(
    <App />
  );

  fireEvent.change(screen.getByLabelText(/Username:/i), { target: { value: 'alma' } });
  fireEvent.change(screen.getByLabelText(/Email:/i), { target: { value: 'alma@gmail.com' } });
  fireEvent.change(screen.getByLabelText(/Password:/i), { target: { value: 'alma12' } });
  fireEvent.click(screen.getByRole('button', {name: /Send/i }));

  await waitFor(() => {
    expect(screen.getByText(/Sign In/i)).toBeInTheDocument();
  })
});

test('redirects to home page after successful sign-in', async () => {
  render(
    <App />
  );

  fireEvent.change(screen.getByLabelText(/Username or Email:/i), { target: { value: 'alma' } });
  fireEvent.change(screen.getByLabelText(/Password:/i), { target: { value: 'alma12' } });
  fireEvent.click(screen.getByRole('button', {name: /Send/i }));

  await waitFor(() => {
    expect(screen.getByText(/How to Play?/i)).toBeInTheDocument();
  })
});