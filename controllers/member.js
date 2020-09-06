"use strict";

const logger = require("../utils/logger");
const memberStore = require("../models/member-store");
const uuid = require("uuid");

const member = {
  index(request, response) {
    const memberId = request.params.id;
    logger.debug("Member id = ", memberId);
    const viewData = {
      title: "Member",
      member: memberStore.getMember(memberId),
    };
    response.render("member", viewData);
  },

  deleteAssessment(request, response) {
    const memberId = request.params.id;
    const assessmentId = request.params.assessmentid;
    logger.debug(`Deleting Assessment ${assessmentId} from Member ${memberId}`);
    memberStore.removeAssessment(memberId, assessmentId);
    response.redirect("/member/" + memberId);
  },

  addAssessment(request, response) {
    const memberId = request.params.id;
    const member = memberStore.getMember(memberId);
    const newAssessment = {
      id: uuid.v1(),
      timestamp: new Date().toUTCString(),
      weight: Number(request.body.weight),
      chest: Number(request.body.chest),
      thigh: Number(request.body.thigh),
      upperarm: Number(request.body.upperarm),
      waist: Number(request.body.waist),
      hips: Number(request.body.hips),
      comment: request.body.comment
    };
    logger.debug("Creating a new Assessment", newAssessment);

    memberStore.addAssessment(memberId,newAssessment);
    response.redirect("/member/" + memberId);
  },

  addComment(request, response){
    const memberId = request.params.id;
    const member = memberStore.getMember(memberId);

    const assessmentId = request.params.assessmentid;
    const assessment = memberStore.getAssessment(assessmentId);

    const comment = {
      comment: request.body.comment
    }
    memberStore.comment(assessment, comment);
    response.redirect("/member/" + memberId)
  },

};

module.exports = member;
