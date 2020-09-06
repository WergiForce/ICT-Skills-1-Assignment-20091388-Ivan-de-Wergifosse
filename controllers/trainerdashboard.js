"use strict";

const accounts = require("./accounts.js");
const logger = require("../utils/logger");
const trainerStore = require("../models/trainer-store");
const memberStore = require("../models/member-store")

const trainerdashboard = {
  index(request, response) {
    logger.info("trainer dashboard rendering");
    const loggedInTrainer = accounts.getCurrentTrainer(request);
    const viewData = {
      title: "Trainer Dashboard",
      members: memberStore.getAllMembers()
    };
    logger.info("about to render", memberStore.getAllMembers());
    response.render("trainerdashboard", viewData);
  },

  deleteMember(request, response) {
    const memberId = request.params.id;
    logger.debug(`Deleting Member ${memberId}`);
    memberStore.removeMember(memberId);
    response.redirect("/trainerdashboard");
  },

};

module.exports = trainerdashboard;
