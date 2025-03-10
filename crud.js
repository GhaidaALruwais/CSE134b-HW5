document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("project-form");
    const projectList = document.getElementById("project-list");
    const titleInput = document.getElementById("title");
    const imageInput = document.getElementById("image");
    const altInput = document.getElementById("alt");
    const descriptionInput = document.getElementById("description");
    const linkInput = document.getElementById("link");

    const createBtn = document.getElementById("create");
    const updateBtn = document.getElementById("update");
    const deleteBtn = document.getElementById("delete");


    function loadProjects() {
        projectList.innerHTML = "";
        const projects = JSON.parse(localStorage.getItem("projects")) || [];
        projects.forEach((project) => {
            const li = document.createElement("li");
            li.textContent = `${project.title} - ${project.description}`;
            li.addEventListener("click", () => loadProjectToForm(project.title));
            projectList.appendChild(li);
        });
    }

    function loadProjectToForm(title) {
        const projects = JSON.parse(localStorage.getItem("projects")) || [];
        const project = projects.find(p => p.title === title);
        if (project) {
            titleInput.value = project.title;
            imageInput.value = project.image;
            altInput.value = project.alt;
            descriptionInput.value = project.description;
            linkInput.value = project.link;
        }
    }

    createBtn.addEventListener("click", function() {
        const projects = JSON.parse(localStorage.getItem("projects")) || [];
        projects.push({
            title: titleInput.value,
            image: imageInput.value,
            alt: altInput.value,
            description: descriptionInput.value,
            link: linkInput.value
        });
        localStorage.setItem("projects", JSON.stringify(projects));
        loadProjects();
        form.reset();
    });

    updateBtn.addEventListener("click", function() {
        let projects = JSON.parse(localStorage.getItem("projects")) || [];
        const title = titleInput.value;
        const projectIndex = projects.findIndex(project => project.title === title);
        
        if (projectIndex !== -1) {
            projects[projectIndex] = {
                title: titleInput.value,
                image: imageInput.value,
                alt: altInput.value,
                description: descriptionInput.value,
                link: linkInput.value
            };
            localStorage.setItem("projects", JSON.stringify(projects));
            loadProjects();
            form.reset();
        } else {
            alert("Project not found! Make sure the title is correct.");
        }
    });

    deleteBtn.addEventListener("click", function() {
        let projects = JSON.parse(localStorage.getItem("projects")) || [];
        const title = titleInput.value;
        const projectIndex = projects.findIndex(project => project.title === title);
        
        if (projectIndex !== -1) {
            projects.splice(projectIndex, 1);
            localStorage.setItem("projects", JSON.stringify(projects));
            loadProjects();
            form.reset();
        } else {
            alert("Project not found! Make sure the title is correct.");
        }
    });

    loadProjects();
});