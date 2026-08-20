export default class Section {
  constructor({ items, renderer }, containerSelector) {
    this._renderedItems = items;
    this._renderer = renderer;
    this._container = document.querySelector(containerSelector);
  }

  renderer() {
    this._renderedItems.forEach((item) => {
      const rendItem = this._renderer(item);

      this.addItem(rendItem);
    });
  }

  addItem(item) {
    this._container.append(item);
  }
}
