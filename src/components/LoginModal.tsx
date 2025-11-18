import { useEffect, FormEvent } from "react";
import { LogIn } from "lucide-react";
import { Link } from "react-router";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin?: (credentials: { email: string; password: string }) => void;
}

export default function LoginModal({
  isOpen,
  onClose,
  onLogin,
}: LoginModalProps) {
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    const data = new FormData(form);

    const email = String(data.get("email") || "");
    const password = String(data.get("password") || "");

    if (!email || !password) {
      // simple inline validation for now
      alert("Please enter email and password.");
      return;
    }

    onLogin?.({ email, password });
    onClose();
  };

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && onClose();
    if (isOpen) document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 z-[60] flex items-center justify-center p-4"
      role="dialog"
      aria-modal="true"
      aria-labelledby="login-title"
    >
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />

      {/* Centered Modal */}
      <div className="relative w-full max-w-md bg-white rounded-2xl shadow-xl p-6">
        {/* Header */}
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2 rounded-md bg-emerald-50">
            <LogIn className="h-6 w-6 text-emerald-500" />
          </div>
          <div>
            <h3
              id="login-title"
              className="text-lg font-semibold text-gray-900"
            >
              Sign in to your account
            </h3>
            <p className="text-sm text-gray-600">
              Access your cart, orders and saved items.
            </p>
          </div>
          <button
            aria-label="Close"
            onClick={onClose}
            className="ml-auto text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              name="email"
              type="email"
              required
              autoFocus
              className="w-full px-4 py-2 rounded-md bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <input
              name="password"
              type="password"
              required
              className="w-full px-4 py-2 rounded-md bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-emerald-400 focus:outline-none"
            />
          </div>

          <div className="flex items-top justify-between text-sm py-2">
            <div className="flex flex-col items-left gap-2 justify-between text-sm">
              <button
                type="submit"
                className=" w-fit bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl text-md"
              >
                Sign in
              </button>
              <a href="#" className="ml-1 text-emerald-600 hover:underline">
                Forgot password?
              </a>
            </div>
            <Link to="/register" className="text-emerald-600 hover:underline">
              Create account
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}
