import Card from "./Card.js";
import FormValidator from "./FormValidator.js";
import Section from "./Section.js";
import PopupWithImage from "./PopupWithImage.js";
import PopupWithForm from "./PopupWithForm.js";
import UserInfo from "./UserInfo.js";
import Api from "./Api.js";
import PopupWithConfirmation from "./PopupWithConfirmation.js";

const config = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  errorClass: ".popup-type-error",
  activeErrorClass: "popup-type-error_active",
};

const profilePicture = document.querySelector(".profile__image");
const formChangeImg = document.querySelector("#edit-image-form");
const profileImg = document.querySelector(".profile__image-edit");
const editBtn = document.querySelector(".profile__edit-button");
const addBtn = document.querySelector(".profile__add-button");
const formElement = document.querySelector("#edit-profile-form");
const createFormElement = document.querySelector("#new-card-form");
const nameInput = document.querySelector(".popup__input_type_name");
const descriptionInput = document.querySelector(
  ".popup__input_type_description",
);
let cardSection;

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
  api
    .editProfile(data.name, data.description)
    .then((newData) => {
      userInfo.setUserInfo({ name: newData.name, job: newData.about });
      editFormPopup.close();
    })
    .catch((err) => {
      console.log(err);
    });
}

const editFormPopup = new PopupWithForm(handleProfileFormSubmit, "#edit-popup");
editFormPopup.setEventListeners();

function handleCardFormSubmit(data) {
  const card = new Card(
    { name: data["place-name"], link: data.link },
    "#card-template",
    handleCardClick,
    confirmDelete,
    handleLikeClick,
  );
  const cardElement = card.generateCard();
  cardSection.addItem(cardElement);
  newCardPopup.close();
  api.addNewCard(card._name, card._link).catch((err) => {
    console.log(err);
  });
}

const newCardPopup = new PopupWithForm(handleCardFormSubmit, "#new-card-popup");
newCardPopup.setEventListeners();

function handleEditProfileImage(data) {
  api
    .changeProfilePicture(data["edit-image"])
    .then(() => {
      profilePicture.src = data["edit-image"];
    })
    .catch((err) => {
      console.log(err);
    });
  changeProfileImage.close();
}
const changeProfileImage = new PopupWithForm(
  handleEditProfileImage,
  "#edit-image-popup",
);
changeProfileImage.setEventListeners();
profileImg.addEventListener("click", () => {
  changeProfileImage.open();
});

const formValidator1 = new FormValidator(config, formElement);
const formValidator2 = new FormValidator(config, createFormElement);
const formValidator3 = new FormValidator(config, formChangeImg);

formValidator1.setEventListeners();
formValidator2.setEventListeners();
formValidator3.setEventListeners();

function handleCardClick(data) {
  popupWithImage.open(data);
}

function handleLikeClick(id, isLiked) {
  api.changeLike(id, isLiked).catch((err) => {
    console.log(err);
  });
}

function deleteCard(id) {
  api.deleteCard(id).catch((err) => {
    console.log(err);
  });
}

function createCard(item) {
  const card = new Card(
    item,
    "#card-template",
    handleCardClick,
    confirmDelete,
    handleLikeClick,
    deleteCard,
  );
  return card.generateCard();
}

api
  .getAppInfo()
  .then(([userData, cardsData]) => {
    userInfo.setUserInfo({
      name: userData.name,
      job: userData.about,
    });
    profilePicture.src = userData.avatar;

    cardSection = new Section(
      {
        items: cardsData,
        renderer: createCard,
      },
      ".cards__list",
    );
    cardSection.renderer();
  })
  .catch((err) => {
    console.log(err);
  });

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
