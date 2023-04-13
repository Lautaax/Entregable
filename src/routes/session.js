app.get("/session", (req, res) => {
    const name = req.query.name;
  
    if (!req.session.user) {
      req.session.user = { name };
      return res.send({
        status: "sucess",
        message: `Bienvenido ${req.session.user.name}`,
      });
    }
    return res.send({
      status: "sucess",
      message: `Hola ${
        req.session.user.name
      }, has visitado este sitio ${++counter} veces`,
    });
  });