
/*  <option value="category1">Art</option>
        <option value="category2">Fashion</option>
        <option value="category3">Gadgets</option>
        <option value="category4">Hobby</option>
        <option value="category5">Household</option>
        <option value="category6">Learning</option>
        <option value="category7">Tools</option>
        <option value="category8">Toys & Games</option>
        <option value="category9">Other</option>*/


const imagesData = [
  {
    url: 'https://i.imgur.com/I05ezow.jpg',
    category: 'Gadgets',
    name: 'Koomba',
    tags: ['super', 'mario', 'keychain'],
  },
  {
    url: 'https://i.imgur.com/1W0OEYL.jpg',
    category: 'category2',
    name: 'Espeon',
    tags: ['psychic', 'pokemon', 'figure'],
  },
  {
    url: 'https://i.imgur.com/JXYNrJi.jpg',
    category: 'category2',
    name: 'Solaire',
    tags: ['Dark', 'Darksouls', 'figure'],
  },
  {
    url: 'https://i.imgur.com/7N7uvxP.jpg',
    category: 'category2',
    name: 'Siegmeyer',
    tags: ['armor', 'darksouls', 'figure'],
  },
  {
    url: 'https://i.imgur.com/MaRocAS.jpg',
    category: 'category2',
    name: 'Sif',
    tags: ['wold', 'darksouls', 'tomb', 'rock', 'sword'],
  },
  {
    url: 'https://i.imgur.com/fNcr30Y.jpg',
    category: 'category2',
    name: 'Charizard',
    tags: ['fire', 'pokemon', 'figure'],
  },
  {
    url: 'https://i.imgur.com/prM4rrw.jpg',
    category: 'category2',
    name: 'Arnold',
    tags: ['predator', 'cigar', 'army'],
  },
];

document.addEventListener('DOMContentLoaded', function () {
  loadImages();

  const searchInput = document.getElementById('search');
  searchInput.addEventListener('input', filterImages);
});

function loadImages() {
  const galleryGrid = document.querySelector('.gallery-grid');
  imagesData.forEach((imageData) => {
    const galleryItem = createGalleryItem(
      imageData.url,
      imageData.category,
      imageData.name,
      imageData.tags
    );
    galleryGrid.appendChild(galleryItem);
  });
  lazyLoadImages();
}

function createGalleryItem(imageUrl, itemCategory, imageName, tags) {
  const galleryItem = document.createElement('div');
  galleryItem.classList.add('gallery-item');
  galleryItem.setAttribute('data-category', itemCategory);
  galleryItem.setAttribute('data-tags', tags.join(','));
  galleryItem.setAttribute('onclick', 'openModal(this)');

  const img = document.createElement('img');
  img.src = imageUrl;
  img.alt = imageName;

  const p = document.createElement('p');
  p.textContent = imageName;

  galleryItem.appendChild(img);
  galleryItem.appendChild(p);

  return galleryItem;
}

function filterImages() {
  const searchInput = document.getElementById("search").value.toLowerCase();
  const galleryItems = document.querySelectorAll(".gallery-item");

  galleryItems.forEach((item) => {
    const itemName = item.querySelector("p").textContent.toLowerCase();
    const itemCategory = item.getAttribute("data-category").toLowerCase();
    const itemTags = item.getAttribute("data-tags").toLowerCase();

    if (
      searchInput === "" ||
      itemName.includes(searchInput) ||
      itemCategory.includes(searchInput) ||
      itemTags.includes(searchInput)
    ) {
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

// Add event listeners for close button and modal background click
document.getElementById('close').addEventListener('click', closeModal);
document.getElementById('modal').addEventListener('click', closeModal);

function lazyLoadImages() {
  const images = document.querySelectorAll('.gallery-item img[data-src]');
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1,
  };

  const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) {
        return;
      }

      const img = entry.target;
      img.src = img.dataset.src;
      img.removeAttribute('data-src');
      observer.unobserve(img);
    });
  }, options);

  images.forEach(img => observer.observe(img));
}
