import { openPopup, closePopup } from "./modal";
import {
  postCard,
  deleteCard,
  postLikeToServer,
  removeLikeFromServer,
} from "./api";
import { displayLoading } from "../pages";

import {
  postTemplate,
  postGrid,
  placeAdderPopup,
  picAdderFormElement,
  placeInput,
  placeLinkInput,
  pictureViewerPopup,
  pictureViewerPicture,
  pictureViewerCaption,
} from "./global";

// creating cards

function createCard(
  name,
  link,
  likeNumber,
  postOwnerId,
  myId,
  cardId,
  isLikedByMe
) {
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

  if (isLikedByMe) {
    console.log(`${cardId} is liked by me`);
    likeButton.classList.add("post__like-button_active");
  }

  likeButton.addEventListener("click", () => {
    console.log("click");
    likeCard(likeButton, likeCounter, renderedCardId);
  });

  postImage.addEventListener("click", (event) => {
    openPopup(pictureViewerPopup, picAdderFormElement);
    pictureViewerPicture.src = link;
    pictureViewerPicture.alt = name;
    pictureViewerCaption.textContent = name;
  });

  return postElement;
}

// like card function

function likeCard(button, likes, cardId) {
  console.log("triggered");
  if (button.classList.contains("post__like-button_active")) {
    console.log("this one is active");
    likes.textContent--;
    button.classList.remove("post__like-button_active");
    removeLikeFromServer(cardId);
  } else {
    console.log("this one is not");
    likes.textContent++;
    button.classList.add("post__like-button_active");
    postLikeToServer(cardId);
  }
}

// add new card

function renderCard(name, link, likes, postOwnerId, myId, cardId, isLikedByMe) {
  const postElement = createCard(
    name,
    link,
    likes,
    postOwnerId,
    myId,
    cardId,
    isLikedByMe
  );
  postGrid.prepend(postElement);
}

function addPicFormSubmitHandler(evt, form) {
  evt.preventDefault();
  displayLoading(form);
  const postButton = picAdderFormElement.querySelector(".edit-window__submit");
  renderCard(placeInput.value, placeLinkInput.value);
  postCard(placeInput.value, placeLinkInput.value);
  closePopup(placeAdderPopup);
  picAdderFormElement.reset();
  postButton.disabled = true;
  postButton.classList.add("edit-window__submit_inactive");
}

export { createCard, addPicFormSubmitHandler, renderCard };
