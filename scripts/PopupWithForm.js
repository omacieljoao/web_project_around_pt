import Popup from "./Popup.js";

export default class PopupWithForm extends Popup {
  constructor(callback, popupSelector) {
    super(popupSelector);
    this._callback = callback;
  }

  _getInputValues() {
    const inputList = this._popup.querySelectorAll(".popup__input");
    const inputArr = Array.from(inputList);

    return inputArr.reduce((acc, input) => {
      acc[input.name] = input.value;
      return acc;
    }, {});
  }

  setEventListeners() {
    super.setEventListeners();
    const popupForm = this._popup.querySelector(".popup__form");
    popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._callback(this._getInputValues());
    });
  }

  close() {
    super.close();
    const popupForm = this._popup.querySelector(".popup__form");
    popupForm.reset();
  }
}
