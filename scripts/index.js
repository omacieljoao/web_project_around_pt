import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import Api from "./Api.js";
import PopupWithConfirmation from "./PopupWithConfirmation.js";

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
const addBtn = document.querySelector(".profile__add-button");
const formElement = document.querySelector("#edit-profile-form");
const createFormElement = document.querySelector("#new-card-form");
const nameInput = document.querySelector(".popup__input_type_name");
const descriptionInput = document.querySelector(
  ".popup__input_type_description",
);

const api = new Api({
  baseUrl: "https://around-api.pt-br.tripleten-services.com/v1",
  headers: {
    authorization: "5300bed1-0190-4c64-a95d-32ad375e02ee",
    "Content-Type": "application/json",
  },
});

const confirmDelete = new PopupWithConfirmation(".trash-popup");
confirmDelete.setEventListeners();

const userInfo = new UserInfo({
  nameSelector: ".profile__title",
  jobSelector: ".profile__description",
});

const popupWithImage = new PopupWithImage("#image-popup");
popupWithImage.setEventListeners();

function handleProfileFormSubmit(data) {
  userInfo.setUserInfo({ name: data.name, job: data.description });
  editFormPopup.close();
}

const editFormPopup = new PopupWithForm(handleProfileFormSubmit, "#edit-popup");
editFormPopup.setEventListeners();

function handleCardFormSubmit(data) {
  const card = new Card(
    { name: data["place-name"], link: data.link },
    "#card-template",
    handleCardClick,
    confirmDelete,
    api,
  );
  const cardElement = card.generateCard();
  cardSection.addItem(cardElement);
  newCardPopup.close();
}

const newCardPopup = new PopupWithForm(handleCardFormSubmit, "#new-card-popup");
newCardPopup.setEventListeners();

function handleEditProfileImage() {}
const changeProfileImage = new PopupWithForm(
  handleEditProfileImage,
  "#edit-image-popup",
);
changeProfileImage.setEventListeners();

const formValidator1 = new FormValidator(config, formElement);
const formValidator2 = new FormValidator(config, createFormElement);
formValidator1.setEventListeners();
formValidator2.setEventListeners();

function handleCardClick(data) {
  popupWithImage.open(data);
}

function createCard(item) {
  const card = new Card(item, "#card-template", handleCardClick, confirmDelete);
  return card.generateCard();
}

const cardSection = new Section(
  {
    items: initialCards,
    renderer: createCard,
  },
  ".cards__list",
);
cardSection.renderer();

editBtn.addEventListener("click", () => {
  const { name, job } = userInfo.getUserInfo();
  nameInput.value = name;
  descriptionInput.value = job;
  formValidator1.resetValidation();
  editFormPopup.open();
});

addBtn.addEventListener("click", () => {
  createFormElement.reset();
  formValidator2.resetValidation();
  newCardPopup.open();
});
