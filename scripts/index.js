import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import { openModal, closeModal } from "./util.js";

const initialCards = [
  {
    name: "Vale de Yosemite",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_yosemite.jpg",
  },
  {
    name: "Lago Louise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lake-louise.jpg",
  },
  {
    name: "Montanhas Carecas",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_bald-mountains.jpg",
  },
  {
    name: "Latemar",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_latemar.jpg",
  },
  {
    name: "Parque Nacional Vanoise",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_vanoise.jpg",
  },
  {
    name: "Lago di Braies",
    link: "https://practicum-content.s3.us-west-1.amazonaws.com/web-code/moved_lago.jpg",
  },
];

const config = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  errorClass: ".popup-type-error",
  activeErrorClass: "popup-type-error_active",
};

const editBtn = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector("#edit-popup");
const editPopupCloseBtn = editPopup.querySelector(".popup__close");
const nameInput = editPopup.querySelector(".popup__input_type_name");
const profileName = document.querySelector(".profile__title");
const descriptionInput = editPopup.querySelector(
  ".popup__input_type_description",
);
const profileDescription = document.querySelector(".profile__description");
const formElement = editPopup.querySelector("#edit-profile-form");
const cardsList = document.querySelector(".cards__list");
const popupBtn = formElement.querySelector(".popup__button");

const addBtn = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector("#new-card-popup");
const newCardCloseBtn = newCardPopup.querySelector(".popup__close");
const titleInput = newCardPopup.querySelector(".popup__input_type_card-name");
const imgInput = newCardPopup.querySelector(".popup__input_type_url");
const createFormElement = newCardPopup.querySelector("#new-card-form");
const createBtn = createFormElement.querySelector(".popup__button");

const formValidator1 = new FormValidator(config, formElement);
const formValidator2 = new FormValidator(config, createFormElement);

formValidator1.setEventListeners();
formValidator2.setEventListeners();

initialCards.forEach(function (item) {
  const card = new Card(item, "#card-template");
  const cardElement = card.generateCard();
  cardsList.prepend(cardElement);
});

function fillProfileForm() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function fillAddForm() {
  titleInput.value = "";
  imgInput.value = "";
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  const nameInputValue = nameInput.value;
  const descriptionInputValue = descriptionInput.value;
  profileName.textContent = nameInputValue;
  profileDescription.textContent = descriptionInputValue;
  closeModal(editPopup);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  const card = new Card(
    { name: titleInput.value, link: imgInput.value },
    "#card-template",
  );
  const cardElement = card.generateCard();
  closeModal(newCardPopup);
  cardsList.prepend(cardElement);
}

editBtn.addEventListener("click", () => handleOpenEditModal(editPopup));
editPopupCloseBtn.addEventListener("click", () => closeModal(editPopup));
formElement.addEventListener("submit", handleProfileFormSubmit);
addBtn.addEventListener("click", () => handleOpenAddModal(newCardPopup));
newCardCloseBtn.addEventListener("click", () => closeModal(newCardPopup));
createFormElement.addEventListener("submit", handleCardFormSubmit);

function handleCloseClick(evt) {
  if (evt.target.classList.contains("popup")) {
    closeModal(evt.currentTarget);
  }
}
document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", handleCloseClick);
});

function handleOpenAddModal(modal) {
  openModal(modal);
  fillAddForm();
  formValidator2.resetValidation();
}

function handleOpenEditModal(modal) {
  openModal(modal);
  fillProfileForm();
  formValidator1.resetValidation();
}
