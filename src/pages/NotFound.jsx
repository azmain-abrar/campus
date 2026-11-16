
import { Link } from "react-router-dom";

function NotFound() {
    return (
        <main className="min-h-screen flex flex-col items-center justify-center bg-gray-950 text-gray-100 px-6 text-center">
            <h1 className="text-8xl font-bold text-purple-400">
                404
            </h1>

            <h2 className="text-2xl font-semibold mt-4">
                Page Not Found
            </h2>

            <p className="text-gray-400 mt-3">
                Sorry, the page you are looking for does not exist.
            </p>

            <Link
                to="/"
                className="mt-6 rounded-lg bg-purple-500 px-6 py-3 font-medium text-white hover:bg-purple-600 transition"
            >
                Back to Home
            </Link>
        </main>
    );
}

export default NotFound;
