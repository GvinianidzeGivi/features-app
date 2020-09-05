const express = require('express');

const MenuController = require('../controllers/menu');
const checkAuth = require('../middleware/auth-checker');

const router = express.Router();

router.post('', MenuController.createMenu);

router.put('/:id', MenuController.updateMenu);

router.get('', MenuController.getMenu);

router.get('/:id', MenuController.getMenu);

router.delete('/:id', MenuController.deleteMenu);

module.exports = router;
