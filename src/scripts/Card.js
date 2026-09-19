export default class Card {
  constructor(
    data,
    templateSelector,
    handleCardClick,
    deleteConfirmation,
    callback,
    deleteCard,
  ) {
    this._name = data.name;
    this._link = data.link;
    this._id = data._id;
    this._isLiked = data.isLiked;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
    this.deleteConfirmation = deleteConfirmation;
    this.callback = callback;
    this.deleteCard = deleteCard;
  }

  _getTemplate() {
    const element = document
      .querySelector(this._templateSelector)
      .content.querySelector(".card")
      .cloneNode(true);
    const likeBtn = element.querySelector(".card__like-button");
    if (this._isLiked) {
      likeBtn.classList.add("card__like-button_is-active");
    }
    return element;
  }

  _handleLike() {
    const likeBtn = this.element.querySelector(".card__like-button");
    likeBtn.addEventListener("click", () => {
      likeBtn.classList.toggle("card__like-button_is-active");
      this.callback(this._id, this._isLiked);
      this._isLiked = !this._isLiked;
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
