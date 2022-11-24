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

function cards() {
  api
    .getCards()
    .then((res) => {
      return res.json().then((data) => {
        data.reverse().forEach((cardinfo) => {
          this._renderer(cardinfo, this._container);
        });
      });
    })
    .catch((err) => {
      console.log(err);
    });
}

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

////////////////////
Promise.all([api.getProfileInfo(), api.getCards()]).then((data) => {
  const [profileInfo, cards] = data;

  const userInfo = new UserInfo(nameInput, jobInput, profileInfo);
  userInfo.getUserInfo().then((res) => {
    return res
      .json()
      .then((data) => {
        userInfo.updateProfile(data.name, data.about, data.avatar, data._id);
      })
      .catch((err) => {
        console.log(err);
      });
  });

  section.renderOnLoad();
});

////////////////////

// get cards from server

// userInfo.getUserInfo().then(() => {
//   section.renderOnLoad();
// });

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

profileUpdaterPopupOpenButton.addEventListener("click", () => {
  nameInput.value = userName.textContent;
  jobInput.value = userJob.innerText;
  profileChangerPopup.open(profileUpdaterPopup, profileUpdaterInputForm);
});
