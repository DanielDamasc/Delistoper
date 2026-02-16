import { useEffect, useState } from "react";
import Header from "../components/Header/Header";
import CreateProjectModal from "../components/Modals/CreateProjectModal";
import ProjectCard from "../components/ProjectCard";
import api from '../services/api.js';
import { Plus } from "lucide-react";
import CreateButton from "../components/CreateButton/index.jsx";

const Home = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [projects, setProjects] = useState([]);
    const [isLoading, setIsLoading] = useState(false);

    const handleNewProject = (projectData) => {
        // Pegamos a antiga lista e colocamos o novo projeto no início.
        setProjects((prevProjects) => [projectData, ...prevProjects]);
    }

    useEffect(() => {
        const getProjects = async () => {
            setIsLoading(true);
            try {
                const response = await api.get('/project/', {});
                setProjects(response.data);

            } catch (err) {
                console.log(err);

            } finally {
                setIsLoading(false);

            }
        }
        getProjects();
    }, [api]);

    return (
        <div className="min-h-screen">
            <Header />

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">

                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900">My Projects</h1>
                        <p className="text-gray-500 text-sm mt-1">Manage your projects and tasks</p>
                    </div>

                    <CreateButton 
                        children={'Project'}
                        onClick={() => setIsModalOpen(true)}
                    />
                </div>

                {isLoading && (
                    <div className="text-center py-10 text-gray-500">Loading...</div>
                )}

                {!isLoading && projects.length === 0 && (
                    <div className="text-center py-20 bg-white rounded-xl border border-dashed border-gray-300">
                        <p className="text-gray-500">No projects created...</p>
                    </div>
                )}

                {/* CARD */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          
                    {projects.map((project) => (
                        // Sempre colocar o id no key, importante para a performance do react.
                        <ProjectCard key={project.id} project={project} />
                    ))}

                </div>

            </main>

            <CreateProjectModal 
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onProjectCreated={handleNewProject} // Passamos a função
            />

        </div>
    );
}

export default Home;