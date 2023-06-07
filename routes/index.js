const Controller = require("../controllers");

const router = require("express").Router();

/*
*Buatlah list route sebagai berikut :
1. POST /register 
    Menampilkan : Ini halaman register
2. POST /login 
    Menampilkan : Ini halaman login
3. GET /home 
    Menampilkan : Ini halaman home
4. PUT /profile/edit 
    Menampilkan : Ini halaman edit
4. DELETE /profile/edit 
    Menampilkan : Ini halaman delete
*/

router.get("/test", Controller.readPage);
router.post("/register", Controller.createRegister);
router.post("/login", Controller.createLogin);
router.put("/update", Controller.updatePage);
router.delete("/", Controller.deletePage);

module.exports = router;
