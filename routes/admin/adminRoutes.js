const express = require("express");

const adminlogin = require("../../models/users/admin");

//event models
const spotCodex = require("../../models/events/spot/codex");
const onlineCodex = require("../../models/events/online/codex");

const spotWeb = require("../../models/events/spot/webcast");
const onlineWeb = require("../../models/events/online/webcast");

const spotCipher = require("../../models/events/spot/cipherSolving");
const onlineCipher = require("../../models/events/online/cipherSolving");

const spotphotography = require("../../models/events/spot/photography");
const onlinephotography = require("../../models/events/online/photography");

const spotcrime = require("../../models/events/spot/crimeInvestigation");
const onlinecrime = require("../../models/events/online/crimeInvestigation");

const spotquiz = require("../../models/events/spot/itQuiz");
const onlinequiz = require("../../models/events/online/itQuiz");

const spotgaming = require("../../models/events/spot/mobilegaming");
const onlinegaming = require("../../models/events/online/mobilegaming");

const spotfootball = require("../../models/events/spot/slipperyFootball");
const onlinefootball = require("../../models/events/online/slipperyFootball");

const spotreconcile = require("../../models/events/spot/reconcile");
const onlinereconcile = require("../../models/events/online/reconcile");

const spotband = require("../../models/events/spot/musicBand");
const onlineband = require("../../models/events/online/musicBand");

const spotchoreography = require("../../models/events/spot/choreography");
const onlinechoreography = require("../../models/events/online/choreography");

const spottrivia = require("../../models/events/spot/trivia");
const onlinetrivia = require("../../models/events/online/trivia");

const verifierLogin = require("../../models/users/verifier");

const router = express.Router();
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const usernameExtractor = require("../../utils/usernameExtractor");
const cookieAuth = require("../../utils/auth");
const registrationAction = require("../../constants/registrationAction");
const sequelizeConfig = require("../../config/sequelize.config");

router.get("/login", async (req, res) => {
  /* This code block is checking if there is already an existing admin account in the database. */
  if (req.cookies.admin) {
    console.log("correct");
    const token = jwt.verify(req.cookies.admin, process.env.JWT_SECRET_TOKEN);
    const findId = await adminlogin.findByPk(token);

    if (findId) {
      // res.redirect(`/admin/dashboard`);
      res.redirect("/admin/dashboard");
    } else {
      res.render(`admin/login`, {
        emailExist: true,
        passwordError: false,
        email: "",
        password: "",
      });
    }
  } else {
    const result = await adminlogin.count();

    if (result == 1) {
      res.render("admin/login", {
        emailExist: true,
        passwordError: false,
        email: "",
        password: "",
      });
    } else {
      res.redirect("signup");
    }
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //find hashpassword of a particular email
    const hashPassword = await adminlogin.findOne({
      where: {
        email: email,
      },
    });

    //check if the hash password of the given email is find or not
    if (!hashPassword) {
      res.render("../views/admin/login", {
        emailExist: false,
        passwordError: false,
        email: email,
        password: password,
      });
    } else {
      /* The `bcrypt.compare()` function is used to compare a plain text password with a hashed
       password. */
      bycrypt.compare(
        password,
        hashPassword?.dataValues?.password,
        (err, data) => {
          if (err) {
            res.json({ err: err });
          }
          /* This code block is checking if the password entered by the user matches the hashed password
           stored in the database. */
          if (data) {
            const token = cookieAuth(hashPassword.dataValues.id);
            res.cookie("admin", token, {
              expires: new Date(Date.now() + 172800 * 1000),
              secure: true,
              httpOnly: true,
            });
            //   res.redirect("/admin/dashboard");
            res.redirect("/admin/dashboard");
          } else {
            res.render("../views/admin/login", {
              emailExist: true,
              passwordError: true,
              email: email,
              password: password,
            });
          }
        }
      );
    }
  } catch (err) {
    res.json({ err: err.message });
  }
});

