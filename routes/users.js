var express = require("express");
var router = express.Router();
var { day1, day2 } = require("../constants/posters");
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

//music band
const spotband = require("../models/events/spot/musicBand");
const onlineband = require("../models/events/online/musicBand");

//football
const spotfootball = require("../models/events/spot/slipperyFootball");
const onlinefootball = require("../models/events/online/slipperyFootball");

//crime investigation
const spotcrime = require("../models/events/spot/crimeInvestigation");
const onlinecrime = require("../models/events/online/crimeInvestigation");

//trivia
const onlinetrivia = require("../models/events/online/trivia");
const spottrivia = require("../models/events/spot/trivia");
const adminModel = require("../models/users/admin");

/* GET users listing. */
router.get("/", function (req, res, next) {
  res.render("event", {
    day1: day1,
    day2: day2,
  });
});

router.get("/:event/registration", async (req, res) => {
  const admin = await adminModel.findOne({});

  res.render("registration", { online: admin?.dataValues?.online });
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

//GET codex spot registration
router.get("/codex/registration/spot", (req, res) => {
  if (req.cookies.verifier) {
    res.render("events/codex/spot");
  } else {
    res.redirect("/events/error");
  }
});

//POST codex spot registration

router.post("/codex/registration/spot", async (req, res) => {
  const { name, email, department, college, mobile } = req.body;
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
      mobile: mobile,
    })
    .then((data) => {
      res.render("events/message", {
        id: data.dataValues.id,
        mode: "Spot",
        name: data.dataValues.name,
        college: data.dataValues.college,
        department: data.dataValues.department,
        event: "CODEX",
        online: false,
        mobile: mobile,
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
    const { name, email, college, department, transaction, mobile } = req.body;
    const fileBuffer = req.file.buffer.toString("base64");
    const fileUpload = await cloudinaryConfig.uploader.upload(
      `data:image/png;base64,${fileBuffer}`,
      {
        folder: "/payment",
        public_id: `CD${len + 1} - ${req.file.originalname}`,
        encoding: "base64",
      }
    );

    const register = await onlineCodex
      .create({
        id: `CD${len + 1}`,
        name: name,
        email: email,
        college: college,
        department: department,
        transactionid: transaction,
        payment: fileUpload.secure_url,
        mobile: mobile,
      })
      .then((data) => {
        res.render("events/message", {
          id: data.dataValues.id,
          mode: "Online",
          name: data.dataValues.name,
          college: data.dataValues.college,
          department: data.dataValues.department,
          transaction: data.dataValues.transactionid,
          online: true,
          event: "CODEX",
          mobile: mobile,
        });
      })
      .catch((err) => {
        res.json({ err: err.message });
      });
  }
);

//GET photography spot registration
router.get("/photography/registration/spot", (req, res) => {
  if (req.cookies.verifier) {
    res.render("events/photography/spot");
  } else {
    res.redirect("/events/error");
  }
});

router.post("/photography/registration/spot", async (req, res) => {
  const { name, email, department, college, mobile } = req.body;
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
      mobile: mobile,
    })
    .then((data) => {
      res.render("events/message", {
        id: data.dataValues.id,
        mode: "Spot",
        name: data.dataValues.name,
        college: data.dataValues.college,
        department: data.dataValues.department,
        event: "CLICK",
        online: false,
        mobile: mobile,
      });
    })
    .catch((err) => {
      res.json({ err: err.message });
    });
});

//online photography registration

router.get("/photography/registration/online", (req, res) => {
  res.render("events/photography/online");
});

router.post(
  "/photography/registration/online",
  upload.single("payment"),
  async (req, res) => {
    const spotLen = await spotPhotography.count();
    const onlineLen = await onlinePhotography.count();
    const len = spotLen + onlineLen;
    const { name, email, college, department, transaction, mobile } = req.body;
    const fileBuffer = req.file.buffer.toString("base64");
    const fileUpload = await cloudinaryConfig.uploader.upload(
      `data:image/png;base64,${fileBuffer}`,
      {
        folder: "/payment",
        public_id: `SP${len + 1} - ${req.file.originalname}`,
        encoding: "base64",
      }
    );

    const register = await onlinePhotography
      .create({
        id: `SP${len + 1}`,
        name: name,
        email: email,
        college: college,
        department: department,
        transactionid: transaction,
        payment: fileUpload.secure_url,
        mobile: mobile,
      })
      .then((data) => {
        res.render("events/message", {
          id: data.dataValues.id,
          mode: "Online",
          name: data.dataValues.name,
          college: data.dataValues.college,
          department: data.dataValues.department,
          transaction: data.dataValues.transactionid,
          event: "CLICK",
          online: true,
          mobile: mobile,
        });
      })
      .catch((err) => {
        res.json({ err: err.message });
      });
  }
);

router.get("/reconcile/registration/spot", (req, res) => {
  if (req.cookies.verifier) {
    res.render("events/reconcile/spot");
  } else {
    res.redirect("/events/error");
  }
});

router.post("/reconcile/registration/spot", async (req, res) => {
  const { name, email, department, college, mobile } = req.body;
  const spotLen = await spotReconcile.count();
  const onlineLen = await onlineReconcile.count();
  const len = spotLen + onlineLen;

  const register = await spotReconcile
    .create({
      id: `KA${len + 1}`,
      name: name,
      college: college,
      email: email,
      department: department,
      mobile: mobile,
    })
    .then((data) => {
      res.render("events/message", {
        id: data.dataValues.id,
        mode: "Spot",
        name: data.dataValues.name,
        college: data.dataValues.college,
        department: data.dataValues.department,
        event: "RECONCILE",
        online: false,
        mobile: mobile,
      });
    })
    .catch((err) => {
      res.json({ err: err.message });
    });
});

//online reconcile registration

router.get("/reconcile/registration/online", (req, res) => {
  res.render("events/reconcile/online");
});

router.post(
  "/reconcile/registration/online",
  upload.single("payment"),
  async (req, res) => {
    const spotLen = await spotReconcile.count();
    const onlineLen = await onlineReconcile.count();
    const len = spotLen + onlineLen;
    const { name, email, college, department, transaction, mobile } = req.body;
    const fileBuffer = req.file.buffer.toString("base64");
    const fileUpload = await cloudinaryConfig.uploader.upload(
      `data:image/png;base64,${fileBuffer}`,
      {
        folder: "/payment",
        public_id: `KA${len + 1} - ${req.file.originalname}`,
        encoding: "base64",
      }
    );

    const register = await onlineReconcile
      .create({
        id: `KA${len + 1}`,
        name: name,
        email: email,
        college: college,
        department: department,
        transactionid: transaction,
        payment: fileUpload.secure_url,
        mobile: mobile,
      })
      .then((data) => {
        res.render("events/message", {
          id: data.dataValues.id,
          mode: "Online",
          name: data.dataValues.name,
          college: data.dataValues.college,
          department: data.dataValues.department,
          transaction: data.dataValues.transactionid,
          event: "RECONCILE",
          online: true,
          mobile: mobile,
        });
      })
      .catch((err) => {
        res.json({ err: err.message });
      });
  }
);

//spot gaming registration
router.get("/gaming/registration/spot", (req, res) => {
  if (req.cookies.verifier) {
    res.render("events/gaming/spot");
  } else {
    res.redirect("/events/error");
  }
});

router.post("/gaming/registration/spot", async (req, res) => {
  const { name, email, department, college, mobile } = req.body;
  const spotLen = await spotGaming.count();
  const onlineLen = await onlineGaming.count();
  const len = spotLen + onlineLen;

  const register = await spotGaming
    .create({
      id: `MG${len + 1}`,
      name: name,
      college: college,
      email: email,
      department: department,
      mobile: mobile,
    })
    .then((data) => {
      res.render("events/message", {
        id: data.dataValues.id,
        mode: "Spot",
        name: data.dataValues.name,
        college: data.dataValues.college,
        department: data.dataValues.department,
        event: "THUMB WAR",
        online: false,
        mobile: mobile,
      });
    })
    .catch((err) => {
      res.json({ err: err.message });
    });
});

//online gaming registration
router.get("/gaming/registration/online", (req, res) => {
  res.render("events/gaming/online");
});

router.post(
  "/gaming/registration/online",
  upload.single("payment"),
  async (req, res) => {
    const spotLen = await spotGaming.count();
    const onlineLen = await onlineGaming.count();
    const len = spotLen + onlineLen;
    const { name, email, college, department, transaction, mobile } = req.body;
    const fileBuffer = req.file.buffer.toString("base64");
    const fileUpload = await cloudinaryConfig.uploader.upload(
      `data:image/png;base64,${fileBuffer}`,
      {
        folder: "/payment",
        public_id: `MG${len + 1} - ${req.file.originalname}`,
        encoding: "base64",
      }
    );

    const register = await onlineGaming
      .create({
        id: `MG${len + 1}`,
        name: name,
        email: email,
        college: college,
        department: department,
        transactionid: transaction,
        payment: fileUpload.secure_url,
        mobile: mobile,
      })
      .then((data) => {
        res.render("events/message", {
          id: data.dataValues.id,
          mode: "Online",
          name: data.dataValues.name,
          college: data.dataValues.college,
          department: data.dataValues.department,
          transaction: data.dataValues.transactionid,
          event: "THUMB WAR",
          online: true,
          mobile: mobile,
        });
      })
      .catch((err) => {
        res.json({ err: err.message });
      });
  }
);

//spot web designing registration
router.get("/webcast/registration/spot", (req, res) => {
  if (req.cookies.verifier) {
    res.render("events/webcast/spot");
  } else {
    res.redirect("/events/error");
  }
});

router.post("/webcast/registration/spot", async (req, res) => {
  const { name, email, department, college, mobile } = req.body;
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
      mobile: mobile,
    })
    .then((data) => {
      res.render("events/message", {
        id: data.dataValues.id,
        mode: "Spot",
        name: data.dataValues.name,
        college: data.dataValues.college,
        department: data.dataValues.department,
        event: "WEBCAST",
        online: false,
        mobile: mobile,
      });
    })
    .catch((err) => {
      res.json({ err: err.message });
    });
});

