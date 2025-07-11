export default function AboutPage() {
    return (
        <div className="max-w-2xl mx-auto p-8 bg-white shadow-lg rounded-lg mt-10">
            <h1 className="text-4xl font-bold text-gray-800 mb-6 text-center">About Us</h1>
            <p className="text-lg text-gray-700 mb-4 leading-relaxed">
                This page provides information about our application and its features.
            </p>
            <p className="text-lg text-gray-700 leading-relaxed">
                For more details, visit our <a href="/contact">Contact Page</a>.
            </p>
        </div>
    );
}