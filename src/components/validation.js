// validation

const profileForm = document.forms.user_title_subtitle;
const addPostForm = document.forms.place_form;
const profileFormInputList = Array.from(
  profileForm.querySelectorAll(".edit-window__input-string")
);
const addPostFormInputList = Array.from(
  addPostForm.querySelectorAll(".edit-window__input-string")
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

const profileSubmitButton = profileForm.elements.profile_submit;
const placeSubmitButton = addPostForm.elements.place_submit;

const nameReg = /^[a-zA-Zа-яёА-ЯЁ -]{4,40}$/;
const jobReg = /^[a-zA-Zа-яёА-ЯЁ -]{4,200}$/;
const placeNameReg = /^[a-zA-Zа-яёА-ЯЁ -]{2,30}$/;
const placeLinkReg =
  /https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;

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
      jobMistakeMessage.textContent = "Минимальная длина описания 4 символа";
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
      placeLinkMistakeMessage.style.visibility = "hidden";
    } else if (placeLinkReg.test(target.value) === false) {
      placeLinkMistakeMessage.style.visibility = "visible";
      placeLinkMistakeMessage.textContent = "Введите ссылку на фотографию";
    }
  }
}

function checkValidity(formInputList) {
  return formInputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
}

function toggleButtonState(profileFormInputList, profileSubmitButton) {
  if (checkValidity(profileFormInputList)) {
    profileSubmitButton.classList.add("edit-window__submit_inactive");
    profileSubmitButton.disabled = true;
  } else {
    profileSubmitButton.classList.remove("edit-window__submit_inactive");
    profileSubmitButton.disabled = false;
  }
}

export {
  profileForm,
  addPostForm,
  profileFormInputList,
  addPostFormInputList,
  profileSubmitButton,
  placeSubmitButton,
  validate,
  checkValidity,
  toggleButtonState,
};
