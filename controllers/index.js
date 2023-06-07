class Controller {
  static readPage(req, res) {
    res.send("Ini halaman home");
  }
  static createRegister(req, res) {
    res.send("Ini halaman register");
  }
  static createLogin(req, res) {
    res.send("Ini halaman login");
  }
  static updatePage(req, res) {
    res.send("Ini halaman edit");
  }
  static deletePage(req, res) {
    res.send("Ini halaman delete");
  }
}

module.exports = Controller;
