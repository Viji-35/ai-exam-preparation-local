import { Link } from "react-router-dom";

function Hero() {
    return (
        <section className="bg-gradient-to-r from-indigo-700 to-cyan-500 text-white text-center py-24">
            <h1 className="text-5xl font-bold">
                AI Exam Preparation Platform
            </h1>

            <p className="mt-6 text-xl">
                Learn Smarter with Artificial Intelligence
            </p>

            <Link to="/signup">
                <button className="mt-8 bg-white text-indigo-700 px-8 py-3 rounded-lg font-bold hover:bg-gray-200">
                    Get Started
                </button>
            </Link>
        </section>
    );
}

export default Hero;