export class Section {
  constructor({ cards, renderer }, container) {
    this._cards = cards;
    this._renderer = renderer;
    this._container = container;
  }

  renderOnLoad() {
    this._cards
      .then((res) => {
        return res.json().then((data) => {
          data.reverse().forEach((cardinfo) => {
            this._renderer(cardinfo, this._container);
          });
        });
      })
      .catch((err) => {
        console.log(err);
      });
  }

  addItem(cardInfo) {
    this._renderer(cardInfo, this._container);
  }
}
