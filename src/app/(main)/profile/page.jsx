import Image from "next/image";
import Link from "next/link";
import { redirect } from "next/navigation";
import { headers } from "next/headers";
import { ObjectId } from "mongodb";
import { auth, db } from "@/app/lib/auth";
import books from "@/app/data/books.json";

const dateFormatter = new Intl.DateTimeFormat("en", {
  month: "short",
  day: "numeric",
  year: "numeric",
});

function getDueDateDetails(dueAt) {
  if (!dueAt) return { label: "No due date", className: "text-gray-500" };

  const dueDate = new Date(dueAt);
  const daysRemaining = Math.ceil((dueDate - new Date()) / 86_400_000);

  if (daysRemaining < 0) {
    return { label: `${Math.abs(daysRemaining)} days overdue`, className: "text-red-600" };
  }

  if (daysRemaining === 0) {
    return { label: "Due today", className: "text-red-600" };
  }

  return {
    label: `Due in ${daysRemaining} ${daysRemaining === 1 ? "day" : "days"}`,
    className: daysRemaining <= 3 ? "text-amber-600" : "text-emerald-600",
  };
}

export default async function ProfilePage() {
  const session = await auth.api.getSession({ headers: await headers() });

  if (!session?.user?.id) {
    redirect("/login");
  }

  const userId = ObjectId.isValid(session.user.id)
    ? new ObjectId(session.user.id)
    : null;
  const userDocument = userId
    ? await db.collection("user").findOne(
        { _id: userId },
        { projection: { borrowedBooks: 1 } }
      )
    : null;
  const borrowedBooks = userDocument?.borrowedBooks ?? [];
  const activeLoans = borrowedBooks
    .filter((loan) => loan.status === "borrowed")
    .map((loan) => {
      const book = books.find((item) => item.id === loan.bookId);
      return book ? { ...book, ...loan } : null;
    })
    .filter(Boolean);
  const firstName = session.user.name?.split(" ")[0] || "Reader";
  const memberSince = session.user.createdAt
    ? dateFormatter.format(new Date(session.user.createdAt))
    : null;

  return (
    <div className="min-h-screen bg-gray-50">
      <section className="bg-[#1a3c34] px-6 py-12 text-white sm:py-16">
        <div className="mx-auto flex max-w-6xl flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-5">
            <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-[#f4a836] text-2xl font-black text-[#1a3c34]">
              {firstName.charAt(0).toUpperCase()}
            </div>
            <div>
              <p className="mb-1 text-xs font-semibold uppercase tracking-[0.15em] text-[#f4a836]">
                My library
              </p>
              <h1 className="text-3xl font-black tracking-tight sm:text-4xl">
                Welcome, {firstName}
              </h1>
              <p className="mt-2 text-sm text-white/60">{session.user.email}</p>
            </div>
          </div>

          <Link
            href="/book"
            className="inline-flex items-center justify-center rounded-xl bg-white/10 px-5 py-3 text-sm font-semibold text-white transition-colors hover:bg-white/15"
          >
            Browse more books →
          </Link>
        </div>
      </section>

      <main className="mx-auto max-w-6xl px-6 py-10 sm:py-14">
        <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3">
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Currently borrowed</p>
            <p className="mt-2 text-3xl font-black text-gray-900">{activeLoans.length}</p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Library access</p>
            <p className="mt-2 text-lg font-bold text-emerald-600">Active</p>
          </div>
          <div className="rounded-2xl border border-gray-100 bg-white p-5 shadow-sm">
            <p className="text-sm font-medium text-gray-500">Member since</p>
            <p className="mt-2 text-lg font-bold text-gray-900">{memberSince || "BookBorrow member"}</p>
          </div>
        </div>

        <div className="mb-7 flex items-end justify-between gap-4">
          <div>
            <p className="mb-2 text-xs font-semibold uppercase tracking-[0.15em] text-[#f4a836]">
              Your reading shelf
            </p>
            <h2 className="text-2xl font-black tracking-tight text-gray-900 sm:text-3xl">
              Borrowed Books
            </h2>
          </div>
          {activeLoans.length > 0 && (
            <span className="rounded-full bg-[#1a3c34]/10 px-3 py-1 text-xs font-semibold text-[#1a3c34]">
              {activeLoans.length} active
            </span>
          )}
        </div>

        {activeLoans.length > 0 ? (
          <div className="grid gap-5 md:grid-cols-2">
            {activeLoans.map((loan) => {
              const dueDate = getDueDateDetails(loan.dueAt);

              return (
                <article
                  key={loan.bookId}
                  className="flex gap-4 rounded-2xl border border-gray-100 bg-white p-4 shadow-sm sm:p-5"
                >
                  <Image
                    src={loan.image_url}
                    alt={loan.title}
                    width={96}
                    height={136}
                    className="h-32 w-24 shrink-0 rounded-xl object-cover"
                  />
                  <div className="flex min-w-0 flex-1 flex-col">
                    <div className="flex items-start justify-between gap-3">
                      <span className="rounded-full bg-[#1a3c34]/10 px-2.5 py-1 text-xs font-semibold text-[#1a3c34]">
                        {loan.category}
                      </span>
                      <span className="rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700">
                        Borrowed
                      </span>
                    </div>
                    <h3 className="mt-3 truncate text-lg font-bold text-gray-900">{loan.title}</h3>
                    <p className="mt-1 text-sm text-gray-500">{loan.author}</p>
                    <div className="mt-auto flex items-end justify-between gap-3 pt-4">
                      <div>
                        <p className="text-xs text-gray-400">Due {dateFormatter.format(new Date(loan.dueAt))}</p>
                        <p className={`mt-0.5 text-xs font-bold ${dueDate.className}`}>{dueDate.label}</p>
                      </div>
                      <Link
                        href={`/book/${loan.bookId}`}
                        className="text-sm font-semibold text-[#1a3c34] hover:underline"
                      >
                        View book →
                      </Link>
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        ) : (
          <div className="rounded-2xl border border-dashed border-gray-200 bg-white px-6 py-16 text-center">
            <div className="mb-4 text-5xl">📚</div>
            <h3 className="text-xl font-bold text-gray-900">Your shelf is waiting</h3>
            <p className="mx-auto mt-2 max-w-sm text-sm leading-relaxed text-gray-500">
              Find a book you love, borrow it, and it will appear here with its return date.
            </p>
            <Link
              href="/book"
              className="mt-6 inline-flex rounded-xl bg-[#1a3c34] px-5 py-3 text-sm font-bold text-white transition-colors hover:bg-[#2d6a5a]"
            >
              Explore books
            </Link>
          </div>
        )}
      </main>
    </div>
  );
}
