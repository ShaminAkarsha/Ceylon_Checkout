import { useEffect, FormEvent, useState } from "react";
import { LogIn } from "lucide-react";
import { Link } from "react-router";
import { useAppDispatch, useAppSelector } from "../store/hooks";
import { login, clearError } from "../store/authSlice";

interface LoginModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LoginModal({
  isOpen,
  onClose,
}: LoginModalProps) {
  const dispatch = useAppDispatch();
  const { isLoading, error, isAuthenticated } = useAppSelector((state) => state.auth);
  const [localError, setLocalError] = useState<string | null>(null);

  useEffect(() => {
    if (isAuthenticated) {
      onClose();
    }
  }, [isAuthenticated, onClose]);

  useEffect(() => {
    if (isOpen) {
      dispatch(clearError());
      setLocalError(null);
    }
  }, [isOpen, dispatch]);

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLocalError(null);
    
    const form = e.currentTarget as HTMLFormElement;
    const data = new FormData(form);

    const email = String(data.get("email") || "").trim();
    const password = String(data.get("password") || "");

    if (!email || !password) {
      setLocalError("Please enter email and password.");
      return;
    }

    try {
      await dispatch(login({ email, password })).unwrap();
      // Success - modal will close via useEffect watching isAuthenticated
    } catch (err: any) {
      setLocalError(err || "Login failed. Please try again.");
    }
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
          {(error || localError) && (
            <div className="p-3 rounded-md bg-red-50 border border-red-200">
              <p className="text-sm text-red-600">{error || localError}</p>
            </div>
          )}
          
          <div>
            <label className="block text-sm text-gray-600 mb-1">Email</label>
            <input
              name="email"
              type="email"
              required
              autoFocus
              disabled={isLoading}
              className="w-full px-4 py-2 rounded-md bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-emerald-400 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <div>
            <label className="block text-sm text-gray-600 mb-1">Password</label>
            <input
              name="password"
              type="password"
              required
              disabled={isLoading}
              className="w-full px-4 py-2 rounded-md bg-gray-50 border border-gray-200 text-gray-900 placeholder-gray-400 focus:ring-2 focus:ring-emerald-400 focus:outline-none disabled:opacity-50 disabled:cursor-not-allowed"
            />
          </div>

          <div className="flex items-top justify-between text-sm py-2">
            <div className="flex flex-col items-left gap-2 justify-between text-sm">
              <button
                type="submit"
                disabled={isLoading}
                className=" w-fit bg-emerald-500 hover:bg-emerald-600 text-white font-semibold py-2 px-6 rounded-xl transition-all shadow-lg hover:shadow-xl text-md disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? "Signing in..." : "Sign in"}
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
