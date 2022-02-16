export default class Controller {
  constructor() {
    this.asView = this.asView.bind(this);
  }

  asView(req, res) {
    return this[req.method.toLowerCase()](req, res);
  }
}
