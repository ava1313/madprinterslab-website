
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
            urls: [
              'https://i.imgur.com/TlJtab6.png',
              'https://i.imgur.com/jqV3vJe.png'
            ],
            category: 'category3',
            name: 'Koomba',
            tags: ['super', 'mario', 'keychain', 'super mario'],
          },
          {
            urls: [
              'https://i.imgur.com/NRW3OMm.png'
            ],
            category: 'category9',
            name: 'Espeon',
            tags: ['psychic', 'pokemon', 'figure'],
          },
          {
            urls: [
              'https://i.imgur.com/IM75f3t.png',
              'https://i.imgur.com/Mrlqz8p.png'
            ],
            category: 'category9',
            name: 'Solaire',
            tags: ['Dark', 'Darksouls', 'figure'],
          },
          {
            urls: [
              'https://i.imgur.com/7iudYq4.png',
              'https://i.imgur.com/kAkvJSf.png',
              'https://i.imgur.com/bsonGQt.png'
            ],
            category: 'category9',
            name: 'Siegmeyer',
            tags: ['armor', 'darksouls', 'figure'],
          },
          {
            urls: [
              'https://i.imgur.com/V8041YB.png',
              'https://i.imgur.com/XzJpTMH.png',
              'https://i.imgur.com/JZF52rQ.png'
            ],
            category: 'category9',
            name: 'Sif',
            tags: ['wold', 'darksouls', 'tomb', 'rock', 'sword'],
          },
          {
            urls: [
              'https://i.imgur.com/TAsg4tS.png',
              'https://i.imgur.com/aCwcueO.png'
            ],
            category: 'category9',
            name: 'Charizard',
            tags: ['fire', 'pokemon', 'figure'],
          },
          {
            urls: [
              'https://i.imgur.com/69Y9b5W.png',
              'https://i.imgur.com/HCsDYiI.png'
            ],
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
      imageData.urls[0],
      imageData.category,
      imageData.name,
      imageData.tags
    );
    galleryGrid.appendChild(galleryItem);
  });
  
}


function createGalleryItem(imageUrl, itemCategory, imageName, tags) {
  const galleryItem = document.createElement('div');
  galleryItem.classList.add('gallery-item', 'col-12', 'col-sm-6', 'col-md-4', 'col-lg-3');
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

  const imgSrc = element.querySelector('img').src;
  const description = element.querySelector('p').textContent;

  currentImageIndex = imagesData.findIndex((imageData) => imageData.urls[0] === imgSrc);
  currentIndex = 0; // Add this line to reset the secondary index when opening the modal

  modalImage.src = imgSrc;
  modalDescription.textContent = description;

  const socialMediaButtons = createSocialMediaButtons();
  modalSocialMedia.innerHTML = ''; // Clear any existing social media buttons
  modalSocialMedia.appendChild(socialMediaButtons); // Add new social media buttons

  modal.style.display = 'block';

  // Handle click events
  modal.onclick = (event) => {
    if (event.target === modal || event.target.id === 'close') {
      closeModal();
    } else if (event.target.classList.contains('modal-arrow')) {
      event.stopPropagation();
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
let currentIndex = 0;

function nextImage(event) {
  event.stopPropagation(); // Prevent the click event from propagating to the parent modal element
  const urls = imagesData[currentImageIndex].urls || [];
  currentIndex++;

  if (currentIndex >= urls.length) {
    currentIndex = 0;
  }
  updateModalImage();
}

function previousImage(event) {
  event.stopPropagation(); // Prevent the click event from propagating to the parent modal element
  const urls = imagesData[currentImageIndex].urls || [];
  currentIndex--;

  if (currentIndex < 0) {
    currentIndex = urls.length - 1;
  }

  updateModalImage();
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
function updateModalImage() {
  const modalImage = document.querySelector('.modal-image');
  const imageData = imagesData[currentImageIndex];
  const urls = imageData.urls || [];
  const curentUrl = urls[currentIndex];
  modalImage.src = curentUrl;
}
const backToTopButton = document.getElementById('backToTop');

window.addEventListener('scroll', () => {
  if (window.pageYOffset > 100) {
    backToTopButton.style.display = 'block';
  } else {
    backToTopButton.style.display = 'none';
  }
});

backToTopButton.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});
