import { addEscListener, addOverlayListener } from "../pages";

const allPopups = document.querySelectorAll(".popup");
const userName = document.querySelector(".profile__title");
const userJob = document.querySelector(".profile__subtitle");
const nameInput = document.querySelector("#profile-name");
const jobInput = document.querySelector("#profile-subtitle");
const profileUpdaterPopup = document.querySelector(".profile-edit-popup");
const profileUpdaterPopupOpenButton =
  document.getElementById("profile__edit-icon");

const profileUpdaterPopupCloseButton = document.getElementById(
  "edit-window__close-button"
);

const profileUpdaterInputForm = document.querySelector(
  "#edit-window__input-form"
);

const picAdderOpenButton = document.getElementById("profile__add-button");
const picAdderCloseButton = document.getElementById(
  "add-pic-window__close-button"
);
const pictureViewerCloseButton = document.getElementById(
  "picture-viewer__close-button"
);
const ESC_CODE = "Escape";

// popup open/close

function openPopup(popup) {
  popup.classList.add("popup_active");
  addEscListener();
}

function closePopup(popup) {
  popup.classList.remove("popup_active");
  document.removeEventListener("keydown", function eventHandler() {});
}

// popup close modals

function closeByEsc(evt) {
  if (evt.key === ESC_CODE) {
    const openedPopup = document.querySelector(".popup_active");
    closePopup(openedPopup);
  }
}

export {
  profileUpdaterPopupOpenButton,
  profileUpdaterPopupCloseButton,
  profileUpdaterInputForm,
  picAdderOpenButton,
  picAdderCloseButton,
  pictureViewerCloseButton,
  userName,
  userJob,
  nameInput,
  jobInput,
  profileUpdaterPopup,
  allPopups,
  openPopup,
  closePopup,
  closeByEsc,
};
