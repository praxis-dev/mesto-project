import { Popup } from "./popup";

export class PopupWithImage extends Popup {
  constructor(pictureViewerPicture) {
    super(pictureViewerPicture);
    this._pictureViewerPicture = pictureViewerPicture;
    this._picture = this._pictureViewerPicture.querySelector(
      ".picture-viewer__pic"
    );
    this._caption = this._pictureViewerPicture.querySelector(
      ".picture-viewer__caption"
    );
  }

  set(link, name) {
    (this._picture.src = link),
      (this._picture.alt = name),
      (this._caption.textContent = name);
  }
}
