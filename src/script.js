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

  // =================================================================================
  // TEMPLATES
  // =================================================================================
  const pageTemplates = {
    home: () => `
                <div class="flex flex-col sm:flex-row justify-between items-center mb-6 gap-4">
                    <h1 class="text-2xl sm:text-3xl font-bold">All Questions</h1>
                    <button class="w-full sm:w-auto text-white px-4 py-2 rounded-lg font-semibold transition-transform hover:scale-105 nav-link" data-page="ask" style="background-color: var(--accent-color); color: var(--accent-text);">Ask Question</button>
                </div>
                <div id="filter-controls" class="p-4 rounded-lg mb-6 flex flex-col sm:flex-row flex-wrap gap-4 items-center" style="background-color: var(--bg-secondary); border: 1px solid var(--border-color);">
                    <input type="search" id="search-input" placeholder="Search questions..." class="w-full sm:flex-grow p-2 border rounded-lg" style="background-color: var(--bg-primary); border-color: var(--border-color);">
                    <div class="w-full sm:w-auto grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <select id="tag-filter" class="p-2 border rounded-lg" style="background-color: var(--bg-primary); border-color: var(--border-color);"><option value="all">All Tags</option></select>
                        <select id="sort-filter" class="p-2 border rounded-lg" style="background-color: var(--bg-primary); border-color: var(--border-color);">
                            <option value="newest">Newest</option>
                            <option value="oldest">Oldest</option>
                            <option value="votes">Most Votes</option>
                        </select>
                        <select id="status-filter" class="p-2 border rounded-lg" style="background-color: var(--bg-primary); border-color: var(--border-color);">
                            <option value="all">All Status</option>
                            <option value="answered">Answered</option>
                            <option value="unanswered">Unanswered</option>
                        </select>
                    </div>
                </div>
                <div id="question-list" class="space-y-4"></div>`,
    ask: () => `
                <div class="max-w-4xl mx-auto">
                    <h1 class="text-2xl sm:text-3xl font-bold mb-2">Ask a Public Question</h1>
                    <p style="color: var(--text-secondary);" class="mb-6 sm:mb-8 text-sm sm:text-base">Get answers to your programming-related questions from the community.</p>
                    <form id="ask-question-form" class="p-4 sm:p-8 rounded-xl border shadow-sm space-y-6" style="background-color: var(--bg-secondary); border-color: var(--border-color);">
                        <div><label for="question-title" class="block text-sm font-bold mb-2">Title</label><p class="text-xs mb-2" style="color: var(--text-secondary);">Be specific and imagine you’re asking a question to another person.</p><input type="text" id="question-title" placeholder="e.g. How do I center a div?" class="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:border-transparent" style="background-color: var(--bg-primary); border-color: var(--border-color); --tw-ring-color: var(--accent-color);"></div>
                        <div><label class="block text-sm font-bold mb-2">Description</label><p class="text-xs mb-2" style="color: var(--text-secondary);">Include all the information someone would need to answer your question.</p><div id="editor-container" style="background-color: var(--bg-secondary);"></div></div>
                        <div><label for="question-tags-input" class="block text-sm font-bold mb-2">Tags</label><p class="text-xs mb-2" style="color: var(--text-secondary);">Add up to 5 tags to describe what your question is about. Press Enter or comma to add a tag.</p><div id="tags-container" class="flex flex-wrap items-center gap-2 p-2 border rounded-lg" style="background-color: var(--bg-primary); border-color: var(--border-color);"><input type="text" id="question-tags-input" placeholder="e.g. (react javascript css)" class="flex-grow p-1 focus:outline-none bg-transparent"></div></div>
                        <div class="pt-4"><button type="submit" class="w-full sm:w-auto px-8 py-3 rounded-lg text-sm font-semibold transition-all hover:scale-105 focus:outline-none focus:ring-2 focus:ring-offset-2" style="background-color: var(--accent-color); color: var(--accent-text); --tw-ring-color: var(--accent-color);">Post Your Question</button></div>
                    </form>
                </div>`,
    detail: (args) => {
      const [q, ans] = args;
      const isAuthor = db.currentUser && db.currentUser.username === q.author;
      const truncatedTitle =
        q.title.length > 40 ? q.title.substring(0, 40) + "..." : q.title;

      return `
                <nav aria-label="breadcrumb" class="mb-4 text-sm" style="color: var(--text-secondary);">
                    <ol class="flex items-center space-x-2">
                        <li>
                            <a href="#" class="nav-link hover:underline" data-page="home" style="color: var(--accent-color);">Home</a>
                        </li>
                        <li>
                            <span class="mx-1 sm:mx-2">/</span>
                        </li>
                        <li class="truncate" aria-current="page">
                            ${truncatedTitle}
                        </li>
                    </ol>
                </nav>
                <div class="p-4 sm:p-8 rounded-xl border" style="background-color: var(--bg-secondary); border-color: var(--border-color);">
                    <div class="flex flex-col sm:flex-row gap-4">
                        <div class="flex-1">
                            <div class="flex justify-between items-start">
                                <h1 class="text-2xl sm:text-3xl font-bold mb-2">${
                                  q.title
                                }</h1>
                                ${
                                  isAuthor
                                    ? `<button id="delete-question-btn" data-question-id="${q.id}" class="p-2 rounded-full hover:bg-red-500/10 text-red-500" title="Delete Question"><svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>`
                                    : ""
                                }
                            </div>
                            <div class="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4 mb-4 text-sm" style="color: var(--text-secondary);">
                                <span>Asked ${formatTimeAgo(q.createdAt)}</span>
                                <span>by ${q.author}</span>
                            </div>
                            <div class="flex flex-wrap items-center gap-2 mb-4">${q.tags
                              .map(
                                (t) =>
                                  `<span class="tag-item px-2.5 py-1 rounded-full text-xs font-medium">${t}</span>`
                              )
                              .join("")}</div>
                            <div class="prose dark:prose-invert max-w-none mb-8" style="color: var(--text-primary);">${
                              q.description
                            }</div>
                        </div>
                    </div>
                    <hr style="border-color: var(--border-color);"/>
                    <h2 class="text-xl sm:text-2xl font-bold mt-8 mb-4">${
                      ans.length
                    } Answers</h2>
                    <div id="answer-list" class="space-y-6">${
                      ans.map((a) => answerTemplate(a, q)).join("") ||
                      "<p>No answers yet.</p>"
                    }</div>
                </div>
                <div id="answer-form-container" class="p-4 sm:p-8 mt-6 rounded-xl border shadow-sm" style="background-color: var(--bg-secondary); border-color: var(--border-color);"></div>`;
    },
    login: () => `
                <div class="max-w-md mx-auto p-6 sm:p-8 rounded-xl shadow-lg border" style="background-color: var(--bg-secondary); border-color: var(--border-color);">
                    <h2 class="text-2xl sm:text-3xl font-bold text-center mb-2">Welcome Back!</h2>
                    <p class="text-center mb-6 sm:mb-8" style="color: var(--text-secondary);">Login to continue to StackIt.</p>
                    <form id="login-form" class="space-y-6">
                        <div><label for="login-contact" class="block text-sm font-medium">Email or Phone</label><input type="text" id="login-contact" class="mt-1 w-full p-3 border rounded-lg" style="background-color: var(--bg-primary); border-color: var(--border-color);" required></div>
                        <div><label for="login-password" class="block text-sm font-medium">Password</label><input type="password" id="login-password" class="mt-1 w-full p-3 border rounded-lg" style="background-color: var(--bg-primary); border-color: var(--border-color);" required></div>
                        <div><button type="submit" class="w-full text-white py-3 rounded-lg font-semibold transition-transform hover:scale-105" style="background-color: var(--accent-color); color: var(--accent-text);">Login</button></div>
                    </form>
                    <p class="text-center text-sm mt-8" style="color: var(--text-secondary);">Don't have an account? <a href="#" class="font-semibold hover:underline nav-link" data-page="signup" style="color: var(--accent-color);">Sign Up</a></p>
                </div>`,
    signup: () => `
                <div class="max-w-md mx-auto p-6 sm:p-8 rounded-xl shadow-lg border" style="background-color: var(--bg-secondary); border-color: var(--border-color);">
                    <h2 class="text-2xl sm:text-3xl font-bold text-center mb-2">Create an Account</h2>
                    <p class="text-center mb-6 sm:mb-8" style="color: var(--text-secondary);">Join our community to ask and answer questions.</p>
                    <form id="signup-form" class="space-y-4">
                        <div><label for="signup-name" class="block text-sm font-medium">Full Name</label><input type="text" id="signup-name" class="mt-1 w-full p-3 border rounded-lg" style="background-color: var(--bg-primary); border-color: var(--border-color);" required></div>
                        <div><label for="signup-username" class="block text-sm font-medium">Username</label><input type="text" id="signup-username" class="mt-1 w-full p-3 border rounded-lg" style="background-color: var(--bg-primary); border-color: var(--border-color);" required></div>
                        <div><label for="signup-contact" class="block text-sm font-medium">Email or Phone</label><input type="text" id="signup-contact" class="mt-1 w-full p-3 border rounded-lg" style="background-color: var(--bg-primary); border-color: var(--border-color);" required></div>
                        <div><label for="signup-password" class="block text-sm font-medium">Password</label><input type="password" id="signup-password" class="mt-1 w-full p-3 border rounded-lg" style="background-color: var(--bg-primary); border-color: var(--border-color);" required></div>
                        <div class="strength-meter mt-2"><div id="strength-bar" class="w-0"></div></div>
                        <div id="strength-text" class="strength-text" style="color: var(--text-secondary);"></div>
                        <div><button type="submit" class="w-full text-white py-3 rounded-lg font-semibold transition-transform hover:scale-105" style="background-color: var(--accent-color); color: var(--accent-text);">Create Account</button></div>
                    </form>
                    <p class="text-center text-sm mt-8" style="color: var(--text-secondary);">Already have an account? <a href="#" class="font-semibold hover:underline nav-link" data-page="login" style="color: var(--accent-color);">Login</a></p>
                </div>`,
  };

  const answerTemplate = (answer, question) => {
    const vote = db.currentUser
      ? db.votes.find(
          (v) => v.userId === db.currentUser.id && v.answerId === answer.id
        )
      : null;
    const isAuthor =
      db.currentUser && db.currentUser.username === question.author;
    return `<div class="flex flex-col sm:flex-row gap-4"><div class="flex flex-row sm:flex-col items-center gap-2 sm:gap-1" style="color: var(--text-secondary);"><button class="vote-btn p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-transform hover:scale-110 ${
      vote?.type === "up" ? "voted-up" : ""
    }" data-vote="up" data-answer-id="${
      answer.id
    }">▲</button><span class="font-bold text-lg">${
      answer.votes
    }</span><button class="vote-btn p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-transform hover:scale-110 ${
      vote?.type === "down" ? "voted-down" : ""
    }" data-vote="down" data-answer-id="${answer.id}">▼</button>${
      isAuthor
        ? `<button class="accept-btn text-gray-400 hover:text-green-500 transition-transform hover:scale-110 ${
            question.acceptedAnswerId === answer.id ? "accepted" : ""
          }" data-accept-id="${answer.id}" data-question-id="${
            question.id
          }">✔</button>`
        : question.acceptedAnswerId === answer.id
        ? '<span class="text-green-500">✔</span>'
        : ""
    }</div><div class="flex-1"><div class="prose dark:prose-invert max-w-none">${
      answer.content
    }</div><div class="text-sm mt-2" style="color: var(--text-secondary);">answered ${formatTimeAgo(
      answer.createdAt
    )} by ${answer.author}</div></div></div>`;
  };

  // =================================================================================
  // ROUTER & PAGE RENDERING
  // =================================================================================
  const pages = {
    home: document.getElementById("page-home"),
    ask: document.getElementById("page-ask"),
    detail: document.getElementById("page-detail"),
    login: document.getElementById("page-login"),
    signup: document.getElementById("page-signup"),
  };

  const showPage = (pageId, args = [], fromHistory = false) => {
    if (!pages[pageId]) {
      console.error(`Page "${pageId}" not found.`);
      return;
    }

    Object.values(pages).forEach((p) => p.classList.remove("active"));
    const page = pages[pageId];
    page.innerHTML = pageTemplates[pageId](args);
    page.classList.add("active");
    window.scrollTo(0, 0);

    if (!fromHistory) {
      let urlPath = `/${pageId}`;
      if (pageId === "detail" && args[0]) {
        urlPath += `/${args[0].id}`;
      }
      history.pushState({ page: pageId, args }, "", `#${urlPath}`);
    }

    if (pageId === "home") initHomePage();
    if (pageId === "ask") initAskPage();
    if (pageId === "detail") initDetailPage(args[0], args[1]);
    if (pageId === "login") initLoginPage();
    if (pageId === "signup") initSignupPage();
  };

  window.onpopstate = (event) => {
    if (event.state) {
      showPage(event.state.page, event.state.args, true);
    }
  };

  const handleInitialLoad = () => {
    const path = window.location.hash.substring(1);
    if (path) {
      const [_, pageId, param] = path.split("/");
      if (pageId === "detail" && param) {
        const questionId = parseInt(param);
        const question = db.questions.find((q) => q.id === questionId);
        if (question) {
          const answers = db.answers.filter((a) => a.questionId === questionId);
          showPage("detail", [question, answers], true);
          return;
        }
      }
      if (pages[pageId]) {
        showPage(pageId, [], true);
        return;
      }
    }
    showPage("home");
  };

});
