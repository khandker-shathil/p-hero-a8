"use client";
import Link from "next/link";
import { useSession, signOut } from "@/app/lib/auth-client";
import { useRouter, usePathname } from "next/navigation";
import toast from "react-hot-toast";

const Navbar = () => {
    const { data: session, isPending } = useSession();
    const router = useRouter();
    const pathname = usePathname();
    const user = session?.user;

    const handleLogout = async () => {
    await signOut();
    toast.success("Logged out successfully");
    router.push("/");
  };

  const linkClass = (href) =>
    `px-3.5 py-1.5 rounded-lg text-sm font-medium transition-all duration-150 ${
      pathname === href
        ? "bg-[#1a3c34] text-white"
        : "text-gray-600 hover:bg-[#1a3c34] hover:text-white"
    }`;

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
      <div className="max-w-6xl mx-auto px-6 h-[60px] flex items-center justify-between">

        {/* Logo */}
        <Link href="/" className="flex items-center gap-2.5 shrink-0">
          <div className="w-[34px] h-[34px] rounded-lg bg-[#1a3c34] flex items-center justify-center text-white font-bold text-[15px]">
            B
          </div>
          <span className="font-bold text-base text-[#1a3c34] hidden sm:block tracking-tight">
            Book<span className="text-[#f4a836]">Borrow</span>
          </span>
        </Link>

        {/* Center Links */}
        <div className="hidden md:flex items-center gap-1">
          <Link href="/" className={linkClass("/")}>Home</Link>
          <Link href="/book" className={linkClass("/book")}>All Books</Link>
          <Link href="/profile" className={linkClass("/profile")}>My Profile</Link>
        </div>

        {/* Right */}
        <div className="flex items-center gap-2">
          {isPending ? (
            <div className="w-7 h-7 rounded-full border-2 border-[#1a3c34] border-t-transparent animate-spin" />
          ) : user ? (
            <>
              <div className="hidden sm:flex items-center gap-2 bg-gray-100 rounded-full px-3 py-1.5">
                <div className="w-7 h-7 rounded-full bg-[#1a3c34] flex items-center justify-center text-white text-xs font-bold shrink-0">
                  {user.image
                    ? <img src={user.image} alt={user.name} className="w-full h-full rounded-full object-cover" />
                    : user.name?.charAt(0).toUpperCase()
                  }
                </div>
                <span className="text-sm font-medium text-gray-700 max-w-[100px] truncate">
                  {user.name}
                </span>
              </div>
              <button
                onClick={handleLogout}
                className="px-3.5 py-1.5 rounded-lg text-sm font-medium text-[#1a3c34] border border-[#1a3c34] hover:bg-[#1a3c34] hover:text-white transition-all duration-150"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              href="/login"
              className="px-4 py-2 rounded-lg bg-[#1a3c34] text-white text-sm font-semibold hover:bg-[#2d6a5a] transition-colors"
            >
              Login
            </Link>
          )}

          {/* Mobile menu */}
          <div className="dropdown dropdown-end md:hidden">
            <div tabIndex={0} role="button" className="p-2 rounded-lg hover:bg-gray-100 transition-colors cursor-pointer">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-gray-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </div>
            <ul tabIndex={0} className="menu menu-sm dropdown-content mt-2 z-[1] p-2 shadow-lg bg-white rounded-xl w-48 border border-gray-100">
              <li><Link href="/" className="rounded-lg font-medium">Home</Link></li>
              <li><Link href="/books" className="rounded-lg font-medium">All Books</Link></li>
              {user && <li><Link href="/profile" className="rounded-lg font-medium">My Profile</Link></li>}
              {user
                ? <li><button onClick={handleLogout} className="rounded-lg font-medium text-red-500">Logout</button></li>
                : <li><Link href="/login" className="rounded-lg font-medium text-[#1a3c34]">Login</Link></li>
              }
            </ul>
          </div>
        </div>
      </div>
    </nav>
    );
};

export default Navbar;