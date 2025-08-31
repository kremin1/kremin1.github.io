function loadPage(url, linkElement) {
  fetch(url)
    .then(response => response.text())
    .then(html => {
      document.getElementById("content").innerHTML = html;

      // Update active link
      document.querySelectorAll("[data-link]").forEach(link => link.classList.remove("active"));
      linkElement.classList.add("active");
    })
    .catch(err => {
      document.getElementById("content").innerHTML = "<p>Error loading page.</p>";
      console.error(err);
    });
}

// Setup navigation clicks
document.querySelectorAll("[data-link]").forEach(link => {
  link.addEventListener("click", function(e) {
    e.preventDefault();
    loadPage(this.getAttribute("href"), this);
  });
});

// Load first page by default
const firstLink = document.querySelector("[data-link]");
if (firstLink) {
  loadPage(firstLink.getAttribute("href"), firstLink);
}

// Theme toggle
document.getElementById("theme-toggle").addEventListener("click", () => {
  document.body.classList.toggle("dark");
});

// Collapsible sections
function makeCollapsible() {
  document.querySelectorAll(".collapsible").forEach(btn => {
    btn.addEventListener("click", function () {
      const content = this.nextElementSibling;
      content.style.display =
        content.style.display === "none" ? "block" : "none";
    });
  });
}

// Form validation
function enableFormValidation() {
  const form = document.querySelector("form");
  if (!form) return;

  form.addEventListener("submit", function (e) {
    const name = document.getElementById("name");
    const email = document.getElementById("email");

    if (!name.value.trim() || !email.value.trim()) {
      e.preventDefault();
      alert("Please fill in both name and email!");
    }
  });
}

// Re-run features every time content loads
function afterLoad() {
  makeCollapsible();
  enableFormValidation();

  // Script Example: button alert
  const alertBtn = document.getElementById("alert-button");
  if (alertBtn) {
    alertBtn.addEventListener("click", () => {
      alert("Hello from JavaScript!");
    });
  }
}


// Modify loadPage() so afterLoad runs
function loadPage(url, linkElement) {
  fetch(url)
    .then(response => response.text())
    .then(html => {
      document.getElementById("content").innerHTML = html;

      // Update active link
      document.querySelectorAll("[data-link]").forEach(link =>
        link.classList.remove("active")
      );
      linkElement.classList.add("active");

      // Enable extra features inside loaded content
      afterLoad();
    })
    .catch(err => {
      document.getElementById("content").innerHTML =
        "<p>Error loading page.</p>";
      console.error(err);
    });
}
