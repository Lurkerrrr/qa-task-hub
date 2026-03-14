import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import App from './App';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: { retry: false },
    },
});

test('renders QA Task Manager title', () => {
    render(
        <QueryClientProvider client={queryClient}>
            <BrowserRouter>
                <App />
            </BrowserRouter>
        </QueryClientProvider>
    );
    const linkElement = screen.getByText(/QA Task Manager/i);
    expect(linkElement).toBeInTheDocument();
});