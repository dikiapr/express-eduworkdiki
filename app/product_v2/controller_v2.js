const Product = require("./model");
const path = require("path");
const fs = require("fs");

const index = async (req, res) => {
  try {
    await Product.sync();
    const result = await Product.findAll();
    res.send(result);
  } catch (e) {
    res.send(e);
  }
};

const view = async (req, res) => {
  const id = req.params.id;
  try {
    await Product.sync();
    const result = await Product.findOne({
      where: { id },
    });
    res.send(result);
  } catch (e) {
    res.send(e);
  }
};

const destroy = async (req, res) => {
  const id = req.params.id;
  try {
    await Product.sync();
    const result = await Product.findOne({
      where: { id },
    });

    await result.destroy();

    res.send(result);
  } catch (e) {
    res.send(e);
  }
};

const store = async (req, res) => {
  const { users_id, name, price, stock, status } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, "../../uploads", image.originalname);
    fs.renameSync(image.path, target);
    try {
      await Product.sync();
      const result = await Product.create({ users_id, name, price, stock, status, image_url: `http://localhost:3000/public/${image.originalname}` });
      res.send(result);
    } catch (e) {
      res.send(e);
    }
  }
};

const update = async (req, res) => {
  const id = req.params.id;
  const { users_id, name, price, stock, status } = req.body;
  const image = req.file;
  if (image) {
    const target = path.join(__dirname, "../../uploads", image.originalname);
    fs.renameSync(image.path, target);
    try {
      const result = await Product.findOne({ where: { id } });
      result.users_id = users_id;
      result.name = name;
      result.price = price;
      result.stock = stock;
      result.status = status;
      result.image_url = `http://localhost:3000/public/${image.originalname}`;

      await result.save();
      res.send(result);
    } catch (err) {
      res.send(e);
    }
  } else {
    try {
      const result = await Product.findOne({ where: { id } });
      result.users_id = users_id;
      result.name = name;
      result.price = price;
      result.stock = stock;
      result.status = status;

      await result.save();
      res.send(result);
    } catch (err) {
      res.send(e);
    }
  }
};

module.exports = {
  index,
  view,
  store,
  update,
  destroy,
};
