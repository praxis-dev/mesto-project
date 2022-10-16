// popup open/close

function openPopup(popup) {
  popup.classList.add("popup_active");
}

function closePopup(popup) {
  popup.classList.remove("popup_active");
}

export { openPopup };
export { closePopup };

// popup update details

const userName = document.querySelector("#profile__title");
const userJob = document.querySelector("#profile__subtitle");
const nameInput = document.querySelector("#profile-name");
const jobInput = document.querySelector("#profile-subtitle");
const profileUpdaterPopup = document.querySelector(".profile-edit-popup");

function updateProfile(evt) {
  evt.preventDefault();

  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup(profileUpdaterPopup);
  console.log("yes");
}

export { updateProfile };
export { userName, userJob, nameInput, jobInput, profileUpdaterPopup };
