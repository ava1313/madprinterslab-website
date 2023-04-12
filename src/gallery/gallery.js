
/*  <option value="category1">Art</option>
        <option value="category2">Fashion</option>
        <option value="category3">Gadgets</option>
        <option value="category4">Hobby</option>
        <option value="category5">Household</option>
        <option value="category6">Learning</option>
        <option value="category7">Tools</option>
        <option value="category8">Toys & Games</option>
        <option value="category9">Figures</option>
        <option value="category10">Other</option>*/


        const imagesData = [
          {
            url: 'https://i.imgur.com/TlJtab6.png',
            secondaryUrl: 'https://i.imgur.com/jqV3vJe.png',
            tertiaryUrl: 'https://i.imgur.com/JXYNrJi.jpg',
            category: 'category3',
            name: 'Koomba',
            tags: ['super', 'mario', 'keychain', 'super mario'],
          },
          {
            url: 'https://i.imgur.com/NRW3OMm.png',
            secondaryUrl: 'https://i.imgur.com/7N7uvxP.jpg',
            tertiaryUrl: 'https://i.imgur.com/MaRocAS.jpg',
            category: 'category9',
            name: 'Espeon',
            tags: ['psychic', 'pokemon', 'figure'],
          },
          {
            url: 'https://i.imgur.com/IM75f3t.png',
            secondaryUrl: 'https://i.imgur.com/fNcr30Y.jpg',
            tertiaryUrl: 'https://i.imgur.com/prM4rrw.jpg',
            category: 'category9',
            name: 'Solaire',
            tags: ['Dark', 'Darksouls', 'figure'],
          },
          {
            url: 'https://i.imgur.com/7iudYq4.png',
            secondaryUrl: 'https://i.imgur.com/bsonGQt.png',
            tertiaryUrl: 'https://i.imgur.com/2Axgdmk.png',
            category: 'category9',
            name: 'Siegmeyer',
            tags: ['armor', 'darksouls', 'figure'],
          },
          {
            url: 'https://i.imgur.com/V8041YB.png',
            secondaryUrl: 'https://i.imgur.com/TlJtab6.png',
            tertiaryUrl: 'https://i.imgur.com/NRW3OMm.png',
            category: 'category9',
            name: 'Sif',
            tags: ['wold', 'darksouls', 'tomb', 'rock', 'sword'],
          },
          {
            url: 'https://i.imgur.com/TAsg4tS.png',
            secondaryUrl: 'https://i.imgur.com/IM75f3t.png',
            tertiaryUrl: 'https://i.imgur.com/7iudYq4.png',
            category: 'category9',
            name: 'Charizard',
            tags: ['fire', 'pokemon', 'figure'],
          },
          {
            url: 'https://i.imgur.com/69Y9b5W.png',
            secondaryUrl: 'https://i.imgur.com/V8041YB.png',
            tertiaryUrl: 'https://i.imgur.com/TAsg4tS.png',
            category: 'category9',
            name: 'Arnold',
            tags: ['predator', 'cigar', 'army', 'figure'],
          },
        ];
        
