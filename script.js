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