//online web designing registration
router.get("/webcast/registration/online", (req, res) => {
  res.render("events/webcast/online");
});
router.post(
  "/webcast/registration/online",
  upload.single("payment"),
  async (req, res) => {
    const spotLen = await spotweb.count();
    const onlineLen = await onlineweb.count();
    const len = spotLen + onlineLen;
    const { name, email, college, department, transaction, mobile } = req.body;
    const fileBuffer = req.file.buffer.toString("base64");
    const fileUpload = await cloudinaryConfig.uploader.upload(
      `data:image/png;base64,${fileBuffer}`,
      {
        folder: "/payment",
        public_id: `WD${len + 1} - ${req.file.originalname}`,
        encoding: "base64",
      }
    );

    const register = await onlineweb
      .create({
        id: `WD${len + 1}`,
        name: name,
        email: email,
        college: college,
        department: department,
        transactionid: transaction,
        payment: fileUpload.secure_url,
        mobile: mobile,
      })
      .then((data) => {
        res.render("events/message", {
          id: data.dataValues.id,
          mode: "Online",
          name: data.dataValues.name,
          college: data.dataValues.college,
          department: data.dataValues.department,
          transaction: data.dataValues.transactionid,
          online: true,
          event: "WEBCAST",
          mobile: mobile,
        });
      })
      .catch((err) => {
        res.json({ err: err.message });
      });
  }
);

