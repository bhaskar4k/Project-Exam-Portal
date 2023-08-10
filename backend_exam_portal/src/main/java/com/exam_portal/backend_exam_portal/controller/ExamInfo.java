package com.exam_portal.backend_exam_portal.controller;

import com.fasterxml.jackson.annotation.JsonCreator;

public class ExamInfo {
	int examID;
	String examName;
	String examDuration;
	int examQuestionCount;
	String examQuestionList;
	String examSetterEmail;
	
	String emailOfStudentWhoGivesExam;
	String answerList;
	
	@JsonCreator
	public ExamInfo(String examName, String examDuration, int examQuestionCount, String examQuestionList,
			String examSetterEmail) {
		super();
		this.examName = examName;
		this.examDuration = examDuration;
		this.examQuestionCount = examQuestionCount;
		this.examQuestionList = examQuestionList;
		this.examSetterEmail = examSetterEmail;
	}
	
	public ExamInfo(int examID, String examName, String examDuration, int examQuestionCount, String examQuestionList, String examSetterEmail) {
		super();
		this.examID = examID;
		this.examName = examName;
		this.examDuration = examDuration;
		this.examQuestionCount = examQuestionCount;
		this.examQuestionList = examQuestionList;
		this.examSetterEmail = examSetterEmail;
	}
	
	public ExamInfo(int examID, String emailOfStudentWhoGivesExam, String answerList) {
		this.examID=examID;
		this.emailOfStudentWhoGivesExam=emailOfStudentWhoGivesExam;
		this.answerList=answerList;
	}
	
	public ExamInfo(int examID, String examName, String examDuration, String answerList, int examQuestionCount, String examQuestionList) {
		this.examID=examID;
		this.examName=examName;
		this.examDuration=examDuration;
		this.answerList=answerList;
		this.examQuestionCount=examQuestionCount;
		this.examQuestionList=examQuestionList;
	}
	
	public ExamInfo(int examID, String examName, String examDuration, String answerList, int examQuestionCount, String examQuestionList, String emailOfStudentWhoGivesExam) {
		this.examID=examID;
		this.examName=examName;
		this.examDuration=examDuration;
		this.answerList=answerList;
		this.examQuestionCount=examQuestionCount;
		this.examQuestionList=examQuestionList;
		this.emailOfStudentWhoGivesExam=emailOfStudentWhoGivesExam;
	}
	
	public int getExamID() {
		return examID;
	}

	public void setExamID(int examID) {
		this.examID = examID;
	}

	public String getExamName() {
		return examName;
	}

	public void setExamName(String examName) {
		this.examName = examName;
	}

	public String getExamDuration() {
		return examDuration;
	}

	public void setExamDuration(String examDuration) {
		this.examDuration = examDuration;
	}

	public int getExamQuestionCount() {
		return examQuestionCount;
	}

	public void setExamQuestionCount(int examQuestionCount) {
		this.examQuestionCount = examQuestionCount;
	}

	public String getExamQuestionList() {
		return examQuestionList;
	}

	public void setExamQuestionList(String examQuestionList) {
		this.examQuestionList = examQuestionList;
	}

	public String getExamSetterEmail() {
		return examSetterEmail;
	}

	public void setExamSetterEmail(String examSetterEmail) {
		this.examSetterEmail = examSetterEmail;
	}

	public String getAnswerList() {
		return answerList;
	}

	public void setAnswerList(String answerList) {
		this.answerList = answerList;
	}
	
	public String getEmailOfStudentWhoGivesExam() {
		return emailOfStudentWhoGivesExam;
	}

	public void setEmailOfStudentWhoGivesExam(String emailOfStudentWhoGivesExam) {
		this.emailOfStudentWhoGivesExam = emailOfStudentWhoGivesExam;
	}

	@Override
	public String toString() {
		return "ExamInfo [examName=" + examName + ", examDuration=" + examDuration + ", examQuestionCount="
				+ examQuestionCount + ", examQuestionList=" + examQuestionList + ", examSetterEmail=" + examSetterEmail
				+ "]";
	}
}
