const profileUpdaterPopup = document.querySelector(".profile-edit-popup");
const placeAdderPopup = document.querySelector(".place-add-popup");
const pictureViewerPopup = document.querySelector(".popup_dark");
const popupOpenButton = document.getElementById("profile__edit-icon");
const popupCloseButton = document.getElementById("edit-window__close-button");
const userName = document.querySelector("#profile__title");
const userJob = document.querySelector("#profile__subtitle");
const inputForm = document.querySelector("#edit-window__input-form");
const nameInput = document.querySelector("#profile-name");
const jobInput = document.querySelector("#profile-subtitle");
const postTemplate = document.querySelector("#post-template").content;
const postGrid = document.querySelector("#post-grid");
const posts = document.getElementsByClassName("post");
const picAdderOpenButton = document.getElementById("profile__add-button");
const picAdderCloseButton = document.getElementById(
  "add-pic-window__close-button"
);
const pictureViewerCloseButton = document.getElementById(
  "picture-viewer__close-button"
);
const initialCards = [
  {
    name: "Архыз",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg",
  },
  {
    name: "Челябинская область",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg",
  },
  {
    name: "Иваново",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg",
  },
  {
    name: "Камчатка",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg",
  },
  {
    name: "Холмогорский район",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg",
  },
  {
    name: "Байкал",
    link: "https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg",
  },
];

// popup open/close

nameInput.defaultValue = userName.textContent;
jobInput.defaultValue = userJob.textContent.replace(/\s{2,}/g, " ").trim();

function openPopup(profileUpdaterPopup) {
  profileUpdaterPopup.classList.add("popup_active");
}
function closePopup(profileUpdaterPopup) {
  profileUpdaterPopup.classList.remove("popup_active");
}

// popup update details

function updateProfile(evt) {
  evt.preventDefault();

  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
  closePopup(profileUpdaterPopup);
}

// creating cards

function createCard(name, link) {
  const postElement = postTemplate.querySelector(".post").cloneNode(true);

  postElement.querySelector(".post__picture").src = link;
  postElement.querySelector(".post__title").textContent = name;
  postElement.querySelector(".post__picture").alt = name;

  const trashIcon = postElement.querySelector(".post__trash-icon");

  trashIcon.addEventListener("click", (event) => {
    console.log("user clicked: ", event.target);
    event.target.closest(".post").remove(event.target.closest(".post"));
  });

  const likeButton = postElement.querySelector(".post__like-button");

  likeButton.addEventListener("click", (event) => {
    console.log("user clicked: ", event.target);
    likeButton.classList.toggle("post__like-button_active");
  });

  const clickablePicture = postElement.querySelector(".post__picture");

  clickablePicture.addEventListener("click", (event) => {
    console.log("user clicked: ", event.target);

    console.log(
      event.target.parentNode.textContent.replace(/\s{2,}/g, " ").trim()
    );
    console.log(document.getElementById("picture-viewer-picture").alt);
    openPopup(pictureViewerPopup);
    document.getElementById("picture-viewer-picture").src = event.target.src;
    document.getElementById("picture-viewer-picture").alt =
      event.target.parentNode.textContent.replace(/\s{2,}/g, " ").trim();
    document.getElementById("picture-viewer-caption").textContent =
      event.target.parentNode.textContent;
  });

  renderCard(postElement);
}

function renderCard(postElement) {
  postGrid.prepend(postElement);
}

initialCards.reverse().forEach((cardinfo) => {
  createCard(cardinfo.name, cardinfo.link);
});

// add new card

const picAdderFormElement = document.getElementById(
  "add-pic-window__input-form"
);
const placeInput = document.getElementById("place-name");
const placeLinkInput = document.getElementById("place-link");

function addPicFormSubmitHandler(evt) {
  evt.preventDefault();

  createCard(placeInput.value, placeLinkInput.value);
  placeAdderPopup.classList.remove("popup_active");
  picAdderFormElement.reset();
}

// viewing posts listents

pictureViewerCloseButton.addEventListener("click", function handleClick(event) {
  console.log("user clicked: ", event.target);
  closePopup(pictureViewerPopup);
});

// add pic form listeners

picAdderOpenButton.addEventListener("click", function handleClick(event) {
  console.log("user clicked: ", event.target);
  openPopup(placeAdderPopup);
});

picAdderCloseButton.addEventListener("click", function handleClick(event) {
  console.log("user clicked: ", event.target);
  closePopup(placeAdderPopup);
});

picAdderFormElement.addEventListener("submit", addPicFormSubmitHandler);

// profile edit listeners

popupOpenButton.addEventListener("click", function handleClick(event) {
  console.log("user clicked: ", event.target);
  openPopup(profileUpdaterPopup);
});

popupCloseButton.addEventListener("click", function handleClick(event) {
  console.log("user clicked: ", event.target);
  closePopup(profileUpdaterPopup);
});

inputForm.addEventListener("submit", updateProfile);