//signup routes
router.get("/signup", async (req, res) => {
  /* This code block is checking if there is already an existing admin account in the database. */
  const result = await adminlogin.count();
  if (result == 1) {
    res.redirect("/admin/login");
  } else {
    res.render("../views/admin/signup", {
      passwordError: false,
      email: "",
      password: "",
      confirm: "",
    });
  }
});

router.post("/signup", async (req, res) => {
  const { email, password, confirm } = req.body;

  const username = usernameExtractor(email);

  /* This code block is handling the signup functionality. */
  if (password !== confirm) {
    res.render("../views/admin/signup", {
      emailExist: false,
      passwordError: true,
      email: email,
      password: password,
      confirm: confirm,
    });
  } else {
    /* bcrypt library is used to hash the password before storing it in the database. */
    bycrypt.hash(password, 12, async (err, hashedPassword) => {
      if (err) {
        res.json({ err: err.message });
      } else {
        const data = await adminlogin
          .create({
            username: username,
            email: email,
            password: hashedPassword,
          })
          .then((data) => {
            const token = cookieAuth(data.dataValues.id);
            res.cookie("admin", token, {
              expires: new Date(Date.now() + 172800 * 1000),
              secure: true,
              httpOnly: true,
            });
            //   res.redirect("/admin/dashboard");
            res.redirect("/admin/dashboard");
          })
          .catch((err) => {
            res.json({ err: err });
          });
      }
    });
  }
});

router.get("/dashboard", async (req, res) => {
  const { online } = req.query;
  console.log(online);
  if (req.cookies.admin) {
    const adminId = jwt.verify(req.cookies.admin, process.env.JWT_SECRET_TOKEN);
    let findAdmin = await adminlogin.findByPk(adminId);
    if (findAdmin) {
      if (online !== undefined) {
        const updateAdmin = await findAdmin.update({
          online: online,
          id: findAdmin.dataValues.id,
        });

        console.log(findAdmin.dataValues.online);
        res.render("admin/dashboard", {
          onlineRegistration: findAdmin.dataValues.online,
        });
      } else {
        res.render("admin/dashboard", {
          onlineRegistration: findAdmin.dataValues.online,
        });
      }
    } else {
      res.clearCookie("admin");
      res.redirect("/admin/login");
    }
  } else {
    res.redirect("/admin/login");
  }
});

