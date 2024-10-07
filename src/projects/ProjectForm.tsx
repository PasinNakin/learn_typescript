import { SyntheticEvent, useState } from "react";
import { Project } from "./Project";

interface ProjectFormProps {
    project: Project;
    onSave: (project: Project) => void;
    onCancel: () => void;
}

function ProjectForm({
    project: initialProject,
    onSave,
    onCancel,
}: ProjectFormProps) {
    const [project, setProject] = useState(initialProject);
    const [error, setError] = useState({
        name: "",
        description: "",
        budget: "",
    });

    const HandleSubmit = (event: SyntheticEvent) => {
        event.preventDefault();
        if (!isValid()) return;
        onSave(project);
    };

    const handleChange = (event: any) => {
        const { type, name, value, checked } = event.target;
        let updatedValue = type === "checkbox" ? checked : value;

        if (type === "number") {
            updatedValue = Number(updatedValue);
        }

        const change = {
            [name]: updatedValue,
        };

        let updatedProject: Project;
        setProject((p) => {
            updatedProject = new Project({ ...p, ...change });
            return updatedProject;
        });
        setError(() => validate(updatedProject));
    };

    function validate(project: Project) {
        let error: any = { name: "", description: "", budget: "" };
        if (project.name.length === 0) {
            error.name = "Name is required.";
        }
        if (project.name.length > 0 && project.name.length < 3) {
            error.name = "Name need to be at least 3 characters.";
        }
        if (project.description.length === 0) {
            error.description = "Description is required.";
        }
        if (project.budget === 0) {
            error.budget = "Budget is must be more than $0";
        }
        return error;
    }

    function isValid() {
        return (
            error.name.length === 0 &&
            error.description.length === 0 &&
            error.budget.length === 0
        );
    }

    return (
        <form className="input-group vertical" onSubmit={HandleSubmit}>
            <label htmlFor="name">Project Name</label>
            <input
                type="text"
                name="name"
                placeholder="enter name"
                value={project.name}
                onChange={handleChange}
            />
            {error.name.length > 0 && (
                <div className="card error">
                    <p>{error.name}</p>
                </div>
            )}

            <label htmlFor="description">Project Description</label>
            <textarea
                name="description"
                placeholder="enter description"
                value={project.description}
                onChange={handleChange}
            />
            {error.description.length > 0 && (
                <div className="card error">
                    <p>{error.description}</p>
                </div>
            )}

            <label htmlFor="budget">Project Budget</label>
            <input
                type="number"
                name="budget"
                placeholder="enter budget"
                value={project.budget}
                onChange={handleChange}
            />
            {error.budget.length > 0 && (
                <div className="card error">
                    <p>{error.budget}</p>
                </div>
            )}

            <label htmlFor="isActive">Active?</label>
            <input
                type="checkbox"
                name="isActive"
                checked={project.isActive}
                onChange={handleChange}
            />
            <div className="input-group">
                <button className="primary bordered medium">save</button>
                <span />
                <button
                    type="button"
                    className="bordered medium"
                    onClick={onCancel}
                >
                    cancel
                </button>
            </div>
        </form>
    );
}

export default ProjectForm;
