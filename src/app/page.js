import Link from "next/link";
import BookCard from "@/app/components/shared/BookCard";
import books from "@/app/data/books.json";

export default function Home() {
  const featuredBooks = books.slice(0, 4);

  return (
    
    <div>
      {/* ── Hero ── */}
      <section className="relative min-h-[92vh] flex items-center justify-center overflow-hidden bg-[#1a3c34]">
        {/* Floating book emojis background */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none select-none opacity-[0.07]">
          {["📚", "📖", "📕", "📗", "📘", "📙"].map((emoji, i) => (
            <span
              key={i}
              className="absolute text-7xl"
              style={{
                top: `${[10, 65, 30, 75, 15, 55][i]}%`,
                left: `${[5, 10, 85, 80, 50, 92][i]}%`,
                transform: `rotate(${[-15, 20, -10, 15, -20, 10][i]}deg)`,
              }}
            >
              {emoji}
            </span>
          ))}
        </div>

        {/* Grid line overlay */}
        <div
          className="absolute inset-0 opacity-[0.04]"
          style={{
            backgroundImage:
              "linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />

        <div className="relative z-10 text-center px-6 max-w-3xl mx-auto">
          <span className="inline-block text-xs font-semibold tracking-[0.2em] uppercase text-[#f4a836] mb-6">
            Welcome to BookBorrow
          </span>
          <h1 className="text-5xl md:text-7xl font-black text-white leading-[1.05] mb-6 tracking-tight">
            Find Your <br />
            <span className="text-[#f4a836]">Next Read.</span>
          </h1>
          <p className="text-white/60 text-lg md:text-xl leading-relaxed mb-10 max-w-xl mx-auto">
            Explore a curated digital library. Borrow across Story, Tech, and Science — no queues, no late fees.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link
              href="/books"
              className="px-8 py-3.5 rounded-xl bg-[#f4a836] text-[#1a1a1a] font-bold text-sm hover:bg-[#e09620] transition-colors"
            >
              Browse Now
            </Link>
            <Link
              href="/register"
              className="px-8 py-3.5 rounded-xl bg-white/10 text-white font-semibold text-sm border border-white/20 hover:bg-white/15 transition-colors"
            >
              Create Account
            </Link>
          </div>

          {/* Stats row */}
          <div className="flex justify-center gap-10 mt-16 pt-10 border-t border-white/10">
            {[
              { value: "12", label: "Books Available" },
              { value: "3", label: "Categories" },
              { value: "Free", label: "To Borrow" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-2xl font-black text-white">{stat.value}</div>
                <div className="text-xs text-white/40 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Marquee ── */}
      <div className="bg-[#f4a836] py-2.5 overflow-hidden">
        <div className="flex gap-0 animate-marquee whitespace-nowrap">
          {Array.from({ length: 4 }).map((_, i) => (
            <span key={i} className="flex items-center gap-8 text-[#1a1a1a] text-sm font-medium px-6">
              <span>📘 New Arrival: The Pragmatic Programmer</span>
              <span>·</span>
              <span>🎉 Special Discount on Annual Memberships — 30% OFF</span>
              <span>·</span>
              <span>📗 New Arrival: Cosmos by Carl Sagan</span>
              <span>·</span>
              <span>🔖 Limited Copies: Clean Code</span>
              <span>·</span>
              <span>📙 New Arrival: The Kite Runner</span>
              <span>·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ── Featured Books ── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="flex items-end justify-between mb-10">
          <div>
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#f4a836] mb-2">
              Handpicked for you
            </p>
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">Featured Books</h2>
          </div>
          <Link
            href="/book"
            className="text-sm font-semibold text-[#1a3c34] hover:underline hidden sm:block"
          >
            View all →
          </Link>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredBooks.map((book) => (
            <BookCard key={book.id} book={book} />
          ))}
        </div>

        <div className="text-center mt-10 sm:hidden">
          <Link
            href="/book"
            className="text-sm font-semibold text-[#1a3c34] hover:underline"
          >
            View all books →
          </Link>
        </div>
      </section>

      {/* ── Categories ── */}
      <section className="bg-gray-50 py-20">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#f4a836] mb-2">
              Browse by genre
            </p>
            <h2 className="text-4xl font-black text-gray-900 tracking-tight">Explore Categories</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                name: "Story",
                emoji: "📖",
                count: 4,
                desc: "Novels, fiction, and timeless human narratives.",
                bg: "bg-amber-50",
                border: "border-amber-200",
                badge: "bg-amber-100 text-amber-800",
              },
              {
                name: "Tech",
                emoji: "💻",
                count: 4,
                desc: "Programming, software craftsmanship, and digital innovation.",
                bg: "bg-blue-50",
                border: "border-blue-200",
                badge: "bg-blue-100 text-blue-800",
              },
              {
                name: "Science",
                emoji: "🔬",
                count: 4,
                desc: "Physics, biology, cosmos, and scientific discovery.",
                bg: "bg-emerald-50",
                border: "border-emerald-200",
                badge: "bg-emerald-100 text-emerald-800",
              },
            ].map((cat) => (
              <Link
                key={cat.name}
                href={`/books?category=${cat.name}`}
                className={`${cat.bg} border ${cat.border} rounded-2xl p-8 text-center hover:shadow-md transition-all duration-200 hover:-translate-y-0.5 group`}
              >
                <div className="text-5xl mb-4">{cat.emoji}</div>
                <h3 className="text-xl font-bold text-gray-800 mb-2">{cat.name}</h3>
                <p className="text-sm text-gray-500 mb-4 leading-relaxed">{cat.desc}</p>
                <span className={`inline-block text-xs font-semibold px-3 py-1 rounded-full ${cat.badge}`}>
                  {cat.count} books
                </span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ── How It Works ── */}
      <section className="max-w-6xl mx-auto px-6 py-20">
        <div className="text-center mb-14">
          <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#f4a836] mb-2">
            Simple & fast
          </p>
          <h2 className="text-4xl font-black text-gray-900 tracking-tight">How It Works</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {/* Connector line (desktop) */}
          <div className="hidden md:block absolute top-10 left-[20%] right-[20%] h-px bg-gray-200" />

          {[
            {
              step: "01",
              title: "Create an Account",
              desc: "Sign up in seconds with your email or Google. Your library account is ready instantly.",
              icon: "👤",
            },
            {
              step: "02",
              title: "Find Your Book",
              desc: "Browse by category or search by title. Filter by Story, Tech, or Science to narrow it down.",
              icon: "🔍",
            },
            {
              step: "03",
              title: "Borrow & Enjoy",
              desc: "Click Borrow This Book and it's yours. Digital borrowing with zero hassle.",
              icon: "📚",
            },
          ].map((item) => (
            <div key={item.step} className="text-center relative">
              <div className="w-20 h-20 rounded-2xl bg-[#1a3c34] text-white text-3xl flex items-center justify-center mx-auto mb-6 relative z-10">
                {item.icon}
              </div>
              <div className="text-xs font-bold tracking-widest text-[#f4a836] mb-2">{item.step}</div>
              <h3 className="text-xl font-bold text-gray-800 mb-3">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs mx-auto">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* ── CTA Banner ── */}
      <section className="bg-[#1a3c34] mx-6 mb-16 rounded-2xl px-8 py-14 text-center max-w-6xl md:mx-auto">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#f4a836] mb-3">
          Ready to start?
        </p>
        <h2 className="text-3xl md:text-4xl font-black text-white mb-4 tracking-tight">
          Your next favorite book is waiting.
        </h2>
        <p className="text-white/55 mb-8 max-w-md mx-auto text-sm leading-relaxed">
          Join BookBorrow today and get instant access to our full library — no credit card required.
        </p>
        <Link
          href="/register"
          className="inline-block px-8 py-3.5 rounded-xl bg-[#f4a836] text-[#1a1a1a] font-bold text-sm hover:bg-[#e09620] transition-colors"
        >
          Get Started Free
        </Link>
      </section>
    </div>
  );
}
