import Image from "next/image";
import Link from "next/link";

const BookCard = ({ book }) => {
  return (
    <article className="group overflow-hidden rounded-2xl border border-gray-100 bg-white shadow-sm transition-all duration-200 hover:-translate-y-0.5 hover:shadow-md">
      <div className="relative aspect-[3/4] overflow-hidden bg-gray-100">
        <Image
          src={book.image_url}
          alt={book.title}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 640px) 50vw, 100vw"
          className="object-cover transition-transform duration-300 group-hover:scale-105"
        />
      </div>

      <div className="p-4">
        <div className="mb-3 flex items-center justify-between gap-2">
          <span className="rounded-full bg-[#1a3c34]/10 px-2.5 py-1 text-xs font-semibold text-[#1a3c34]">
            {book.category}
          </span>
          <span className="text-xs font-medium text-gray-500">
            {book.available_quantity} available
          </span>
        </div>

        <h3 className="line-clamp-2 min-h-[3.5rem] text-lg font-bold leading-snug text-gray-900">
          {book.title}
        </h3>
        <p className="mt-1 text-sm font-medium text-gray-500">{book.author}</p>
        <p className="mt-3 line-clamp-3 text-sm leading-relaxed text-gray-500">
          {book.description}
        </p>

        <Link
          href={`/book/${book.id}`}
          className="mt-4 inline-flex w-full items-center justify-center rounded-xl bg-[#1a3c34] px-4 py-2.5 text-sm font-semibold text-white transition-colors hover:bg-[#2d6a5a]"
        >
          View Details
        </Link>
      </div>
    </article>
  );
};

export default BookCard;