//spot IT quiz registration
router.get("/itquiz/registration/spot", (req, res) => {
  if (req.cookies.verifier) {
    res.render("events/itquiz/spot");
  } else {
    res.redirect("/events/error");
  }
});

router.post("/itquiz/registration/spot", async (req, res) => {
  const { name, email, department, college, mobile } = req.body;
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
      mobile: mobile,
    })
    .then((data) => {
      res.render("events/message", {
        id: data.dataValues.id,
        mode: "Spot",
        name: data.dataValues.name,
        college: data.dataValues.college,
        department: data.dataValues.department,
        event: "BUZZ",
        online: false,
        mobile: mobile,
      });
    })
    .catch((err) => {
      res.json({ err: err });
    });
});

//online IT quiz registration
router.get("/itquiz/registration/online", (req, res) => {
  res.render("events/itquiz/online");
});

router.post(
  "/itquiz/registration/online",
  upload.single("payment"),
  async (req, res) => {
    const { name, email, department, college, transaction, mobile } = req.body;
    console.log(name);
    const spotLen = await spotquiz.count();
    const onlineLen = await onlinequiz.count();
    const len = spotLen + onlineLen;

    const fileBuffer = req.file.buffer.toString("base64");
    const fileUpload = await cloudinaryConfig.uploader.upload(
      `data:image/png;base64,${fileBuffer}`,
      {
        folder: "/payment",
        public_id: `IT${len + 1} - ${req.file.originalname}`,
        encoding: "base64",
      }
    );

    const register = await onlinequiz
      .create({
        id: `IT${len + 1}`,
        name: [name],
        college: college,
        email: [email],
        department: [department],
        transactionid: transaction,
        payment: fileUpload.secure_url,
        mobile: mobile,
      })
      .then((data) => {
        res.render("events/message", {
          id: data.dataValues.id,
          mode: "Online",
          name: data.dataValues.name,
          college: data.dataValues.college,
          department: data.dataValues.department,
          event: "BUZZ",
          transaction: data.dataValues.transactionid,
          online: true,
          mobile: mobile,
        });
      })
      .catch((err) => {
        res.json({ err: err });
      });
  }
);

