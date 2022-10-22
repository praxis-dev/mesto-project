import "./styles.css";

import { validationConfig } from "../components/validation";

import {
  allPopups,
  userName,
  userJob,
  nameInput,
  jobInput,
  profileUpdaterPopup,
  openPopup,
  closePopup,
  profileUpdaterPopupOpenButton,
  profileUpdaterPopupCloseButton,
  profileUpdaterInputForm,
  picAdderOpenButton,
  picAdderCloseButton,
  pictureViewerCloseButton,
} from "../components/modal";

import {
  picAdderFormElement,
  addPicFormSubmitHandler,
  placeAdderPopup,
  pictureViewerPopup,
  renderCard,
} from "../components/card";
import { enableValidation } from "../components/validation";

///////////// API /////////////

const cohortId = "plus-cohort-16";
const authorizationToken = "84065f1e-9b65-4660-bac5-9a220fdec6d4";
const apiConfig = {
  url: `https://nomoreparties.co/v1/${cohortId}`,
  headers: {
    authorization: authorizationToken,
    "Content-Type": "application/json",
  },
};
const profileAvatar = document.querySelector(".profile__avatar");

// get profile info from server

function getProfileInfo() {
  fetch("https://nomoreparties.co/v1/" + `${cohortId}` + "/users/me", {
    method: "GET",
    headers: apiConfig.headers,
  })
    .then((res) => {
      return res.json();
    })

    .then((data) => {
      updateProfileFromServer(data.name, data.about, data.avatar);
    })
    .catch((error) => console.log(error));
}

function updateProfileFromServer(dataName, dataAbout, dataAvatar) {
  userName.innerText = dataName;
  userJob.innerText = dataAbout;
  profileAvatar.src = dataAvatar;
}

getProfileInfo();

function getCards() {
  const profileAvatar = document.querySelector(".profile__avatar");
  console.log(profileAvatar);
  fetch("https://nomoreparties.co/v1/" + `${cohortId}` + "/cards", {
    method: "GET",
    headers: apiConfig.headers,
  })
    .then((res) => {
      return res.json();
    })

    .then((data) => {
      data.reverse().forEach((cardinfo) => {
        renderCard(cardinfo.name, cardinfo.link);
      });
    })
    .catch((error) => console.log(error));
}

getCards();

///////////// end of API /////////////

enableValidation(validationConfig);

// popup update details

function updateProfile(evt) {
  evt.preventDefault();

  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup(profileUpdaterPopup);
}

// viewing posts listeners

pictureViewerCloseButton.addEventListener("click", function handleClick(event) {
  closePopup(pictureViewerPopup);
});

// add pic form listeners

picAdderOpenButton.addEventListener("click", function handleClick(event) {
  openPopup(placeAdderPopup);
});

picAdderCloseButton.addEventListener("click", function handleClick(event) {
  closePopup(placeAdderPopup);
});

picAdderFormElement.addEventListener("submit", addPicFormSubmitHandler);

// profile edit listeners

profileUpdaterPopupOpenButton.addEventListener(
  "click",
  function handleClick(event) {
    nameInput.value = userName.textContent;
    jobInput.value = userJob.innerText;
    openPopup(profileUpdaterPopup);
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
