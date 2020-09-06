~"use strict";

const express = require("express");
const router = express.Router();

const accounts = require("./controllers/accounts.js");
const member = require("./controllers/member");
const memberdashboard = require("./controllers/memberdashboard.js");
const trainerdashboard = require("./controllers/trainerdashboard.js")
const about = require("./controllers/about.js");
const assessment = require("./controllers/assessment.js");
const memberupdate = require("./controllers/memberupdate.js");

router.get("/", accounts.index);
router.get("/login", accounts.login);
router.get("/trainerlogin", accounts.trainerlogin);
router.get("/signup", accounts.signup);
router.get("/logout", accounts.logout);
router.get("/trainerlogout",accounts.trainerlogout);
router.post("/register", accounts.register);
router.post("/authenticate", accounts.authenticate);
router.post("/trainerauthenticate", accounts.trainerauthenticate);

router.get("/memberdashboard", memberdashboard.index);
router.get("/memberdashboard/deleteassessment/:id", memberdashboard.deleteAssessment);
router.post("/memberdashboard/addassessment", memberdashboard.addAssessment);

router.get("/trainerdashboard", trainerdashboard.index);
router.get("/member/:id", member.index);
router.get("/trainerdashboard/deletemember/:id", trainerdashboard.deleteMember);
router.get("/member/:id/deleteassessment/:assessmentid",member.deleteAssessment)
router.post("/member/:id/addassessment", member.addAssessment);

router.get("/editmemberdetails",memberupdate.index);
router.post("/member/:id/updatemember/",memberupdate.update);

router.get("/about", about.index);
router.get("/assessment/:id", assessment.index);

module.exports = router;
