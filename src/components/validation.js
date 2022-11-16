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

export class FormValidator {
  constructor(validationConfig) {
    this._inputErrorClass = validationConfig.inputErrorClass;
    this._inputErrorActiveClass = validationConfig.inputErrorActiveClass;
    this._editWindowInputForm = validationConfig.editWindowInputForm;
    this._editWindowInputString = validationConfig.editWindowInputString;
    this._editWindowSubmitInactive = validationConfig.editWindowSubmitInactive;
    this._editWindowSubmit = validationConfig.editWindowSubmit;
  }

  _showInputError(formElement, inputElement, errorMessage, validationConfig) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(validationConfig.inputErrorActiveClass);
  }

  _hideInputError(formElement, inputElement, validationConfig) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(validationConfig.inputErrorClass);
    errorElement.classList.remove(validationConfig.inputErrorActiveClass);
  }

  _isValid(formElement, inputElement, validationConfig) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage,
        validationConfig
      );
    } else {
      this._hideInputError(formElement, inputElement, validationConfig);
    }
  }

  _setEventListeners(formElement, validationConfig) {
    const inputList = Array.from(
      formElement.querySelectorAll(validationConfig.editWindowInputString)
    );
    const buttonElement = formElement.querySelector(
      validationConfig.editWindowSubmit
    );
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(formElement, inputElement, validationConfig);
        this._toggleButtonState(inputList, buttonElement, validationConfig);
      });
    });
  }

  enableValidation(validationConfig, form) {
    this._setEventListeners(form, validationConfig);
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement, validationConfig) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(validationConfig.editWindowSubmitInactive);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(validationConfig.editWindowSubmitInactive);
    }
  }

  blockSubmit() {
    postButton.disabled = true;
  }
}

// export const formValidator = new FormValidator(apiConfig);

export { validationConfig };