router.get("/dashboard/events", async (req, res) => {
  const { category, event } = req.query;

  if (req.cookies.admin) {
    const adminId = jwt.verify(req.cookies.admin, process.env.JWT_SECRET_TOKEN);
    const findAdmin = await adminlogin.findByPk(adminId);
    if (findAdmin) {
      if (category == "spot" && event == "codex") {
        const spot = await spotCodex.findAll({});
        res.render("admin/codex", {
          event: spot,
          name: "Spot Registration",
          event_name: "Codex",
        });
      } else if (category == "online" && event == "codex") {
        const online = await onlineCodex.findAll({});
        res.render("admin/codex", {
          event: online,
          name: "Online Registration",
          event_name: "Codex",
        });
      } else if (category == "spot" && event == "webcast") {
        const online = await spotWeb.findAll({});
        res.render("admin/codex", {
          event: online,
          name: "Spot Registration",
          event_name: "Webcast",
        });
      } else if (category == "online" && event == "webcast") {
        const online = await onlineWeb.findAll({});
        res.render("admin/codex", {
          event: online,
          name: "Online Registration",
          event_name: "Webcast",
        });
      } else if (category == "spot" && event == "band") {
        const online = await spotband.findAll({});
        res.render("admin/codex", {
          event: online,
          name: "Spot Registration",
          event_name: "Music Band",
        });
      } else if (category == "online" && event == "band") {
        const online = await onlineband.findAll({});
        res.render("admin/codex", {
          event: online,
          name: "Online Registration",
          event_name: "Music Band",
        });
      } else if (category == "spot" && event == "choreography") {
        const online = await spotchoreography.findAll({});
        res.render("admin/codex", {
          event: online,
          name: "Spot Registration",
          event_name: "Choreography",
        });
      } else if (category == "online" && event == "choreography") {
        const online = await onlinechoreography.findAll({});
        res.render("admin/codex", {
          event: online,
          name: "Online Registration",
          event_name: "Choreography",
        });
      } else if (category == "spot" && event == "cipher") {
        const online = await spotCipher.findAll({});
        res.render("admin/codex", {
          event: online,
          name: "Spot Registration",
          event_name: "Crack The Cipher",
        });
      } else if (category == "online" && event == "cipher") {
        const online = await onlineCipher.findAll({});
        res.render("admin/codex", {
          event: online,
          name: "Online Registration",
          event_name: "Crack The Cipher",
        });
      } else if (category == "spot" && event == "crime") {
        const online = await spotcrime.findAll({});
        res.render("admin/codex", {
          event: online,
          name: "Spot Registration",
          event_name: "Crime Investigation",
        });
      } else if (category == "online" && event == "crime") {
        const online = await onlinecrime.findAll({});
        res.render("admin/codex", {
          event: online,
          name: "Online Registration",
          event_name: "Crime Investigation",
        });
      } else if (category == "online" && event == "football") {
        const online = await onlinefootball.findAll({});
        res.render("admin/codex", {
          event: online,
          name: "Online Registration",
          event_name: "3's Football",
        });
      } else if (category == "spot" && event == "football") {
        const online = await spotfootball.findAll({});
        res.render("admin/codex", {
          event: online,
          name: "Spot Registration",
          event_name: "3's Football",
        });
      } else if (category == "spot" && event == "photography") {
        const online = await spotphotography.findAll({});
        res.render("admin/codex", {
          event: online,
          name: "Spot Registration",
          event_name: "Spot Photography",
        });
      } else if (category == "online" && event == "photography") {
        const online = await onlinephotography.findAll({});
        res.render("admin/codex", {
          event: online,
          name: "Online Registration",
          event_name: "Spot Photography",
        });
      } else if (category == "spot" && event == "gaming") {
        const online = await spotgaming.findAll({});
        res.render("admin/codex", {
          event: online,
          name: "Spot Registration",
          event_name: "Video Gaming",
        });
      } else if (category == "online" && event == "gaming") {
        const online = await onlinegaming.findAll({});
        res.render("admin/codex", {
          event: online,
          name: "Online Registration",
          event_name: "Video Gaming",
        });
      } else if (category == "spot" && event == "itquiz") {
        const online = await spotquiz.findAll({});
        res.render("admin/codex", {
          event: online,
          name: "Spot Registration",
          event_name: "IT Quiz",
        });
      } else if (category == "online" && event == "itquiz") {
        const online = await onlinequiz.findAll({});
        res.render("admin/codex", {
          event: online,
          name: "Online Registration",
          event_name: "IT Quiz",
        });
      } else if (category == "spot" && event == "reconcile") {
        const online = await spotreconcile.findAll({});
        res.render("admin/codex", {
          event: online,
          name: "Spot Registration",
          event_name: "Reconicle",
        });
      } else if (category == "online" && event == "reconcile") {
        const online = await onlinereconcile.findAll({});
        res.render("admin/codex", {
          event: online,
          name: "Online Registration",
          event_name: "Reconcile",
        });
      } else if (category == "spot" && event == "trivia") {
        const online = await spottrivia.findAll({});
        res.render("admin/codex", {
          event: online,
          name: "Spot Registration",
          event_name: "Trivia Fiesta",
        });
      } else if (category == "online" && event == "trivia") {
        const online = await onlinetrivia.findAll({});
        res.render("admin/codex", {
          event: online,
          name: "Online Registration",
          event_name: "Trivia Fiesta",
        });
      } else if (category == undefined && event == undefined) {
        const spot = await spotCodex.findAll({});
        res.render("admin/codex", {
          event: spot,
          name: "Spot Registration",
          event_name: "Codex",
        });
      } else {
        const spot = await spotCodex.findAll({});
        res.render("admin/codex", {
          event: spot,
          name: "Spot Registration",
          event_name: "Codex",
        });
      }
    } else {
      res.clearCookie("admin");
      res.redirect("/admin/login");
    }
  } else {
    res.redirect("/admin/login");
  }
});

