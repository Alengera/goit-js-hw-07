import { galleryItems } from './gallery-items.js';
// Change code below this line

function galleryMarkup(items) {
  return items.map(
      ({ original, preview, description }) =>
        `<li class="gallery__item">
          <a class="gallery__link" href="${original}">
            <img
              class="gallery__image"
              src="${preview}"
              data-source="${original}"
              alt="${description}"
            />
          </a>
        </li>`
    )
    .join('');
}

const galleryContainer = document.querySelector('.gallery');
galleryContainer.innerHTML = galleryMarkup(galleryItems);

galleryContainer.addEventListener('click', onGalleryContainerClick);

function onGalleryContainerClick(evt) {
  evt.preventDefault();

  const target = evt.target;

  if (target.nodeName !== 'IMG') {
    return;
  }

    const largeImage = target.dataset.source;

  openModal(largeImage);
}

function openModal(image) {
  const instance = basicLightbox.create(`<img src="${image}">`, {
    onShow: (instance) => {
      document.addEventListener('keydown', ModalKeyDown);
    },
    onClose: (instance) => {
      document.removeEventListener('keydown', ModalKeyDown);
    },
  });

  instance.show();
}

function ModalKeyDown(evt) {
  if (evt.key === 'Escape') {
    basicLightbox.close();
  }
}

console.log(galleryItems);
