import BookCard from '@/app/components/shared/BookCard';
import React from 'react';
import books from '@/app/data/books.json'

const BookPage = () => {
    return (
        <div className='mt-5 p-5 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 container mx-auto'>
            {
                books.map((book) => (
                    <BookCard key={book.id} book={book} />
                ))
            }
        </div>
    );
};

export default BookPage;