import {openPopup} from "./modal";
import {
    setPictureViewer,
    deleteTargetCard,
    activateLike,
    deactivateLike,
} from "../pages";

import {
    picAdderFormElement,
    pictureViewerPopup,
    currentUser,
} from "./global";

// creating cards

export class Card {
    constructor(data, {selector}, increaseLikes, _decreaseLikes) {
        this._title = data.name;
        this._image = data.link;
        this._selector = selector;
        this._likes = data._likes;
        this._id = data._id;
        this._ownerId = data.owner._id;
        this._myId = data._myId;
    }

    _getElement() {
        return document.querySelector(this._selector)
            .content
            .querySelector('.post')
            .cloneNode(true);
    }

    generateCard() {
        this._element = this._getElement();
        this._imageElement = this._element.querySelector('.post__picture')
        this._likeCounter = this._element.querySelector(".post__like-counter");
        this._trashIcon = this._element.querySelector(".post__trash-icon");
        this._likeButton = this._element.querySelector(".post__like-button");
        this._imageElement.src = this._image;
        this._element.querySelector('.post__title').textContent = this._title;
        this._imageElement.alt = this._title;
        this._likeCounter.textContent = this._likes.length;
        this._renderedCardId = this._id;

        this._setEventListeners()
        this._likedByMe()

        if (this._myId != this._ownerId) {
            this._trashIcon.style.visibility = "hidden";
        }

        return this._element;
    }
_setEventListeners() {
    this._trashIcon.addEventListener("click", (event) => {
        deleteTargetCard(this._id, event);
    })
    this._likeButton.addEventListener("click", () => {
        this._likeCard(this._likeButton, this._likeCounter, this._renderedCardId);
    });
    this._imageElement.addEventListener("click", (event) => {
        setPictureViewer(link, name);
        openPopup(pictureViewerPopup, picAdderFormElement);
    });
}


if (isLikedByMe) {
    console.log(`${cardId} is liked by me`);
    this._likeButton.classList.add("post__like-button_active");
}

// like card function

    _likeCard(button, likes, cardId) {
    if (button.classList.contains("post__like-button_active")) {
        deactivateLike(button, likes, cardId);
    } else {
        activateLike(button, likes, cardId);
    }
}

 _increaseLikes(data, likes, button) {
    likes.textContent = data.likes.length;
    button.classList.remove("post__like-button_active");
}

 _decreaseLikes(data, likes, button) {
    likes.textContent = data.likes.length;
    button.classList.add("post__like-button_active");
}


_likedByMe() {
    return this._likes.some((element) => element._id === currentUser.id);
}
}
