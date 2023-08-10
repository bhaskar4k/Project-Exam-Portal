package com.exam_portal.backend_exam_portal.controller;

import java.io.IOException;
import java.io.InputStream;
import java.sql.SQLException;

public class ControllerStudentMVC {
	private DatabaseStudent databaseStudent;	
	
	public String registerNewStudent(StudentInfo student) {
		try {
			databaseStudent=new DatabaseStudent();
			if(databaseStudent.is_this_email_already_registered(student.getStudentEmail())==true) {
				return "0|Email ID: [ "+student.getStudentEmail()+" ] is already registered";
			}
			if(databaseStudent.register_new_student(student)==true) {
				return "1|Student [ "+student.getStudentName()+" ] has been registered";
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return "0|Internal server error";
	}
	
	public String validateStudentAndSetSession(StudentInfo student) {
		try {
			databaseStudent=new DatabaseStudent();
			StudentInfo loggedinStudent=databaseStudent.validate_student(student);
			
			if(loggedinStudent.getId()!=-1 && loggedinStudent.getStudentName()!="NULL") {
				return "1|"+loggedinStudent.getStudentName();
			}else {
				return "0|Student not registered or incorrect credentials";
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return "0|Internal server error";
	}
	
	public StudentInfo getAllStudentInfo(String email) throws SQLException, IOException {
		databaseStudent=new DatabaseStudent();
		StudentInfo studentInfo=databaseStudent.get_all_student_info(email);
		return studentInfo;
	}
	
	public String insertImageIntoDatabaseStudent(InputStream fileInputStream, String email) throws SQLException {
		databaseStudent=new DatabaseStudent();
		if(databaseStudent.insert_image_into_database(fileInputStream,email)==1) {
			return "1|Image updated successfully";
		}
		return "0|Internal server error";
	}
	
	public String updateStudentInfo(StudentInfo student) {
		try {
			databaseStudent=new DatabaseStudent();
			if(!student.getStudentEmail().equals(student.getStudentOldEmail()) && databaseStudent.is_this_email_already_registered(student.getStudentEmail())==true) {
				return "0|Email ID: [ "+student.getStudentEmail()+" ] has been used by someone";
			}
			if(databaseStudent.update_student_data(student)==true) {
				return "1|Student data has been updated";
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return "0|Internal server error";
	}
}
