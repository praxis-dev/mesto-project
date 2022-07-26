export class Section {
  constructor({ renderInitialCards, renderer }, container) {
    this._cards = renderInitialCards;
    this.renderer = renderer;
    this._container = container;
  }

  renderOnLoad() {
    this._cards();
  }

  addItem(cardInfo) {
    this.renderer(cardInfo, this._container);
  }

  prepend(postElement) {
    this._container.prepend(postElement);
  }
}
