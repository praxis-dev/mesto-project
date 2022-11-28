import { userName, userJob, profileAvatar, currentUser } from "./global";

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

  setUserInfo() {
    this._setter(this._nameInput, this._jobInput);
  }

  returnNameAndJobLocally() {
    return { userName, userJob };
  }
}
