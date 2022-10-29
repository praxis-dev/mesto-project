// validation

import { postButton } from "./global";

const validationConfig = {
  inputErrorClass: "edit-window__input-string_mistake",
  inputErrorActiveClass: "edit-window__mistake-message_active",
  editWindowInputForm: ".edit-window__input-form",
  editWindowInputString: ".edit-window__input-string",
  editWindowSubmitInactive: "edit-window__submit_inactive",
  editWindowSubmit: ".edit-window__submit",
};

const showInputError = (
  formElement,
  inputElement,
  errorMessage,
  validationConfig
) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(validationConfig.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(validationConfig.inputErrorActiveClass);
};

const hideInputError = (formElement, inputElement, validationConfig) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(validationConfig.inputErrorClass);
  errorElement.classList.remove(validationConfig.inputErrorActiveClass);
};

const isValid = (formElement, inputElement, validationConfig) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      validationConfig
    );
  } else {
    hideInputError(formElement, inputElement, validationConfig);
  }
};

const setEventListeners = (formElement, validationConfig) => {
  const inputList = Array.from(
    formElement.querySelectorAll(validationConfig.editWindowInputString)
  );
  const buttonElement = formElement.querySelector(
    validationConfig.editWindowSubmit
  );
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, validationConfig);
      toggleButtonState(inputList, buttonElement, validationConfig);
    });
  });
};

const enableValidation = (validationConfig) => {
  const formList = Array.from(
    document.querySelectorAll(validationConfig.editWindowInputForm)
  );
  formList.forEach((formElement) => {
    setEventListeners(formElement, validationConfig);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, validationConfig) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(validationConfig.editWindowSubmitInactive);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(validationConfig.editWindowSubmitInactive);
  }
};

function blockSubmit() {
  console.log("block submit triggered");
  postButton.disabled = true;
}

export { enableValidation, validationConfig, blockSubmit };
