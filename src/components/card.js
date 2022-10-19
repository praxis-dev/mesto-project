import { openPopup, closePopup } from "./modal";

const postTemplate = document.querySelector("#post-template").content;
const postGrid = document.querySelector("#post-grid");
const placeAdderPopup = document.querySelector(".place-add-popup");
const picAdderFormElement = document.getElementById(
  "add-pic-window__input-form"
);
const placeInput = document.getElementById("place-name");
const placeLinkInput = document.getElementById("place-link");
const pictureViewerPopup = document.querySelector(".popup_dark");
const pictureViewerPicture = document.getElementById("picture-viewer-picture");
const pictureViewerCaption = document.getElementById("picture-viewer-caption");

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

function renderCard(name, link) {
  const postElement = createCard(name, link);
  postGrid.prepend(postElement);
}

function addPicFormSubmitHandler(evt) {
  evt.preventDefault();
  const postButton = picAdderFormElement.querySelector(".edit-window__submit");
  renderCard(placeInput.value, placeLinkInput.value);
  closePopup(placeAdderPopup);
  picAdderFormElement.reset();
  postButton.disabled = true;
  postButton.classList.add("edit-window__submit_inactive");
}

export {
  picAdderFormElement,
  placeAdderPopup,
  pictureViewerPopup,
  placeInput,
  placeLinkInput,
  createCard,
  addPicFormSubmitHandler,
  renderCard,
};
