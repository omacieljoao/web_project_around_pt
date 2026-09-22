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
    if (this._isLiked) {
      element
        .querySelector(".card__like-button")
        .classList.add("card__like-button_is-active");
    }
    return element;
  }

  _handleOpenImage() {
    const image = this.element.querySelector(".card__image");
    image.addEventListener("click", () => {
      this._handleCardClick({ name: this._name, link: this._link });
    });
  }

  _handleLike() {
    this._likeButton = this.element.querySelector(".card__like-button");
    this._likeButton.addEventListener("click", () => {
      this.callback(this._id, this._isLiked)
        .then(() => {
          this._likeButton.classList.toggle("card__like-button_is-active");
          this._isLiked = !this._isLiked;
        })
        .catch((err) => {
          console.log(err);
        });
    });
  }

  _handleDelete() {
    const deleteBtn = this.element.querySelector(".card__delete-button");
    deleteBtn.addEventListener("click", () => {
      this.deleteConfirmation.open(() => {
        this.deleteCard(this._id)
          .then(() => {
            this.element.remove();
          })
          .catch((err) => {
            console.log(err);
          });
      });
    });
  }

  generateCard() {
    this.element = this._getTemplate();
    this.element.querySelector(".card__title").textContent = this._name;
    this.element.querySelector(".card__image").src = this._link;

    this._handleOpenImage();
    this._handleDelete();
    this._handleLike();
    return this.element;
  }
}
