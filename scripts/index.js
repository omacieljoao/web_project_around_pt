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

class Card {
  constructor(data, templateSelector) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
  }

  _getTemplate() {
    const element = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    return element;
  }

  _handleLike() {
    const likeBtn = this.element.querySelector(".card__like-button");
    likeBtn.addEventListener("click", () => {
      likeBtn.classList.toggle("card__like-button_is-active");
    });
  }

  _handleOpenImage() {
    const imgModal = document.querySelector("#image-popup");
    const image = this.element.querySelector(".card__image");
    image.addEventListener("click", () => {
      openModal(imgModal);
      document.querySelector(".popup__image").src = this._link;
      document.querySelector(".popup__caption").textContent = this._name;
    });
  }

  _handleDelete() {
    const deleteBtn = this.element.querySelector(".card__delete-button");
    deleteBtn.addEventListener("click", () => {
      this.element.remove();
    });
  }

  generateCard() {
    this.element = this._getTemplate();
    this.element.querySelector(".card__title").textContent = this._name;
    this.element.querySelector(".card__image").src = this._link;

    this._handleLike();
    this._handleOpenImage();
    this._handleDelete();
    return this.element;
  }
}

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

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

function fillProfileForm() {
  nameInput.value = profileName.textContent;
  descriptionInput.value = profileDescription.textContent;
}

function fillAddForm() {
  titleInput.value = "";
  imgInput.value = "";
}

function handleOpenAddModal(modal) {
  openModal(modal);
  fillAddForm();
}

function handleOpenEditModal(modal) {
  openModal(modal);
  fillProfileForm();
}

function handleProfileFormSubmit(evt) {
  evt.preventDefault();
  let nameInputValue = nameInput.value;
  let descriptionInputValue = descriptionInput.value;
  profileName.textContent = nameInputValue;
  profileDescription.textContent = descriptionInputValue;
  closeModal(editPopup);
}

function handleCardFormSubmit(evt) {
  evt.preventDefault();
  renderCard(titleInput.value, imgInput.value, cardsList);
  closeModal(newCardPopup);
}

function getCardElement(name, link) {
  const cardElement = document
    .querySelector("#card-template")
    .content.querySelector(".card")
    .cloneNode(true);

  const cardName = cardElement.querySelector(".card__title");
  const cardImage = cardElement.querySelector(".card__image");

  cardImage.src = link;
  cardImage.alt = name;
  cardName.textContent = name;

  const likeBtn = cardElement.querySelector(".card__like-button");
  likeBtn.addEventListener("click", (evt) => {
    evt.target.classList.toggle("card__like-button_is-active");
  });

  const deleteBtn = cardElement.querySelector(".card__delete-button");
  deleteBtn.addEventListener("click", () => {
    cardElement.remove();
  });

  const imgModal = document.querySelector("#image-popup");
  const imgElement = imgModal.querySelector(".popup__image");
  const imgTitle = imgModal.querySelector(".popup__caption");
  const imgCloseBtn = imgModal.querySelector(".popup__close");

  cardImage.addEventListener("click", () => {
    openModal(imgModal);
    imgElement.src = cardImage.src;
    imgTitle.textContent = cardName.textContent;
  });

  imgCloseBtn.addEventListener("click", () => closeModal(imgModal));

  return cardElement;
}

function renderCard(cardName, cardLink, container) {
  const newCard = getCardElement(cardName, cardLink);
  container.prepend(newCard);
}

initialCards.forEach(function (item) {
  renderCard(item.name, item.link, cardsList);
});

editBtn.addEventListener("click", () => handleOpenEditModal(editPopup));
editPopupCloseBtn.addEventListener("click", () => closeModal(editPopup));
formElement.addEventListener("submit", handleProfileFormSubmit);
addBtn.addEventListener("click", () => handleOpenAddModal(newCardPopup));
newCardCloseBtn.addEventListener("click", () => closeModal(newCardPopup));
createFormElement.addEventListener("submit", handleCardFormSubmit);

formElement.addEventListener("input", (evt) => {
  if (!formElement.checkValidity()) {
    popupBtn.disabled = true;
  } else {
    popupBtn.disabled = false;
  }
});

function showInputError(input, message) {
  const errorElement = document.querySelector(`.${input.name}-type-error`);
  errorElement.textContent = message;
  errorElement.classList.add("popup-type-error_active");
}

function hideInputError(input) {
  const errorElement = document.querySelector(`.${input.name}-type-error`);
  errorElement.textContent = "";
  errorElement.classList.remove("popup-type-error_active");
}

const inputs = document.querySelectorAll(".popup__input");

inputs.forEach((input) => {
  input.addEventListener("input", () => {
    if (!input.validity.valid) {
      showInputError(input, input.validationMessage);
      popupBtn.disabled = true;
    } else {
      hideInputError(input);
    }
  });
});

createFormElement.addEventListener("input", () => {
  if (!createFormElement.checkValidity()) {
    createBtn.disabled = true;
  } else {
    createBtn.disabled = false;
  }
});

function handleCloseClick(evt) {
  if (evt.target.classList.contains("popup")) {
    closeModal(evt.currentTarget);
  }
}
document.querySelectorAll(".popup").forEach((popup) => {
  popup.addEventListener("click", handleCloseClick);
});

function handleCloseEsc(evt) {
  if (evt.key === "Escape") {
    const modal = document.querySelector(".popup_is-opened");
    closeModal(modal);
  }
}

document.addEventListener("keydown", handleCloseEsc);
