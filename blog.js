document.addEventListener("DOMContentLoaded", function () {
  const searchInput = document.getElementById("search");
  const cards = document.querySelectorAll(".content .card");

  searchInput.addEventListener("keyup", function () {
    let filter = searchInput.value.toLowerCase();

    cards.forEach((card) => {
      let title = card.querySelector("h4").textContent.toLowerCase();
      if (title.includes(filter) || filter === "") {
        card.classList.remove("hidden"); // Show matching or all if empty
      } else {
        card.classList.add("hidden"); // Hide non-matching ones
      }
    });
  });
});
