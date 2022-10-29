// card

export const postTemplate = document
  .querySelector("#post-template")
  .content.querySelector(".post");

export const postGrid = document.querySelector("#post-grid");
export const placeAdderPopup = document.querySelector(".place-add-popup");
export const avatarChangerPopup = document.querySelector(
  ".avatar-change-popup"
);
export const picAdderFormElement = document.getElementById(
  "add-pic-window__input-form"
);
export const avatarAdderFormElement = document.getElementById(
  "add-avatar-window__input-form"
);
export const placeInput = document.getElementById("place-name");
export const placeLinkInput = document.getElementById("place-link");
export const pictureViewerPopup = document.querySelector(".popup_dark");

// modal

export const allPopups = document.querySelectorAll(".popup");
export const userName = document.querySelector(".profile__title");
export const userJob = document.querySelector(".profile__subtitle");
export const nameInput = document.querySelector("#profile-name");
export const jobInput = document.querySelector("#profile-subtitle");
export const profileUpdaterPopup = document.querySelector(
  ".profile-edit-popup"
);
export const profileUpdaterPopupOpenButton =
  document.getElementById("profile__edit-icon");

export const profileUpdaterPopupCloseButton = document.getElementById(
  "edit-window__close-button"
);

export const profileUpdaterInputForm = document.querySelector(
  "#edit-window__input-form"
);
export const avatarInput = document.querySelector("#avatar-link");

export const picAdderOpenButton = document.getElementById(
  "profile__add-button"
);
export const picAdderCloseButton = document.getElementById(
  "add-pic-window__close-button"
);
export const pictureViewerCloseButton = document.getElementById(
  "picture-viewer__close-button"
);

export const avatarAdderOpenButton = document.querySelector(
  ".profile__avatar-and-edit-overlay"
);
export const avatarAdderCloseButton = document.getElementById(
  "change-avatar-window__close-button"
);

export const ESC_CODE = "Escape";

// profile

export const profileAvatar = document.querySelector(".profile__avatar");

// postButton

export const postButton = picAdderFormElement.querySelector(
  ".edit-window__submit"
);
