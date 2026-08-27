export default class Popup {
  constructor(popupSelector) {
    this._popup = document.querySelector(popupSelector);
  }

  open() {
    this._popup.classList.add("popup_is-opened");
    document.addEventListener("keydown", this._handleEscClose);
  }

  close = () => {
    this._popup.classList.remove("popup_is-opened");
    document.removeEventListener("keydown", this._handleEscClose);
  };

  _handleEscClose = (evt) => {
    if (evt.key === "Escape") {
      this.close();
    }
  };

  _handleOverlayClose = (evt) => {
    if (evt.target.classList.contains("popup")) {
      this.close();
    }
  };

  setEventListeners = () => {
    this._popup.addEventListener("click", this._handleOverlayClose);
    this._popup
      .querySelector(".popup__close")
      .addEventListener("click", this.close);
  };
}
