import "./styles.css";

import {
  userName,
  userJob,
  nameInput,
  jobInput,
  profileUpdaterPopup,
  openPopup,
  closePopup,
  updateProfile,
  profileUpdaterPopupOpenButton,
  profileUpdaterPopupCloseButton,
  profileUpdaterInputForm,
  picAdderOpenButton,
  picAdderCloseButton,
  pictureViewerCloseButton,
  closeModals,
} from "../components/modal";

import {
  picAdderFormElement,
  addPicFormSubmitHandler,
  placeAdderPopup,
  pictureViewerPopup,
  placeInput,
  placeLinkInput,
} from "../components/card";

import {
  profileForm,
  addPostForm,
  profileFormInputList,
  addPostFormInputList,
  profileSubmitButton,
  placeSubmitButton,
  validate,
  checkValidity,
  toggleButtonState,
} from "../components/validation";

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

// form validation listeners

profileForm.addEventListener("input", function handleInput() {
  checkValidity(profileFormInputList);
});

addPostForm.addEventListener("input", function handleInput() {
  checkValidity(addPostFormInputList);
});

profileForm.addEventListener("input", function handleInput() {
  checkValidity(toggleButtonState(profileFormInputList, profileSubmitButton));
});

addPostForm.addEventListener("input", function handleInput() {
  checkValidity(toggleButtonState(addPostFormInputList, placeSubmitButton));
});

nameInput.addEventListener("input", validate);
jobInput.addEventListener("input", validate);
placeInput.addEventListener("input", validate);
placeLinkInput.addEventListener("input", validate);

addEventListener("keydown", function eventHandler(evt) {
  if (evt.key == "Escape") {
    closeModals();
  }
});

pictureViewerPopup.addEventListener("click", function handleClick(e) {
  const pictureViewer = document.querySelector(".picture-viewer__pic");
  if (e.target !== pictureViewer) closeModals();
});

profileUpdaterPopup.addEventListener("mouseup", function handleClick(e) {
  const editWindow = document.querySelector(".edit-window");
  const editWindowInputForm = document.querySelector(
    ".edit-window__input-form"
  );
  const editWindowTitle = document.querySelector(".edit-window__title");
  console.log(e.target);
  if (
    e.target !== editWindow &&
    e.target !== editWindowInputForm &&
    e.target !== nameInput &&
    e.target !== jobInput &&
    e.target !== editWindowTitle
  )
    closeModals();
});

placeAdderPopup.addEventListener("mouseup", function handleClick(e) {
  const editWindows = document.querySelectorAll(".edit-window");
  const editWindowInputForms = document.querySelectorAll(
    ".edit-window__input-form"
  );
  const editWindowTitles = document.querySelectorAll(".edit-window__title");
  console.log(e.target);
  if (
    e.target !== editWindows[1] &&
    e.target !== editWindowInputForms[1] &&
    e.target !== placeInput &&
    e.target !== placeLinkInput &&
    e.target !== editWindowTitles[1]
  )
    closeModals();
});
