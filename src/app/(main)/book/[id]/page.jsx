'use client';

import React from 'react';
import Link from 'next/link';
import books from '@/app/data/books.json';
import BorrowButton from './BorrowButton';
import { useParams } from 'next/navigation';
import Image from 'next/image';

const categoryStyles = {
  Tech: 'bg-blue-100 text-blue-800',
  Science: 'bg-emerald-100 text-emerald-800',
  Story: 'bg-amber-100 text-amber-800',
};

const BookDetails = () => {
  const params = useParams();

  const selectedBook = books.find(
    (b) => String(b.id) === String(params.id)
  );

  if (!selectedBook) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <h1 className="text-2xl font-bold">Book Not Found</h1>
      </div>
    );
  }

  const relatedBooks = books
    .filter(
      (b) =>
        b.category === selectedBook.category &&
        b.id !== selectedBook.id
    )
    .slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-100">
        <div className="max-w-6xl mx-auto px-6 py-3 flex items-center gap-2 text-sm text-gray-400">
          <Link
            href="/"
            className="hover:text-[#1a3c34] transition-colors"
          >
            Home
          </Link>

          <span>/</span>

          <Link
            href="/book"
            className="hover:text-[#1a3c34] transition-colors"
          >
            All Books
          </Link>

          <span>/</span>

          <span className="text-gray-700 font-medium truncate max-w-[200px]">
            {selectedBook.title}
          </span>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-6xl mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left */}
          <div className="flex flex-col items-center lg:items-start gap-5">
            <div className="relative w-full max-w-sm mx-auto lg:mx-0">
              <div className="absolute -bottom-3 -right-3 w-full h-full rounded-2xl bg-[#1a3c34]/10" />
              <div className="absolute -bottom-1.5 -right-1.5 w-full h-full rounded-2xl bg-[#1a3c34]/20" />

              <Image
                src={selectedBook.image_url}
                alt={selectedBook.title}
                width={400}
                height={600}
                className="relative w-full rounded-2xl shadow-2xl object-cover"
              />

              <div
                className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-xs font-bold shadow-md ${
                  selectedBook.available_quantity > 0
                    ? 'bg-emerald-500 text-white'
                    : 'bg-red-500 text-white'
                }`}
              >
                {selectedBook.available_quantity > 0
                  ? 'Available'
                  : 'Unavailable'}
              </div>
            </div>

            <div className="w-full max-w-sm mx-auto lg:mx-0 grid grid-cols-3 gap-3">
              {[
                {
                  label: 'Category',
                  value: selectedBook.category,
                },
                {
                  label: 'Copies Left',
                  value: selectedBook.available_quantity,
                },
                {
                  label: 'Format',
                  value: 'Digital',
                },
              ].map((stat) => (
                <div
                  key={stat.label}
                  className="bg-white rounded-xl border border-gray-100 px-3 py-3 text-center"
                >
                  <div className="text-base font-bold text-gray-800">
                    {stat.value}
                  </div>
                  <div className="text-xs text-gray-400 mt-0.5">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Right */}
          <div className="flex flex-col gap-6">
            <span
              className={`self-start text-xs font-semibold px-3 py-1 rounded-full ${
                categoryStyles[selectedBook.category]
              }`}
            >
              {selectedBook.category}
            </span>

            <div>
              <h1 className="text-3xl md:text-4xl font-black text-gray-900">
                {selectedBook.title}
              </h1>

              <p className="text-gray-500 mt-2">
                by{' '}
                <span className="text-[#1a3c34] font-semibold">
                  {selectedBook.author}
                </span>
              </p>
            </div>

            <div className="h-px bg-gray-100" />

            <p className="text-gray-600 leading-relaxed">
              {selectedBook.description}
            </p>

            <BorrowButton book={selectedBook} />

            <Link
              href="/book"
              className="text-sm text-gray-500 hover:text-[#1a3c34]"
            >
              ← Back to all books
            </Link>
          </div>
        </div>

        {/* Related Books */}
        {relatedBooks.length > 0 && (
          <div className="mt-20">
            <h2 className="text-2xl font-bold mb-6">
              More {selectedBook.category} Books
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
              {relatedBooks.map((related) => (
                <Link
                  key={related.id}
                  href={`/book/${related.id}`}
                  className="bg-white border rounded-xl p-4 hover:shadow-md transition"
                >
                  <Image
                    src={related.image_url}
                    alt={related.title}
                    width={80}
                    height={100}
                    className="rounded-lg object-cover"
                  />

                  <h3 className="font-semibold mt-3">
                    {related.title}
                  </h3>

                  <p className="text-sm text-gray-500">
                    {related.author}
                  </p>
                </Link>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookDetails;