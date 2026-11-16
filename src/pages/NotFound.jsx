import { Link, useNavigate } from "react-router-dom";
import { ArrowLeft, Compass } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import { Button } from "../components/ui/button";

export default function NotFound() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const home = user ? "/dashboard" : "/login";

  return (
    <main className="grid min-h-screen place-items-center bg-[#f5f7fb] p-6">
      <div className="w-full max-w-md rounded-3xl border border-slate-200 bg-white p-8 text-center shadow-sm">
        <div className="mx-auto grid h-14 w-14 place-items-center rounded-2xl bg-indigo-50 text-indigo-600">
          <Compass size={28} aria-hidden="true" />
        </div>
        <p className="mt-5 text-xs font-bold uppercase tracking-[.16em] text-indigo-600">Error 404</p>
        <h1 className="mt-2 text-3xl font-extrabold tracking-tight text-slate-900">Page not found</h1>
        <p className="mt-3 text-sm leading-6 text-slate-500">
          The page you are looking for does not exist or may have been moved.
        </p>
        <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
          <Button variant="outline" onClick={() => navigate(-1)}>
            <ArrowLeft size={16} /> Go back
          </Button>
          <Link
            to={home}
            className="inline-flex h-10 items-center justify-center rounded-xl bg-indigo-600 px-4 text-sm font-semibold text-white transition hover:bg-indigo-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-indigo-500"
          >
            {user ? "Go to dashboard" : "Go to login"}
          </Link>
        </div>
      </div>
    </main>
  );
}