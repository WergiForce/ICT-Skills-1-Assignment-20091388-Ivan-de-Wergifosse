"use strict";

const memberStore = require("../models/member-store");
const trainerStore = require("../models/trainer-store")
const logger = require("../utils/logger");
const uuid = require("uuid");

const accounts = {
  index(request, response) {
    const viewData = {
      title: "Login or Signup"
    };
    response.render("index", viewData);
  },

  login(request, response) {
    const viewData = {
      title: "Login to the Service"
    };
    response.render("login", viewData);
  },

  trainerlogin(request, response) {
    const viewData = {
      title: "Login Trainer to the Service"
    };
    response.render("trainerlogin", viewData);
  },

  logout(request, response) {
    response.cookie("member", "");
    response.redirect("/");
  },

  trainerlogout(request, response) {
    response.cookie("trainer", "");
    response.redirect("/");
  },

  signup(request, response) {
    const viewData = {
      title: "Login to the Service"
    };
    response.render("signup", viewData);
  },

  register(request, response) {
    const newMember = {
      id: uuid.v1(),
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
      password: request.body.password,
      address: request.body.address,
      gender: request.body.gender,
      height: request.body.height,
      startingWeight: request.body.startingWeight,
      assessments: []
    };
    memberStore.addMember(newMember);
    logger.info(`registering ${newMember.email}`);
    response.redirect("/");
  },

  authenticate(request, response) {
    const member = memberStore.getMemberByEmail(request.body.email);
    if (member) {
      response.cookie("member", member.email, member.password);
      logger.info(`logging in ${member.email}`);
      response.redirect("/memberdashboard");
    } else {
      response.redirect("/login");
    }
  },

  trainerauthenticate(request, response) {
    const trainer = trainerStore.getTrainerByEmail(request.body.email);
    if (trainer) {
      response.cookie("trainer", trainer.email);
      logger.info(`logging in ${trainer.email}`);
      response.redirect("/trainerdashboard");
    } else {
      response.redirect("/trainerlogin");
    }
  },

  getCurrentMember(request) {
    const memberEmail = request.cookies.member;
    return memberStore.getMemberByEmail(memberEmail);
  },

  getCurrentTrainer(request) {
    const trainerEmail = request.cookies.trainer;
    return memberStore.getMemberByEmail(trainerEmail);
  }
};

module.exports = accounts;
