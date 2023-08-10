package com.exam_portal.backend_exam_portal.controller;

import java.io.IOException;
import java.sql.SQLException;
import java.util.ArrayList;

public class ControllerExamMVC {
	private DatabaseExam databaseExam;
	
	public String setExam(ExamInfo exam) {
		try {
			databaseExam=new DatabaseExam();
			if(databaseExam.set_exam(exam)==true) {
				return "1|Exam has been scheduled";
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return "0|Internal server error";
	}
	
	public ArrayList<ExamInfo> getAllScheduledExamStudent(String email) throws IOException, SQLException {
		databaseExam=new DatabaseExam();
		return databaseExam.get_all_scheduled_exam_student(email);
	}
	
	public ArrayList<ExamInfo> getAllScheduledExamAdmin(String email) throws IOException, SQLException {
		databaseExam=new DatabaseExam();
		return databaseExam.get_all_scheduled_exam_admin(email);
	}
	
	public AdminStudentExamInfoForHomePage getAdminStudentExamCountAdmin(String email) throws IOException, SQLException {
		databaseExam=new DatabaseExam();
		return databaseExam.get_admin_student_exam_count_admin(email);
	}
	
	public AdminStudentExamInfoForHomePage getAdminStudentExamCountStudent(String email) throws IOException, SQLException {
		databaseExam=new DatabaseExam();
		return databaseExam.get_admin_student_exam_count_student(email);
	}
	
	public String submitTheExam(ExamInfo exam) {
		try {
			databaseExam=new DatabaseExam();
			if(databaseExam.submit_the_exam(exam)==true) {
				return "1|Your exam records have been saved";
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return "0|Internal server error";
	}
	
	public ArrayList<ExamInfo> getAllExamResultStudent(String email) throws IOException, SQLException {
		databaseExam=new DatabaseExam();
		return databaseExam.get_all_exam_result_student(email);
	}
	
	public ArrayList<ExamInfo> getAllExamResultAdmin(String email) throws IOException, SQLException {
		databaseExam=new DatabaseExam();
		return databaseExam.get_all_exam_result_admin(email);
	}
}
