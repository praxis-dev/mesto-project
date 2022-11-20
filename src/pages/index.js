import { Popup, PopupWithForm, PopupWithImage } from "../components/modal";

import "./styles.css";

import { FormValidator, validationConfig } from "../components/validation";

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

import { openPopup, closePopup } from "../components/modal";

import {
  createCard,
  likedByMe,
  increaseLikes,
  decreaseLikes,
} from "../components/card";

import { api, apiConfig } from "../components/api";

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
    profileChangerPopup.displayLoading(),
      api
        .patchProfile(nameInput.value, jobInput.value)
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
);

profileChangerPopup.setEventlisteners();

// get profile and cards info from server

api.getProfileInfo().then((res) => {
  return res
    .json()
    .then((data) => {
      updateProfileFromServer(data.name, data.about, data.avatar, data._id);
    })
    .then(() => {
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
    })
    .catch((err) => {
      console.log(err);
    });
});

// update profile from server

function updateProfileFromServer(dataName, dataAbout, dataAvatar, dataId) {
  userName.innerText = dataName;
  userJob.innerText = dataAbout;
  profileAvatar.src = dataAvatar;
  currentUser.id = dataId;
}

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

export function renderCard(
  name,
  link,
  likes,
  postOwnerId,
  myId,
  cardId,
  isLikedByMe
) {
  const postElement = createCard(
    name,
    link,
    likes,
    postOwnerId,
    myId,
    cardId,
    isLikedByMe
  );
  postGrid.prepend(postElement);
}

// activate / deactivate likes

export function deactivateLike(button, likes, cardId) {
  api
    .removeLikeFromServer(cardId)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      increaseLikes(data, likes, button);
    })
    .catch((err) => {
      console.log(err);
    });
}

export function activateLike(button, likes, cardId) {
  api
    .postLikeToServer(cardId)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      decreaseLikes(data, likes, button);
    })
    .catch((err) => {
      console.log(err);
    });
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
