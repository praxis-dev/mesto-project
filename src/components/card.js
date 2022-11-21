
import {
    deleteTargetCard,
} from "../pages";


const likeCount = (cardLikeCount, likes) => {
    cardLikeCount.textContent = likes.length
}
const toggleLikeActive = (evt) => {
    evt.classList.toggle('.post__like-button_active')
}


// creating cards

export default class Card {
    constructor(name, link, likes, postOwnerId, myId, cardId, {selector}, removeLikeFromServer, ) {
        this._title = name;
        this._image = link;
        this._likes = likes;
        this._ownerId = postOwnerId;
        this._myId = myId;
        this._id = cardId;
        this._selector = selector;
        this._removeLike = removeLikeFromServer;
        this._postLike = postLikeToServer;
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
            popupWithImage.set(this._title, this._image);
            popupWithImage.open();
        });
    }

    _toggleLike() {
        if (this._likeButton.classList.contains('post__like-button_active')) {
            this._removeLike(this._id)
                .then((data) => {
                    likeCount(this._likeCounter, data.likes)
                    toggleLikeActive(this._likeButton)
                })
                .catch((err) => console.log(err));
        } else {
            this._postLike(this._id)
                .then((data) => {
                    likeCount(this._likeCounter, data.likes)
                    toggleLikeActive(this._likeButton)
                })
        }
    }


    _likedByMe() {
        this._likes.some(element => {
            if (this._myId === element._id) {
                this._likeButton.classList.add('.post__like-button_active')
            }
        })
    }
}
