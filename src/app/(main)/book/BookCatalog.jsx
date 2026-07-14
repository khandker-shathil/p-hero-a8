"use client";

import { useMemo, useState } from "react";
import BookCard from "@/app/components/shared/BookCard";

export default function BookCatalog({ books }) {
  const [query, setQuery] = useState("");

  const matchingBooks = useMemo(() => {
    const normalizedQuery = query.trim().toLowerCase();

    if (!normalizedQuery) return books;

    return books.filter((book) =>
      [book.title, book.author, book.category].some((value) =>
        value.toLowerCase().includes(normalizedQuery)
      )
    );
  }, [books, query]);

  return (
    <div className="container mx-auto px-5 py-10">
      <div className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#f4a836]">
            Explore the collection
          </p>
          <h1 className="text-3xl font-black tracking-tight text-gray-900 sm:text-4xl">
            All Books
          </h1>
        </div>

        <p className="text-sm text-gray-500" aria-live="polite">
          {matchingBooks.length} {matchingBooks.length === 1 ? "book" : "books"} found
        </p>
      </div>

      <div className="relative mb-8">
        <svg
          aria-hidden="true"
          className="pointer-events-none absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-gray-400"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="m21 21-4.35-4.35m2.35-5.15a7.5 7.5 0 1 1-15 0 7.5 7.5 0 0 1 15 0Z" />
        </svg>
        <input
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          placeholder="Search by title, author, or category..."
          aria-label="Search books"
          className="w-full rounded-xl border border-gray-200 bg-white py-3 pl-12 pr-12 text-sm text-gray-800 outline-none transition-all placeholder:text-gray-400 focus:border-[#1a3c34] focus:ring-2 focus:ring-[#1a3c34]/10"
        />
        {query && (
          <button
            type="button"
            onClick={() => setQuery("")}
            className="absolute right-3 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs font-semibold text-gray-500 hover:bg-gray-100 hover:text-gray-700"
          >
            Clear
          </button>
        )}
      </div>

      {matchingBooks.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {matchingBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>
      ) : (
        <div className="rounded-2xl border border-dashed border-gray-200 bg-gray-50 px-6 py-16 text-center">
          <p className="text-lg font-bold text-gray-800">No books found</p>
          <p className="mt-2 text-sm text-gray-500">
            Try a different title, author, or category.
          </p>
        </div>
      )}
    </div>
  );
}
