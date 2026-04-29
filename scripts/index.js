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

const editBtn = document.querySelector(".profile__edit-button");
const editPopup = document.querySelector("#edit-popup");
const editPopupCloseBtn = editPopup.querySelector(".popup__close");
const nameInput = editPopup.querySelector(".popup__input_type_name");
const profileName = document.querySelector(".profile__title");
const descriptionInput = editPopup.querySelector(
  ".popup__input_type_description",
);
const profileDescription = document.querySelector(".profile__description");
let formElement = editPopup.querySelector("#edit-profile-form");
const cardsList = document.querySelector(".cards__list");

const addBtn = document.querySelector(".profile__add-button");
const newCardPopup = document.querySelector("#new-card-popup");
const newCardCloseBtn = newCardPopup.querySelector(".popup__close");
const titleInput = newCardPopup.querySelector(".popup__input_type_card-name");
const imgInput = newCardPopup.querySelector(".popup__input_type_url");
let createFormElement = newCardPopup.querySelector("#new-card-form");

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
  titleInput.value = " ";
  imgInput.value = " ";
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

  if (!name) {
    cardName.textContent = "Lugar sem nome";
  }
  if (!link) {
    cardImage.src = "./images/placeholder.jpg";
  }
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
