export default class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    deleteConfirmation,
    api,
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._isLiked = data.isLiked;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this.deleteConfirmation = deleteConfirmation;
    this.api = api;
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
      this.deleteConfirmation.open(() => {
        this.element.remove();
        this.deleteCard(this._id);
      });
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