//spot Trivia quiz registration
router.get("/trivia/registration/spot", (req, res) => {
  if (req.cookies.verifier) {
    res.render("events/trivia/spot");
  } else {
    res.redirect("/events/error");
  }
});

router.post("/trivia/registration/spot", async (req, res) => {
  const { name, email, department, college, mobile } = req.body;
  console.log(name);
  const spotLen = await spottrivia.count();
  const onlineLen = await onlinetrivia.count();
  const len = spotLen + onlineLen;

  const register = await spottrivia
    .create({
      id: `TV${len + 1}`,
      name: [name],
      college: college,
      email: [email],
      department: [department],
      mobile: mobile,
    })
    .then((data) => {
      res.render("events/message", {
        id: data.dataValues.id,
        mode: "Spot",
        name: data.dataValues.name,
        college: data.dataValues.college,
        department: data.dataValues.department,
        event: "TRIVIA FIESTA",
        online: false,
        mobile: mobile,
      });
    })
    .catch((err) => {
      res.json({ err: err });
    });
});

//online Trivia quiz registration
router.get("/trivia/registration/online", (req, res) => {
  res.render("events/trivia/online");
});

router.post(
  "/trivia/registration/online",
  upload.single("payment"),
  async (req, res) => {
    const { name, email, department, college, transaction, mobile } = req.body;
    console.log(name);
    const spotLen = await spottrivia.count();
    const onlineLen = await onlinetrivia.count();
    const len = spotLen + onlineLen;

    const fileBuffer = req.file.buffer.toString("base64");
    const fileUpload = await cloudinaryConfig.uploader.upload(
      `data:image/png;base64,${fileBuffer}`,
      {
        folder: "/payment",
        public_id: `TV${len + 1} - ${req.file.originalname}`,
        encoding: "base64",
      }
    );

    const register = await onlinetrivia
      .create({
        id: `TV${len + 1}`,
        name: [name],
        college: college,
        email: [email],
        department: [department],
        transactionid: transaction,
        payment: fileUpload.secure_url,
        mobile: mobile,
      })
      .then((data) => {
        res.render("events/message", {
          id: data.dataValues.id,
          mode: "Online",
          name: data.dataValues.name,
          college: data.dataValues.college,
          department: data.dataValues.department,
          event: "TRIVIA FIESTA",
          transaction: data.dataValues.transactionid,
          online: true,
          mobile: mobile,
        });
      })
      .catch((err) => {
        res.json({ err: err });
      });
  }
);

