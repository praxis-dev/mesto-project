import { openPopup } from "./modal";
import {
  deleteCard,
  postLikeToServer,
  removeLikeFromServer,
  getCardLikes,
} from "./api";
import { setPictureViewer } from "../pages";

import {
  postTemplate,
  picAdderFormElement,
  pictureViewerPopup,
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
    setPictureViewer(link, name);
    openPopup(pictureViewerPopup, picAdderFormElement);
  });

  return postElement;
}

// like card function

function likeCard(button, likes, cardId) {
  console.log("like card triggered");
  if (button.classList.contains("post__like-button_active")) {
    console.log("this one is active");
    button.classList.remove("post__like-button_active");

    removeLikeFromServer(cardId)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(Array.from(data.likes));
        likes.textContent = data.likes.length;
      });
  } else {
    console.log("this one is not");
    button.classList.add("post__like-button_active");
    postLikeToServer(cardId)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        console.log(Array.from(data.likes));
        likes.textContent = data.likes.length;
      });
  }
}

export { createCard };
