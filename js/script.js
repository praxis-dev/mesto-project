// popup open/close

const popup = document.getElementById("popup");
const popupOpenButton = document.getElementById("profile__edit-icon");
const popupCloseButton = document.getElementById("edit-window__close-button");

popupOpenButton.addEventListener("click", function handleClick(event) {
  console.log("user clicked: ", event.target);
  popup.classList.add("popup_active");
});

popupCloseButton.addEventListener("click", function handleClick(event) {
  console.log("user clicked: ", event.target);
  popup.classList.remove("popup_active");
});

// popup update details

const formElement = document.querySelector("#edit-window__input-form");
let userName = document.querySelector("#profile__title");
let userJob = document.querySelector("#profile__subtitle");
const nameInput = document.querySelector("#profile-name");
const jobInput = document.querySelector("#profile-subtitle");

function formSubmitHandler(evt) {
  evt.preventDefault();

  userName.textContent = nameInput.value;
  userJob.textContent = jobInput.value;
}
formElement.addEventListener("submit", formSubmitHandler);

// default cards

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
const postGrid = document.querySelector("#post-grid");
const post = document.querySelector("#post");
const posts = document.getElementsByClassName("post");

postGrid.innerHTML = "";
function createCard(name, link) {
  const postTemplate = document.querySelector("#post-template").content;
  const postElement = postTemplate.querySelector(".post").cloneNode(true);

  postElement.querySelector(".post__picture").src = link;
  postElement.querySelector(".post__title").textContent = name;

  postGrid.append(postElement);
}

initialCards.forEach((cardinfo) => {
  createCard(cardinfo.name, cardinfo.link);
});

// add pic form open/close

const popup2 = document.getElementById("popup2");
const addPicOpenButton = document.getElementById("profile__add-button");
const addPicCloseButton = document.getElementById(
  "add-pic-window__close-button"
);

addPicOpenButton.addEventListener("click", function handleClick(event) {
  console.log("user clicked: ", event.target);
  popup2.classList.add("popup_active");
});

addPicCloseButton.addEventListener("click", function handleClick(event) {
  console.log("user clicked: ", event.target);
  popup2.classList.remove("popup_active");
});

// add new card
