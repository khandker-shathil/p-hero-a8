"use client";

import { useSession } from "@/app/lib/auth-client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import toast from "react-hot-toast";

export default function BorrowButton({ book }) {
  const { data: session } = useSession();
  const router = useRouter();
  const [borrowed, setBorrowed] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleBorrow = async () => {
    if (!session?.user) {
      router.push("/login");
      return;
    }

    if (book.available_quantity === 0) {
      toast.error("No copies available right now.");
      return;
    }

    setLoading(true);

    // Simulate async borrow action
    await new Promise((r) => setTimeout(r, 800));

    setBorrowed(true);
    setLoading(false);
    toast.success(`You borrowed "${book.title}"! Happy reading 📖`);
  };

  if (borrowed) {
    return (
      <div className="flex items-center gap-3 bg-emerald-50 border border-emerald-200 rounded-xl px-5 py-4">
        <div className="w-8 h-8 rounded-full bg-emerald-500 flex items-center justify-center shrink-0">
          <svg className="w-4 h-4 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
          </svg>
        </div>
        <div>
          <p className="text-sm font-bold text-emerald-800">Successfully borrowed!</p>
          <p className="text-xs text-emerald-600 mt-0.5">Check My Profile to view your borrowed books.</p>
        </div>
      </div>
    );
  }

  return (
    <button
      onClick={handleBorrow}
      disabled={loading || book.available_quantity === 0}
      className={`w-full sm:w-auto px-8 py-3.5 rounded-xl font-bold text-sm transition-all duration-150 flex items-center justify-center gap-2 ${
        book.available_quantity === 0
          ? "bg-gray-100 text-gray-400 cursor-not-allowed"
          : "bg-[#1a3c34] text-white hover:bg-[#2d6a5a] active:scale-95"
      }`}
    >
      {loading ? (
        <>
          <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
          Borrowing...
        </>
      ) : book.available_quantity === 0 ? (
        "Not Available"
      ) : (
        <>
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
          </svg>
          Borrow This Book
        </>
      )}
    </button>
  );
}