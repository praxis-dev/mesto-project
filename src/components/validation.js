// validation

import { postButton } from "./global";

export const validationConfig = {
  inputErrorClass: "edit-window__input-string_mistake",
  inputErrorActiveClass: "edit-window__mistake-message_active",
  editWindowInputForm: ".edit-window__input-form",
  editWindowInputString: ".edit-window__input-string",
  editWindowSubmitInactive: "edit-window__submit_inactive",
  editWindowSubmit: ".edit-window__submit",
};

export class FormValidator {
  constructor(validationConfig, form) {
    this._validationConfig = validationConfig;
    this._form = form;
  }

  _showInputError(formElement, inputElement, errorMessage, _validationConfig) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(_validationConfig.inputErrorClass);
    errorElement.textContent = errorMessage;
    errorElement.classList.add(_validationConfig.inputErrorActiveClass);
  }

  _hideInputError(formElement, inputElement, _validationConfig) {
    const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(_validationConfig.inputErrorClass);
    errorElement.classList.remove(_validationConfig.inputErrorActiveClass);
  }

  _isValid(formElement, inputElement, _validationConfig) {
    if (!inputElement.validity.valid) {
      this._showInputError(
        formElement,
        inputElement,
        inputElement.validationMessage,
        _validationConfig
      );
    } else {
      this._hideInputError(formElement, inputElement, _validationConfig);
    }
  }

  _setEventListeners(formElement, _validationConfig) {
    const inputList = Array.from(
      formElement.querySelectorAll(_validationConfig.editWindowInputString)
    );
    const buttonElement = formElement.querySelector(
      _validationConfig.editWindowSubmit
    );
    inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._isValid(formElement, inputElement, _validationConfig);
        this._toggleButtonState(inputList, buttonElement, _validationConfig);
      });
    });
  }

  enableValidation() {
    this._setEventListeners(this._form, this._validationConfig);
  }

  _hasInvalidInput(inputList) {
    return inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(inputList, buttonElement, _validationConfig) {
    if (this._hasInvalidInput(inputList)) {
      buttonElement.disabled = true;
      buttonElement.classList.add(_validationConfig.editWindowSubmitInactive);
    } else {
      buttonElement.disabled = false;
      buttonElement.classList.remove(
        _validationConfig.editWindowSubmitInactive
      );
    }
  }

  blockSubmit() {
    postButton.disabled = true;
  }
}

// export const formValidator = new FormValidator(apiConfig);
