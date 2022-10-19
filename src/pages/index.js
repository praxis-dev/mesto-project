import "./styles.css";

import { initialCards } from "../components/data";

import {
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
  closeModals,
} from "../components/modal";

import {
  picAdderFormElement,
  addPicFormSubmitHandler,
  placeAdderPopup,
  pictureViewerPopup,
  placeInput,
  placeLinkInput,
  renderCard,
} from "../components/card";

initialCards.reverse().forEach((cardinfo) => {
  renderCard(cardinfo.name, cardinfo.link);
});

// popup update details

function updateProfile(evt) {
  evt.preventDefault();

  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup(profileUpdaterPopup);
}

// validation

const showInputError = (formElement, inputElement, errorMessage) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add("edit-window__input-string_mistake");
  errorElement.textContent = errorMessage;
  errorElement.classList.add("edit-window__mistake-message_active");
};

const hideInputError = (formElement, inputElement) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove("edit-window__input-string_mistake");
  errorElement.classList.remove("edit-window__mistake-message_active");
};

const isValid = (formElement, inputElement) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

const setEventListeners = (formElement) => {
  const inputList = Array.from(
    formElement.querySelectorAll(".edit-window__input-string")
  );
  const buttonElement = formElement.querySelector(".edit-window__submit");
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement);
      toggleButtonState(inputList, buttonElement);
    });
  });
};

const enableValidation = () => {
  const formList = Array.from(
    document.querySelectorAll(".edit-window__input-form")
  );
  formList.forEach((formElement) => {
    setEventListeners(formElement);
  });
};

enableValidation();

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add("edit-window__submit_inactive");
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove("edit-window__submit_inactive");
  }
};

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
