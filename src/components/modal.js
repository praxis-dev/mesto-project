import { addPicFormSubmitHandler } from "../pages";

import { displayDefaultSubmitButtonText } from "../pages";

import {
  allPopups,
  userName,
  userJob,
  nameInput,
  jobInput,
  profileUpdaterPopup,
  profileUpdaterPopupOpenButton,
  profileUpdaterPopupCloseButton,
  profileUpdaterInputForm,
  avatarInput,
  picAdderOpenButton,
  picAdderCloseButton,
  pictureViewerCloseButton,
  avatarAdderOpenButton,
  avatarAdderCloseButton,
  ESC_CODE,
  pictureViewerPicture,
  pictureViewerPopup,
  placeLinkInput,
  postButton,
} from "./global";

// popup general class

export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popupCloseButton = popupSelector.querySelector(
      ".edit-window__close-button"
    );
  }

  confirmReception() {
    console.log(this._popupCloseButton);
  }
  open = () => {
    this._popupSelector.classList.add("popup_active");
    document.addEventListener("keydown", this._closeByEsc);
    this._popupSelector.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup")) {
        this.close();
        console.log("overlay closed by oop too");
      }
    });
    console.log("opened with oop!");
  };

  close() {
    this._popupSelector.classList.remove("popup_active");
    document.removeEventListener("keydown", this._closeByEsc);
    console.log("closed with OOP!");
  }

  _closeByEsc = (evt) => {
    console.log("oop close triggered!");
    if (evt.key === ESC_CODE) {
      console.log("esc triggered");
      this.close();
    }
  };

  setEventlisteners() {
    console.log("oop listeners set");
    this._popupCloseButton.addEventListener("click", () => {
      this.close();
    });
  }
}

// picture viewer popup

export class PopupWithImage extends Popup {
  constructor(pictureViewerPicture, popupCloseButton) {
    super(pictureViewerPicture);
    this._pictureViewerPicture = pictureViewerPicture;
    this._popupCloseButton = popupCloseButton;
  }

  confirmImageParameters() {
    console.log(
      this._pictureViewerPicture.querySelector(".picture-viewer__pic").src,
      this._pictureViewerPicture.querySelector(".picture-viewer__pic").alt,
      this._pictureViewerPicture.querySelector(".picture-viewer__caption")
        .textContent,
      this._popupCloseButton
    );
  }

  set(link, name) {
    (this._pictureViewerPicture.querySelector(".picture-viewer__pic").src =
      link),
      (this._pictureViewerPicture.querySelector(".picture-viewer__pic").alt =
        name),
      (this._pictureViewerPicture.querySelector(
        ".picture-viewer__caption"
      ).textContent = name);
    console.log("image set with oop");
  }
}

export class PopupWithForm extends Popup {
  constructor(popupSelector, submitCallBack) {
    super(popupSelector);
    this._submitCallback = submitCallBack;
    this._form = popupSelector.querySelector(".edit-window__input-form");
    this._inputs = popupSelector.querySelectorAll(".edit-window__input-string");
    this._submit = popupSelector.querySelector(".edit-window__submit");
  }

  confirmFormconstructor() {
    console.log(this._form, this._inputs, this._submit);
  }

  close() {
    super.close();
    this._form.reset();
    console.log("OOP close and reset");
  }

  setEventlisteners() {
    super.setEventlisteners();
    console.log("it's upgraded setEventListeners popupWithForm");
    this._form.addEventListener("submit", this._submitCallback);
  }

  displayLoading() {
    console.log("OOP loading status triggered");
    const formSubmitButton = this._form.querySelector('button[type="submit"]');
    formSubmitButton.textContent = "Сохранение...";
  }

  displayDefaultSubmitButtonText() {
    console.log("OOP loading status triggered");
    const formSubmitButton = this._form.querySelector('button[type="submit"]');
    formSubmitButton.textContent = "Сохранить";
  }
}

// popup close modals

function closeByEsc(evt) {
  if (evt.key === ESC_CODE) {
    const openedPopup = document.querySelector(".popup_active");
    closePopup(openedPopup);
  }
}
