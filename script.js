// ==========================================================
// BOOK LIBRARY - JAVASCRIPT
// ==========================================================


// ==========================================================
// 1. SELECT HTML ELEMENTS
// ==========================================================

// Search input
const searchInput = document.getElementById("bookSearch");

// All book cards
const bookCards = document.querySelectorAll(".book-card");

// Category buttons
const categoryButtons = document.querySelectorAll(".category-btn");

// Borrow buttons
const borrowButtons = document.querySelectorAll(".borrow-btn");

// Return buttons
const returnButtons = document.querySelectorAll(".return-btn");

// History container
const historyList = document.getElementById("historyList");

// Theme buttons
const themeToggle = document.getElementById("themeToggle");
const desktopThemeToggle = document.getElementById("desktopThemeToggle");

const mobileMenuButton = document.getElementById("mobileMenuButton");
const mobileMenu = document.getElementById("mobileMenu");
const closeMobileMenu = document.getElementById("closeMobileMenu");
const mobileNavItems = document.querySelectorAll(".mobile-nav-item");


// ==========================================================
// 2. SEARCH BOOKS
// ==========================================================

searchInput.addEventListener("input", function () {

    // Get user's search text
    const searchText = searchInput.value.toLowerCase().trim();


    // Check every book
    bookCards.forEach(function (book) {

        const title = book.dataset.title.toLowerCase();
        const author = book.dataset.author.toLowerCase();


        // Show book if title or author matches
        if (
            title.includes(searchText) ||
            author.includes(searchText)
        ) {

            book.style.display = "";

        } else {

            book.style.display = "none";

        }

    });

});


// ==========================================================
// 3. CATEGORY FILTER
// ==========================================================

categoryButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        // Get selected category
        const selectedCategory = button.dataset.category;


        // Change active button
        categoryButtons.forEach(function (btn) {

            btn.classList.remove(
                "bg-[#D1114D]",
                "text-white"
            );

            btn.classList.add(
                "bg-white",
                "text-[#24151B]"
            );

        });


        button.classList.remove(
            "bg-white",
            "text-[#24151B]"
        );

        button.classList.add(
            "bg-[#D1114D]",
            "text-white"
        );


        // Filter books
        bookCards.forEach(function (book) {

            const bookCategory = book.dataset.category;


            // Show all books
            if (selectedCategory === "All") {

                book.style.display = "";

            }

            // Show matching category
            else if (bookCategory === selectedCategory) {

                book.style.display = "";

            }

            // Hide other categories
            else {

                book.style.display = "none";

            }

        });

    });

});


// ==========================================================
// 4. BORROW BOOK
// ==========================================================

borrowButtons.forEach(function (button) {

    button.addEventListener("click", function () {

        const bookName = button.dataset.book;


        // Change button
        button.textContent = "Borrowed";

        button.classList.remove("bg-[#D1114D]");
        button.classList.add("bg-[#D6517C]");


        // Disable button
        button.disabled = true;


        // Add book to history
        addToHistory(bookName);


        // Save borrowing history
        saveHistory();

    });

});

// ==========================================================
// 5. ADD BOOK TO BORROWING HISTORY
// ==========================================================

function addToHistory(bookName, borrowedDate = new Date()) {

    const historyItem = document.createElement("div");

    historyItem.className =
        "history-item flex items-center gap-3 pb-4 border-b border-[#EED5D1]";

    historyItem.dataset.book = bookName;

    historyItem.dataset.date = borrowedDate.toISOString();

    const formattedDate = borrowedDate.toLocaleString();

    historyItem.innerHTML = `

        <div
            class="w-12 h-16 rounded-lg bg-[#EED5D1] flex items-center justify-center shrink-0"
        >
            <i data-lucide="book-open" class="w-5 h-5 text-[#D1114D]"></i>
        </div>

        <div class="min-w-0 flex-1">

            <h4 class="font-semibold text-sm">
                ${bookName}
            </h4>

            <p class="text-xs text-[#765D66]">
                Borrowed: ${formattedDate}
            </p>

        </div>

        <button
            class="return-btn text-xs font-semibold px-3 py-1.5 rounded-lg bg-[#F38592] text-white"
            data-book="${bookName}"
        >
            Return
        </button>

    `;

    historyList.prepend(historyItem);

    lucide.createIcons();

    const returnButton =
        historyItem.querySelector(".return-btn");

    returnButton.addEventListener("click", function () {

        returnBook(bookName, historyItem);

    });

}

// ==========================================================
// 6. RETURN BOOK
// ==========================================================

function returnBook(bookName, historyItem) {

    // Remove history item
    historyItem.remove();


    // Find original borrow button
    borrowButtons.forEach(function (button) {

        if (button.dataset.book === bookName) {

            button.textContent = "Borrow";

            button.disabled = false;

            button.classList.remove("bg-[#D6517C]");

            button.classList.add("bg-[#D1114D]");

        }

    });


    // Save updated history
    saveHistory();

}

// ==========================================================
// 7. DARK / LIGHT THEME
// ==========================================================

// Get body
const body = document.body;

// Get theme elements
const themeCircle = document.getElementById("themeCircle");
const themeIcon = document.getElementById("themeIcon");
const desktopThemeIcon = document.getElementById("desktopThemeIcon");
const themeText = document.getElementById("themeText");


