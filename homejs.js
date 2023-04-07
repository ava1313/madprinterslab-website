document.addEventListener('DOMContentLoaded', function () {
  const categoriesSelect = document.getElementById('categories');
  const galleryGrid = document.querySelector('.gallery-grid');

  categoriesSelect.addEventListener('change', function () {
    filterGallery(this.value);
  });

  function c(selectedCategory) {
    const galleryItems = document.querySelectorAll(".gallery-item");

    galleryItems.forEach((item) => {
      const itemCategory = item.getAttribute("data-category").toLowerCase();

      if (selectedCategory === "all" || selectedCategory === itemCategory) {
        item.style.display = "block";
      } else {
        item.style.display = "none";
      }
    });
  }
function openModal(element) {
  const modal = document.getElementById('modal');
  const modalImage = modal.querySelector('.modal-image');
  const modalDescription = modal.querySelector('.modal-description');

  const imgSrc = element.querySelector('img').src;
  const description = element.querySelector('p').textContent;

  modalImage.src = imgSrc;
  modalDescription.textContent = description;

  modal.style.display = 'block';
}

function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
}
function adminLogin() {
  const password = prompt("Please enter the admin password:");

  if (password === "agiosnikolaos") {
    window.location.href = "admin.html";
  } else {
    alert("Incorrect password. Access denied.");
  }
}
});
