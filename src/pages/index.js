import "./styles.css";

import {
  userName,
  userJob,
  nameInput,
  jobInput,
  profileUpdaterPopup,
  openPopup,
  closePopup,
  updateProfile,
  profileUpdaterPopupOpenButton,
  profileUpdaterPopupCloseButton,
  profileUpdaterInputForm,
  picAdderOpenButton,
  picAdderCloseButton,
  pictureViewerCloseButton,
} from "../components/modal";

import {
  picAdderFormElement,
  addPicFormSubmitHandler,
  placeAdderPopup,
  pictureViewerPopup,
} from "../components/card";

// validation

const profileForm = document.forms.user_title_subtitle;
const addPostForm = document.forms.place_form;

nameInput.addEventListener("input", validate);
jobInput.addEventListener("input", validate);
const nameReg = /^[a-zA-Zа-яёА-ЯЁ -]{4,40}$/;
const jobReg = /^[a-zA-Zа-яёА-ЯЁ -]{4,200}$/;

function validate(e) {
  let target = e.target;
  console.log(target.name);
  if (target.name == "profile-name") {
    if (target.value.length === 0) {
      console.log("вы пропустили это поле");
    } else if (target.value.length < 4) {
      console.log("минимальная длина имени 4 символа");
    } else if (nameReg.test(target.value)) {
      console.log(target.value);
      console.log("profile name valid");
    } else if (target.value.length > 20) {
      console.log("Больше 20ти");
    } else {
      console.log("profile name not valid");
    }
  } else if (target.name == "profile-subtitle") {
    if (target.value.length === 0) {
      console.log("вы пропустили это поле работа");
    } else if (target.value.length < 4) {
      console.log("минимальная длина работы 4 символа");
    } else if (jobReg.test(target.value)) {
      console.log(target.value);
      console.log("job name valid");
    } else if (target.value.length > 200) {
      console.log("Больше 200");
    } else {
      console.log("job name not valid");
    }
  }
}

// viewing posts listeners

pictureViewerCloseButton.addEventListener("click", function handleClick(event) {
  closePopup(pictureViewerPopup);
});

// add pic form listeners

picAdderOpenButton.addEventListener("click", function handleClick(event) {
  openPopup(placeAdderPopup);
});

picAdderCloseButton.addEventListener("click", function handleClick(event) {
  closePopup(placeAdderPopup);
});

picAdderFormElement.addEventListener("submit", addPicFormSubmitHandler);

// profile edit listeners

profileUpdaterPopupOpenButton.addEventListener(
  "click",
  function handleClick(event) {
    nameInput.value = userName.textContent;
    jobInput.value = userJob.innerText;
    openPopup(profileUpdaterPopup);
  }
);

profileUpdaterPopupCloseButton.addEventListener(
  "click",
  function handleClick(event) {
    closePopup(profileUpdaterPopup);
  }
);

profileUpdaterInputForm.addEventListener("submit", updateProfile);
