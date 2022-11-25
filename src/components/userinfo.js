import { api } from "./api";

import { userName, userJob, profileAvatar, currentUser } from "./global";

import { profileChangerPopup } from "../pages";

export class UserInfo {
  constructor(nameInput, jobInput, profileInfo, setter) {
    this._nameInput = nameInput;
    this._jobInput = jobInput;
    this._profileInfo = profileInfo;
    this._setter = setter;
  }

  updateProfile(dataName, dataAbout, dataAvatar, dataId) {
    userName.innerText = dataName;
    userJob.innerText = dataAbout;
    profileAvatar.src = dataAvatar;
    currentUser.id = dataId;
  }

  async getUserInfo() {
    return this._profileInfo;
  }

  async setUserInfo() {
    this._setter(this._nameInput, this._jobInput);
  }
}
