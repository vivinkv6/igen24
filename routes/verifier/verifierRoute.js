const express = require("express");
const router = express.Router();
const bycrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const usernameExtractor = require("../../utils/usernameExtractor");
const cookieAuth = require("../../utils/auth");
const verifier = require("../../models/users/verifier");

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

router.get("/login", async (req, res) => {
  /* This code block is checking if there is already an existing admin account in the database. */
  if (req.cookies.verifier) {
    const token = jwt.verify(
      req.cookies.verifier,
      process.env.JWT_SECRET_TOKEN
    );
    const findId = await verifier.findByPk(token);

    if (findId) {
      // res.redirect(`/admin/dashboard`);
      res.redirect("/verifier/dashboard");
    } else {
      res.render(`verifier/login`, {
        emailExist: true,
        passwordError: false,
        email: "",
        password: "",
      });
    }
  } else {
    res.render(`verifier/login`, {
      emailExist: true,
      passwordError: false,
      email: "",
      password: "",
    });
  }
});

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    //find hashpassword of a particular email
    const hashPassword = await verifier.findOne({
      where: {
        email: email,
      },
    });

    //check if the hash password of the given email is find or not
    if (!hashPassword) {
      res.render("verifier/login", {
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
            res.cookie("verifier", token, {
              expires: new Date(Date.now() + 172800 * 1000),
              secure: true,
              httpOnly: true,
            });
            //   res.redirect("/admin/dashboard");
            res.redirect("/verifier/dashboard");
          } else {
            res.render("verifier/login", {
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

router.get("/dashboard", async (req, res) => {
  const { category, event } = req.query;

  if (req.cookies.verifier) {
    const verifierId = jwt.verify(
      req.cookies.verifier,
      process.env.JWT_SECRET_TOKEN
    );
    const findVerifier = await verifier.findByPk(verifierId);
    if (findVerifier) {
      if (category == "spot" && event == "codex") {
        const spot = await spotCodex.findAll({});
        res.render("verifier/dashboard", {
          event: spot,
          name: "Spot Registration",
          event_name: "Codex",
        });
      } else if (category == "online" && event == "codex") {
        const online = await onlineCodex.findAll({});
        res.render("verifier/dashboard", {
          event: online,
          name: "Online Registration",
          event_name: "Codex",
        });
      } else if (category == "spot" && event == "webcast") {
        const online = await spotWeb.findAll({});
        res.render("verifier/dashboard", {
          event: online,
          name: "Spot Registration",
          event_name: "Webcast",
        });
      } else if (category == "online" && event == "webcast") {
        const online = await onlineWeb.findAll({});
        res.render("verifier/dashboard", {
          event: online,
          name: "Online Registration",
          event_name: "Webcast",
        });
      } else if (category == "spot" && event == "band") {
        const online = await spotband.findAll({});
        res.render("verifier/dashboard", {
          event: online,
          name: "Spot Registration",
          event_name: "Music Band",
        });
      } else if (category == "online" && event == "band") {
        const online = await onlineband.findAll({});
        res.render("verifier/dashboard", {
          event: online,
          name: "Online Registration",
          event_name: "Music Band",
        });
      } else if (category == "spot" && event == "choreography") {
        const online = await spotchoreography.findAll({});
        res.render("verifier/dashboard", {
          event: online,
          name: "Spot Registration",
          event_name: "Choreography",
        });
      } else if (category == "online" && event == "choreography") {
        const online = await onlinechoreography.findAll({});
        res.render("verifier/dashboard", {
          event: online,
          name: "Online Registration",
          event_name: "Choreography",
        });
      } else if (category == "spot" && event == "cipher") {
        const online = await spotCipher.findAll({});
        res.render("verifier/dashboard", {
          event: online,
          name: "Spot Registration",
          event_name: "Crack The Cipher",
        });
      } else if (category == "online" && event == "cipher") {
        const online = await onlineCipher.findAll({});
        res.render("verifier/dashboard", {
          event: online,
          name: "Online Registration",
          event_name: "Crack The Cipher",
        });
      } else if (category == "spot" && event == "crime") {
        const online = await spotcrime.findAll({});
        res.render("verifier/dashboard", {
          event: online,
          name: "Spot Registration",
          event_name: "Crime Investigation",
        });
      } else if (category == "online" && event == "crime") {
        const online = await onlinecrime.findAll({});
        res.render("verifier/dashboard", {
          event: online,
          name: "Online Registration",
          event_name: "Crime Investigation",
        });
      } else if (category == "online" && event == "football") {
        const online = await onlinefootball.findAll({});
        res.render("verifier/dashboard", {
          event: online,
          name: "Online Registration",
          event_name: "Slippery Football",
        });
      } else if (category == "spot" && event == "football") {
        const online = await spotfootball.findAll({});
        res.render("verifier/dashboard", {
          event: online,
          name: "Spot Registration",
          event_name: "Slippery Football",
        });
      } else if (category == "spot" && event == "photography") {
        const online = await spotphotography.findAll({});
        res.render("verifier/dashboard", {
          event: online,
          name: "Spot Registration",
          event_name: "Spot Photography",
        });
      } else if (category == "online" && event == "photography") {
        const online = await onlinephotography.findAll({});
        res.render("verifier/dashboard", {
          event: online,
          name: "Online Registration",
          event_name: "Spot Photography",
        });
      } else if (category == "spot" && event == "gaming") {
        const online = await spotgaming.findAll({});
        res.render("verifier/dashboard", {
          event: online,
          name: "Spot Registration",
          event_name: "Video Gaming",
        });
      } else if (category == "online" && event == "gaming") {
        const online = await onlinegaming.findAll({});
        res.render("verifier/dashboard", {
          event: online,
          name: "Online Registration",
          event_name: "Video Gaming",
        });
      } else if (category == "spot" && event == "itquiz") {
        const online = await spotquiz.findAll({});
        res.render("verifier/dashboard", {
          event: online,
          name: "Spot Registration",
          event_name: "IT Quiz",
        });
      } else if (category == "online" && event == "itquiz") {
        const online = await onlinequiz.findAll({});
        res.render("verifier/dashboard", {
          event: online,
          name: "Online Registration",
          event_name: "IT Quiz",
        });
      } else if (category == "spot" && event == "reconcile") {
        const online = await spotreconcile.findAll({});
        res.render("verifier/dashboard", {
          event: online,
          name: "Spot Registration",
          event_name: "Reconicle",
        });
      } else if (category == "online" && event == "reconcile") {
        const online = await onlinereconcile.findAll({});
        res.render("verifier/dashboard", {
          event: online,
          name: "Online Registration",
          event_name: "Reconcile",
        });
      } else if (category == undefined && event == undefined) {
        const spot = await spotCodex.findAll({});
        res.render("verifier/dashboard", {
          event: spot,
          name: "Spot Registration",
          event_name: "Codex",
        });
      } else {
        const spot = await spotCodex.findAll({});
        res.render("verifier/dashboard", {
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


router.get("/logout", (req, res) => {
  res.clearCookie("verifier");
  res.redirect("/verifier/login");
});

module.exports = router;