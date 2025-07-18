export default function NotFound() {
    return (
        <div className="flex flex-col items-center justify-center h-screen">
            <h1 className="text-4xl font-bold text-red-600">404 - Page Not Found</h1>
            <p className="text-lg mt-4">The page you are looking for does not exist.</p>
            <a href="/" className="mt-6 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
                Go back to Home
            </a>
        </div>
    )
}