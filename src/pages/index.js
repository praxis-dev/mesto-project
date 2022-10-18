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
  placeInput,
  placeLinkInput,
} from "../components/card";

// validation

const profileForm = document.forms.user_title_subtitle;
const addPostForm = document.forms.place_form;
const profileFormInputList = Array.from(
  profileForm.querySelectorAll(".edit-window__input-string")
);

const nameMistakeMessage = document.querySelector(
  ".edit-window__name-mistake-message"
);
const jobMistakeMessage = document.querySelector(
  ".edit-window__job-mistake-message"
);
const placeNameMistakeMessage = document.querySelector(
  ".edit-window__place-name-mistake-message"
);
const placeLinkMistakeMessage = document.querySelector(
  ".edit-window__place-link-mistake-message"
);

nameInput.addEventListener("input", validate);
jobInput.addEventListener("input", validate);
placeInput.addEventListener("input", validate);
placeLinkInput.addEventListener("input", validate);

const nameReg = /^[a-zA-Zа-яёА-ЯЁ -]{4,40}$/;
const jobReg = /^[a-zA-Zа-яёА-ЯЁ -]{4,200}$/;
const placeNameReg = /^[a-zA-Zа-яёА-ЯЁ -]{2,30}$/;
const placeLinkReg =
  /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)/;

function validate(e) {
  let target = e.target;
  if (target.name == "profile-name") {
    if (target.value.length === 0) {
      nameMistakeMessage.style.visibility = "visible";
      nameMistakeMessage.textContent = "Вы пропустили это поле";
    } else if (target.value.length < 4) {
      nameMistakeMessage.style.visibility = "visible";
      nameMistakeMessage.textContent = "Минимальная длина имени 4 символа";
    } else if (nameReg.test(target.value)) {
      nameMistakeMessage.style.visibility = "hidden";
    } else if (target.value.length > 20) {
      nameMistakeMessage.style.visibility = "visible";
      nameMistakeMessage.textContent = "Максимальная длина имени 20 символов";
    } else {
      nameMistakeMessage.style.visibility = "visible";
      nameMistakeMessage.textContent = "Используйте алфавит, пробелы и тире";
    }
  } else if (target.name == "profile-subtitle") {
    if (target.value.length === 0) {
      jobMistakeMessage.style.visibility = "visible";
      jobMistakeMessage.textContent = "Вы пропустили это поле";
    } else if (target.value.length < 4) {
      jobMistakeMessage.style.visibility = "visible";
      jobMistakeMessage.textContent = "Минимальная длина имени 4 символа";
    } else if (jobReg.test(target.value)) {
      jobMistakeMessage.style.visibility = "hidden";
    } else if (target.value.length > 200) {
      jobMistakeMessage.style.visibility = "visible";
      jobMistakeMessage.textContent =
        "Максимальная длина описания 200 символов";
    } else {
      jobMistakeMessage.style.visibility = "visible";
      jobMistakeMessage.textContent = "Используйте алфавит, пробелы и тире";
    }
  } else if (target.name == "place-name") {
    if (target.value.length === 0) {
      placeNameMistakeMessage.style.visibility = "visible";
      placeNameMistakeMessage.textContent = "Вы пропустили это поле";
    } else if (target.value.length < 2) {
      placeNameMistakeMessage.style.visibility = "visible";
      placeNameMistakeMessage.textContent =
        "Минимальная длина названия 2 символа";
    } else if (placeNameReg.test(target.value)) {
      placeNameMistakeMessage.style.visibility = "hidden";
    } else if (target.value.length > 30) {
      placeNameMistakeMessage.style.visibility = "visible";
      placeNameMistakeMessage.textContent =
        "Максимальная длина названия 30 символов";
    } else {
      placeNameMistakeMessage.style.visibility = "visible";
      placeNameMistakeMessage.textContent =
        "Используйте алфавит, пробелы и тире";
    }
  } else if (target.name == "place-link") {
    if (target.value.length === 0) {
      placeLinkMistakeMessage.style.visibility = "visible";
      placeLinkMistakeMessage.textContent = "Вы пропустили это поле";
    } else if (placeLinkReg.test(target.value)) {
      console.log(placeLinkReg.test(target.value));
      placeLinkMistakeMessage.style.visibility = "hidden";
    } else if (placeLinkReg.test(target.value) === false) {
      console.log("false");
      placeLinkMistakeMessage.style.visibility = "visible";
      placeLinkMistakeMessage.textContent = "Введите ссылку на фотографию";
    }
  }
}

function checkValidity(profileFormInputList) {
  return profileFormInputList.some((inputElement) => {
    console.log(!inputElement.validity.valid);
    return !inputElement.validity.valid;
  });
}

profileForm.addEventListener("input", function handleInput() {
  checkValidity(profileFormInputList);
});

const profileSubmitButton = profileForm.elements.profile_submit;

function toggleButtonState(profileFormInputList, profileSubmitButton) {
  if (checkValidity(profileFormInputList)) {
    console.log("inactive");
    profileSubmitButton.classList.add("edit-window__submit_inactive");
    profileSubmitButton.disabled = true;
  } else {
    console.log("active");
    profileSubmitButton.classList.remove("edit-window__submit_inactive");
    profileSubmitButton.disabled = false;
  }
}

profileForm.addEventListener("input", function handleInput() {
  checkValidity(toggleButtonState(profileFormInputList, profileSubmitButton));
});

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
