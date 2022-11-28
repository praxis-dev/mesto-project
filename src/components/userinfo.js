import { userName, userJob, profileAvatar, currentUser } from "./global";

export class UserInfo {
  constructor(nameInput, jobInput, profileInfo) {
    this._nameInput = nameInput;
    this._jobInput = jobInput;
    this._profileInfo = profileInfo;
  }

  updateProfile(dataName, dataAbout, dataAvatar, dataId) {
    userName.innerText = dataName;
    userJob.innerText = dataAbout;
    profileAvatar.src = dataAvatar;
    currentUser.id = dataId;
  }

  updateAvatar() {
    console.log("test");
    // profileAvatar.src = data.avatar;
  }

  returnNameAndJobLocally() {
    return { userName, userJob };
  }
}
