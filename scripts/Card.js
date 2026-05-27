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

initialCards.forEach(function (item) {
  const card = new Card(item, "#card-template");
  const cardElement = card.generateCard();
  cardsList.prepend(cardElement);
});
