const express = require("express")
const { Router } = express
const router = Router()

router.get("/", (req, res) => {
    res.render("index")
})

module.exports = router