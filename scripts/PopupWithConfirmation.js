import Popup from "./Popup.js";

export default class PopupWithConfirmation extends Popup {
  constructor(popupSelector, callback) {
    super(popupSelector);
    this._callback = callback;
  }

  _handleConfirmDelete() {
    this._callback();
    super.close();
  }

  setEventListeners() {
    const btn = document.querySelector(".popup__button-confirm");
    btn.addEventListener("click", () => {
      this._handleConfirmDelete();
    });
  }
}
