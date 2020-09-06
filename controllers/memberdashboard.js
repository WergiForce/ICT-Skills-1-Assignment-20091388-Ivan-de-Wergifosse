"use strict";

const accounts = require("./accounts.js");
const logger = require("../utils/logger");
const memberStore = require("../models/member-store");
const uuid = require("uuid");

const memberdashboard = {
  index(request, response) {
    logger.info("member dashboard rendering");
    const loggedInMember = accounts.getCurrentMember(request);
    const viewData = {
      title: "Member Dashboard",
      member: memberStore.getMember(loggedInMember.id),
      assessments: memberStore.getMemberAssessments(loggedInMember.id).reverse(),
    };
    logger.info("about to render", memberStore.getAllAssessments());
    response.render("memberdashboard", viewData);
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

  deleteAssessment(request, response) {

    const loggedInMember = accounts.getCurrentMember(request);
    const assessmentId = request.params.id;
    logger.debug(`Deleting Assessment ${assessmentId}`);
    memberStore.removeAssessment(loggedInMember.id, assessmentId);


    response.redirect("/memberdashboard");
  },

  addAssessment(request, response) {
    const loggedInMember = accounts.getCurrentMember(request);
    const newAssessment = {
      id: uuid.v1(),
      timestamp: new Date().toUTCString(),
      weight: Number(request.body.weight),
      chest: Number(request.body.chest),
      thigh: Number(request.body.thigh),
      upperarm: Number(request.body.upperarm),
      waist: Number(request.body.waist),
      hips: Number(request.body.hips),
      comment: null,
    };
    logger.debug("Creating a new Assessment", newAssessment);



    memberStore.addAssessment(loggedInMember.id,newAssessment);
    response.redirect("/memberdashboard");
  },

};

module.exports = memberdashboard;
