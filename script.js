const menuButton = document.querySelectorAll(".menu-button");
const screenOverlay = document.querySelector(".screen-overlay");
const themeButton = document.querySelector(".theme-button i");
const videoList = document.querySelector(".video-list");

if (localStorage.getItem("darkMode") === "enabled") {
  document.body.classList.add("dark-mode");
  themeButton.classList.replace("fa-moon", "fa-sun");
} else {
  themeButton.classList.replace("fa-sun", "fa-moon");
}

//Toggle dark mode when theme button is clicked
themeButton.addEventListener("click", () => {
  const isDarkMode = document.body.classList.toggle("dark-mode");
  localStorage.setItem("darkMode", isDarkMode ? "enabled" : "disabled");
  themeButton.classList.toggle("fa-sun", isDarkMode);
  themeButton.classList.toggle("fa-moon", !isDarkMode);
});

//Toggle sidebar visibility when menu buttons are clicked
menuButton.forEach((button) => {
  button.addEventListener("click", () => {
    document.body.classList.toggle("sidebar-hidden");
  });
});

//Toggle sidebar visibility when screen overlay is clicked
screenOverlay.addEventListener("click", () => {
  document.body.classList.toggle("sidebar-hidden");
});

//show sidebar on large screens by default
if (window.innerWidth >= 768) {
  document.body.classList.remove("sidebar-hidden");
}

//get videos from json file usiong fetch method
async function loadVideos() {
  try {
    const response = await fetch("video_details.json");
    if (!response.ok) {
      throw new Error("Failed to load videos");
    }
    const videos = await response.json();
    displayVideos(videos);
  } catch (error) {
    console.error("Error:", error);
    document.getElementById("video-list").innerHTML =
      "<p>Error loading videos. Check console.</p>";
  }
}

//use a template to display video cards
function displayVideos(videos) {
  console.log(videos.map((video) => video));
  videoList.innerHTML = videos
    .map(
      (video) => `
    <a class="video-card">
    <div class="thumbnail-container">
    <img
    src="${video.ThumbnailURL}"
    alt="${video.Title}"
    class="thumbnail" />
    <p class="duration">${video.Duration}</p>
    </div>
    <div class="video-info">
    <img src="images/logo.png" alt="Channel logo" class="icon" />
    <div class="video-details">
    <h2 class="title">
        ${video.Title}
    </h2>
    <p class="channel-name">${video["Channel Name"]}</p>
    <p class="views">${video.Views}</p>
    </div>
    </div>
    </a>
    `
    )
    .join("");
}

//load videos when page is ready
document.addEventListener("DOMContentLoaded", loadVideos);
