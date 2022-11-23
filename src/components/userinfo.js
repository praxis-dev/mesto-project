import { api } from "./api";

import { userName, userJob, profileAvatar, currentUser } from "./global";

import { profileChangerPopup } from "../pages";

export class UserInfo {
  constructor(nameInput, jobInput) {
    this._nameInput = nameInput;
    this._jobInput = jobInput;
  }

  _updateProfileFromServer(dataName, dataAbout, dataAvatar, dataId) {
    userName.innerText = dataName;
    userJob.innerText = dataAbout;
    profileAvatar.src = dataAvatar;
    currentUser.id = dataId;
  }

  async getUserInfo() {
    api.getProfileInfo().then((res) => {
      return res
        .json()
        .then((data) => {
          this._updateProfileFromServer(
            data.name,
            data.about,
            data.avatar,
            data._id
          );
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  async setUserInfo() {
    api
      .patchProfile(this._nameInput.value, this._jobInput.value)
      .then((response) => {
        return response.json();
      })
      .then((data) => {
        userName.textContent = data.name;
        userJob.textContent = data.about;
      })
      .then(() => profileChangerPopup.close())
      .catch((err) => {
        console.log(err);
      })
      .finally(() => profileChangerPopup.displayDefaultSubmitButtonText());
  }
}
