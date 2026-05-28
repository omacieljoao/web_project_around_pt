export default class FormValidator {
  constructor(data, formElement) {
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._errorClass = data.errorClass;
    this._activeErrorClass = data.activeErrorClass;
    this._formElement = formElement;
  }

  _showInputError(input, message) {
    const errorElement = document.querySelector(`.${input.name}-type-error`);
    errorElement.textContent = message;
    errorElement.classList.add(this._activeErrorClass);
    console.log(errorElement);
  }

  _hideInputError(input) {
    const errorElement = document.querySelector(`.${input.name}-type-error`);
    errorElement.textContent = "";
    errorElement.classList.remove(this._activeErrorClass);
  }

  _checkInputValidity(input) {
    if (!input.validity.valid) {
      this._showInputError(input, input.validationMessage);
    } else {
      this._hideInputError(input);
    }
  }

  _toggleButtonState() {
    const Btn = this._formElement.querySelector(this._submitButtonSelector);
    if (!this._formElement.checkValidity()) {
      Btn.disabled = true;
    } else {
      Btn.disabled = false;
    }
  }

  _setEventListeners() {
    const inputs = this._formElement.querySelectorAll(this._inputSelector);
    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }

  setEventListeners() {
    this._setEventListeners();
  }
}
