import "./styles.css";

import { api } from "../components/api";

import { FormValidator, validationConfig } from "../components/validation";

import { UserInfo } from "../components/userinfo";

import { Card } from "../components/card";

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

function renderer(cardinfo, container) {
  renderCard(
    cardinfo.name,
    cardinfo.link,
    cardinfo.likes.length,
    cardinfo.owner._id,
    currentUser.id,
    cardinfo._id,
    container,
    handleCardClick,
    api,
    deleteTargetCard,
    deactivateLike,
    activateLike,
    cardinfo.likes
  );
}

// popup classes

// popup with image

export const popupWithImage = new PopupWithImage(pictureViewerPopup);

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
picAdderPopup._getInputValues();

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

function setUserDataToServerAndUpdateLocal(name, job) {
  api
    .patchProfile(name.value, job.value)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      userName.textContent = data.name;
      userJob.textContent = data.about;
    })
    .then(() => profileChangerPopup.close())
    .catch((err) => {
      console.log(err);
    })
    .finally(() => profileChangerPopup.displayDefaultSubmitButtonText());
}

const data = await Promise.all([api.getProfileInfo(), api.getCards()]);
const [profileInfo, initialCards] = data;
const userInfo = new UserInfo(
  nameInput,
  jobInput,
  profileInfo,
  setUserDataToServerAndUpdateLocal
);
const usrInfo = await userInfo.getUserInfo();
const res = await usrInfo.json();
const update = (res) => {
  userInfo.updateProfile(res.name, res.about, res.avatar, res._id);
};

update(res);

const cardsData = await initialCards.json();

function cards() {
  cardsData.reverse().forEach((cardinfo) => {
    this._renderer(cardinfo, this._container);
  });
}

const section = new Section(
  {
    cards,
    renderer,
  },
  postGrid
);

section.renderOnLoad();

// delete card function for trash icon event listener in card creator function

function removeElement(element) {
  element.remove();
}

export function deleteTargetCard(cardId, element) {
  api
    .deleteCard(cardId)
    .then(() => {
      removeElement(element);
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

function deactivateLike(button, likes, cardId) {
  this._api
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

function activateLike(button, likes, cardId) {
  this._api
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
  container,
  handleCardClick,
  api,
  deleteTargetCard,
  deactivateLike,
  activateLike,
  initialLikes
) {
  const postElement = new Card(
    name,
    link,
    likes,
    postOwnerId,
    myId,
    cardId,
    handleCardClick,
    api,
    deleteTargetCard,
    deactivateLike,
    activateLike,
    initialLikes
  ).returnCard();
  section.prepend(postElement);
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

profileUpdaterPopupOpenButton.addEventListener("click", function handleClick() {
  nameInput.value = userName.innerText;
  jobInput.value = userJob.innerText;
  profileChangerPopup.open(profileUpdaterPopup, profileUpdaterInputForm);
});
