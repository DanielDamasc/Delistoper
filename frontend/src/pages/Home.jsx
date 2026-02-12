import { useState } from "react";
import Header from "../components/Header/Header";

const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);

    return (
        <div className="min-h-screen">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">My Projects</h1>
                        <p className="text-gray-500 text-sm mt-1">Manage your projects and tasks</p>
                    </div>

                    <button
                        onClick={() => setIsModalOpen(true)}
                        className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg font-medium shadow-sm transition-all flex items-center"
                    >
                        + New Project
                    </button>
                </div>

            </main>

        </div>
    );
}

export default Home;