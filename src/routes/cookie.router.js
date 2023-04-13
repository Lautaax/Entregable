import { Router } from "express";

const router = Router();

router.get("/", (req, res) => {
  res.render("cookie", { title: "cookie" });
});

router.post("/cookies", (req, res) => {
  const data = req.body;

  return res
    .cookie("CoderCookie", data, { maxAge: 5000 })
    .send({ status: "success", message: "cookie set" });
});

export default router;