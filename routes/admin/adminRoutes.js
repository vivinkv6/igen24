const express = require("express");
const adminlogin = require("../../models/users/admin");
const router = express.Router();
const bycrypt = require("bcrypt");
const jwt=require('jsonwebtoken');
const usernameExtractor = require("../../utils/usernameExtractor");
const cookieAuth=require('../../utils/auth');

router.get("/login", async (req, res) => {
  /* This code block is checking if there is already an existing admin account in the database. */
  if (req.cookies.admin) {
    console.log("correct");
    const token = jwt.verify(req.cookies.admin, process.env.JWT_SECRET_TOKEN);
    const findId = await adminlogin.findByPk(token);

    if (findId) {
      // res.redirect(`/admin/dashboard`);
      res.json({ msg: "Admin Dashboard" });
    } else {
      res.redirect(`/admin/login`);
    }
  } else {
    const result = await adminlogin.count();

    if (result == 1) {
      res.render("../views/admin/login", {
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
            res.json({ msg: "Admin Dashboard" });
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
    res.redirect("login");
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
            res.json({ msg: "Admin Dashboard" });
          });
      }
    });
  }
});




module.exports=router