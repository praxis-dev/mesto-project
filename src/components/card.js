import { openPopup, closePopup } from "./modal";
import {
  postCard,
  deleteCard,
  postLikeToServer,
  removeLikeFromServer,
  likedByCurrentUser,
} from "./api";

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

function createCard(name, link, likeNumber, postOwnerId, myId, cardId) {
  const postElement = postTemplate.querySelector(".post").cloneNode(true);
  const postImage = postElement.querySelector(".post__picture");
  const postName = postElement.querySelector(".post__title");
  const likeCounter = postElement.querySelector(".post__like-counter");
  let renderedCardId;

  postImage.src = link;
  postName.textContent = name;
  postImage.alt = name;
  likeCounter.textContent = likeNumber;
  renderedCardId = cardId;

  const trashIcon = postElement.querySelector(".post__trash-icon");

  trashIcon.addEventListener("click", (event) => {
    event.target.closest(".post").remove();
    deleteCard(cardId);
  });

  if (myId != postOwnerId) {
    trashIcon.style.visibility = "hidden";
  }

  const likeButton = postElement.querySelector(".post__like-button");

  likeButton.addEventListener("click", () => {
    likeCard(likeButton, likeCounter);
  });

  postImage.addEventListener("click", (event) => {
    openPopup(pictureViewerPopup);
    pictureViewerPicture.src = link;
    pictureViewerPicture.alt = name;
    pictureViewerCaption.textContent = name;
  });

  return postElement;
}

// like card function

function likeCard(button, likes) {
  console.log("triggered");
  console.log(likes.textContent);
  button.classList.toggle("post__like-button_active");
  likes.textContent++;
}

// add new card

function renderCard(name, link, likes, postOwnerId, myId, cardId) {
  const postElement = createCard(name, link, likes, postOwnerId, myId, cardId);
  postGrid.prepend(postElement);
}

function addPicFormSubmitHandler(evt) {
  evt.preventDefault();
  const postButton = picAdderFormElement.querySelector(".edit-window__submit");
  renderCard(placeInput.value, placeLinkInput.value);
  postCard(placeInput.value, placeLinkInput.value);
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
