"use strict";

const _ = require("lodash");
const JsonStore = require("./json-store");

const memberStore = {
  store: new JsonStore("./models/member-store.json", { members: [] }),
  collection: "members",

  getAllMembers() {
    return this.store.findAll(this.collection);
  },

  addMember(member) {
    this.store.add(this.collection, member);
    this.store.save();
  },

  getMember(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  getMemberByEmail(email) {
    return this.store.findOneBy(this.collection, { email: email });
  },

  removeMember(id) {
    const member = this.getMember(id);
    this.store.remove(this.collection, member);
    this.store.save();
  },

  updateMember(member, updatedMember) {
    member.firstName = updatedMember.firstName;
    member.lastName = updatedMember.lastName;
    member.email = updatedMember.email;
    member.password = updatedMember.password;
    member.gender = updatedMember.gender;
    member.height = updatedMember.height;
    member.startingWeight = updatedMember.startingWeight;
    this.store.save();
  },

  getAllAssessments() {
    return this.store.findAll(this.collection);
  },

  getAssessment(id) {
    return this.store.findOneBy(this.collection, { id: id });
  },

  getMemberAssessments(memberid) {
    return this.store.findBy(this.collection, { memberid: memberid });
  },



  addAssessment(id,assessment) {
    const member = this.getMember(id);
    member.assessments.push(assessment);

    let BMI = 0;
    let BMICategory = "UNDETERMINED";
    let idealBodyWeight = 50;
    let isIdealBodyWeight = false;

    BMI = member.assessments[member.assessments.length-1].weight / ((member.height / 100) * (member.height / 100));

    if(BMI<16){
      BMICategory="SEVERELY UNDERWEIGHT";
    } else if((BMI>=16)&&(BMI<18.5)){
      BMICategory="UNDERWEIGHT";
    } else if((BMI>=18.5)&&(BMI<25)){
      BMICategory="NORMAL";
    } else if((BMI>=25)&&(BMI<30)){
      BMICategory="OVERWEIGHT";
    } else if((BMI>=30)&&(BMI<35)){
      BMICategory="MODERATELY OBESE";
    } else if(BMI>=35){
      BMICategory="SEVERELY OBESE";
    }

    if(member.gender=="Male"){
      idealBodyWeight=50.0+2.3*((member.height*0.393701)-60);
    } else if(member.gender=="Female"||"Unspecified"){
      idealBodyWeight=45.5+2.3*((member.height*0.393701)-60);
    }

    if((idealBodyWeight<=(assessment.weight+0.5))&&(idealBodyWeight>=(assessment.weight-0.5))){
      isIdealBodyWeight=true
    }


    member.BMI = Math.round(BMI*100)/100;
    member.BMICategory = BMICategory;
    member.isIdealBodyWeight = isIdealBodyWeight;
    this.store.save();
  },

  removeAssessment(id, assessmentId) {
    const member = this.getMember(id);
    const assessment = member.assessments;
    _.remove(assessment, { id: assessmentId });
    this.store.save();
  },

  removeAllAssessments() {
    this.store.removeAll(this.collection);
    this.store.save();
  },

  comment(assessment, comment) {
    assessment.comment = comment.comment;
    this.store.save();
  },
/*
  calculateBMI(height,weight) {
    let BMI = 0;

    BMI = weight / ((height / 100) * (height / 100));

  }
*/
};

module.exports = memberStore;
