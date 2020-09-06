"use strict";

const accounts = require("./accounts.js");
const logger = require("../utils/logger");
const memberStore = require("../models/member-store");
const uuid = require("uuid");

const memberupdate = {
  index(request, response) {
    logger.info("member detail page rendering");
    const loggedInMember = accounts.getCurrentMember(request);
    const viewData = {
      title: "Edit Member Details",
      member: memberStore.getMember(loggedInMember.id),
    };
    logger.info("about to render");
    response.render("editmemberdetails", viewData);
  },

  update(request, response){
    const loggedInMember = accounts.getCurrentMember(request)
    const newMember = {
      firstName: request.body.firstName,
      lastName: request.body.lastName,
      email: request.body.email,
      password: request.body.password,
      gender: request.body.gender,
      height: request.body.height,
      startingWeight: request.body.startingWeight,
    }
    memberStore.updateMember(loggedInMember,newMember)
    response.redirect("/memberdashboard")
  },


};

module.exports = memberupdate;