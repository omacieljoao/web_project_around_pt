export default class Card {
  constructor(data, templateSelector, handleCardClick) {
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
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
    const image = this.element.querySelector(".card__image");
    image.addEventListener("click", () => {
      this._handleCardClick({ name: this._name, link: this._link });
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
