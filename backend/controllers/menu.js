const Menu = require('../models/menu');

exports.createMenu = (req, res, next) => {
  const menuItem = new Menu({
    title: req.body.title,
  });
  menuItem
    .save()
    .then(createdMenu => {
      res.status(201).json({
        message: 'Menu added successfully!',
        menuItems: {
          id: createdMenu._id
        }
      });
    })
    .catch(error => {
      return res.status(500).json({
        message: 'Creating a menu item failed!'
      });
    });
}

exports.updateMenu = (req, res, next) => {
  const menu = new Menu({
    _id: req.body.id,
    title: req.body.title,
  });
  Menu.updateOne({ _id: req.params.id}, menu)
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: 'Update successful!' });
      } else {
        res.status(401).json({ message: 'Not authorized!' });
      }
    })
    .catch(error => {
      return res.status(500).json({
        message: "Couldn't update menu!"
      });
    });
}

exports.getMenu = (req, res, next) => {
  const menuQuery = Menu.find();
  console.log(menuQuery);
  let fetchedMenu;
  menuQuery
    .then(documents => {
      fetchedMenu = documents;
      console.log(fetchedMenu);
    })
    .then(count => {
      res.status(200).json({
        message: 'Menu fetched successfully!',
        menuItems: fetchedMenu,
      });
    })
    .catch(error => {
      return res.status(500).json({
        message: 'Fetching menu failed!'
      });
    });
}

exports.getMenuItem = (req, res, next) => {
  Menu.findById(req.params.id)
    .then(menu => {
      if (menu) {
        res.status(200).json(menu);
      } else {
        console.log(Menus.find());
        res.status(404).json({ message: 'Menu not found!' });
      }
    })
    .catch(error => {
      return res.status(500).json({
        message: 'Fetching menu failed!'
      });
    });
}

exports.deleteMenu = (req, res, next) => {
  Menu.deleteOne({ _id: req.params.id})
    .then(result => {
      if (result.n > 0) {
        res.status(200).json({ message: 'Menu deleted!' });
      } else {
        res.status(401).json({ message: 'Not authorized!' });
      }
    })
    .catch(error => {
      return res.status(500).json({
        message: 'Fetching menu failed!'
      });
    });
}
