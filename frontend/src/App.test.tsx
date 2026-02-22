import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

test('renders QA Task Manager title', () => {
    render(
        <BrowserRouter>
            <App />
        </BrowserRouter>
    );
    const linkElement = screen.getByText(/QA Task Manager/i);
    expect(linkElement).toBeInTheDocument();
});