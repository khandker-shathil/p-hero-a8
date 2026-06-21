"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { signUp, signIn, authClient } from "@/app/lib/auth-client";
import toast from "react-hot-toast";

export default function RegisterPage() {
  const router = useRouter();
  const [form, setForm] = useState({
    name: "",
    email: "",
    photoURL: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [googleLoading, setGoogleLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleChange = (e) => {
    setError("");
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validatePassword = (password) => {
    if (password.length < 6) return "Password must be at least 6 characters.";
    return null;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    if (!form.name || !form.email || !form.password) {
      setError("Name, email, and password are required.");
      return;
    }

    const passwordError = validatePassword(form.password);
    if (passwordError) {
      setError(passwordError);
      return;
    }

    setLoading(true);

    const { data, error: authError } = await authClient.signUp.email({
      name: form.name,
      email: form.email,
      password: form.password,
      image: form.photoURL || undefined,
    });
    console.log(authError);
    setLoading(false);

    if (authError) {
      setError(authError.message || "Registration failed. Please try again.");
      return;
    }

    toast.success("Account created! Please log in.");
    router.push("/");
  };

  const handleGoogle = async () => {
    setGoogleLoading(true);
    await signIn.social({ provider: "google", callbackURL: "/" });
    setGoogleLoading(false);
  };

  const passwordStrength = (password) => {
    if (!password) return null;
    if (password.length < 6) return { label: "Too short", color: "bg-red-400", width: "w-1/4" };
    if (password.length < 8) return { label: "Weak", color: "bg-orange-400", width: "w-2/4" };
    if (!/[A-Z]/.test(password) || !/[0-9]/.test(password)) return { label: "Fair", color: "bg-yellow-400", width: "w-3/4" };
    return { label: "Strong", color: "bg-emerald-400", width: "w-full" };
  };

  const strength = passwordStrength(form.password);

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      <div className="hidden lg:flex flex-col justify-between bg-[#1a3c34] px-14 py-12">
        <Link href="/" className="flex items-center gap-2.5">
          <div className="w-9 h-9 rounded-xl bg-white/15 flex items-center justify-center text-white font-bold text-base">
            B
          </div>
          <span className="font-bold text-lg text-white tracking-tight">
            Book<span className="text-[#f4a836]">Borrow</span>
          </span>
        </Link>
        <div>
          <div className="text-6xl mb-8">🚀</div>
          <h2 className="text-4xl font-black text-white leading-tight tracking-tight mb-4">
            Start reading<br />
            <span className="text-[#f4a836]">in seconds.</span>
          </h2>
          <p className="text-white/55 text-base leading-relaxed max-w-sm">
            Create your free account and get instant access to our full library — no credit card required.
          </p>
          <div className="mt-10 flex flex-col gap-5">
            {[
              { step: "01", text: "Create your free account" },
              { step: "02", text: "Browse 12 curated books" },
              { step: "03", text: "Borrow and enjoy instantly" },
            ].map((item) => (
              <div key={item.step} className="flex items-center gap-4">
                <div className="w-8 h-8 rounded-lg bg-[#f4a836]/15 border border-[#f4a836]/30 flex items-center justify-center shrink-0">
                  <span className="text-[#f4a836] text-xs font-bold">{item.step}</span>
                </div>
                <span className="text-white/70 text-sm">{item.text}</span>
              </div>
            ))}
          </div>
        </div>

        <p className="text-white/25 text-xs">
          © {new Date().getFullYear()} BookBorrow. All rights reserved.
        </p>
      </div>
      <div className="flex items-center justify-center px-6 py-12 bg-gray-50">
        <div className="w-full max-w-md">
          <Link href="/" className="flex items-center gap-2 mb-8 lg:hidden">
            <div className="w-8 h-8 rounded-lg bg-[#1a3c34] flex items-center justify-center text-white font-bold text-sm">
              B
            </div>
            <span className="font-bold text-base text-[#1a3c34] tracking-tight">
              Book<span className="text-[#f4a836]">Borrow</span>
            </span>
          </Link>
          <div className="mb-8">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight mb-1">
              Create an account
            </h1>
            <p className="text-gray-400 text-sm">
              Join BookBorrow and start borrowing today.
            </p>
          </div>
          <button
            onClick={handleGoogle}
            disabled={googleLoading}
            className="w-full flex items-center justify-center gap-3 px-4 py-3 rounded-xl border border-gray-200 bg-white text-gray-700 text-sm font-semibold hover:bg-gray-50 hover:border-gray-300 transition-all mb-6 disabled:opacity-60"
          >
            {googleLoading ? (
              <div className="w-4 h-4 rounded-full border-2 border-gray-400 border-t-transparent animate-spin" />
            ) : (
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" />
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z" />
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
              </svg>
            )}
            Continue with Google
          </button>
          <div className="flex items-center gap-3 mb-6">
            <div className="flex-1 h-px bg-gray-200" />
            <span className="text-xs text-gray-400 font-medium">or register with email</span>
            <div className="flex-1 h-px bg-gray-200" />
          </div>
          {error && (
            <div className="flex items-center gap-2.5 bg-red-50 border border-red-200 text-red-700 text-sm rounded-xl px-4 py-3 mb-5">
              <svg className="w-4 h-4 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              {error}
            </div>
          )}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">
                Full name <span className="text-red-400">*</span>
              </label>
              <input
                type="text"
                name="name"
                value={form.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 placeholder-gray-300 outline-none focus:border-[#1a3c34] focus:ring-2 focus:ring-[#1a3c34]/10 transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">
                Email address <span className="text-red-400">*</span>
              </label>
              <input
                type="email"
                name="email"
                value={form.email}
                onChange={handleChange}
                placeholder="you@example.com"
                className="w-full px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 placeholder-gray-300 outline-none focus:border-[#1a3c34] focus:ring-2 focus:ring-[#1a3c34]/10 transition-all"
              />
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">
                Photo URL{" "}
                <span className="text-gray-400 font-normal">(optional)</span>
              </label>
              <div className="flex gap-2">
                <input
                  type="url"
                  name="photoURL"
                  value={form.photoURL}
                  onChange={handleChange}
                  placeholder="https://example.com/photo.jpg"
                  className="flex-1 px-4 py-3 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 placeholder-gray-300 outline-none focus:border-[#1a3c34] focus:ring-2 focus:ring-[#1a3c34]/10 transition-all"
                />
                <div className="w-11 h-11 rounded-xl border border-gray-200 bg-gray-100 overflow-hidden shrink-0 flex items-center justify-center">
                  {form.photoURL ? (
                    <img
                      src={form.photoURL}
                      alt="preview"
                      className="w-full h-full object-cover"
                      onError={(e) => { e.target.style.display = "none"; }}
                    />
                  ) : (
                    <svg className="w-5 h-5 text-gray-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                    </svg>
                  )}
                </div>
              </div>
            </div>

            <div className="flex flex-col gap-1.5">
              <label className="text-sm font-medium text-gray-700">
                Password <span className="text-red-400">*</span>
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={form.password}
                  onChange={handleChange}
                  placeholder="Min. 6 characters"
                  className="w-full px-4 py-3 pr-11 rounded-xl border border-gray-200 bg-white text-sm text-gray-800 placeholder-gray-300 outline-none focus:border-[#1a3c34] focus:ring-2 focus:ring-[#1a3c34]/10 transition-all"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword((p) => !p)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 4.411m0 0L21 21" />
                    </svg>
                  ) : (
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                    </svg>
                  )}
                </button>
              </div>

              {strength && (
                <div className="mt-1.5">
                  <div className="w-full h-1.5 bg-gray-100 rounded-full overflow-hidden">
                    <div className={`h-full rounded-full transition-all duration-300 ${strength.color} ${strength.width}`} />
                  </div>
                  <p className={`text-xs mt-1 font-medium ${
                    strength.label === "Strong" ? "text-emerald-500" :
                    strength.label === "Fair" ? "text-yellow-500" :
                    strength.label === "Weak" ? "text-orange-500" : "text-red-500"
                  }`}>
                    {strength.label}
                  </p>
                </div>
              )}
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 rounded-xl bg-[#1a3c34] text-white text-sm font-bold hover:bg-[#2d6a5a] transition-colors disabled:opacity-60 flex items-center justify-center gap-2 mt-1"
            >
              {loading ? (
                <>
                  <div className="w-4 h-4 rounded-full border-2 border-white border-t-transparent animate-spin" />
                  Creating account...
                </>
              ) : (
                "Create Account"
              )}
            </button>
          </form>

          <p className="text-center text-sm text-gray-400 mt-6">
            Already have an account?{" "}
            <Link href="/login" className="text-[#1a3c34] font-semibold hover:underline">
              Log in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}