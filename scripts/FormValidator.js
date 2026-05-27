const config = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  errorClass: ".popup-type-error",
  activeErrorClass: ".popup-type-error_active",
};

class FormValidator {
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
    const inputs = document.querySelectorAll(this._inputSelector);
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

const formValidator1 = new FormValidator(config, formElement);
const formValidator2 = new FormValidator(config, createFormElement);

formValidator1.setEventListeners();
formValidator2.setEventListeners();
