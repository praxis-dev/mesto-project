import { Popup } from "./popup";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallBack, serverUserDataUpdater) {
    super(popupSelector);
    this._submitCallback = submitCallBack;
    this._serverUserDataUpdater = serverUserDataUpdater;
    this._form = popupSelector.querySelector(".edit-window__input-form");
    this._inputs = popupSelector.querySelectorAll(".edit-window__input-string");
    this._submit = popupSelector.querySelector(".edit-window__submit");
  }

  close() {
    super.close();
    this._form.reset();
  }

  setEventlisteners() {
    super.setEventlisteners();
    this._form.addEventListener("submit", (evt) => {
      this._submitCallback(evt, this._getInputValues());
    });
  }

  displayLoading() {
    const formSubmitButton = this._form.querySelector('button[type="submit"]');
    formSubmitButton.textContent = "Сохранение...";
  }

  displayDefaultSubmitButtonText() {
    const formSubmitButton = this._form.querySelector('button[type="submit"]');
    formSubmitButton.textContent = "Сохранить";
  }

  _getInputValues() {
    this._formValues = {};
    this._inputs.forEach((input) => {
      this._formValues[input.name] = input.value;
    });
    return this._formValues;
  }

  setUserDataToServer(name, job) {
    return this._serverUserDataUpdater(name, job);
  }
}
