import { openPopup, closePopup } from "./modal";

const postTemplate = document.querySelector("#post-template").content;

// creating cards

function createCard(name, link) {
  const postElement = postTemplate.querySelector(".post").cloneNode(true);

  const postImage = postElement.querySelector(".post__picture");
  const postName = postElement.querySelector(".post__title");

  postImage.src = link;
  postName.textContent = name;
  postImage.alt = name;

  const trashIcon = postElement.querySelector(".post__trash-icon");

  trashIcon.addEventListener("click", (event) => {
    event.target.closest(".post").remove();
  });

  const likeButton = postElement.querySelector(".post__like-button");

  likeButton.addEventListener("click", (event) => {
    likeButton.classList.toggle("post__like-button_active");
  });

  postImage.addEventListener("click", (event) => {
    openPopup(pictureViewerPopup);
    pictureViewerPicture.src = link;
    pictureViewerPicture.alt = name;
    pictureViewerCaption.textContent = name;
  });

  return postElement;
}

// add new card

const postGrid = document.querySelector("#post-grid");

const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

initialCards.reverse().forEach((cardinfo) => {
  renderCard(cardinfo.name, cardinfo.link);
});

function renderCard(name, link) {
  const postElement = createCard(name, link);
  postGrid.prepend(postElement);
}

const placeAdderPopup = document.querySelector(".place-add-popup");
const picAdderFormElement = document.getElementById(
  "add-pic-window__input-form"
);
const placeInput = document.getElementById("place-name");
const placeLinkInput = document.getElementById("place-link");

function addPicFormSubmitHandler(evt) {
  evt.preventDefault();

  renderCard(placeInput.value, placeLinkInput.value);
  closePopup(placeAdderPopup);
  picAdderFormElement.reset();
}

const pictureViewerPopup = document.querySelector(".popup_dark");
const pictureViewerPicture = document.getElementById("picture-viewer-picture");
const pictureViewerCaption = document.getElementById("picture-viewer-caption");

export { createCard, addPicFormSubmitHandler, renderCard };
export { picAdderFormElement, placeAdderPopup, pictureViewerPopup };
