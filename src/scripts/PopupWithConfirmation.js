import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector) {
    super(popupSelector);
  }

  open(callback) {
    super.open();
    this.callback = callback;
  }

  _handleConfirmDelete() {
    this.close();
    this.callback();
  }

  setEventListeners() {
    const btn = document.querySelector(".popup__button-confirm");
    const closeBtn = this._popup.querySelector(".popup__close");
    btn.addEventListener("click", () => {
      this._handleConfirmDelete();
    });
    closeBtn.addEventListener("click", () => {
      this.close();
    });
    this._popup.addEventListener("click", this._handleOverlayClose);
  }
}
