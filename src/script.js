document.addEventListener("DOMContentLoaded", () => {
  // =================================================================================
  // THEME TOGGLE
  // This section handles the light/dark mode functionality.
  // =================================================================================
  const themeToggleBtn = document.createElement("button");
  themeToggleBtn.className =
    "p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors";
  const sunIcon = `<svg class="w-5 h-5 sm:w-6 sm:h-6" style="color: var(--text-secondary);" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>`;
  const moonIcon = `<svg class="w-5 h-5 sm:w-6 sm:h-6" style="color: var(--text-secondary);" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M20.354 15.354A9 9 0 018.646 3.646 9.003 9.003 0 0012 21a9.003 9.003 0 008.354-5.646z"></path></svg>`;

  const applyTheme = (theme) => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
      themeToggleBtn.innerHTML = sunIcon;
    } else {
      document.documentElement.classList.remove("dark");
      themeToggleBtn.innerHTML = moonIcon;
    }
  };

  let currentTheme = localStorage.getItem("stackit_theme") || "light";
  applyTheme(currentTheme);

  themeToggleBtn.addEventListener("click", () => {
    currentTheme = document.documentElement.classList.contains("dark")
      ? "light"
      : "dark";
    localStorage.setItem("stackit_theme", currentTheme);
    applyTheme(currentTheme);
  });

  // =================================================================================
  // DATABASE & STATE
  // =================================================================================
  let db = {
    users: JSON.parse(localStorage.getItem("stackit_users")) || [
      {
        id: 1,
        name: "Admin",
        username: "admin",
        contact: "admin@example.com",
        password: "Password123!",
      },
    ],
    questions: JSON.parse(localStorage.getItem("stackit_questions")) || [],
    answers: JSON.parse(localStorage.getItem("stackit_answers")) || [],
    votes: JSON.parse(localStorage.getItem("stackit_votes")) || [],
    questionVotes:
      JSON.parse(localStorage.getItem("stackit_questionVotes")) || [],
    notifications:
      JSON.parse(localStorage.getItem("stackit_notifications")) || [],
    currentUser:
      JSON.parse(sessionStorage.getItem("stackit_currentUser")) || null,
  };

  const saveDb = () =>
    Object.keys(db).forEach((key) => {
      if (key !== "currentUser")
        localStorage.setItem(`stackit_${key}`, JSON.stringify(db[key]));
    });

  // =================================================================================
  // HELPER FUNCTIONS
  // =================================================================================
  const formatTimeAgo = (dateString) => {
    const date = new Date(dateString);
    const now = new Date();
    const seconds = Math.round((now - date) / 1000);
    const minutes = Math.round(seconds / 60);
    const hours = Math.round(minutes / 60);
    const days = Math.round(hours / 24);

    if (seconds < 60) return `${seconds}s ago`;
    if (minutes < 60) return `${minutes}m ago`;
    if (hours < 24) return `${hours}h ago`;
    if (days < 7) return `${days}d ago`;
    return date.toLocaleDateString();
  };
});
