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

  close = () => {
    this._popupSelector.classList.remove("popup_active");
    document.removeEventListener("keydown", this._closeByEsc);
    console.log("closed with OOP!");
  };

  _closeByEsc = (evt) => {
    console.log("oop close triggered!");
    if (evt.key === ESC_CODE) {
      console.log("esc triggered");
      this.close();
    }
  };

  setEventlisteners = (popupCloseButton) => {
    console.log(popupCloseButton);
    console.log("oop listeners set");
    popupCloseButton.addEventListener("click", () => {
      this.close();
    });
  };
}

export class PopupWithImage extends Popup {
  constructor(pictureViewerPicture, link, name) {
    super(pictureViewerPicture);
    this._pictureViewerPicture = pictureViewerPicture;
    this._link = link;
    this._name = name;
  }

  confirm() {
    console.log(
      this._pictureViewerPicture.querySelector(".picture-viewer__pic").src,
      this._pictureViewerPicture.querySelector(".picture-viewer__pic").alt,
      this._pictureViewerPicture.querySelector(".picture-viewer__caption")
        .textContent
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
