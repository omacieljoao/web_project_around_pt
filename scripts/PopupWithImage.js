import Popup from "./Popup.js";

export default class PopupWithImage extends Popup {
  open({ name, link }) {
    super.open();
    const image = this._popup.querySelector(".popup__image");
    image.src = link;
    image.alt = name;

    const caption = this._popup.querySelector(".popup__caption");
    caption.textContent = name;
  }
}
