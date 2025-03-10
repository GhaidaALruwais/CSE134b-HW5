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
        projects.forEach((project, index) => {
            const li = document.createElement("li");
            li.textContent = `${project.title} - ${project.description}`;
            li.dataset.index = index;
            li.addEventListener("click", () => loadProjectToForm(index));
            projectList.appendChild(li);
        });
    }

    function loadProjectToForm(index) {
        const projects = JSON.parse(localStorage.getItem("projects")) || [];
        const project = projects[index];
        if (project) {
            titleInput.value = project.title;
            imageInput.value = project.image;
            altInput.value = project.alt;
            descriptionInput.value = project.description;
            linkInput.value = project.link;
            updateBtn.dataset.index = index;
            deleteBtn.dataset.index = index;
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

    loadProjects();
});