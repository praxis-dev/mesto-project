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
} from "../components/global";

import { openPopup, closePopup } from "../components/modal";

import { createCard } from "../components/card";

import { enableValidation, blockSubmit } from "../components/validation";

import {
  apiConfig,
  getProfileInfo,
  getCards,
  patchProfile,
  patchAvatar,
  postCard,
} from "../components/api";

///////////// API /////////////

// get profile info from server

getProfileInfo()
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    updateProfileFromServer(data.name, data.about, data.avatar, data._id);
  })
  .catch((error) => console.log(error));
//

function updateProfileFromServer(dataName, dataAbout, dataAvatar, dataId) {
  userName.innerText = dataName;
  userJob.innerText = dataAbout;
  profileAvatar.src = dataAvatar;
  apiConfig.id = dataId;
}

// get posts from server

getCards()
  .then((res) => {
    return res.json();
  })
  .then((data) => {
    data.forEach((cardinfo) => console.log(likedByMe(cardinfo)));
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
  })
  .catch((error) => console.log(error));
//

getCards();

function likedByMe(card) {
  return card.likes.some((like) => like._id === apiConfig.id);
}

///////////// end of API /////////////

enableValidation(validationConfig);

// popup update details

function updateProfile(evt) {
  evt.preventDefault();
  displayLoading(profileUpdaterInputForm);

  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  patchProfile(nameInput.value, jobInput.value)
    .then((response) => response.json())
    .then((json) => console.log(json))
    .finally(() => displayDefaultSubmitButtonText(profileUpdaterInputForm));
  closePopup(profileUpdaterPopup);
}

// popup update avatar

function updateAvatar(evt) {
  evt.preventDefault();
  console.log("update avatar triggered");
  profileAvatar.src = avatarInput.value;

  patchAvatar(avatarInput.value)
    .then((response) => response.json())
    .then((json) => console.log(json));
  closePopup(avatarChangerPopup);
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
  renderCard(placeInput.value, placeLinkInput.value);
  postCard(placeInput.value, placeLinkInput.value)
    .then((response) => response.json())
    .then((json) => console.log(json))
    .finally(() => displayDefaultSubmitButtonText(form));
  closePopup(placeAdderPopup);
  blockSubmit();
  picAdderFormElement.reset();
  postButton.classList.add("edit-window__submit_inactive");
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
  const pictureViewerPicture = document.getElementById(
    "picture-viewer-picture"
  );
  const pictureViewerCaption = document.getElementById(
    "picture-viewer-caption"
  );
  pictureViewerPicture.src = link;
  pictureViewerPicture.alt = name;
  pictureViewerCaption.textContent = name;
}
