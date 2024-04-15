const jwt = require("jsonwebtoken");

const generarToken = (res, uid) => {

const token = jwt.sign({ uid }, process.env.SECRET_JWT_SEED, {
  expiresIn: "30d",
});

//JWT tenemos que guardarlo en una cookie
res.cookie("jwt", token, {
    httpOnly: true,
    secure: process.env.NODE_ENV !== "development",
    sameSite: "strict",
    maxAge: 43200, //12 horas en ms
  });

  return token;
};

module.exports = { generarToken };

/* const generarToken = (uid, name) => {
  return new Promise((resolve, reject) => {
    const payload = { uid: uid, name: name };
    jwt.sign(
      payload,
      process.env.SECRET_JWT_SEED,
      {
        expiresIn: "2h",
      },
      (error, token) => {
        if (error) {
          console.log(error);
          reject("No se pudo generar el token");
        }
        resolve(token);
      }
    );
  });
}; */