//spot cipher registration
router.get("/cipher/registration/spot", (req, res) => {
  if (req.cookies.verifier) {
    res.render("events/cipher/spot");
  } else {
    res.redirect("/events/error");
  }
});

router.post("/cipher/registration/spot", async (req, res) => {
  const { name, email, department, college, mobile } = req.body;
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
      mobile: mobile,
    })
    .then((data) => {
      res.render("events/message", {
        id: data.dataValues.id,
        mode: "Spot",
        name: data.dataValues.name,
        college: data.dataValues.college,
        department: data.dataValues.department,
        event: "CRACK THE CIPHER",
        online: false,
        mobile: mobile,
      });
    })
    .catch((err) => {
      res.json({ err: err });
    });
});

//online cipher registration

router.get("/cipher/registration/online", (req, res) => {
  res.render("events/cipher/online");
});

router.post(
  "/cipher/registration/online",
  upload.single("payment"),
  async (req, res) => {
    const spotLen = await spotcipher.count();
    const onlineLen = await onlinecipher.count();
    const len = spotLen + onlineLen;
    const { name, email, college, department, transaction, mobile } = req.body;
    const fileBuffer = req.file.buffer.toString("base64");
    const fileUpload = await cloudinaryConfig.uploader.upload(
      `data:image/png;base64,${fileBuffer}`,
      {
        folder: "/payment",
        public_id: `CS${len + 1} - ${req.file.originalname}`,
        encoding: "base64",
      }
    );

    const register = await onlinecipher
      .create({
        id: `CS${len + 1}`,
        name: name,
        email: email,
        college: college,
        department: department,
        transactionid: transaction,
        payment: fileUpload.secure_url,
        mobile: mobile,
      })
      .then((data) => {
        res.render("events/message", {
          id: data.dataValues.id,
          mode: "Online",
          name: data.dataValues.name,
          college: data.dataValues.college,
          department: data.dataValues.department,
          transaction: data.dataValues.transactionid,
          event: "CRACK THE CIPHER",
          online: true,
          mobile: mobile,
        });
      })
      .catch((err) => {
        res.json({ err: err.message });
      });
  }
);

//spot choreography registration
router.get("/choreography/registration/spot", (req, res) => {
  if (req.cookies.verifier) {
    res.render("events/choreography/spot");
  } else {
    res.redirect("/events/error");
  }
});

router.post("/choreography/registration/spot", async (req, res) => {
  const { name, email, department, college, mobile } = req.body;
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
      mobile: mobile,
    })
    .then((data) => {
      res.render("events/message", {
        id: data.dataValues.id,
        mode: "Spot",
        name: data.dataValues.name,
        college: data.dataValues.college,
        department: data.dataValues.department,
        event: "STEP-UP",
        online: false,
        mobile: mobile,
      });
    })
    .catch((err) => {
      res.json({ err: err });
    });
});

//online choreography registration

router.get("/choreography/registration/online", (req, res) => {
  res.render("events/choreography/online");
});

router.post(
  "/choreography/registration/online",
  upload.single("payment"),
  async (req, res) => {
    const spotLen = await spotchoreography.count();
    const onlineLen = await onlinechoreography.count();
    const len = spotLen + onlineLen;
    const { name, email, college, department, transaction, mobile } = req.body;
    const fileBuffer = req.file.buffer.toString("base64");
    const fileUpload = await cloudinaryConfig.uploader.upload(
      `data:image/png;base64,${fileBuffer}`,
      {
        folder: "/payment",
        public_id: `SC${len + 1} - ${req.file.originalname}`,
        encoding: "base64",
      }
    );

    const register = await onlinechoreography
      .create({
        id: `SC${len + 1}`,
        name: name,
        email: email,
        college: college,
        department: department,
        transactionid: transaction,
        payment: fileUpload.secure_url,
        mobile: mobile,
      })
      .then((data) => {
        res.render("events/message", {
          id: data.dataValues.id,
          mode: "Online",
          name: data.dataValues.name,
          college: data.dataValues.college,
          department: data.dataValues.department,
          transaction: data.dataValues.transactionid,
          event: "STEP-UP",
          online: true,
          mobile: mobile,
        });
      })
      .catch((err) => {
        res.json({ err: err.message });
      });
  }
);

