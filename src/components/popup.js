import { ESC_CODE } from "./global";

// popup general class

export class Popup {
  constructor(popup) {
    this._popup = popup;
    this._popupCloseButton = this._popup.querySelector(
      ".edit-window__close-button"
    );
  }

  open = () => {
    this._popup.classList.add("popup_active");
    document.addEventListener("keydown", this._closeByEsc);
    this._popup.addEventListener("mousedown", (evt) => {
      if (evt.target.classList.contains("popup")) {
        this.close();
      }
    });
  };

  close() {
    this._popup.classList.remove("popup_active");
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
