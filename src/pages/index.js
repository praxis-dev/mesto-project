import {Popup, PopupWithForm, PopupWithImage} from "../components/modal";

import "./styles.css";

import {FormValidator, validationConfig} from "../components/validation";

import {UserInfo} from "../components/userinfo";

import {
    allPopups,
    postGrid,
    userName,
    userJob,
    nameInput,
    jobInput,
    placeInput,
    placeLinkInput,
    avatarInput,
    profileUpdaterPopup,
    profileUpdaterPopupOpenButton,
    profileUpdaterPopupCloseButton,
    profileUpdaterInputForm,
    picAdderOpenButton,
    picAdderCloseButton,
    pictureViewerCloseButton,
    avatarAdderOpenButton,
    avatarAdderCloseButton,
    picAdderFormElement,
    avatarChangerPopup,
    pictureViewerPopup,
    avatarAdderFormElement,
    placeAdderPopup,
    profileAvatar,
    postButton,
    pictureViewerPicture,
    pictureViewerCaption,
    currentUser,
} from "../components/global";



import Card from "../components/card";

import {api, apiConfig} from "../components/api";
import Section from "../components/section.js"

const popupWithImage = new PopupWithImage("picture-viewer")
const cardList = new Section({
    renderer: (data) => renderCard(data),
},
    '.post-grid'
)

// popup classes

export const popupWithImage = new PopupWithImage(
    pictureViewerPopup,
    pictureViewerCloseButton
);

popupWithImage.setEventlisteners();

export const picAdderPopup = new PopupWithForm(placeAdderPopup, (evt) => {
    evt.preventDefault();
    picAdderPopup.displayLoading();
    console.log("OOP OOP OOP");
    api
        .postCard(placeInput.value, placeLinkInput.value)
        .then((response) => {
            return response.json();
        })
        .then((data) =>
            renderCard(
                data.name,
                data.link,
                data.likes.length,
                data.owner._id,
                currentUser.id,
                data._id,
                likedByMe(data)
            )
        )
        .then(() => {
            picAdderPopup.close();
            postButton.classList.add("edit-window__submit_inactive");
            profileFormValidator.blockSubmit();
        })

        .catch((err) => {
            console.log(err);
        })
        .finally(() => {
            picAdderPopup.displayDefaultSubmitButtonText();
        });
});
picAdderPopup.setEventlisteners();

export const avatarUpdaterPopup = new PopupWithForm(
    avatarChangerPopup,
    (evt) => {
        evt.preventDefault();
        avatarUpdaterPopup.displayLoading();
        api
            .patchAvatar(avatarInput.value)
            .then((response) => {
                return response.json();
            })
            .then((data) => {
                profileAvatar.src = data.avatar;
            })
            .then(() => avatarUpdaterPopup.close())
            .catch((err) => {
                console.log(err);
            })
            .finally(() => {
                avatarUpdaterPopup.displayDefaultSubmitButtonText();
            });
    }
);
avatarUpdaterPopup.setEventlisteners();

export const profileChangerPopup = new PopupWithForm(
    profileUpdaterPopup,
    (evt) => {
        evt.preventDefault();
        profileChangerPopup.displayLoading(), userInfo.setUserInfo();
    }
);

profileChangerPopup.setEventlisteners();

///////////////////////////

const userInfo = new UserInfo(nameInput, jobInput);

///////////////////////////

// get cards from server

userInfo.getUserInfo().then(() => {
    api
        .getCards()
        .then((res) => {
            return res.json().then((data) => {
                data.reverse().forEach((cardinfo) => {
                    renderCard(
                        cardinfo.name,
                        cardinfo.link,
                        cardinfo.likes.length,
                        cardinfo.owner._id,
                        currentUser.id,
                        cardinfo._id,
                        likedByMe(cardinfo)
                    );
                });
            });
        })
        .catch((err) => {
            console.log(err);
        });
});


// OOP validators

const profileFormValidator = new FormValidator(
    validationConfig,
    profileUpdaterInputForm
);
const addPicFormValidator = new FormValidator(
    validationConfig,
    picAdderFormElement
);
const avatarAdderFormValidator = new FormValidator(
    validationConfig,
    avatarAdderFormElement
);

profileFormValidator.enableValidation();

addPicFormValidator.enableValidation();

avatarAdderFormValidator.enableValidation();

// add new card

export function renderCard(data) {
    const postElement = new Card(
       data, {selector: '#post-template'}, deactivateLike, activateLike, deleteTargetCard, openImagePopup
    ).generateCard();
    return postElement;
}

// activate / deactivate likes
const likeCount = (cardLikeCount, likes) => {
    cardLikeCount.textContent = likes.length
}
const toggleLikeActive = (evt) => {
    evt.classList.toggle('.post__like-button_active')
}

export function deactivateLike(id, likeCounter, likes, likeButton) {
    api.removeLikeFromServer(id)
        .then(() => {
            likeCount(likeCounter, likes)
            toggleLikeActive(likeButton)
        })
        .catch((err) => {
            console.log(err);
        });
}

export function activateLike(id, likeCounter, likes, likeButton) {
    api.postLikeToServer(id)
        .then(() => {
            likeCount(likeCounter, likes)
            toggleLikeActive(likeButton)
        })
        .catch((err) => {
            console.log(err);
        });
}
// delete card function for trash icon event listener in card creator function

function deleteTargetCard(id, event) {
    api
        .deleteCard(id)
        .then(() => {
            event.target.closest(".post").remove();
        })
        .catch((err) => {
            console.log(err);
        });
}

// fullimage popup
function openImagePopup(name, link) {
    popupWithImage.open(name, link)
}
// change avatar listeners

avatarAdderOpenButton.addEventListener("click", function handleClick(event) {
    avatarUpdaterPopup.open();
});

// add pic form listeners

picAdderOpenButton.addEventListener("click", function handleClick(event) {
    picAdderPopup.open();
});

// profile edit listeners

profileUpdaterPopupOpenButton.addEventListener(
    "click",
    function handleClick(event) {
        nameInput.value = userName.textContent;
        jobInput.value = userJob.innerText;
        profileChangerPopup.open(profileUpdaterPopup, profileUpdaterInputForm);
    }
);
