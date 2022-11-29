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
  nameInput,
  jobInput,
  placeInput,
  placeLinkInput,
  avatarInput,
  profileUpdaterPopup,
  profileUpdaterPopupOpenButton,
  profileUpdaterInputForm,
  picAdderOpenButton,
  avatarAdderOpenButton,
  picAdderFormElement,
  avatarChangerPopup,
  pictureViewerPopup,
  avatarAdderFormElement,
  placeAdderPopup,
  profileAvatar,
  currentUser,
} from "../components/global";

// popup with image

const popupWithImage = new PopupWithImage(pictureViewerPopup);

popupWithImage.setEventlisteners();

// Promise all and initial profile update starter cards rendering

Promise.all([api.getProfileInfo(), api.getCards()])
  .then((data) => {
    const [profileInfo, initialCards] = data;

    const userInfo = new UserInfo(nameInput, jobInput, profileInfo);
    userInfo.updateProfile(
      profileInfo.name,
      profileInfo.about,
      profileInfo.avatar,
      profileInfo._id
    );

    const cardsData = initialCards;
    function renderInitialCards() {
      cardsData.reverse().forEach((cardinfo) => {
        this.renderer(cardinfo, this._container);
      });
    }
    const section = new Section(
      {
        renderInitialCards,
        renderer,
      },
      postGrid
    );
    section.renderOnLoad();

    function renderCard(
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

    function renderer(cardinfo) {
      renderCard(
        cardinfo.name,
        cardinfo.link,
        cardinfo.likes.length,
        cardinfo.owner._id,
        currentUser.id,
        cardinfo._id,
        handleCardClick,
        api,
        deleteTargetCard,
        deactivateLike,
        activateLike,
        cardinfo.likes
      );
    }

    //popup with form

    const picAdderPopup = new PopupWithForm(placeAdderPopup, (evt, place) => {
      evt.preventDefault();
      picAdderPopup.displayLoading();
      api
        .postCard(place["place-name"], place["place-link"])
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

    // add pic form listeners

    picAdderOpenButton.addEventListener("click", function handleClick(event) {
      picAdderPopup.open();
    });

    // profile edit listeners

    profileUpdaterPopupOpenButton.addEventListener(
      "click",
      function handleClick() {
        const { userName, userJob } = userInfo.returnNameAndJobLocally();
        nameInput.value = userName;
        jobInput.value = userJob;
        profileChangerPopup.open();
      }
    );

    // profile changer popup

    const profileChangerPopup = new PopupWithForm(
      profileUpdaterPopup,
      (evt, inputValues) => {
        evt.preventDefault();
        profileChangerPopup.displayLoading(), setUserDataToServer(inputValues);
      }
    );

    profileChangerPopup.setEventlisteners();

    function setUserDataToServer(inputValues) {
      return api
        .patchProfile(
          inputValues["profile-name"],
          inputValues["profile-subtitle"]
        )
        .then((data) => {
          userInfo.updateProfile(data.name, data.about, data.avatar, data._id);
        })
        .then(() => profileChangerPopup.close())

        .catch((err) => {
          console.log(err);
        })
        .finally(() => profileChangerPopup.displayDefaultSubmitButtonText());
    }

    //avatar updater

    const avatarUpdaterPopup = new PopupWithForm(
      avatarChangerPopup,
      (evt, avatarInput) => {
        evt.preventDefault();
        avatarUpdaterPopup.displayLoading();
        api
          .patchAvatar(avatarInput["avatar-link"])

          .then((data) => {
            userInfo.updateProfile(
              data.name,
              data.about,
              data.avatar,
              data._id
            );
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

    // change avatar listeners

    avatarAdderOpenButton.addEventListener(
      "click",
      function handleClick(event) {
        avatarUpdaterPopup.open();
      }
    );
  })
  .catch((err) => {
    console.log(err);
  });

// delete card function for trash icon event listener in card creator function

function deleteTargetCard(cardId) {
  api
    .deleteCard(cardId)
    .then(() => {
      this._removeFromDom();
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
