import { openPopup } from "./modal";
import {
  setPictureViewer,
  deleteTargetCard,
  activateLike,
  deactivateLike,
} from "../pages";

import {
  postTemplate,
  picAdderFormElement,
  pictureViewerPopup,
  currentUser,
} from "./global";

// creating cards

export function createCard(
  name,
  link,
  likeNumber,
  postOwnerId,
  myId,
  cardId,
  isLikedByMe
) {
  const postElement = postTemplate.cloneNode(true);
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
    deleteTargetCard(cardId, event);
  });

  if (myId != postOwnerId) {
    trashIcon.style.visibility = "hidden";
  }

  const likeButton = postElement.querySelector(".post__like-button");

  if (isLikedByMe) {
    likeButton.classList.add("post__like-button_active");
  }

  likeButton.addEventListener("click", () => {
    likeCard(likeButton, likeCounter, renderedCardId);
  });

  postImage.addEventListener("click", (event) => {
    setPictureViewer(link, name);
    openPopup(pictureViewerPopup, picAdderFormElement);
  });

  return postElement;
}

// like card function

function likeCard(button, likes, cardId) {
  if (button.classList.contains("post__like-button_active")) {
    deactivateLike(button, likes, cardId);
  } else {
    activateLike(button, likes, cardId);
  }
}

export function increaseLikes(data, likes, button) {
  likes.textContent = data.likes.length;
  button.classList.remove("post__like-button_active");
}

export function decreaseLikes(data, likes, button) {
  likes.textContent = data.likes.length;
  button.classList.add("post__like-button_active");
}

export function likedByMe(card) {
  return card.likes.some((like) => like._id === currentUser.id);
}
