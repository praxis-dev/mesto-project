import { popupWithImage } from "../pages/index";
import { api } from "./api";

import { deleteTargetCard } from "../pages";

import { currentUser } from "./global";

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
  }

  _build() {
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

  _likeCard(button, likes, cardId) {
    if (this._likeButton.classList.contains("post__like-button_active")) {
      this._deactivateLike(button, likes, cardId);
    } else {
      this._activateLike(button, likes, cardId);
    }
  }

  _deactivateLike(button, likes, cardId) {
    api
      .removeLikeFromServer(cardId)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this._increaseLikes(data, likes, button);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  _activateLike(button, likes, cardId) {
    api
      .postLikeToServer(cardId)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        this._decreaseLikes(data, likes, button);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  _increaseLikes(data, likes, button) {
    likes.textContent = data.likes.length;
    button.classList.remove("post__like-button_active");
  }

  _decreaseLikes(data, likes, button) {
    likes.textContent = data.likes.length;
    button.classList.add("post__like-button_active");
  }

  _setEventListeners() {
    this._likeButton.addEventListener("click", () => {
      this._likeCard(this._likeButton, this._likeCounter, this._renderedCardId);
    });

    this._postImage.addEventListener("click", () => {
      this._handleCardClick(this._postImage, this._postName);
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

export function likedByMe(card) {
  return card.likes.some((like) => like._id === currentUser.id);
}
