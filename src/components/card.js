import {openPopup} from "./modal";
import {
    setPictureViewer,
    deleteTargetCard,
} from "../pages";

import {
    picAdderFormElement,
    pictureViewerPopup,
} from "./global";
import {postLikeToServer, removeLikeFromServer} from "./api";

// creating cards

export class Card {
    constructor(name, link, likes, postOwnerId, myId, cardId, {selector}) {
        this._title = name;
        this._image = link;
        this._likes = likes;
        this._ownerId = postOwnerId;
        this._myId = myId;
        this._id = cardId;
        this._selector = selector;
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

        if (this._myId !== this._ownerId) {
            this._trashIcon.style.visibility = "hidden";
        }

        return this._element;
    }

    _setEventListeners() {
        this._trashIcon.addEventListener("click", (event) => {
            deleteTargetCard(this._id, event);
        })
        this._likeButton.addEventListener("click", () => {
            this._toggleLike()
        });
        this._imageElement.addEventListener("click", () => {
            setPictureViewer(this._image, this._title);
            openPopup(pictureViewerPopup, picAdderFormElement);
        });
    }

    _toggleLike() {
        if (this._likeButton.classList.contains('post__like-button_active')) {
            removeLikeFromServer(this._id)
                .then((data) => {
                    this._likeCounter.textContent = data.likes.length;
                    this._likeButton.classList.remove('.post__like-button_active')
                })
                .catch((err) => console.log(err));
        } else {
            postLikeToServer(this._id)
                .then((data) => {
                    this._likeCounter.textContent = data.likes.length;
                    this._likeButton.classList.add('.post__like-button_active')
                })
        }
    }


    _likedByMe() {
        return this._likes.some(() => this._id === this._ownerId);
    }
}
