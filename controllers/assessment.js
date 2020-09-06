"use strict";

const logger = require("../utils/logger");
const memberStore = require("../models/member-store");

const assessment = {

  index(request, response) {
    const memberId = request.params.id;
    const assessmentId = request.params.assessmentid;
    logger.debug(`Editing Assessment ${assessmentId} from Member ${memberId}`);
    const viewData = {
      title: "Edit Assessment",
      member: memberStore.getMember(memberId),
      assessment: memberStore.getAssessment(memberId, assessmentId).reverse()
    };
    response.render("assessment", viewData);
  },

};

module.exports = assessment;