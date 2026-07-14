import { ObjectId } from "mongodb";
import { auth, db } from "@/app/lib/auth";
import books from "@/app/data/books.json";

export const runtime = "nodejs";

async function getCurrentUser(request) {
  const session = await auth.api.getSession({ headers: request.headers });

  if (!session?.user?.id) return null;

  return session.user;
}

function getUserObjectId(userId) {
  if (!ObjectId.isValid(userId)) return null;

  return new ObjectId(userId);
}

export async function GET(request) {
  const user = await getCurrentUser(request);

  if (!user) {
    return Response.json({ message: "You must be logged in." }, { status: 401 });
  }

  const userId = getUserObjectId(user.id);

  if (!userId) {
    return Response.json({ message: "Invalid user session." }, { status: 400 });
  }

  const userDocument = await db.collection("user").findOne(
    { _id: userId },
    { projection: { borrowedBooks: 1 } }
  );

  return Response.json({ borrowedBooks: userDocument?.borrowedBooks ?? [] });
}

export async function POST(request) {
  const user = await getCurrentUser(request);

  if (!user) {
    return Response.json({ message: "You must be logged in." }, { status: 401 });
  }

  const { bookId } = await request.json();
  const book = books.find((item) => item.id === String(bookId));

  if (!book) {
    return Response.json({ message: "Book not found." }, { status: 404 });
  }

  if (book.available_quantity < 1) {
    return Response.json({ message: "No copies are available right now." }, { status: 409 });
  }

  const userId = getUserObjectId(user.id);

  if (!userId) {
    return Response.json({ message: "Invalid user session." }, { status: 400 });
  }

  const borrowedAt = new Date();
  const dueAt = new Date(borrowedAt);
  dueAt.setDate(dueAt.getDate() + 14);

  const borrowedBook = {
    bookId: book.id,
    borrowedAt,
    dueAt,
    status: "borrowed",
  };

  const result = await db.collection("user").updateOne(
    { _id: userId, "borrowedBooks.bookId": { $ne: book.id } },
    {
      $push: { borrowedBooks: borrowedBook },
      $set: { updatedAt: borrowedAt },
    }
  );

  if (result.modifiedCount === 0) {
    const userDocument = await db.collection("user").findOne(
      { _id: userId },
      { projection: { borrowedBooks: 1 } }
    );
    const existingBorrow = userDocument?.borrowedBooks?.find(
      (item) => item.bookId === book.id && item.status === "borrowed"
    );

    if (existingBorrow) {
      return Response.json({ borrowedBook: existingBorrow, alreadyBorrowed: true });
    }

    return Response.json({ message: "Unable to save your borrow." }, { status: 500 });
  }

  return Response.json({ borrowedBook }, { status: 201 });
}
