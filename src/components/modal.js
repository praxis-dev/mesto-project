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
} from "./global";

export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
  }

  confirmReception() {
    console.log(this._popupSelector);
  }
  openPopup() {
    console.log("it's oop!");
    this._popupSelector.classList.add("popup_active");
    document.addEventListener("keydown", this._closeByEsc);
    this._popupSelector.addEventListener("mousedown", function (evt) {
      if (evt.target.classList.contains("popup")) {
        const openedPopup = document.querySelector(".popup_active");
        closePopup(openedPopup);
      }
    });
  }

  closePopup() {
    console.log("it's oop too!");
    this._popupSelector.classList.remove("popup_active");
    document.removeEventListener("keydown", this._closeByEsc);
  }

  _closeByEsc(evt) {
    console.log("oop close triggered!");
    if (evt.key === ESC_CODE) {
      const openedPopup = document.querySelector(".popup_active");
      closePopup(openedPopup);
    }
  }

  setEventlisteners(popupCloseButton) {
    console.log("oop listeners set");
    const openedPopup = document.querySelector(".popup_active");
    popupCloseButton.addEventListener("click", function handleClick(event) {
      closePopup(openedPopup);
    });
  }
}

export class PopupWithImage extends Popup {
  constructor(pictureViewerPicture, link, name) {
    super(pictureViewerPicture);
    this._pictureViewerPicture = pictureViewerPicture;
    this._link = link;
    this._name = name;
  }

  openPopup() {
    super.openPopup();
    // this._pictureViewerPicture = this._link;
    // this._;
  }
}

export const testPopupWithImage = new PopupWithImage(pictureViewerPopup);

console.log(testPopupWithImage.closePopup());

// export function setPictureViewer(link, name) {
//   pictureViewerPicture.src = link;
//   pictureViewerPicture.alt = name;
//   pictureViewerCaption.textContent = name;
// }

// popup open/close

function openPopup(popup) {
  popup.classList.add("popup_active");
  document.addEventListener("keydown", closeByEsc);
}

function closePopup(popup) {
  popup.classList.remove("popup_active");
  document.removeEventListener("keydown", closeByEsc);
}

// popup close modals

function closeByEsc(evt) {
  if (evt.key === ESC_CODE) {
    const openedPopup = document.querySelector(".popup_active");
    closePopup(openedPopup);
  }
}

export { openPopup, closePopup, closeByEsc };
