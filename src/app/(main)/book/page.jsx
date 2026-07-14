import BookCatalog from "./BookCatalog";
import books from "@/app/data/books.json";

export default function BookPage() {
  return <BookCatalog books={books} />;
}
