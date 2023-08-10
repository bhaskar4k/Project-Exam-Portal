package com.exam_portal.backend_exam_portal.controller;

import java.io.IOException;
import java.io.InputStream;
import java.sql.SQLException;
import java.util.ArrayList;

import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.multipart.MultipartFile;

@RestController
@CrossOrigin
public class BackendController {
	//	Admin section
	@PostMapping("/register_admin")
	public String register_admin(@RequestBody AdminInfo admin) {	    
	    ControllerAdminMVC controllerAdminMVC=new ControllerAdminMVC();
	    return controllerAdminMVC.registerNewAdmin(admin);
	}
	
	@PostMapping("/login_of_admin")
	public String login_of_admin(@RequestBody AdminInfo admin) {	    
	    ControllerAdminMVC controllerAdminMVC=new ControllerAdminMVC();
		return controllerAdminMVC.validateAdminAndSetSession(admin);
	}
	
	@PostMapping("/get_all_admin_info")
	public AdminInfo get_all_admin_info(@RequestBody String sessionEmail) throws SQLException, IOException {	    
	    ControllerAdminMVC controllerAdminMVC=new ControllerAdminMVC();
	    AdminInfo adminInfo=controllerAdminMVC.getAllAdminInfo(sessionEmail);
	    return adminInfo;
	}
	
	@PostMapping("/upload_admin_photo")
	public String uploadAdminPhoto(@RequestParam("image") MultipartFile file, @RequestParam("emailID") String emailID) throws SQLException, IOException {
		String result="0|Internal server error";
		ControllerAdminMVC controllerAdminMVC = new ControllerAdminMVC();
        InputStream fileInputStream = file.getInputStream();
        result=controllerAdminMVC.insertImageIntoDatabase(fileInputStream,emailID);
        fileInputStream.close();
		return result;
	}
	
	@PostMapping("/update_admin_info")
	public String update_admin_info(@RequestBody AdminInfo admin) {	    
	    ControllerAdminMVC controllerAdminMVC=new ControllerAdminMVC();
	    System.out.println(admin.getAdminName()+admin.getAdminEmail()+admin.getAdminOldEmail());
	    return controllerAdminMVC.updateAdminInfo(admin);
	}
	
	
	// Exam setting section
	@PostMapping("/set_exam")
	public String set_exam(@RequestBody ExamInfo exam) {	    
	    ControllerExamMVC controllerExamMVC=new ControllerExamMVC();
	    System.out.println(exam);
	    return controllerExamMVC.setExam(exam);
	}
	
	@PostMapping("/get_all_scheduled_exam_student")
	public ArrayList<ExamInfo> get_all_scheduled_exam_student(@RequestBody String sessionEmail) throws IOException, SQLException {	    
		ControllerExamMVC controllerExamMVC=new ControllerExamMVC();
	    return controllerExamMVC.getAllScheduledExamStudent(sessionEmail);
	}
	
	@PostMapping("/get_all_scheduled_exam_admin")
	public ArrayList<ExamInfo> get_all_scheduled_exam_admin(@RequestBody String sessionEmail) throws IOException, SQLException {	    
		ControllerExamMVC controllerExamMVC=new ControllerExamMVC();
	    return controllerExamMVC.getAllScheduledExamAdmin(sessionEmail);
	}
	
	@PostMapping("/get_admin_student_exam_count_admin")
	public AdminStudentExamInfoForHomePage get_admin_student_exam_count_admin(@RequestBody String sessionEmail) throws IOException, SQLException {	    
		ControllerExamMVC controllerExamMVC=new ControllerExamMVC();
	    return controllerExamMVC.getAdminStudentExamCountAdmin(sessionEmail);
	}
	
	@PostMapping("/get_admin_student_exam_count_student")
	public AdminStudentExamInfoForHomePage get_admin_student_exam_count_student(@RequestBody String sessionEmail) throws IOException, SQLException {	    
		ControllerExamMVC controllerExamMVC=new ControllerExamMVC();
	    return controllerExamMVC.getAdminStudentExamCountStudent(sessionEmail);
	}
	
	@PostMapping("/submit_the_exam")
	public String submit_the_exam(@RequestBody ExamInfo exam) {	    
		ControllerExamMVC controllerExamMVC=new ControllerExamMVC();
	    return controllerExamMVC.submitTheExam(exam);
	}
	
	@PostMapping("/get_all_exam_result_student")
	public ArrayList<ExamInfo> get_all_exam_result_student(@RequestBody String sessionEmail) throws IOException, SQLException {	    
		ControllerExamMVC controllerExamMVC=new ControllerExamMVC();
	    return controllerExamMVC.getAllExamResultStudent(sessionEmail);
	}
	
	@PostMapping("/get_all_exam_result_admin")
	public ArrayList<ExamInfo> get_all_exam_result_admin(@RequestBody String sessionEmail) throws IOException, SQLException {	    
		ControllerExamMVC controllerExamMVC=new ControllerExamMVC();
	    return controllerExamMVC.getAllExamResultAdmin(sessionEmail);
	}
	
	
	// Student section
	@PostMapping("/register_student")
	public String register_student(@RequestBody StudentInfo student) {	    
	    ControllerStudentMVC controllerStudentMVC=new ControllerStudentMVC();
	    return controllerStudentMVC.registerNewStudent(student);
	}
	
	@PostMapping("/login_of_student")
	public String login_of_student(@RequestBody StudentInfo student) {	    
		ControllerStudentMVC controllerStudentMVC=new ControllerStudentMVC();
		return controllerStudentMVC.validateStudentAndSetSession(student);
	}
	
	@PostMapping("/get_all_student_info")
	public StudentInfo get_all_student_info(@RequestBody String sessionEmail) throws SQLException, IOException {	    
		ControllerStudentMVC controllerStudentMVC=new ControllerStudentMVC();
		StudentInfo studentInfo=controllerStudentMVC.getAllStudentInfo(sessionEmail);
	    return studentInfo;
	}
	
	@PostMapping("/upload_student_photo")
	public String uploadStudentPhoto(@RequestParam("image") MultipartFile file, @RequestParam("emailID") String emailID) throws SQLException, IOException {
		String result="0|Internal server error";
		ControllerStudentMVC controllerStudentMVC=new ControllerStudentMVC();
        InputStream fileInputStream = file.getInputStream();
        result=controllerStudentMVC.insertImageIntoDatabaseStudent(fileInputStream,emailID);
        fileInputStream.close();
		return result;
	}
	
	@PostMapping("/update_student_info")
	public String update_student_info(@RequestBody StudentInfo student) {	    
		ControllerStudentMVC controllerStudentMVC=new ControllerStudentMVC();
	    return controllerStudentMVC.updateStudentInfo(student);
	}
}
