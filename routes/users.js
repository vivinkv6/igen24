var express = require("express");
var router = express.Router();
var posters = require("../constants/posters");
const cloudinaryConfig = require("../config/cloudinary.config");

const multer = require("multer");

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

//all event models
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

//itquiz
const spotquiz = require("../models/events/spot/itQuiz");
const onlinequiz = require("../models/events/online/itQuiz");

//cipher
const spotcipher = require("../models/events/spot/cipherSolving");
const onlinecipher = require("../models/events/online/cipherSolving");

//spot choreography
const spotchoreography = require("../models/events/spot/choreography");
const onlinechoreography = require("../models/events/online/choreography");

//TODO
//music band
const spotband = require("../models/events/spot/musicBand");
const onlineband = require("../models/events/online/musicBand");

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

//POST codex spot registration

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

//GET codex online registration

router.get("/codex/registration/online", (req, res) => {
  res.render("events/codex/online");
});

router.post(
  "/codex/registration/online",
  upload.single("payment"),
  async (req, res) => {
    const spotLen = await spotCodex.count();
    const onlineLen = await onlineCodex.count();
    const len = spotLen + onlineLen;
    const { name, email, college, department, transaction } = req.body;
    const fileBuffer = req.file.buffer.toString("base64");
    const fileUpload = await cloudinaryConfig.uploader.upload(
      `data:image/png;base64,${fileBuffer}`,
      {
        folder: "/payment",
        public_id: Date.now() + "-" + req.file.originalname,
        encoding: "base64",
      }
    );

    const register = await onlineCodex.create({
      id: `CD${len + 1}`,
      name: name,
      email: email,
      college: college,
      department: department,
      transactionid: transaction,
      payment: fileUpload.secure_url,
    }).then((data)=>{
      res.render("events/message", {
        id: data.dataValues.id,
        mode: "Online",
        name: data.dataValues.name,
        college: data.dataValues.college,
        department: data.dataValues.department,
        transaction:data.dataValues.transactionid,
        event: "CODEX",
      });
    }).catch((err)=>{
      res.json({err:err.message})
    })
  }
);

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

router.get("/itquiz/registration/spot", (req, res) => {
  res.render("events/itquiz/spot");
});

router.post("/itquiz/registration/spot", async (req, res) => {
  const { name, email, department, college } = req.body;
  console.log(name);
  const spotLen = await spotquiz.count();
  const onlineLen = await onlinequiz.count();
  const len = spotLen + onlineLen;

  const register = await spotquiz
    .create({
      id: `IT${len + 1}`,
      name: [name],
      college: college,
      email: [email],
      department: [department],
    })
    .then((data) => {
      res.render("events/message", {
        id: data.dataValues.id,
        mode: "Spot",
        name: data.dataValues.name,
        college: data.dataValues.college,
        department: data.dataValues.department,
        event: "IT BUZZ",
      });
    })
    .catch((err) => {
      res.json({ err: err });
    });
});

router.get("/cipher/registration/spot", (req, res) => {
  res.render("events/cipher/spot");
});

router.post("/cipher/registration/spot", async (req, res) => {
  const { name, email, department, college } = req.body;
  console.log(name);
  const spotLen = await spotcipher.count();
  const onlineLen = await onlinecipher.count();
  const len = spotLen + onlineLen;

  const register = await spotcipher
    .create({
      id: `CS${len + 1}`,
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
        event: "Crack The Cipher",
      });
    })
    .catch((err) => {
      res.json({ err: err });
    });
});

router.get("/choreography/registration/spot", (req, res) => {
  res.render("events/choreography/spot");
});

router.post("/choreography/registration/spot", async (req, res) => {
  const { name, email, department, college } = req.body;
  const spotLen = await spotchoreography.count();
  const onlineLen = await onlinechoreography.count();
  const len = spotLen + onlineLen;

  const register = await spotchoreography
    .create({
      id: `SC${len + 1}`,
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
        event: "Spot Choreography",
      });
    })
    .catch((err) => {
      res.json({ err: err });
    });
});

module.exports = router;
