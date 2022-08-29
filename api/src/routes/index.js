const { json } = require('body-parser');
const { Router } = require('express');
// Importar todos los routers;
const express = require("express");
// Ejemplo: const authRouter = require('./auth.js');
const getrouter = require('../routes/recipesget')
const postrouter = require('../routes/recipespost')
const dietsget = require('../routes/dietsget')
const idrecipes = require('../routes/idrecipes')
const router = Router();
router.use(express.json())
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/recipes',getrouter)
router.use('/recipes',postrouter)
router.use('/diets',dietsget)
router.use('/recipes',idrecipes)



module.exports = router;
