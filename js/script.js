const profileUpdaterPopup = document.querySelector(".profile-edit-popup");
const placeAdderPopup = document.querySelector(".place-add-popup");
const pictureViewerPopup = document.querySelector(".popup_dark");
const pictureViewerPicture = document.getElementById("picture-viewer-picture");
const pictureViewerCaption = document.getElementById("picture-viewer-caption");
const profileUpdaterPopupOpenButton =
  document.getElementById("profile__edit-icon");
const profileUpdaterPopupCloseButton = document.getElementById(
  "edit-window__close-button"
);
const userName = document.querySelector("#profile__title");
const userJob = document.querySelector("#profile__subtitle");
const profileUpdaterInputForm = document.querySelector(
  "#edit-window__input-form"
);
const nameInput = document.querySelector("#profile-name");
const jobInput = document.querySelector("#profile-subtitle");
const postTemplate = document.querySelector("#post-template").content;
const postGrid = document.querySelector("#post-grid");
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

nameInput.value = userName.textContent;
jobInput.value = userJob.textContent.replace(/\s{2,}/g, " ").trim();

function openPopup(popup) {
  popup.classList.add("popup_active");
}
function closePopup(popup) {
  popup.classList.remove("popup_active");
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

  const postImage = postElement.querySelector(".post__picture");
  const postName = postElement.querySelector(".post__title");

  postImage.src = link;
  postName.textContent = name;
  postImage.alt = name;

  const trashIcon = postElement.querySelector(".post__trash-icon");

  trashIcon.addEventListener("click", (event) => {
    event.target.closest(".post").remove(event.target.closest(".post"));
  });

  const likeButton = postElement.querySelector(".post__like-button");

  likeButton.addEventListener("click", (event) => {
    likeButton.classList.toggle("post__like-button_active");
  });

  postImage.addEventListener("click", (event) => {
    openPopup(pictureViewerPopup);
    pictureViewerPicture.src = link;
    pictureViewerPicture.alt = name;
    pictureViewerCaption.textContent = name;
  });

  return postElement;
}

function renderCard(name, link) {
  const postElement = createCard(name, link);
  postGrid.prepend(postElement);
}

initialCards.reverse().forEach((cardinfo) => {
  renderCard(cardinfo.name, cardinfo.link);
});

// add new card

const picAdderFormElement = document.getElementById(
  "add-pic-window__input-form"
);
const placeInput = document.getElementById("place-name");
const placeLinkInput = document.getElementById("place-link");

function addPicFormSubmitHandler(evt) {
  evt.preventDefault();

  renderCard(placeInput.value, placeLinkInput.value);
  closePopup(placeAdderPopup);
  picAdderFormElement.reset();
}

// viewing posts listents

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
