// validation

const config = {
  inputErrorClass: "edit-window__input-string_mistake",
  inputErrorActiveClass: "edit-window__mistake-message_active",
  editWindowInputForm: ".edit-window__input-form",
  editWindowInputString: ".edit-window__input-string",
  editWindowSubmitInactive: "edit-window__submit_inactive",
  editWindowSubmit: ".edit-window__submit",
};

const showInputError = (formElement, inputElement, errorMessage, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(config.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(config.inputErrorActiveClass);
};

const hideInputError = (formElement, inputElement, config) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(config.inputErrorClass);
  errorElement.classList.remove(config.inputErrorActiveClass);
};

const isValid = (formElement, inputElement, config) => {
  if (!inputElement.validity.valid) {
    showInputError(
      formElement,
      inputElement,
      inputElement.validationMessage,
      config
    );
  } else {
    hideInputError(formElement, inputElement, config);
  }
};

const setEventListeners = (formElement, config) => {
  const inputList = Array.from(
    formElement.querySelectorAll(config.editWindowInputString)
  );
  const buttonElement = formElement.querySelector(config.editWindowSubmit);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", () => {
      isValid(formElement, inputElement, config);
      toggleButtonState(inputList, buttonElement, config);
    });
  });
};

const enableValidation = (config) => {
  const formList = Array.from(
    document.querySelectorAll(config.editWindowInputForm)
  );
  formList.forEach((formElement) => {
    setEventListeners(formElement, config);
  });
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, config) => {
  if (hasInvalidInput(inputList)) {
    buttonElement.disabled = true;
    buttonElement.classList.add(config.editWindowSubmitInactive);
  } else {
    buttonElement.disabled = false;
    buttonElement.classList.remove(config.editWindowSubmitInactive);
  }
};

export { enableValidation, config };
