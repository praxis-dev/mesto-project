import "./styles.css";

import { validationConfig } from "../components/validation";

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
} from "../components/global";

import { openPopup, closePopup } from "../components/modal";

import {
  createCard,
  likedByMe,
  increaseLikes,
  decreaseLikes,
} from "../components/card";

import { enableValidation, blockSubmit } from "../components/validation";

import {
  apiConfig,
  getProfileInfo,
  getCards,
  patchProfile,
  patchAvatar,
  postCard,
  deleteCard,
  postLikeToServer,
  removeLikeFromServer,
} from "../components/api";

// get profile and cards info from server

getProfileInfo().then((res) => {
  return res
    .json()
    .then((data) => {
      updateProfileFromServer(data.name, data.about, data.avatar, data._id);
    })
    .then(() => {
      getCards()
        .then((res) => {
          return res.json().then((data) => {
            data.reverse().forEach((cardinfo) => {
              renderCard(
                cardinfo.name,
                cardinfo.link,
                cardinfo.likes.length,
                cardinfo.owner._id,
                apiConfig.id,
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

//

function updateProfileFromServer(dataName, dataAbout, dataAvatar, dataId) {
  userName.innerText = dataName;
  userJob.innerText = dataAbout;
  profileAvatar.src = dataAvatar;
  apiConfig.id = dataId;
}

// delete card function for trash icon event listener in card creator function

export function deleteTargetCard(cardId, event) {
  deleteCard(cardId)
    .then(() => {
      event.target.closest(".post").remove();
    })
    .catch((err) => {
      console.log(err);
    });
}

enableValidation(validationConfig);

// popup update details

function updateProfile(evt) {
  evt.preventDefault();
  displayLoading(profileUpdaterInputForm);
  patchProfile(nameInput.value, jobInput.value)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      userName.textContent = data.name;
      userJob.textContent = data.about;
    })
    .then(() => closePopup(profileUpdaterPopup))
    .catch((err) => {
      console.log(err);
    })
    .finally(() => displayDefaultSubmitButtonText(profileUpdaterInputForm));
}

// popup update avatar

function updateAvatar(evt) {
  evt.preventDefault();

  patchAvatar(avatarInput.value)
    .then((response) => {
      return response.json();
    })
    .then((data) => {
      profileAvatar.src = data.avatar;
    })
    .then(() => closePopup(avatarChangerPopup))
    .catch((err) => {
      console.log(err);
    });
}

// display loading status

export function displayLoading(form) {
  const formSubmitButton = form.querySelector('button[type="submit"]');
  formSubmitButton.textContent = "Сохранение...";
}

export function displayDefaultSubmitButtonText(form) {
  const formSubmitButton = form.querySelector('button[type="submit"]');
  formSubmitButton.textContent = "Сохранить";
}

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

function addPicFormSubmitHandler(evt, form) {
  evt.preventDefault();
  displayLoading(form);
  postCard(placeInput.value, placeLinkInput.value)
    .then((response) => {
      return response.json();
    })
    .then((data) =>
      renderCard(
        data.name,
        data.link,
        data.likes.length,
        data.owner._id,
        apiConfig.id,
        data._id,
        likedByMe(data)
      )
    )
    .then(() => closePopup(placeAdderPopup))
    .then(() => postButton.classList.add("edit-window__submit_inactive"))
    .then(() => displayDefaultSubmitButtonText(form))
    .then(() => picAdderFormElement.reset())
    .catch((err) => {
      console.log(err);
    })
    .finally(() => blockSubmit());
}

// activate / deactivate likes

export function deactivateLike(button, likes, cardId) {
  removeLikeFromServer(cardId)
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
  postLikeToServer(cardId)
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

// viewing posts listeners

pictureViewerCloseButton.addEventListener("click", function handleClick(event) {
  closePopup(pictureViewerPopup);
});

// change avatar listeners

avatarAdderOpenButton.addEventListener("click", function handleClick(event) {
  openPopup(avatarChangerPopup, avatarAdderFormElement);
});

avatarAdderCloseButton.addEventListener("click", function handleClick(event) {
  closePopup(avatarChangerPopup);
});

avatarAdderFormElement.addEventListener("submit", function handleClick(event) {
  updateAvatar(event);
  displayLoading(avatarAdderFormElement);
});

// add pic form listeners

picAdderOpenButton.addEventListener("click", function handleClick(event) {
  openPopup(placeAdderPopup, picAdderFormElement);
});

picAdderCloseButton.addEventListener("click", function handleClick(event) {
  closePopup(placeAdderPopup);
});

picAdderFormElement.addEventListener("submit", function handleClick(event) {
  addPicFormSubmitHandler(event, picAdderFormElement);
});

// profile edit listeners

profileUpdaterPopupOpenButton.addEventListener(
  "click",
  function handleClick(event) {
    nameInput.value = userName.textContent;
    jobInput.value = userJob.innerText;
    openPopup(profileUpdaterPopup, profileUpdaterInputForm);
  }
);

profileUpdaterPopupCloseButton.addEventListener(
  "click",
  function handleClick(event) {
    closePopup(profileUpdaterPopup);
  }
);

profileUpdaterInputForm.addEventListener("submit", updateProfile);

// closing modals listeners

function addOverlayListener() {
  allPopups.forEach((popup) =>
    popup.addEventListener("mousedown", function (evt) {
      if (evt.target.classList.contains("popup")) {
        closePopup(popup);
      }
    })
  );
}

addOverlayListener();

// set picture viewer

export function setPictureViewer(link, name) {
  pictureViewerPicture.src = link;
  pictureViewerPicture.alt = name;
  pictureViewerCaption.textContent = name;
}
