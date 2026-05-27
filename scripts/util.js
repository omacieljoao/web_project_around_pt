editBtn.addEventListener("click", () => handleOpenEditModal(editPopup));
editPopupCloseBtn.addEventListener("click", () => closeModal(editPopup));
formElement.addEventListener("submit", handleProfileFormSubmit);
addBtn.addEventListener("click", () => handleOpenAddModal(newCardPopup));
newCardCloseBtn.addEventListener("click", () => closeModal(newCardPopup));
createFormElement.addEventListener("submit", handleCardFormSubmit);

function openModal(modal) {
  modal.classList.add("popup_is-opened");
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
}

function handleOpenAddModal(modal) {
  openModal(modal);
  fillAddForm();
}

function handleOpenEditModal(modal) {
  openModal(modal);
  fillProfileForm();
}