//spot band registration
router.get("/band/registration/spot", (req, res) => {
  if (req.cookies.verifier) {
    res.render("events/band/spot");
  } else {
    res.redirect("/events/error");
  }
});

router.post("/band/registration/spot", async (req, res) => {
  const { name, email, department, college, mobile } = req.body;
  console.log(req.body);
  const spotLen = await spotband.count();
  const onlineLen = await onlineband.count();
  const len = spotLen + onlineLen;

  const register = await spotband
    .create({
      id: `MB${len + 1}`,
      name: [name],
      college: college,
      email: [email],
      department: [department],
      mobile: mobile,
    })
    .then((data) => {
      res.render("events/message", {
        id: data.dataValues.id,
        mode: "Spot",
        name: data.dataValues.name,
        college: data.dataValues.college,
        department: data.dataValues.department,
        event: "BANDBATTLE",
        online: false,
        mobile: mobile,
      });
    })
    .catch((err) => {
      res.json({ err: err });
    });
});

//online band registration

router.get("/band/registration/online", (req, res) => {
  res.render("events/band/online");
});

router.post(
  "/band/registration/online",
  upload.single("payment"),
  async (req, res) => {
    const spotLen = await spotband.count();
    const onlineLen = await onlineband.count();
    const len = spotLen + onlineLen;
    const { name, email, college, department, transaction, mobile } = req.body;
    const fileBuffer = req.file.buffer.toString("base64");
    const fileUpload = await cloudinaryConfig.uploader.upload(
      `data:image/png;base64,${fileBuffer}`,
      {
        folder: "/payment",
        public_id: `MB${len + 1} - ${req.file.originalname}`,
        encoding: "base64",
      }
    );
    console.log(req.body);

    const register = await onlineband
      .create({
        id: `MB${len + 1}`,
        name: [name],
        email: [email],
        college: college,
        department: [department],
        transactionid: transaction,
        payment: fileUpload.secure_url,
        mobile: mobile,
      })
      .then((data) => {
        res.render("events/message", {
          id: data.dataValues.id,
          mode: "Online",
          name: data.dataValues.name,
          college: data.dataValues.college,
          department: data.dataValues.department,
          transaction: data.dataValues.transactionid,
          event: "BANDBATTLE",
          online: true,
          mobile: mobile,
        });
      })
      .catch((err) => {
        res.json({ err: err.message });
      });
  }
);

//spot football registration
router.get("/football/registration/spot", (req, res) => {
  if (req.cookies.verifier) {
    res.render("events/football/spot");
  } else {
    res.redirect("/events/error");
  }
});

router.post("/football/registration/spot", async (req, res) => {
  const { name, email, department, college, mobile } = req.body;
  console.log(req.body);
  const spotLen = await spotfootball.count();
  const onlineLen = await onlinefootball.count();
  const len = spotLen + onlineLen;

  const register = await spotfootball
    .create({
      id: `FB${len + 1}`,
      name: [name],
      college: college,
      email: [email],
      department: [department],
      mobile: mobile,
    })
    .then((data) => {
      res.render("events/message", {
        id: data.dataValues.id,
        mode: "Spot",
        name: data.dataValues.name,
        college: data.dataValues.college,
        department: data.dataValues.department,
        event: "SIUU",
        online: false,
        mobile: mobile,
      });
    })
    .catch((err) => {
      res.json({ err: err });
    });
});

//online football registration

router.get("/football/registration/online", (req, res) => {
  res.render("events/football/online");
});

