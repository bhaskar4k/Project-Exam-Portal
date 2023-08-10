package com.exam_portal.backend_exam_portal.controller;

public class AdminStudentExamInfoForHomePage {
	int adminCount;
	int studentCount;
	int scheduledExamCount;
	int completedExamCount;
	
	public AdminStudentExamInfoForHomePage() {
		super();
		// TODO Auto-generated constructor stub
	}

	public AdminStudentExamInfoForHomePage(int adminCount, int studentCount, int scheduledExamCount) {
		super();
		this.adminCount = adminCount;
		this.studentCount = studentCount;
		this.scheduledExamCount = scheduledExamCount;
	}
	
	public AdminStudentExamInfoForHomePage(int adminCount, int studentCount, int scheduledExamCount, int completedExamCount) {
		super();
		this.adminCount = adminCount;
		this.studentCount = studentCount;
		this.scheduledExamCount = scheduledExamCount;
		this.completedExamCount = completedExamCount;
	}

	public int getAdminCount() {
		return adminCount;
	}

	public void setAdminCount(int adminCount) {
		this.adminCount = adminCount;
	}

	public int getStudentCount() {
		return studentCount;
	}

	public void setStudentCount(int studentCount) {
		this.studentCount = studentCount;
	}

	public int getScheduledExamCount() {
		return scheduledExamCount;
	}

	public void setScheduledExamCount(int scheduledExamCount) {
		this.scheduledExamCount = scheduledExamCount;
	}

	public int getCompletedExamCount() {
		return completedExamCount;
	}

	public void setCompletedExamCount(int completedExamCount) {
		this.completedExamCount = completedExamCount;
	}

	@Override
	public String toString() {
		return "AdminStudentExamInfoForHomePage [adminCount=" + adminCount + ", studentCount=" + studentCount
				+ ", scheduledExamCount=" + scheduledExamCount + "]";
	}
}
