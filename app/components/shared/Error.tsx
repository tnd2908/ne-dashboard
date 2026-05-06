import React from 'react';

interface ErrorProps {
    title: string;
    message: string;
}
const Error = ({ title, message }: ErrorProps) => {
    return (
        <div>
            <h1>{title || 'Error'}</h1>
            <p>{message || 'An error occurred'}</p>
        </div>
    );
};

export default Error;