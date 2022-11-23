import { popupWithImage } from "../pages/index";

import { openPopup } from "./popup";
import {
  setPictureViewer,
  deleteTargetCard,
  activateLike,
  deactivateLike,
} from "../pages";

import { postTemplate, currentUser } from "./global";

// creating cards

export class Card {
  constructor(
    name,
    link,
    likeNumber,
    postOwnerId,
    myId,
    cardId,
    isLikedByMe,
    handleCardClick
  ) {
    this._name = name;
    this._link = link;
    this._likeNumber = likeNumber;
    this._postOwnerId = postOwnerId;
    this._myId = myId;
    this._cardId = cardId;
    this._isLikedByMe = isLikedByMe;
    this._handleCardClick = handleCardClick;

    this._postElement = document
      .querySelector("#post-template")
      .content.cloneNode(true);
    this._postImage = this._postElement.querySelector(".post__picture");
    this._postName = this._postElement.querySelector(".post__title");
    this._likeCounter = this._postElement.querySelector(".post__like-counter");
    this._likeButton = this._postElement.querySelector(".post__like-button");
    this._trashIcon = this._postElement.querySelector(".post__trash-icon");

    let renderedCardId;
  }

  _build() {
    // console.log(
    //   this._postElement,
    //   this._postImage,
    //   this._postName.textContent,
    //   this._likeCounter.textContent,
    //   this._renderedCardId,
    //   this._likeButton
    // );
    this._postImage.src = this._link;
    this._postName.textContent = this._name;
    this._postImage.alt = this._name;
    this._likeCounter.textContent = this._likeNumber;
    this._renderedCardId = this._cardId;
  }

  _delete() {
    this._trashIcon.addEventListener("click", (event) => {
      deleteTargetCard(this._cardId, event);
    });

    if (this._myId != this._postOwnerId) {
      this._trashIcon.style.visibility = "hidden";
    }
  }

  _liked() {
    if (this._isLikedByMe) {
      this._likeButton.classList.add("post__like-button_active");
    }
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      likeCard(this._likeButton, this._likeCounter, this._renderedCardId);
    });

    this._postImage.addEventListener("click", (event) => {
      popupWithImage.set(this._postImage.src, this._postName.textContent);
      popupWithImage.open();
    });
  }

  returnCard() {
    this._build();
    this._liked();
    this._delete();
    this._setEventListeners();
    return this._postElement;
  }
}

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
