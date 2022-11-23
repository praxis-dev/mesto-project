import "./styles.css";

import { api } from "../components/api";

import { FormValidator, validationConfig } from "../components/validation";

import { UserInfo } from "../components/userinfo";

import { Card, likedByMe } from "../components/card";

import { Section } from "../components/section";

import { PopupWithImage } from "../components/popupwithimage";

import { PopupWithForm } from "../components/popupwithform";

import {
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
  profileUpdaterInputForm,
  picAdderOpenButton,
  pictureViewerCloseButton,
  avatarAdderOpenButton,
  picAdderFormElement,
  avatarChangerPopup,
  pictureViewerPopup,
  avatarAdderFormElement,
  placeAdderPopup,
  profileAvatar,
  postButton,
  currentUser,
} from "../components/global";

// section

const cards = api.getCards();

const section = new Section(
  {
    cards,
    renderer,
  },
  postGrid
);

function renderer(cardinfo, container) {
  renderCard(
    cardinfo.name,
    cardinfo.link,
    cardinfo.likes.length,
    cardinfo.owner._id,
    currentUser.id,
    cardinfo._id,
    likedByMe(cardinfo),
    container,
    handleCardClick,
    api,
    deleteTargetCard
  );
}

// popup classes

// popup with image

export const popupWithImage = new PopupWithImage(
  pictureViewerPopup,
  pictureViewerCloseButton
);

popupWithImage.setEventlisteners();

//popup with form

export const picAdderPopup = new PopupWithForm(placeAdderPopup, (evt) => {
  evt.preventDefault();
  picAdderPopup.displayLoading();
  api
    .postCard(placeInput.value, placeLinkInput.value)
    .then((response) => {
      return response.json();
    })
    .then((data) => section.addItem(data))
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

//avatar updater

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

// user info

const userInfo = new UserInfo(nameInput, jobInput);

// get cards from server

userInfo.getUserInfo().then(() => {
  section.renderOnLoad();
});

// delete card function for trash icon event listener in card creator function

export function deleteTargetCard(cardId, event) {
  api
    .deleteCard(cardId)
    .then(() => {
      event.target.closest(".post").remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

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

function handleCardClick(image, name) {
  popupWithImage.set(image.src, name.textContent);
  popupWithImage.open();
}

export function renderCard(
  name,
  link,
  likes,
  postOwnerId,
  myId,
  cardId,
  isLikedByMe,
  container,
  handleCardClick,
  api,
  deleteTargetCard
) {
  const postElement = new Card(
    name,
    link,
    likes,
    postOwnerId,
    myId,
    cardId,
    isLikedByMe,
    handleCardClick,
    api,
    deleteTargetCard
  ).returnCard();
  container.prepend(postElement);
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