//Registration Team
router.get("/dashboard/team", async (req, res) => {
  if (req.cookies.admin) {
    const id = jwt.verify(req.cookies.admin, process.env.JWT_SECRET_TOKEN);
    const findAdmin = await adminlogin.findByPk(id);

    if (findAdmin) {
      const verifiers = await verifierLogin.findAll({});
      res.render("admin/registration", { verifiers: verifiers });
    } else {
      res.clearCookie("admin");
      res.redirect("/admin/login");
    }
  } else {
    res.redirect("/admin/login");
  }
});

//create registration  team

router.get("/dashboard/team/create", async (req, res) => {
  if (req.cookies.admin) {
    const id = jwt.verify(req.cookies.admin, process.env.JWT_SECRET_TOKEN);
    const findAdmin = await adminlogin.findByPk(id);

    if (findAdmin) {
      res.render("admin/create", {
        emailExist: false,
        passwordError: false,
        email: "",
        password: "",
        confirm: "",
      });
    } else {
      res.clearCookie("admin");
      res.redirect("/admin/login");
    }
  } else {
    res.redirect("/admin/login");
  }
});

router.post("/dashboard/team/create", async (req, res) => {
  const { email, password, confirm } = req.body;

  if (password !== confirm) {
    res.render("admin/create", {
      emailExist: false,
      passwordError: true,
      email: email,
      password: password,
      confirm: confirm,
    });
  } else {
    const findVerifier = await verifierLogin.findOne({
      where: {
        email: email,
      },
    });

    if (findVerifier) {
      res.render("admin/create", {
        emailExist: true,
        passwordError: false,
        email: email,
        password: password,
        confirm: confirm,
      });
    } else {
      const hashPassword = bycrypt.hash(password, 12).then(async (hash) => {
        const addVerifier = await verifierLogin
          .create({
            username: email?.split("@")[0],
            email: email,
            password: hash,
          })
          .then(() => {
            res.redirect("/admin/dashboard/team");
          })
          .catch((err) => {
            res.json({ err: err.message });
          });
      });
    }
  }
});

//delete specific verifier

router.get("/dashboard/team/delete/:id", async (req, res) => {
  const { id } = req.params;
  const findVerifier = await verifierLogin.findByPk(id);
  if (findVerifier) {
    findVerifier
      .destroy()
      .then(() => {
        res.redirect("/admin/dashboard/team");
      })
      .catch((err) => {
        res.json({ err: err.message });
      });
  } else {
    res.redirect("/admin/dashboard/team");
  }
});

router.get("/dashboard/team/details/:id", async (req, res) => {
  const { id } = req.params;

  if (req.cookies.admin) {
    const tokenid = jwt.verify(req.cookies.admin, process.env.JWT_SECRET_TOKEN);
    const findAdmin = await adminlogin.findByPk(tokenid);

    if (findAdmin) {
      const findVerifier = await verifierLogin.findByPk(id);
      if (findVerifier) {
        res.render("admin/details", { verifier: findVerifier });
      } else {
        res.redirect("/admin/dashboard/team");
      }
    } else {
      res.clearCookie("admin");
      res.redirect("/admin/login");
    }
  } else {
    res.redirect("/admin/login");
  }
});

//delete all table
router.get("/dashboard/delete", async (req, res) => {
  if (req.cookies.admin) {
    const id = jwt.verify(req.cookies.admin, process.env.JWT_SECRET_TOKEN);
    const findAdmin = await adminlogin.findByPk(id);

    if (findAdmin) {
      const dropTable = await sequelizeConfig
        .drop()
        .then(async () => {
          console.log("Drop all the Table");
          (await sequelizeConfig.sync()).authenticate().then(() => {
            console.log("All Table created Successfully");
            res.redirect("/");
          });
        })
        .catch((err) => {
          res.json({ err: err.message });
        });
    } else {
      res.clearCookie("admin");
      res.redirect("/admin/login");
    }
  } else {
    res.redirect("/admin/login");
  }
});

//admin logout

router.get("/logout", (req, res) => {
  res.clearCookie("admin");
  res.redirect("/admin/login");
});

module.exports = router;
