import { Popup } from "./popup";

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallBack) {
    super(popupSelector);
    this._submitCallback = submitCallBack;
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
    this._form.addEventListener("submit", this._submitCallback);
  }

  displayLoading() {
    const formSubmitButton = this._form.querySelector('button[type="submit"]');
    formSubmitButton.textContent = "Сохранение...";
  }

  displayDefaultSubmitButtonText() {
    const formSubmitButton = this._form.querySelector('button[type="submit"]');
    formSubmitButton.textContent = "Сохранить";
  }
}