// ==========================================================
// APPLY SAVED THEME
// ==========================================================

const savedTheme = localStorage.getItem("bookLibraryTheme");

if (savedTheme === "dark") {
    enableDarkTheme();
} else {
    enableLightTheme();
}


// ==========================================================
// THEME TOGGLE BUTTONS
// ==========================================================

// Sidebar toggle
themeToggle.addEventListener("click", function () {

    if (body.classList.contains("dark-mode")) {
        enableLightTheme();
    } else {
        enableDarkTheme();
    }

});


// Desktop top-right toggle
desktopThemeToggle.addEventListener("click", function () {

    if (body.classList.contains("dark-mode")) {
        enableLightTheme();
    } else {
        enableDarkTheme();
    }

});


// ==========================================================
// DARK THEME
// ==========================================================

function enableDarkTheme() {

    body.classList.add("dark-mode");

    // Main background
    body.classList.remove("bg-[#EED5D1]");
    body.classList.add("bg-[#24151B]");

    // Main text
    body.classList.remove("text-[#24151B]");
    body.classList.add("text-white");


    // Save theme
    localStorage.setItem("bookLibraryTheme", "dark");


    // Theme text
    if (themeText) {
        themeText.textContent = "Dark Theme";
    }


    // Theme switch circle
    if (themeCircle) {
        themeCircle.classList.remove("translate-x-6");
        themeCircle.classList.add("translate-x-0");
    }


    // Change icons
    if (themeIcon) {
        themeIcon.setAttribute("data-lucide", "moon");
    }

    if (desktopThemeIcon) {
        desktopThemeIcon.setAttribute("data-lucide", "moon");
    }


    // Refresh Lucide icons
    lucide.createIcons();
}


// ==========================================================
// LIGHT THEME
// ==========================================================

function enableLightTheme() {

    body.classList.remove("dark-mode");

    // Main background
    body.classList.remove("bg-[#24151B]");
    body.classList.add("bg-[#EED5D1]");

    // Main text
    body.classList.remove("text-white");
    body.classList.add("text-[#24151B]");


    // Save theme
    localStorage.setItem("bookLibraryTheme", "light");


    // Theme text
    if (themeText) {
        themeText.textContent = "Light Theme";
    }


    // Theme switch circle
    if (themeCircle) {
        themeCircle.classList.remove("translate-x-0");
        themeCircle.classList.add("translate-x-6");
    }


    // Change icons
    if (themeIcon) {
        themeIcon.setAttribute("data-lucide", "sun");
    }

    if (desktopThemeIcon) {
        desktopThemeIcon.setAttribute("data-lucide", "sun");
    }


    // Refresh Lucide icons
    lucide.createIcons();
}


// ==========================================================
// 8. BORROWING HISTORY - LOCAL STORAGE
// ==========================================================

// GET SAVED BORROWING HISTORY

let savedHistory =
    JSON.parse(localStorage.getItem("borrowedBooks")) || [];


// LOAD SAVED HISTORY WHEN PAGE OPENS

savedHistory.forEach(function (item) {

    const bookName = item.name;

    const borrowedDate = new Date(item.date);


    borrowButtons.forEach(function (button) {

        if (button.dataset.book === bookName) {

            button.textContent = "Borrowed";

            button.disabled = true;

            button.classList.remove("bg-[#D1114D]");

            button.classList.add("bg-[#D6517C]");

        }

    });


    addToHistory(bookName, borrowedDate);

});


// SAVE BOOK TO LOCAL STORAGE

function saveHistory() {

    const historyItems =
        document.querySelectorAll(".history-item");

    const historyData = [];


    historyItems.forEach(function (item) {

        historyData.push({

            name: item.dataset.book,

            date: item.dataset.date

        });

    });


    localStorage.setItem(
        "borrowedBooks",
        JSON.stringify(historyData)
    );

}


// ==========================================================
// 9. DESKTOP NAVIGATION
// ==========================================================

const homeNav = document.getElementById("homeNav");
const myBooksNav = document.getElementById("myBooksNav");
const historyNav = document.getElementById("historyNav");

homeNav.addEventListener("click", function () {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

myBooksNav.addEventListener("click", function () {

    document.querySelector(".book-card").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

});

historyNav.addEventListener("click", function () {

    document.getElementById("historySection").scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

});

// ---- MOBILE MENU ----

mobileMenuButton.addEventListener("click", function () {

    mobileMenu.classList.remove("hidden");

});


closeMobileMenu.addEventListener("click", function () {

    mobileMenu.classList.add("hidden");

});


// Close menu when clicking outside the sidebar

mobileMenu.addEventListener("click", function (event) {

    if (event.target === mobileMenu) {

        mobileMenu.classList.add("hidden");

    }

});

mobileNavItems.forEach(function (item) {

    item.addEventListener("click", function () {

        mobileMenu.classList.add("hidden");

        if (item.textContent.trim() === "Home") {
            window.scrollTo({
                top: 0,
                behavior: "smooth"
            });
        }

        if (item.textContent.trim() === "My Books") {
            document.getElementById("myBooksNav").click();
        }

        if (item.textContent.trim() === "History") {
            document.getElementById("historyNav").click();
        }

    });

});
