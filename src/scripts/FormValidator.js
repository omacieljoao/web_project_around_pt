export default class FormValidator {
  constructor(data, formElement) {
    this._inputSelector = data.inputSelector;
    this._submitButtonSelector = data.submitButtonSelector;
    this._errorClass = data.errorClass;
    this._activeErrorClass = data.activeErrorClass;
    this._formElement = formElement;
    this._inputs = Array.from(
      formElement.querySelectorAll(this._inputSelector),
    );
  }

  _showInputError(input, message) {
    const errorElement = document.querySelector(`.${input.name}-type-error`);
    errorElement.textContent = message;
    errorElement.classList.add(this._activeErrorClass);
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
    const btn = this._formElement.querySelector(this._submitButtonSelector);
    if (!this._formElement.checkValidity()) {
      btn.disabled = true;
    } else {
      btn.disabled = false;
    }
  }

  resetValidation() {
    this._inputs.forEach((input) => {
      this._hideInputError(input);
    });
  }

  setEventListeners() {
    const inputs = this._inputs;
    inputs.forEach((input) => {
      input.addEventListener("input", () => {
        this._checkInputValidity(input);
        this._toggleButtonState();
      });
    });
  }
}
