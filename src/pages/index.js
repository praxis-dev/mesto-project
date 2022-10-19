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

// validation

const profileForm = document.forms.user_title_subtitle;
const addPostForm = document.forms.place_form;
const formError = profileForm.querySelector(`.${nameInput.id}-error`);

// Функция, которая добавляет класс с ошибкой
const showInputError = (element, errorMessage) => {
  console.log("invalid");
  formError.textContent = errorMessage;
  element.classList.add("edit-window__input-string_mistake");
  formError.classList.add("edit-window__name-mistake-message_active");
};

// Функция, которая удаляет класс с ошибкой
const hideInputError = (element) => {
  console.log("valid");
  element.classList.remove("edit-window__input-string_mistake");
  formError.classList.remove("edit-window__name-mistake-message_active");
};

// Функция, которая проверяет валидность поля
const isValid = () => {
  console.log(nameInput.validity.valid);
  if (!nameInput.validity.valid) {
    showInputError(nameInput, nameInput.validationMessage);
  } else {
    hideInputError(nameInput);
  }
};

// Вызовем функцию isValid на каждый ввод символа
nameInput.addEventListener("input", function () {
  isValid();
});

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
  if (
    e.target !== editWindows[1] &&
    e.target !== editWindowInputForms[1] &&
    e.target !== placeInput &&
    e.target !== placeLinkInput &&
    e.target !== editWindowTitles[1]
  )
    closeModals();
});