document.addEventListener('DOMContentLoaded', function () {
  loadImages();

  const searchInput = document.getElementById('search');
  searchInput.addEventListener('input', filterImages);

  const categoriesDropdown = document.getElementById('categories');
  categoriesDropdown.addEventListener('change', filterImages);
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
  galleryItem.dataset.imageData = JSON.stringify({ imageUrl, itemCategory, imageName, tags });

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
  const selectedCategory = document.getElementById("categories").value;
  const galleryItems = document.querySelectorAll(".gallery-item");

  galleryItems.forEach((item) => {
    const itemName = item.querySelector("p").textContent.toLowerCase();
    const itemCategory = item.getAttribute("data-category").toLowerCase();
    const itemTags = item.getAttribute("data-tags").toLowerCase();

    const categoryMatch = selectedCategory === "all" || itemCategory === selectedCategory.toLowerCase();
    const searchMatch = searchInput === "" || itemName.includes(searchInput) || itemTags.includes(searchInput);

    if (categoryMatch && searchMatch) {
      item.style.display = "block";
      item.style.opacity = "1";
      item.style.transform = "scale(1)";
    } else {
      item.style.display = "none";
      item.style.opacity = "0";
      item.style.transform = "scale(0.5)";
    }
  });
}

function openModal(element) {
  const modal = document.getElementById('modal');
  const modalImage = modal.querySelector('.modal-image');
  const modalDescription = modal.querySelector('.modal-description');
  const modalSocialMedia = modal.querySelector('.modal-social-media');

  const imageData = JSON.parse(element.dataset.imageData);
  const imgSrc = imageData.imageUrl;
  const description = imageData.name;

  modalImage.src = imgSrc;
  modalDescription.textContent = description;

  const socialMediaButtons = createSocialMediaButtons();
  modalSocialMedia.innerHTML = ''; // Clear any existing social media buttons
  modalSocialMedia.appendChild(socialMediaButtons); // Add new social media buttons

  modal.style.display = 'block';

  // Prevent background clicks from closing the modal
  modal.onclick = (event) => {
    if (event.target === modal || event.target.id === 'close') {
      closeModal();
    }
  };
}




function closeModal() {
  const modal = document.getElementById('modal');
  modal.style.display = 'none';
  const socialMediaButtons = createSocialMediaButtons();
modal.querySelector('.modal-description').appendChild(socialMediaButtons);

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
function createSocialMediaButtons() {
  const container = document.createElement('div');
  container.className = 'social-media-buttons';

  const facebookButton = document.createElement('a');
  facebookButton.href = 'https://www.facebook.com/marketplace/profile/100087950613870';
  facebookButton.target = '_blank';
  facebookButton.className = 'social-media-button';
  facebookButton.innerHTML = '<i class="fab fa-facebook-f"></i>';

  const tiktokButton = document.createElement('a');
  tiktokButton.href = 'https://www.tiktok.com/@madprinterslab';
  tiktokButton.target = '_blank';
  tiktokButton.className = 'social-media-button';
  tiktokButton.innerHTML = '<i class="fab fa-tiktok"></i>';

  const instagramButton = document.createElement('a');
  instagramButton.href = 'https://www.instagram.com/madprinterslab/';
  instagramButton.target = '_blank';
  instagramButton.className = 'social-media-button';
  instagramButton.innerHTML = '<i class="fab fa-instagram"></i>';

  container.appendChild(facebookButton);
  container.appendChild(tiktokButton);
  container.appendChild(instagramButton);

  return container;
}
function nextImage() {
  const modal = document.getElementById('modal');
  const modalImage = modal.querySelector('.modal-image');
  const additionalImages = JSON.parse(modal.dataset.additionalImages);
  let currentImageIndex = parseInt(modal.dataset.currentImageIndex);

  currentImageIndex = (currentImageIndex + 1) % additionalImages.length;
  modalImage.src = additionalImages[currentImageIndex];
  modal.dataset.currentImageIndex = currentImageIndex;
}

function previousImage() {
  const modal = document.getElementById('modal');
  const modalImage = modal.querySelector('.modal-image');
  const additionalImages = JSON.parse(modal.dataset.additionalImages);
  let currentImageIndex = parseInt(modal.dataset.currentImageIndex);

  currentImageIndex = (currentImageIndex - 1 + additionalImages.length) % additionalImages.length;
  modalImage.src = additionalImages[currentImageIndex];
  modal.dataset.currentImageIndex = currentImageIndex;
}
function createModalArrows() {
  const leftArrow = document.createElement('i');
  leftArrow.classList.add('modal-arrow', 'modal-arrow-left');
  leftArrow.innerHTML = '&#10094;';
  leftArrow.addEventListener('click', () => {
    changeImage(-1);
  });

  const rightArrow = document.createElement('i');
  rightArrow.classList.add('modal-arrow', 'modal-arrow-right');
  rightArrow.innerHTML = '&#10095;';
  rightArrow.addEventListener('click', () => {
    changeImage(1);
  });

  return [leftArrow, rightArrow];
}
