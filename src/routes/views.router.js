import { Router } from "express";

// import ProductManager from "../dao/fileManagers/productManager.js";
import ProductManager from "../dao/dbManagers/productManager.js";

// import MessageManager from "../dao/fileManagers/messageManager.js";
import MessageManager from "../dao/dbManagers/messageManager.js";

const productManager = new ProductManager();
const messageManager = new MessageManager();

const router = Router();

router.get("/", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("home", {
    products,
    title: "Products",
  });
});

router.get("/realtimeproducts", async (req, res) => {
  const products = await productManager.getProducts();
  res.render("realTimeProducts", {
    products,
    title: "Real Time Products",
  });
});

router.get("/chat", async (req, res) => {
  const messages = await messageManager.getMessages();
  res.render("chat", {
    messages,
    title: "ChatBarber",
  });
});


router.get("/cookie", (req, res) => {
  res.render("cookie", { title: "Cookies" });
});

router.post("/cookie", (req, res) => {
  const data = req.body;

  return res
    .cookie("CoderCookie", data, { maxAge: 10000 })
    .send({ status: "success", message: "cookie set" });
});


export default router;