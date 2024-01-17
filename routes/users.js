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
        online: false,
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

    const register = await onlineCodex
      .create({
        id: `CD${len + 1}`,
        name: name,
        email: email,
        college: college,
        department: department,
        transactionid: transaction,
        payment: fileUpload.secure_url,
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
        });
      })
      .catch((err) => {
        res.json({ err: err.message });
      });
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
        online: false,
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
        online: false,
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

    const register = await onlinePhotography
      .create({
        id: `SP${len + 1}`,
        name: name,
        email: email,
        college: college,
        department: department,
        transactionid: transaction,
        payment: fileUpload.secure_url,
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
        });
      })
      .catch((err) => {
        res.json({ err: err.message });
      });
  }
);



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
        online: false,
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

    const register = await onlineReconcile
      .create({
        id: `KC${len + 1}`,
        name: name,
        email: email,
        college: college,
        department: department,
        transactionid: transaction,
        payment: fileUpload.secure_url,
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
        });
      })
      .catch((err) => {
        res.json({ err: err.message });
      });
  }
);



//spot gaming registration
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
        online: false,
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

    const register = await onlineGaming
      .create({
        id: `VG${len + 1}`,
        name: name,
        email: email,
        college: college,
        department: department,
        transactionid: transaction,
        payment: fileUpload.secure_url,
      })
      .then((data) => {
        res.render("events/message", {
          id: data.dataValues.id,
          mode: "Online",
          name: data.dataValues.name,
          college: data.dataValues.college,
          department: data.dataValues.department,
          transaction: data.dataValues.transactionid,
          event: "Mobile Gaming",
          online: true,
        });
      })
      .catch((err) => {
        res.json({ err: err.message });
      });
  }
);

//spot web designing registration
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
        online: false,
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

    const register = await onlineweb
      .create({
        id: `WD${len + 1}`,
        name: name,
        email: email,
        college: college,
        department: department,
        transactionid: transaction,
        payment: fileUpload.secure_url,
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
        });
      })
      .catch((err) => {
        res.json({ err: err.message });
      });
  }
);

//spot IT quiz registration
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
        online: false,
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
    const { name, email, department, college, transaction } = req.body;
    console.log(name);
    const spotLen = await spotquiz.count();
    const onlineLen = await onlinequiz.count();
    const len = spotLen + onlineLen;

    const fileBuffer = req.file.buffer.toString("base64");
    const fileUpload = await cloudinaryConfig.uploader.upload(
      `data:image/png;base64,${fileBuffer}`,
      {
        folder: "/payment",
        public_id: Date.now() + "-" + req.file.originalname,
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
      })
      .then((data) => {
        res.render("events/message", {
          id: data.dataValues.id,
          mode: "Online",
          name: data.dataValues.name,
          college: data.dataValues.college,
          department: data.dataValues.department,
          event: "IT BUZZ",
          transaction: data.dataValues.transactionid,
          online: true,
        });
      })
      .catch((err) => {
        res.json({ err: err });
      });
  }
);

//spot cipher registration
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
      id: `CC${len + 1}`,
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
        online: false,
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

    const register = await onlinecipher
      .create({
        id: `CC${len + 1}`,
        name: name,
        email: email,
        college: college,
        department: department,
        transactionid: transaction,
        payment: fileUpload.secure_url,
      })
      .then((data) => {
        res.render("events/message", {
          id: data.dataValues.id,
          mode: "Online",
          name: data.dataValues.name,
          college: data.dataValues.college,
          department: data.dataValues.department,
          transaction: data.dataValues.transactionid,
          event: "Crack The Cipher",
          online: true,
        });
      })
      .catch((err) => {
        res.json({ err: err.message });
      });
  }
);

//spot choreography registration
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
        online: false,
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

    const register = await onlinecipher
      .create({
        id: `SC${len + 1}`,
        name: name,
        email: email,
        college: college,
        department: department,
        transactionid: transaction,
        payment: fileUpload.secure_url,
      })
      .then((data) => {
        res.render("events/message", {
          id: data.dataValues.id,
          mode: "Online",
          name: data.dataValues.name,
          college: data.dataValues.college,
          department: data.dataValues.department,
          transaction: data.dataValues.transactionid,
          event: "Spot Choreography",
          online: true,
        });
      })
      .catch((err) => {
        res.json({ err: err.message });
      });
  }
);

module.exports = router;
