export class Section {
  constructor({ cards, renderer }, container) {
    this._cards = cards;
    this._renderer = renderer;
    this._container = container;
  }

  renderOnLoad() {
    console.log(this._cards);
    this._cards();
  }

  addItem(cardInfo) {
    this._renderer(cardInfo, this._container);
  }

  prepend(postElement) {
    this._container.prepend(postElement);
  }
}
