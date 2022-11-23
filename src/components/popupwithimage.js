import { Popup } from "./popup";

export class PopupWithImage extends Popup {
  constructor(pictureViewerPicture, popupCloseButton) {
    super(pictureViewerPicture);
    this._pictureViewerPicture = pictureViewerPicture;
    this._popupCloseButton = popupCloseButton;
  }

  set(link, name) {
    (this._pictureViewerPicture.querySelector(".picture-viewer__pic").src =
      link),
      (this._pictureViewerPicture.querySelector(".picture-viewer__pic").alt =
        name),
      (this._pictureViewerPicture.querySelector(
        ".picture-viewer__caption"
      ).textContent = name);
  }
}
