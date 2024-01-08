var express = require("express");
var router = express.Router();
var posters = require("../constants/posters");

//all models
//codex
const spotCodex = require("../models/events/spot/codex");
const onlineCodex = require("../models/events/online/codex");

//photography
const spotPhotography = require("../models/events/spot/photography");
const onlinePhotography = require("../models/events/online/photography");

//reconcile
const spotReconcile = require("../models/events/spot/reconcile");
const onlineReconcile = require("../models/events/online/reconcile");

//video gaming
const spotGaming = require("../models/events/spot/mobilegaming");
const onlineGaming = require("../models/events/online/mobilegaming");

//webcast
const spotweb = require("../models/events/spot/webcast");
const onlineweb = require("../models/events/online/webcast");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.render("event", {
    posters: posters,
  });
});

router.get("/:event/registration", (req, res) => {
  res.render("registration");
});

router.get("/:event/online", (req, res) => {
  // res.render('registration');
  const { event } = req.params;

  if (event == "choreography") {
    res.json({ event: event });
  } else if (event == "cipher") {
    res.json({ event: event });
  } else if (event == "codex") {
    res.json({ event: event });
  } else if (event == "crimeinvestigation") {
    res.json({ event: event });
  } else if (event == "itquiz") {
    res.json({ event: event });
  } else if (event == "gaming") {
    res.json({ event: event });
  } else if (event == "band") {
    res.json({ event: event });
  } else if (event == "photography") {
    res.json({ event: event });
  } else if (event == "reconcile") {
    res.json({ event: event });
  } else if (event == "football") {
    res.json({ event: event });
  } else if (event == "webcast") {
    res.json({ event: event });
  } else {
    res.json({ err: "Not found" });
  }
});
router.get("/:event/spot", (req, res) => {
  // res.render('registration');
  const { event } = req.params;
  if (event == "choreography") {
    res.json({ event: event });
  } else if (event == "cipher") {
    res.json({ event: event });
  } else if (event == "codex") {
    res.json({ event: event });
  } else if (event == "crimeinvestigation") {
    res.json({ event: event });
  } else if (event == "itquiz") {
    res.json({ event: event });
  } else if (event == "gaming") {
    res.json({ event: event });
  } else if (event == "band") {
    res.json({ event: event });
  } else if (event == "photography") {
    res.json({ event: event });
  } else if (event == "reconcile") {
    res.json({ event: event });
  } else if (event == "football") {
    res.json({ event: event });
  } else if (event == "webcast") {
    res.json({ event: event });
  } else {
    res.json({ err: "Not found" });
  }
});

//all spot registrations

//all solo events

//GET codex spot registration
router.get("/codex/registration/spot", (req, res) => {
  res.render("events/codex/spot");
});

router.post("/codex/registration/spot", async (req, res) => {
  const { name, email, department, college } = req.body;
  const spotLen = await spotCodex.count();
  const onlineLen = await onlineCodex.count();
  const len = spotLen + onlineLen;

  const register = await spotCodex
    .create({
      id: `CD${len + 1}`,
      name: name,
      college: college,
      email: email,
      department: department,
    })
    .then((data) => {
      res.render("events/message", {
        id: data.dataValues.id,
        mode: "Spot",
        name: data.dataValues.name,
        college: data.dataValues.college,
        department: data.dataValues.department,
        event: "CODEX",
      });
    })
    .catch((err) => {
      res.json({ err: err.message });
    });
});

//GET photography spot registration
router.get("/photography/registration/spot", (req, res) => {
  res.render("events/photography/spot");
});

router.post("/photography/registration/spot", async (req, res) => {
  const { name, email, department, college } = req.body;
  const spotLen = await spotPhotography.count();
  const onlineLen = await onlinePhotography.count();
  const len = spotLen + onlineLen;

  const register = await spotPhotography
    .create({
      id: `SP${len + 1}`,
      name: name,
      college: college,
      email: email,
      department: department,
    })
    .then((data) => {
      res.render("events/message", {
        id: data.dataValues.id,
        mode: "Spot",
        name: data.dataValues.name,
        college: data.dataValues.college,
        department: data.dataValues.department,
        event: "CLICK",
      });
    })
    .catch((err) => {
      res.json({ err: err.message });
    });
});

//GET reconcile spot registration
router.get("/photography/registration/spot", (req, res) => {
  res.render("events/photography/spot");
});

router.post("/photography/registration/spot", async (req, res) => {
  const { name, email, department, college } = req.body;
  const spotLen = await spotPhotography.count();
  const onlineLen = await onlinePhotography.count();
  const len = spotLen + onlineLen;

  const register = await spotPhotography
    .create({
      id: `SP${len + 1}`,
      name: name,
      college: college,
      email: email,
      department: department,
    })
    .then((data) => {
      res.render("events/message", {
        id: data.dataValues.id,
        mode: "Spot",
        name: data.dataValues.name,
        college: data.dataValues.college,
        department: data.dataValues.department,
        event: "CLICK",
      });
    })
    .catch((err) => {
      res.json({ err: err.message });
    });
});

router.get("/reconcile/registration/spot", (req, res) => {
  res.render("events/reconcile/spot");
});

router.post("/reconcile/registration/spot", async (req, res) => {
  const { name, email, department, college } = req.body;
  const spotLen = await spotReconcile.count();
  const onlineLen = await onlineReconcile.count();
  const len = spotLen + onlineLen;

  const register = await spotReconcile
    .create({
      id: `KC${len + 1}`,
      name: name,
      college: college,
      email: email,
      department: department,
    })
    .then((data) => {
      res.render("events/message", {
        id: data.dataValues.id,
        mode: "Spot",
        name: data.dataValues.name,
        college: data.dataValues.college,
        department: data.dataValues.department,
        event: "RECONCILE",
      });
    })
    .catch((err) => {
      res.json({ err: err.message });
    });
});

router.get("/gaming/registration/spot", (req, res) => {
  res.render("events/gaming/spot");
});

router.post("/gaming/registration/spot", async (req, res) => {
  const { name, email, department, college } = req.body;
  const spotLen = await spotGaming.count();
  const onlineLen = await onlineGaming.count();
  const len = spotLen + onlineLen;

  const register = await spotGaming
    .create({
      id: `VG${len + 1}`,
      name: name,
      college: college,
      email: email,
      department: department,
    })
    .then((data) => {
      res.render("events/message", {
        id: data.dataValues.id,
        mode: "Spot",
        name: data.dataValues.name,
        college: data.dataValues.college,
        department: data.dataValues.department,
        event: "Mobile Gaming",
      });
    })
    .catch((err) => {
      res.json({ err: err.message });
    });
});

router.get("/webcast/registration/spot", (req, res) => {
  res.render("events/webcast/spot");
});

router.post("/webcast/registration/spot", async (req, res) => {
  const { name, email, department, college } = req.body;
  const spotLen = await spotweb.count();
  const onlineLen = await onlineweb.count();
  const len = spotLen + onlineLen;

  const register = await spotweb
    .create({
      id: `WD${len + 1}`,
      name: name,
      college: college,
      email: email,
      department: department,
    })
    .then((data) => {
      res.render("events/message", {
        id: data.dataValues.id,
        mode: "Spot",
        name: data.dataValues.name,
        college: data.dataValues.college,
        department: data.dataValues.department,
        event: "WEBCAST",
      });
    })
    .catch((err) => {
      res.json({ err: err.message });
    });
});

module.exports = router;
