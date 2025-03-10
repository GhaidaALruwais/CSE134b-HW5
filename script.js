document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("modeToggle");
    const themeIcons = document.querySelectorAll(".icon");
    const video = document.getElementById("backgroundVideo");
    const videoSource = document.getElementById("videoSource");

    let currentTheme = localStorage.getItem("theme") || "dark"; // Default to dark mode

    if (!btn) {
        console.error("Toggle button not found!");
        return;
    }
    
    if (!video || !videoSource) {
        console.error("Video or source not found!");
        return;
    }

    // Define video sources
    const videoDark = "videoOverlayPersonalPor.mp4";
    const videoLight = "videoOverlayLight.mp4";

    // Apply stored theme
    applyTheme(currentTheme);

    btn.addEventListener("click", function () {
        console.log("Toggle button clicked!");
        currentTheme = (currentTheme === "dark") ? "light" : "dark";
        applyTheme(currentTheme);
        localStorage.setItem("theme", currentTheme);
    });

    function applyTheme(theme) {
        console.log("Applying theme:", theme);
        document.body.setAttribute("theme", theme);

        // Change the icon source
        themeIcons.forEach((icon) => {
            const newSrc = theme === "dark" ? icon.getAttribute("src-dark") : icon.getAttribute("src-light");
            if (newSrc) {
                icon.src = newSrc;
            }
        });

        // Change the video source dynamically
        const newVideoSrc = theme === "dark" ? videoDark : videoLight;

        if (videoSource.getAttribute("src") !== newVideoSrc) {
            videoSource.setAttribute("src", newVideoSrc);
            video.load(); 
            video.play(); 
        }
    }
    const projectContainer = document.getElementById("project-container");
    const loadLocalBtn = document.getElementById("loadLocal");
    const loadRemoteBtn = document.getElementById("loadRemote");

    //replace
    const JSONBIN_ID = "67cd2979ad19ca34f818fd0a";
    const JSONBIN_API_URL = `https://api.jsonbin.io/v3/b/67cd2979ad19ca34f818fd0a`;

    class ProjectCard extends HTMLElement {
        constructor() {
            super();
            this.attachShadow({ mode: "open" });
        }
        connectedCallback() {
            this.render();
        }
        render() {
            this.shadowRoot.innerHTML = `
                <style>
                    :host {
                        display: block;
                        border: 1px solid #ddd;
                        border-radius: 8px;
                        padding: 10px;
                        margin: 10px;
                        background-color: var(--card-bg, #fff);
                        box-shadow: 0px 4px 6px rgba(0, 0, 0, 0.1);
                    }
                    h2 { margin: 0; font-size: 1.5em; }
                    picture img {
                        width: 100%;
                        height: auto;
                        border-radius: 5px;
                    }
                    p { font-size: 1em; color: #444; }
                    a {
                        color: var(--link-color, #57606a);
                        text-decoration: none;
                        font-weight: bold;
                    }
                </style>
                <h2>${this.getAttribute("title")}</h2>
                <picture>
                    <img src="${this.getAttribute("image")}" alt="${this.getAttribute("alt")}">
                </picture>
                <p>${this.getAttribute("description")}</p>
                <a href="${this.getAttribute("link")}" target="_blank">Read more</a>
            `;
        }
    }
    customElements.define("project-card", ProjectCard);

    function loadProjects(data) {
        if (!Array.isArray(data)) {
            console.error("Error: Expected an array but got", data);
            return;
        }
        projectContainer.innerHTML = "";
        data.forEach(project => {
            const card = document.createElement("project-card");
            card.setAttribute("title", project.title);
            card.setAttribute("image", project.image);
            card.setAttribute("alt", project.alt);
            card.setAttribute("description", project.description);
            card.setAttribute("link", project.link);
            projectContainer.appendChild(card);
        });
    }

    function saveProjectsToLocalStorage(projects) {
        localStorage.setItem("projects", JSON.stringify(projects));
    }

    loadLocalBtn.addEventListener("click", function() {
        let localData = JSON.parse(localStorage.getItem("projects")) || [];
        loadProjects(localData);
    });

    loadRemoteBtn.addEventListener("click", function() {
        fetch(JSONBIN_API_URL, {
            headers: { "X-Master-Key": "$2a$10$K5renhiXAbYvSZsHP4QAlutyXiUNMw0623LSdq9TNxDmvNS/71qlu" }  //replace
        })
        .then(response => response.json())
        .then(data => {
            console.log("Raw JSONBin Response:", data); 
            const remoteProjects = data.record?.projects; 

            if (!Array.isArray(remoteProjects)) {
                console.error("Error: Expected an array but got", remoteProjects);
                return;
            }
            let localProjects = JSON.parse(localStorage.getItem("projects")) || [];

            const projectMap = new Map(remoteProjects.map(p => [p.title, p]));

            // Adding if they don't already exist
            localProjects.forEach(rp => {
                if (!projectMap.has(rp.title)) {
                    projectMap.set(rp.title, rp);
                }
            });
            const mergedProjects = Array.from(projectMap.values());

            localStorage.setItem("projects", JSON.stringify(mergedProjects));
            loadProjects(mergedProjects);
        })
        .catch(error => console.error("Error fetching remote data:", error));
    });

    function initializeLocalStorage() {
        let storedData = localStorage.getItem("projects");
        try {
            storedData = JSON.parse(storedData);
            if (!Array.isArray(storedData)) throw new Error("Data is not an array");
        } catch (error) {
            console.warn("Invalid localStorage data. Resetting to default.", error);
            storedData = [];
            saveProjectsToLocalStorage(storedData);
        }
    }

    initializeLocalStorage();
});
