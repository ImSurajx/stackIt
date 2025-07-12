document.addEventListener("DOMContentLoaded", () => {
  let currentPage = 1;
  const questionsPerPage = 8;

  // =================================================================================
  // DUMMY DATA INITIALIZATION
  // =================================================================================
  const initDummyData = () => {
    const dummyUsers = [
      {
        id: 1,
        name: "Admin",
        username: "admin",
        contact: "admin@example.com",
        password: "Password123!",
      },
      {
        id: 2,
        name: "Alice",
        username: "alice",
        contact: "alice@example.com",
        password: "alice123",
      },
      {
        id: 3,
        name: "Bob",
        username: "bob",
        contact: "bob@example.com",
        password: "bob456",
      },
      {
        id: 4,
        name: "Charlie",
        username: "charlie",
        contact: "charlie@example.com",
        password: "charlie789",
      },
    ];

    const dummyQuestions = [
      {
        id: 101,
        title: "How to manage state in a large React application?",
        description:
          "<p>I'm building a complex app with many components that need to share state. Prop drilling is becoming a nightmare. What are the best practices for state management? I've heard of Redux and Context API, but I'm not sure which one to choose.</p>",
        tags: ["react", "state-management", "javascript"],
        author: "alice",
        votes: 15,
        createdAt: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(),
        acceptedAnswerId: 202,
      },
      {
        id: 102,
        title:
          "What is the difference between `let`, `const`, and `var` in JavaScript?",
        description:
          "<p>I'm new to modern JavaScript and I see these three ways to declare variables. When should I use each one? What are the scoping rules for them? An example would be very helpful!</p>",
        tags: ["javascript", "es6", "variables"],
        author: "bob",
        votes: 22,
        createdAt: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(),
        acceptedAnswerId: null,
      },
      {
        id: 103,
        title:
          "How can I center a div both horizontally and vertically with CSS?",
        description:
          "<p>This seems like it should be simple, but I always struggle with it. I've tried using margins, positioning, and other tricks, but they don't always work. What is the most reliable, modern way to perfectly center an element using CSS Flexbox or Grid?</p>",
        tags: ["css", "flexbox", "layout"],
        author: "charlie",
        votes: 30,
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
        acceptedAnswerId: 201,
      },
      {
        id: 104,
        title: "Best way to fetch data in a React component?",
        description:
          "<p>What is the recommended way to fetch data from an API when a component mounts? Should I use the `useEffect` hook? Are there any libraries that make this easier, like SWR or React Query?</p>",
        tags: ["react", "api", "hooks"],
        author: "alice",
        votes: 8,
        createdAt: new Date(Date.now() - 10 * 60 * 1000).toISOString(),
        acceptedAnswerId: null,
      },
      {
        id: 105,
        title: "What are closures in JavaScript?",
        description:
          "<p>I keep hearing about closures but I don't fully understand what they are or why they are useful. Can someone explain it in simple terms?</p>",
        tags: ["javascript", "closures", "functions"],
        author: "bob",
        votes: 18,
        createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000).toISOString(),
        acceptedAnswerId: null,
      },
      {
        id: 106,
        title: "How to use async/await with Array.prototype.map()?",
        description:
          "<p>I am trying to use an async function inside a `.map()` to process an array of items, but it seems to return an array of Promises instead of the resolved values. How can I correctly use `async/await` with `map`?</p>",
        tags: ["javascript", "async-await", "promises"],
        author: "charlie",
        votes: 11,
        createdAt: new Date(Date.now() - 6 * 24 * 60 * 60 * 1000).toISOString(),
        acceptedAnswerId: null,
      },
      {
        id: 107,
        title: "What is the purpose of a .gitignore file?",
        description:
          "<p>I see a `.gitignore` file in almost every project repository. What does it do and what kind of files should I include in it?</p>",
        tags: ["git", "version-control"],
        author: "alice",
        votes: 25,
        createdAt: new Date(Date.now() - 8 * 24 * 60 * 60 * 1000).toISOString(),
        acceptedAnswerId: null,
      },
      {
        id: 108,
        title: "CSS Grid vs. Flexbox: Which one should I use?",
        description:
          "<p>When should I use CSS Grid and when should I use Flexbox? What are the key differences and strengths of each layout model?</p>",
        tags: ["css", "grid", "flexbox", "layout"],
        author: "bob",
        votes: 19,
        createdAt: new Date(
          Date.now() - 10 * 24 * 60 * 60 * 1000
        ).toISOString(),
        acceptedAnswerId: null,
      },
      {
        id: 109,
        title: "How to properly handle errors in an Express.js application?",
        description:
          "<p>What is the standard way to handle errors in an Express app? Should I use middleware? How do I handle both synchronous and asynchronous errors?</p>",
        tags: ["nodejs", "express", "error-handling"],
        author: "charlie",
        votes: 14,
        createdAt: new Date(
          Date.now() - 12 * 24 * 60 * 60 * 1000
        ).toISOString(),
        acceptedAnswerId: null,
      },
    ];

    const dummyAnswers = [
      {
        id: 201,
        questionId: 103,
        author: "alice",
        votes: 18,
        content:
          "<p>Using Flexbox is the easiest way! Just apply these three properties to the parent container:</p><pre><code>.parent-container {\n  display: flex;\n  justify-content: center; /* Horizontal centering */\n  align-items: center;    /* Vertical centering */\n}</code></pre>",
        createdAt: new Date(Date.now() - 20 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 202,
        questionId: 101,
        author: "bob",
        votes: 12,
        content:
          "<p>For most apps, React's built-in <strong>Context API</strong> is sufficient and easier to set up than Redux. You can create a context for your shared state and use a provider to wrap your component tree. Use Redux only when you have very complex state logic or need advanced middleware and developer tools.</p>",
        createdAt: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(),
      },
      {
        id: 203,
        questionId: 102,
        author: "charlie",
        votes: 25,
        content:
          "<ul><li>Use <code>const</code> by default.</li><li>Use <code>let</code> only when you know you need to reassign the variable.</li><li>Avoid using <code>var</code> in modern JavaScript due to its function-scoping and hoisting behavior, which can cause unexpected bugs.</li></ul>",
        createdAt: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(),
      },
    ];

    // Only load dummy data if there's no data already in localStorage
    if (!localStorage.getItem("stackit_users")) {
      localStorage.setItem("stackit_users", JSON.stringify(dummyUsers));
      localStorage.setItem("stackit_questions", JSON.stringify(dummyQuestions));
      localStorage.setItem("stackit_answers", JSON.stringify(dummyAnswers));
      localStorage.setItem("stackit_blockedUsers", JSON.stringify([]));
    }
  };

  initDummyData();

  // =================================================================================
  // THEME TOGGLE
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
    users: JSON.parse(localStorage.getItem("stackit_users")) || [],
    questions: JSON.parse(localStorage.getItem("stackit_questions")) || [],
    answers: JSON.parse(localStorage.getItem("stackit_answers")) || [],
    votes: JSON.parse(localStorage.getItem("stackit_votes")) || [],
    questionVotes:
      JSON.parse(localStorage.getItem("stackit_questionVotes")) || [],
    notifications:
      JSON.parse(localStorage.getItem("stackit_notifications")) || [],
    blockedUsers:
      JSON.parse(localStorage.getItem("stackit_blockedUsers")) || [],
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
            <div id="question-list" class="space-y-4"></div>
            <div id="pagination-controls" class="flex justify-center items-center mt-8 space-x-2"></div>`,
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
      const isAdmin = db.currentUser && db.currentUser.username === "admin";
      const isAuthor = db.currentUser && db.currentUser.username === q.author;
      const showDeleteButton = isAdmin || isAuthor;
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
                              showDeleteButton
                                ? `<button id="delete-question-btn" data-question-id="${q.id}" class="p-2 rounded-full hover:bg-red-500/10 text-red-500" title="Delete Question"><svg class="w-5 h-5 sm:w-6 sm:h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-4v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"></path></svg></button>`
                                : ""
                            }
                        </div>
                        <div class="flex flex-col sm:flex-row items-start sm:items-center gap-1 sm:gap-4 mb-4 text-sm" style="color: var(--text-secondary);">
                            <span>Asked ${formatTimeAgo(q.createdAt)}</span>
                            <div class="flex items-center">
                                <span>by ${q.author}</span>
                                ${
                                  isAdmin &&
                                  q.author !== "admin" &&
                                  !db.blockedUsers.includes(q.author)
                                    ? `<button class="block-user-btn text-xs text-red-500 ml-2 p-1 rounded hover:bg-red-100" data-username="${q.author}">[Block]</button>`
                                    : ""
                                }
                                ${
                                  db.blockedUsers.includes(q.author)
                                    ? '<span class="text-xs text-red-500 font-bold ml-2">[BLOCKED]</span>'
                                    : ""
                                }
                            </div>
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
    const isAdmin = db.currentUser && db.currentUser.username === "admin";
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
    }"><i class="fa-solid fa-arrow-up"></i></button><span class="font-bold text-lg">${
      answer.votes
    }</span><button class="vote-btn p-2 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 transition-transform hover:scale-110 ${
      vote?.type === "down" ? "voted-down" : ""
    }" data-vote="down" data-answer-id="${
      answer.id
    }"><i class="fa-solid fa-arrow-down"></i></button>${
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
    }</div><div class="text-sm mt-2 flex items-center" style="color: var(--text-secondary);">answered ${formatTimeAgo(
      answer.createdAt
    )} by ${answer.author} ${
      isAdmin &&
      answer.author !== "admin" &&
      !db.blockedUsers.includes(answer.author)
        ? `<button class="block-user-btn text-xs text-red-500 ml-2 p-1 rounded hover:bg-red-100" data-username="${answer.author}">[Block]</button>`
        : ""
    } ${
      db.blockedUsers.includes(answer.author)
        ? '<span class="text-xs text-red-500 font-bold ml-2">[BLOCKED]</span>'
        : ""
    }</div></div></div>`;
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

  // =================================================================================
  // MODAL & ALERT
  // =================================================================================
  const alertModal = document.getElementById("alert-modal");
  const confirmModal = document.getElementById("confirm-modal");
  const showAlert = (message) => {
    document.getElementById("alert-message").textContent = message;
    alertModal.classList.add("active");
  };
  const showConfirm = (message, onConfirm) => {
    document.getElementById("confirm-message").textContent = message;
    confirmModal.classList.add("active");

    const confirmBtn = document.getElementById("confirm-ok-btn");
    const cancelBtn = document.getElementById("confirm-cancel-btn");

    const confirmHandler = () => {
      onConfirm();
      closeConfirm();
    };

    const cancelHandler = () => {
      closeConfirm();
    };

    const closeConfirm = () => {
      confirmModal.classList.remove("active");
      confirmBtn.removeEventListener("click", confirmHandler);
      cancelBtn.removeEventListener("click", cancelHandler);
    };

    confirmBtn.addEventListener("click", confirmHandler);
    cancelBtn.addEventListener("click", cancelHandler);
  };
  alertModal.addEventListener("click", () =>
    alertModal.classList.remove("active")
  );

  // =================================================================================
  // AUTHENTICATION & NAVIGATION
  // =================================================================================
  const authContainer = document.getElementById("auth-container");

  const updateUI = () => {
    authContainer.innerHTML = "";
    if (db.currentUser) {
      authContainer.innerHTML = `<span class="hidden sm:block font-semibold">Welcome, ${db.currentUser.name}</span><div class="relative" id="notification-container"></div><button id="logout-btn" class="hover:text-orange-500 text-sm sm:text-base">Logout</button>`;
      initNotifications();
    } else {
      authContainer.innerHTML = `<button class="hover:text-orange-500 nav-link text-sm sm:text-base" data-page="login">Login</button><button class="text-white px-3 py-1.5 sm:px-4 sm:py-2 rounded-lg font-semibold transition-transform hover:scale-105 nav-link text-sm sm:text-base" data-page="signup" style="background-color: var(--accent-color); color: var(--accent-text);">Sign Up</button>`;
    }
    authContainer.appendChild(themeToggleBtn);
  };

  document.body.addEventListener("click", (e) => {
    if (e.target.id === "logout-btn") {
      db.currentUser = null;
      sessionStorage.removeItem("stackit_currentUser");
      updateUI();
      showPage("home");
    }
    const navLink = e.target.closest(".nav-link");
    if (navLink) {
      e.preventDefault();
      const page = navLink.dataset.page;
      if (page === "ask" && !db.currentUser) {
        showAlert("Please login to ask a question.");
        showPage("login");
      } else {
        showPage(page);
      }
    }
    const backBtn = e.target.closest("#back-btn");
    if (backBtn) history.back();

    const forwardBtn = e.target.closest("#forward-btn");
    if (forwardBtn) history.forward();
  });

  // =================================================================================
  // PAGE INITIALIZERS
  // =================================================================================

  const renderQuestions = () => {
    const listEl = document.getElementById("question-list");
    if (!listEl) return;
    const searchInput = document.getElementById("search-input");
    const tagFilter = document.getElementById("tag-filter");
    const sortFilter = document.getElementById("sort-filter");
    const statusFilter = document.getElementById("status-filter");
    const paginationControls = document.getElementById("pagination-controls");

    const searchTerm = searchInput.value.toLowerCase();
    const selectedTag = tagFilter.value;
    const sortBy = sortFilter.value;
    const status = statusFilter.value;

    let filteredQuestions = [...db.questions];

    if (searchTerm) {
      filteredQuestions = filteredQuestions.filter((q) =>
        q.title.toLowerCase().includes(searchTerm)
      );
    }
    if (selectedTag !== "all") {
      filteredQuestions = filteredQuestions.filter((q) =>
        q.tags.includes(selectedTag)
      );
    }
    if (status === "answered") {
      filteredQuestions = filteredQuestions.filter((q) => q.acceptedAnswerId);
    } else if (status === "unanswered") {
      filteredQuestions = filteredQuestions.filter((q) => !q.acceptedAnswerId);
    }

    if (sortBy === "newest") {
      filteredQuestions.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
    } else if (sortBy === "oldest") {
      filteredQuestions.sort(
        (a, b) => new Date(a.createdAt) - new Date(b.createdAt)
      );
    } else if (sortBy === "votes") {
      filteredQuestions.sort((a, b) => (b.votes || 0) - (a.votes || 0));
    }

    // --- PAGINATION LOGIC ---
    const totalPages = Math.ceil(filteredQuestions.length / questionsPerPage);
    if (currentPage > totalPages) {
      currentPage = totalPages || 1;
    }
    const startIndex = (currentPage - 1) * questionsPerPage;
    const paginatedQuestions = filteredQuestions.slice(
      startIndex,
      startIndex + questionsPerPage
    );

    listEl.innerHTML = "";
    if (paginatedQuestions.length === 0) {
      listEl.innerHTML = `<div class="text-center p-8 rounded-lg" style="background-color: var(--bg-secondary);"><p style="color: var(--text-secondary);">No questions found.</p></div>`;
    } else {
      paginatedQuestions.forEach((q, index) => {
        const card = document.createElement("div");
        card.className =
          "p-4 sm:p-6 rounded-xl border transition-all hover:shadow-lg hover:-translate-y-1 question-card-enter";
        card.style.backgroundColor = "var(--bg-secondary)";
        card.style.borderColor = "var(--border-color)";
        card.style.animationDelay = `${index * 50}ms`;
        card.dataset.questionId = q.id;

        const questionVote = db.currentUser
          ? db.questionVotes.find(
              (v) => v.userId === db.currentUser.id && v.questionId === q.id
            )
          : null;

        card.innerHTML = `
                    <div class="flex items-start gap-4">
                        <div class="flex-shrink-0 flex flex-col items-center w-12 text-center" style="color: var(--text-secondary);">
                            <button class="home-vote-btn vote-btn p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 ${
                              questionVote?.type === "up" ? "voted-up" : ""
                            }" data-vote="up" data-question-id="${q.id}">
                                <i class="fa-solid fa-arrow-up"></i>
                            </button>
                            <span class="font-bold text-base sm:text-lg" style="color: var(--text-primary);">${
                              q.votes || 0
                            }</span>
                            <button class="home-vote-btn vote-btn p-1 rounded-full hover:bg-gray-200 dark:hover:bg-gray-800 ${
                              questionVote?.type === "down" ? "voted-down" : ""
                            }" data-vote="down" data-question-id="${q.id}">
                                <i class="fa-solid fa-arrow-down"></i>
                            </button>
                        </div>
                        <div class="flex-1 cursor-pointer">
                            <h3 class="text-base sm:text-lg font-semibold mb-2 hover:text-orange-500">${
                              q.title
                            }</h3>
                            <div class="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2">
                                <div class="text-xs sm:text-sm" style="color: var(--text-secondary);">
                                    by <strong>${
                                      q.author
                                    }</strong> • ${formatTimeAgo(q.createdAt)}
                                </div>
                                <div class="flex items-center gap-2 flex-wrap">
                                    ${q.tags
                                      .map(
                                        (t) =>
                                          `<span class="tag-item px-2 py-0.5 sm:px-2.5 sm:py-1 rounded-full text-xs font-medium">${t}</span>`
                                      )
                                      .join("")}
                                </div>
                            </div>
                        </div>
                    </div>`;
        listEl.appendChild(card);
      });
    }

    // --- RENDER PAGINATION CONTROLS ---
    paginationControls.innerHTML = "";
    if (totalPages > 0) {
      paginationControls.innerHTML = `
                <button data-page-nav="prev" class="px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed" style="background-color: var(--bg-secondary); border: 1px solid var(--border-color);" ${
                  currentPage === 1 ? "disabled" : ""
                }>
                    Previous
                </button>
                <span class="px-4 py-2 font-semibold">
                    Page ${currentPage} of ${totalPages}
                </span>
                <button data-page-nav="next" class="px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed" style="background-color: var(--bg-secondary); border: 1px solid var(--border-color);" ${
                  currentPage === totalPages ? "disabled" : ""
                }>
                    Next
                </button>
            `;
    }
  };

  const initHomePage = () => {
    const filterControls = document.getElementById("filter-controls");
    const listEl = document.getElementById("question-list");
    const mainContainer = document.querySelector("main");

    const allTags = new Set(db.questions.flatMap((q) => q.tags));
    const tagFilter = document.getElementById("tag-filter");
    allTags.forEach((tag) => {
      const option = document.createElement("option");
      option.value = tag;
      option.textContent = tag;
      tagFilter.appendChild(option);
    });

    // Listener for filter/sort changes
    filterControls.addEventListener("change", () => {
      currentPage = 1; // Reset to first page on any filter change
      renderQuestions();
    });
    filterControls.addEventListener("input", (e) => {
      if (e.target.id === "search-input") {
        currentPage = 1;
        renderQuestions();
      }
    });

    // Listener for question clicks and votes
    listEl.addEventListener("click", (e) => {
      const voteBtn = e.target.closest(".home-vote-btn");
      const cardContent = e.target.closest(".flex-1");

      if (voteBtn) {
        if (!db.currentUser) {
          showAlert("Please login to vote.");
          return;
        }

        const questionId = parseInt(voteBtn.dataset.questionId);
        const voteType = voteBtn.dataset.vote;
        const questionToVote = db.questions.find((q) => q.id === questionId);

        if (!questionToVote) return;

        const existingVote = db.questionVotes.find(
          (v) => v.userId === db.currentUser.id && v.questionId === questionId
        );

        if (existingVote) {
          questionToVote.votes -= existingVote.type === "up" ? 1 : -1;
          db.questionVotes = db.questionVotes.filter(
            (v) =>
              !(v.userId === db.currentUser.id && v.questionId === questionId)
          );
        }

        if (!existingVote || existingVote.type !== voteType) {
          questionToVote.votes += voteType === "up" ? 1 : -1;
          db.questionVotes.push({
            id: Date.now(),
            userId: db.currentUser.id,
            questionId,
            type: voteType,
          });
        }

        saveDb();
        renderQuestions();
      } else if (cardContent) {
        const card = cardContent.closest(".question-card-enter");
        const questionId = parseInt(card.dataset.questionId);
        const question = db.questions.find((q) => q.id === questionId);
        if (question) {
          const answers = db.answers.filter((a) => a.questionId === questionId);
          showPage("detail", [question, answers]);
        }
      }
    });

    // Listener for pagination buttons
    mainContainer.addEventListener("click", (e) => {
      const pageNavBtn = e.target.closest("[data-page-nav]");
      if (!pageNavBtn || pageNavBtn.closest("#page-home") === null) return;

      const direction = pageNavBtn.dataset.pageNav;
      const totalPages = Math.ceil(db.questions.length / questionsPerPage);

      if (direction === "prev" && currentPage > 1) {
        currentPage--;
      } else if (direction === "next" && currentPage < totalPages) {
        currentPage++;
      }
      renderQuestions();
      window.scrollTo({ top: 0, behavior: "smooth" });
    });

    renderQuestions(); // Initial render
  };

  const initLoginPage = () => {
    document.getElementById("login-form").addEventListener("submit", (e) => {
      e.preventDefault();
      const contactInput = document.getElementById("login-contact");
      const passwordInput = document.getElementById("login-password");

      const contact = contactInput.value.trim();
      const password = passwordInput.value.trim();

      if (!contact || !password) {
        showAlert("Please enter both email/phone and password.");
        return;
      }

      const user = db.users.find(
        (u) =>
          u.contact.toLowerCase() === contact.toLowerCase() &&
          u.password === password
      );

      if (user) {
        if (db.blockedUsers.includes(user.username)) {
          showAlert("This account has been blocked.");
          return;
        }
        db.currentUser = user;
        sessionStorage.setItem("stackit_currentUser", JSON.stringify(user));
        updateUI();
        showPage("home");
      } else {
        showAlert(
          "Invalid credentials. Please check your email/phone and password."
        );
      }
    });
  };

  const checkPasswordStrength = (passwordInput, strengthBar, strengthText) => {
    const pass = passwordInput.value;
    let score = 0;
    if (pass.length >= 8) score++;
    if (/\d/.test(pass)) score++;
    if (/[^A-Za-z0-9]/.test(pass)) score++;

    let color = "bg-red-500";
    let text = "Weak";
    if (score === 1) {
      text = "Weak (needs number & special char)";
    }
    if (score === 2) {
      color = "bg-yellow-500";
      text = "Medium (needs one more type)";
    }
    if (score === 3) {
      color = "bg-green-500";
      text = "Strong";
    }
    if (pass.length < 8) {
      text = "Weak (at least 8 characters)";
      score = 0;
    }
    if (pass.length === 0) {
      text = "";
      score = 0;
    }

    strengthBar.style.width = (score / 3) * 100 + "%";
    strengthBar.className = color;
    strengthText.textContent = text;
    return score;
  };

  const initSignupPage = () => {
    const form = document.getElementById("signup-form");
    const passwordInput = document.getElementById("signup-password");
    const strengthBar = document.getElementById("strength-bar");
    const strengthText = document.getElementById("strength-text");
    passwordInput.addEventListener("input", () =>
      checkPasswordStrength(passwordInput, strengthBar, strengthText)
    );
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      if (checkPasswordStrength(passwordInput, strengthBar, strengthText) < 3) {
        showAlert(
          "Please use a stronger password (at least 8 characters, one number, one special character)."
        );
        return;
      }
      const username = document.getElementById("signup-username").value.trim();
      const contact = document.getElementById("signup-contact").value.trim();
      const name = document.getElementById("signup-name").value.trim();

      if (!username || !contact || !name || !passwordInput.value) {
        showAlert("Please fill out all fields.");
        return;
      }

      if (
        db.users.some(
          (u) => u.username.toLowerCase() === username.toLowerCase()
        )
      ) {
        showAlert("Username already exists.");
        return;
      }
      if (
        db.users.some((u) => u.contact.toLowerCase() === contact.toLowerCase())
      ) {
        showAlert("Email or phone already registered.");
        return;
      }

      const newUser = {
        id: Date.now(),
        name: name,
        username: username,
        contact: contact,
        password: passwordInput.value,
      };
      db.users.push(newUser);
      saveDb();
      db.currentUser = newUser;
      sessionStorage.setItem("stackit_currentUser", JSON.stringify(newUser));
      updateUI();
      showPage("home");
    });
  };

  const initAskPage = () => {
    const quill = new Quill("#editor-container", {
      modules: {
        toolbar: [
          [{ header: [1, 2, 3, false] }],
          ["bold", "italic", "strike"],
          ["link", "image"],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ align: [] }],
          ["clean"],
        ],
      },
      theme: "snow",
      placeholder: "Write your question details here...",
    });
    const tagsContainer = document.getElementById("tags-container");
    const tagsInput = document.getElementById("question-tags-input");
    let currentTags = [];

    const renderTags = () => {
      tagsContainer.querySelectorAll("span").forEach((t) => t.remove());
      for (const tag of currentTags) {
        const tagEl = document.createElement("span");
        tagEl.className =
          "tag-item p-1 px-2.5 rounded-full text-sm font-medium";
        tagEl.innerHTML = `<span>${tag}</span><button type="button" class="ml-1.5" data-tag-name="${tag}">&times;</button>`;
        tagsContainer.insertBefore(tagEl, tagsInput);
      }
    };

    tagsInput.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === ",") {
        e.preventDefault();
        const newTag = tagsInput.value.trim();
        if (newTag && !currentTags.includes(newTag) && currentTags.length < 5) {
          currentTags.push(newTag);
          renderTags();
        }
        tagsInput.value = "";
      }
    });
    tagsContainer.addEventListener("click", (e) => {
      if (e.target.tagName === "BUTTON" && e.target.dataset.tagName) {
        currentTags = currentTags.filter((t) => t !== e.target.dataset.tagName);
        renderTags();
      }
    });

    document
      .getElementById("ask-question-form")
      .addEventListener("submit", (e) => {
        e.preventDefault();
        const title = document.getElementById("question-title").value;
        const descriptionHTML = quill.root.innerHTML;
        if (!title.trim()) {
          showAlert("Please enter a title.");
          return;
        }
        if (quill.getLength() < 15) {
          showAlert("Please provide more details.");
          return;
        }
        if (currentTags.length === 0) {
          showAlert("Please add at least one tag.");
          return;
        }
        db.questions.push({
          id: Date.now(),
          title,
          description: descriptionHTML,
          tags: currentTags,
          author: db.currentUser.username,
          votes: 0,
          createdAt: new Date().toISOString(),
        });
        saveDb();
        showPage("home");
      });
  };

  const initDetailPage = (question, answers) => {
    const detailPageContainer = document.getElementById("page-detail");
    const answerContainer = document.getElementById("answer-form-container");
    if (db.currentUser) {
      answerContainer.innerHTML = `<h3 class="text-xl font-bold mb-4">Your Answer</h3><form id="answer-form"><div id="answer-editor-container"></div><button type="submit" class="mt-4 text-white px-6 py-2 rounded-lg font-semibold transition-transform hover:scale-105" style="background-color: var(--accent-color); color: var(--accent-text);">Post Answer</button></form>`;
      const answerQuill = new Quill("#answer-editor-container", {
        theme: "snow",
        placeholder: "Write your answer here...",
      });
      document.getElementById("answer-form").addEventListener("submit", (e) => {
        e.preventDefault();
        if (answerQuill.getLength() < 2) return;
        db.answers.push({
          id: Date.now(),
          questionId: question.id,
          author: db.currentUser.username,
          votes: 0,
          content: answerQuill.root.innerHTML,
          createdAt: new Date().toISOString(),
        });
        addNotification(
          `Someone answered your question: "${question.title.substring(
            0,
            20
          )}..."`,
          question.author,
          "new_answer",
          question.id
        );
        saveDb();
        showPage("detail", [
          db.questions.find((q) => q.id === question.id),
          db.answers.filter((a) => a.questionId === question.id),
        ]);
      });
    } else {
      answerContainer.innerHTML = `<p>Please <a href="#" class="font-semibold nav-link" data-page="login" style="color: var(--accent-color);">login</a> to post an answer.</p>`;
    }

    detailPageContainer.addEventListener("click", (e) => {
      const voteBtn = e.target.closest(".vote-btn");
      const acceptBtn = e.target.closest(".accept-btn");
      const deleteBtn = e.target.closest("#delete-question-btn");
      const blockBtn = e.target.closest(".block-user-btn");

      if (voteBtn) {
        if (!db.currentUser) {
          showAlert("Please login to vote or accept answers.");
          return;
        }
        const answerId = parseInt(voteBtn.dataset.answerId);
        if (!answerId) return;
        const answer = db.answers.find((a) => a.id === answerId);
        const existingVote = db.votes.find(
          (v) => v.userId === db.currentUser.id && v.answerId === answerId
        );
        if (existingVote) {
          answer.votes -= existingVote.type === "up" ? 1 : -1;
          db.votes = db.votes.filter((v) => v.id !== existingVote.id);
        }
        if (!existingVote || existingVote.type !== voteBtn.dataset.vote) {
          answer.votes += voteBtn.dataset.vote === "up" ? 1 : -1;
          db.votes.push({
            id: Date.now(),
            userId: db.currentUser.id,
            answerId,
            type: voteBtn.dataset.vote,
          });
        }
        saveDb();
        showPage("detail", [
          db.questions.find((q) => q.id === question.id),
          db.answers.filter((a) => a.questionId === question.id),
        ]);
      }

      if (acceptBtn) {
        if (!db.currentUser) {
          showAlert("Please login to vote or accept answers.");
          return;
        }
        const answerId = parseInt(acceptBtn.dataset.acceptId);
        const q = db.questions.find(
          (q) => q.id === parseInt(acceptBtn.dataset.questionId)
        );
        if (q.author === db.currentUser.username) {
          q.acceptedAnswerId =
            q.acceptedAnswerId === answerId ? null : answerId;
        }
        saveDb();
        showPage("detail", [
          db.questions.find((q) => q.id === question.id),
          db.answers.filter((a) => a.questionId === question.id),
        ]);
      }

      if (deleteBtn) {
        const questionId = parseInt(deleteBtn.dataset.questionId);
        showConfirm(
          "Are you sure you want to delete this question? This will also delete all its answers and cannot be undone.",
          () => {
            const answersToDelete = db.answers.filter(
              (a) => a.questionId === questionId
            );
            const answerIds = answersToDelete.map((a) => a.id);
            db.questions = db.questions.filter((q) => q.id !== questionId);
            db.answers = db.answers.filter((a) => a.questionId !== questionId);
            db.votes = db.votes.filter((v) => !answerIds.includes(v.answerId));
            db.questionVotes = db.questionVotes.filter(
              (v) => v.questionId !== questionId
            );
            db.notifications = db.notifications.filter(
              (n) => n.referenceId !== questionId
            );
            saveDb();
            showAlert("Question deleted successfully.");
            showPage("home");
          }
        );
      }

      if (blockBtn) {
        const usernameToBlock = blockBtn.dataset.username;
        showConfirm(
          `Are you sure you want to block "${usernameToBlock}"? They will no longer be able to log in.`,
          () => {
            if (!db.blockedUsers.includes(usernameToBlock)) {
              db.blockedUsers.push(usernameToBlock);
              saveDb();
              showAlert(`User "${usernameToBlock}" has been blocked.`);
              showPage("detail", [
                db.questions.find((q) => q.id === question.id),
                db.answers.filter((a) => a.questionId === question.id),
              ]);
            }
          }
        );
      }
    });
  };

  // =================================================================================
  // NOTIFICATIONS
  // =================================================================================
  const initNotifications = () => {
    const container = document.getElementById("notification-container");
    if (!container) return;
    container.innerHTML = `<button id="notification-bell" class="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"><svg class="w-5 h-5 sm:w-6 sm:h-6" style="color: var(--text-secondary);" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6 6 0 10-12 0v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg><span id="notification-badge" class="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" style="display: none;"></span></button><div id="notification-dropdown" class="absolute right-0 mt-2 w-80 rounded-lg shadow-lg border p-2 hidden" style="background-color: var(--bg-secondary); border-color: var(--border-color);"></div>`;
    const bell = document.getElementById("notification-bell"),
      badge = document.getElementById("notification-badge"),
      dropdown = document.getElementById("notification-dropdown");
    const userNotifications = db.notifications.filter(
      (n) => n.targetUser === db.currentUser.username
    );

    const renderNots = () => {
      const unreadCount = userNotifications.filter((n) => !n.read).length;
      badge.style.display = unreadCount > 0 ? "block" : "none";
      dropdown.innerHTML =
        userNotifications.length > 0
          ? userNotifications
              .map(
                (n) => `
                <div class="notification-item p-2 border-b cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800 ${
                  n.read
                    ? "font-normal text-gray-400 dark:text-gray-500"
                    : "font-semibold"
                }" style="border-color: var(--border-color);" data-id="${
                  n.id
                }" data-type="${n.type}" data-ref-id="${n.referenceId}">
                    ${n.text}
                </div>
            `
              )
              .join("")
          : '<p class="text-sm p-2" style="color: var(--text-secondary);">No notifications.</p>';
    };

    bell.addEventListener("click", (e) => {
      e.stopPropagation();
      dropdown.classList.toggle("hidden");
    });

    dropdown.addEventListener("click", (e) => {
      const item = e.target.closest(".notification-item");
      if (!item) return;

      const notificationId = parseInt(item.dataset.id);
      const notification = db.notifications.find(
        (n) => n.id === notificationId
      );

      if (notification && !notification.read) {
        notification.read = true;
        saveDb();
        renderNots();
      }

      const type = item.dataset.type;
      const refId = parseInt(item.dataset.refId);

      if (type === "new_answer") {
        const question = db.questions.find((q) => q.id === refId);
        if (question) {
          const answers = db.answers.filter(
            (a) => a.questionId === question.id
          );
          showPage("detail", [question, answers]);
          dropdown.classList.add("hidden");
        }
      }
    });

    document.addEventListener("click", (e) => {
      if (!dropdown.contains(e.target) && !bell.contains(e.target)) {
        dropdown.classList.add("hidden");
      }
    });

    renderNots();
  };

  const addNotification = (text, targetUser, type, referenceId) => {
    if (db.currentUser && db.currentUser.username === targetUser) return;
    db.notifications.unshift({
      id: Date.now(),
      text,
      targetUser,
      type,
      referenceId,
      read: false,
      createdAt: new Date().toISOString(),
    });
    saveDb();
  };

  // --- INITIAL LOAD ---
  updateUI();
  handleInitialLoad();
});
