import { ESC_CODE } from "./global";

// popup general class

export class Popup {
  constructor(popupSelector) {
    this._popupSelector = popupSelector;
    this._popupCloseButton = popupSelector.querySelector(
      ".edit-window__close-button"
    );
  }

  open = () => {
    this._popupSelector.classList.add("popup_active");
    document.addEventListener("keydown", this._closeByEsc);
    this._popupSelector.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup")) {
        this.close();
      }
    });
  };

  close() {
    this._popupSelector.classList.remove("popup_active");
    document.removeEventListener("keydown", this._closeByEsc);
  }

  _closeByEsc = (evt) => {
    if (evt.key === ESC_CODE) {
      this.close();
    }
  };

  setEventlisteners() {
    this._popupCloseButton.addEventListener("click", () => {
      this.close();
    });
  }
}

// picture viewer popup
