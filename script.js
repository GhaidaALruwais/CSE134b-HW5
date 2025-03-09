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
});