router.post(
  "/football/registration/online",
  upload.single("payment"),
  async (req, res) => {
    const spotLen = await spotfootball.count();
    const onlineLen = await onlinefootball.count();
    const len = spotLen + onlineLen;
    const { name, email, college, department, transaction, mobile } = req.body;
    const fileBuffer = req.file.buffer.toString("base64");
    const fileUpload = await cloudinaryConfig.uploader.upload(
      `data:image/png;base64,${fileBuffer}`,
      {
        folder: "/payment",
        public_id: `FB${len + 1} - ${req.file.originalname}`,
        encoding: "base64",
      }
    );
    console.log(req.body);

    const register = await onlinefootball
      .create({
        id: `FB${len + 1}`,
        name: [name],
        email: [email],
        college: college,
        department: [department],
        transactionid: transaction,
        payment: fileUpload.secure_url,
        mobile: mobile,
      })
      .then((data) => {
        res.render("events/message", {
          id: data.dataValues.id,
          mode: "Online",
          name: data.dataValues.name,
          college: data.dataValues.college,
          department: data.dataValues.department,
          transaction: data.dataValues.transactionid,
          event: "SIUU",
          online: true,
          mobile: mobile,
        });
      })
      .catch((err) => {
        res.json({ err: err.message });
      });
  }
);

//spot crime investigation registration
router.get("/crimeinvestigation/registration/spot", (req, res) => {
  if (req.cookies.verifier) {
    res.render("events/crimeinvestigation/spot");
  } else {
    res.redirect("/events/error");
  }
});

router.post("/crimeinvestigation/registration/spot", async (req, res) => {
  const { name, email, department, college, mobile } = req.body;
  console.log(req.body);
  const spotLen = await spotcrime.count();
  const onlineLen = await onlinecrime.count();
  const len = spotLen + onlineLen;

  const register = await spotcrime
    .create({
      id: `CI${len + 1}`,
      name: [name],
      college: college,
      email: [email],
      department: [department],
      mobile: mobile,
    })
    .then((data) => {
      res.render("events/message", {
        id: data.dataValues.id,
        mode: "Spot",
        name: data.dataValues.name,
        college: data.dataValues.college,
        department: data.dataValues.department,
        event: "USUAL SUSPECTS",
        online: false,
        mobile: mobile,
      });
    })
    .catch((err) => {
      res.json({ err: err });
    });
});

//online football registration

router.get("/crimeinvestigation/registration/online", (req, res) => {
  res.render("events/crimeinvestigation/online");
});

router.post(
  "/crimeinvestigation/registration/online",
  upload.single("payment"),
  async (req, res) => {
    const spotLen = await spotcrime.count();
    const onlineLen = await onlinecrime.count();
    const len = spotLen + onlineLen;
    const { name, email, college, department, transaction, mobile } = req.body;
    const fileBuffer = req.file.buffer.toString("base64");
    const fileUpload = await cloudinaryConfig.uploader.upload(
      `data:image/png;base64,${fileBuffer}`,
      {
        folder: "/payment",
        public_id: `CI${len + 1} - ${req.file.originalname}`,
        encoding: "base64",
      }
    );
    console.log(req.body);

    const register = await onlinecrime
      .create({
        id: `CI${len + 1}`,
        name: [name],
        email: [email],
        college: college,
        department: [department],
        transactionid: transaction,
        payment: fileUpload.secure_url,
        mobile: mobile,
      })
      .then((data) => {
        console.log(data);
        res.render("events/message", {
          id: data.dataValues.id,
          mode: "Online",
          name: data.dataValues.name,
          college: data.dataValues.college,
          department: data.dataValues.department,
          transaction: data.dataValues.transactionid,
          event: "USUAL SUSPECTS",
          online: true,
          mobile: mobile,
        });
      })
      .catch((err) => {
        console.log(err);
        res.json({ err: err.message });
      });
  }
);

router.get("/error", (req, res) => {
  res.render("events/error");
});

module.exports = router;
