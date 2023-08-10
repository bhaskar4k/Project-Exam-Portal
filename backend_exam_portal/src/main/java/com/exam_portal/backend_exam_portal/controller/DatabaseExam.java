package com.exam_portal.backend_exam_portal.controller;

import java.io.IOException;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;

public class DatabaseExam {
	public Boolean submit_the_exam(ExamInfo exam) throws SQLException {
		Connection connection=null;
		PreparedStatement statement=null;
        Boolean result=false;
		
        try {
        	String url="jdbc:mysql://localhost:3306/exam_portal";
            String username="root"; 
            String password="root"; 
            
        	connection = DriverManager.getConnection(url, username, password);
            String sql="INSERT INTO exam_portal.exam_result_info (exam_id, email_of_user, answer_list) VALUES (?, ?, ?)";           
            statement=connection.prepareStatement(sql);
            
            statement.setInt(1, exam.getExamID());
            statement.setString(2, exam.getEmailOfStudentWhoGivesExam());
            statement.setString(3, exam.getAnswerList());
            
            int rowsInserted = statement.executeUpdate();
                   
            if (rowsInserted>0) {
            	result=true;
                System.out.println("Exam data has been saved successfully.");
            } else {
                System.out.println("Exam data insertion failed.");
            }            
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
        	statement.close();
            connection.close();
        }
		return result;
	}
	
	public ArrayList<ExamInfo> get_all_exam_result_student(String email) throws IOException, SQLException {
		ArrayList<ExamInfo> data = new ArrayList<>();
		Connection connection=null;
		PreparedStatement statement=null;
		ResultSet resultSet=null;
		
        try {
        	String url="jdbc:mysql://localhost:3306/exam_portal";
            String username="root"; 
            String password="root"; 
            
            connection = DriverManager.getConnection(url, username, password);
            String sql = "SELECT exam_info.exam_id,exam_info.exam_name,exam_info.exam_duration,exam_info.exam_question_count,exam_info.exam_question_list,exam_result_info."
            		+ "answer_list FROM exam_portal.exam_info INNER JOIN exam_portal.exam_result_info where exam_result_info.email_of_user='"+email+"' AND exam_info."
            		+ "exam_id=exam_result_info.exam_id;";
            statement = connection.prepareStatement(sql);
            resultSet = statement.executeQuery();
            
            while (resultSet.next()) {
            	int exam_id = resultSet.getInt("exam_id");
                String exam_name = resultSet.getString("exam_name");
                String exam_duration = resultSet.getString("exam_duration");
                int exam_question_count = resultSet.getInt("exam_question_count");
                String exam_question_list = resultSet.getString("exam_question_list");
                String answer_list = resultSet.getString("answer_list");                           
            
                data.add(new ExamInfo(exam_id,exam_name,exam_duration,answer_list,exam_question_count,exam_question_list));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
        	statement.close();
            connection.close();
            resultSet.close();
        }
		
        return data;
	}
	
	public ArrayList<ExamInfo> get_all_exam_result_admin(String email) throws IOException, SQLException {
		ArrayList<ExamInfo> data = new ArrayList<>();
		Connection connection=null;
		PreparedStatement statement=null;
		ResultSet resultSet=null;
		
        try {
        	String url="jdbc:mysql://localhost:3306/exam_portal";
            String username="root"; 
            String password="root"; 
            
            connection = DriverManager.getConnection(url, username, password);
            String sql = "SELECT exam_info.exam_id,exam_info.exam_name,exam_info.exam_duration,exam_info.exam_question_count,exam_info.exam_question_list,exam_result_info.email_of_user,"
            		+ "exam_result_info.answer_list FROM exam_portal.exam_info INNER JOIN exam_portal.exam_result_info where exam_info.exam_setter_email='"+email+"' AND exam_info."
            		+ "exam_id=exam_result_info.exam_id;";
            statement = connection.prepareStatement(sql);
            resultSet = statement.executeQuery();
            
            while (resultSet.next()) {
            	int exam_id = resultSet.getInt("exam_id");
                String exam_name = resultSet.getString("exam_name");
                String exam_duration = resultSet.getString("exam_duration");
                int exam_question_count = resultSet.getInt("exam_question_count");
                String exam_question_list = resultSet.getString("exam_question_list");
                String email_of_user = resultSet.getString("email_of_user");
                String answer_list = resultSet.getString("answer_list");                           
            
                data.add(new ExamInfo(exam_id,exam_name,exam_duration,answer_list,exam_question_count,exam_question_list,email_of_user));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
        	statement.close();
            connection.close();
            resultSet.close();
        }
		
        return data;
	}
	
	public Boolean set_exam(ExamInfo exam) throws SQLException {
		Connection connection=null;
		PreparedStatement statement=null;
        Boolean result=false;
		
        try {
        	String url="jdbc:mysql://localhost:3306/exam_portal";
            String username="root"; 
            String password="root"; 
            
        	connection = DriverManager.getConnection(url, username, password);
            String sql="INSERT INTO exam_portal.exam_info (exam_name, exam_duration, exam_question_count, exam_question_list, exam_setter_email) VALUES (?, ?, ?, ?, ?)";           
            statement=connection.prepareStatement(sql);
            
            statement.setString(1, exam.getExamName());
            statement.setString(2, exam.getExamDuration());
            statement.setInt(3, exam.getExamQuestionCount());
            statement.setString(4, exam.getExamQuestionList());
            statement.setString(5, exam.getExamSetterEmail());
            
            int rowsInserted = statement.executeUpdate();
                   
            if (rowsInserted>0) {
            	result=true;
                System.out.println("Exam set successfully.");
            } else {
                System.out.println("Exam setting failed.");
            }            
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
        	statement.close();
            connection.close();
        }
		return result;
	}
	
	public ArrayList<ExamInfo> get_all_scheduled_exam_student(String email) throws IOException, SQLException {
		ArrayList<ExamInfo> data = new ArrayList<>();
		Connection connection=null;
		PreparedStatement statement=null;
		ResultSet resultSet=null;
		
        try {
        	String url="jdbc:mysql://localhost:3306/exam_portal";
            String username="root"; 
            String password="root"; 
            
            connection = DriverManager.getConnection(url, username, password);
            String sql = "SELECT * FROM exam_portal.exam_info;";
            statement = connection.prepareStatement(sql);
            resultSet = statement.executeQuery();
            
            while (resultSet.next()) {
            	int exam_id = resultSet.getInt("exam_id");
                String exam_name = resultSet.getString("exam_name");
                String exam_duration = resultSet.getString("exam_duration");
                int exam_question_count = resultSet.getInt("exam_question_count");
                String exam_question_list = resultSet.getString("exam_question_list");
                String exam_setter_email = resultSet.getString("exam_setter_email");                           
            
                data.add(new ExamInfo(exam_id,exam_name,exam_duration,exam_question_count,exam_question_list,exam_setter_email));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
        	statement.close();
            connection.close();
            resultSet.close();
        }
		
        return data;
	}
	
	public ArrayList<ExamInfo> get_all_scheduled_exam_admin(String email) throws IOException, SQLException {
		ArrayList<ExamInfo> data = new ArrayList<>();
		Connection connection=null;
		PreparedStatement statement=null;
		ResultSet resultSet=null;
		
        try {
        	String url="jdbc:mysql://localhost:3306/exam_portal";
            String username="root"; 
            String password="root"; 
            
            connection = DriverManager.getConnection(url, username, password);
            String sql = "SELECT * FROM exam_portal.exam_info where exam_setter_email='"+email+"';";
            statement = connection.prepareStatement(sql);
            resultSet = statement.executeQuery();
            
            while (resultSet.next()) {
            	int exam_id = resultSet.getInt("exam_id");
                String exam_name = resultSet.getString("exam_name");
                String exam_duration = resultSet.getString("exam_duration");
                int exam_question_count = resultSet.getInt("exam_question_count");
                String exam_question_list = resultSet.getString("exam_question_list");
                String exam_setter_email = resultSet.getString("exam_setter_email");                           
            
                data.add(new ExamInfo(exam_id,exam_name,exam_duration,exam_question_count,exam_question_list,exam_setter_email));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
        	statement.close();
            connection.close();
            resultSet.close();
        }
		
        return data;
	}
	
	@SuppressWarnings("resource")
	public AdminStudentExamInfoForHomePage get_admin_student_exam_count_admin(String email) throws IOException, SQLException{
		Connection connection=null;
		PreparedStatement statement=null;
		ResultSet resultSet=null;
		AdminStudentExamInfoForHomePage AdminStudentExamInfoForHomePage=new AdminStudentExamInfoForHomePage();
		
        try {
        	String url="jdbc:mysql://localhost:3306/exam_portal";
            String username="root"; 
            String password="root"; 
            
            connection = DriverManager.getConnection(url, username, password);
            String sql = "SELECT count(*) AS adminCount FROM exam_portal.admin_info";
            statement = connection.prepareStatement(sql);
            resultSet = statement.executeQuery();
            
            while (resultSet.next()) { 
                AdminStudentExamInfoForHomePage.setAdminCount(resultSet.getInt("adminCount"));
            }
            
            sql = "SELECT count(*) AS studentCount FROM exam_portal.student_info";
            statement = connection.prepareStatement(sql);
            resultSet = statement.executeQuery();
            
            while (resultSet.next()) { 
                AdminStudentExamInfoForHomePage.setStudentCount(resultSet.getInt("studentCount"));
            }
            
            sql = "SELECT count(*) AS examCount FROM exam_portal.exam_info where exam_info.exam_setter_email='"+email+"'";
            statement = connection.prepareStatement(sql);
            resultSet = statement.executeQuery();
            
            while (resultSet.next()) { 
                AdminStudentExamInfoForHomePage.setScheduledExamCount(resultSet.getInt("examCount"));
            } 
            
            
            sql = "SELECT count(exam_info.exam_id) AS count FROM exam_portal.exam_info INNER JOIN "
            		+ "exam_portal.exam_result_info where exam_info.exam_setter_email='"+email+"' "
            		+ "AND exam_info. exam_id=exam_result_info.exam_id;";
            statement = connection.prepareStatement(sql);
            resultSet = statement.executeQuery();
            
            while (resultSet.next()) { 
            	AdminStudentExamInfoForHomePage.setCompletedExamCount(resultSet.getInt("count"));
            } 
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
        	statement.close();
            connection.close();
            resultSet.close();
        }
		return AdminStudentExamInfoForHomePage;
	}
	
	@SuppressWarnings("resource")
	public AdminStudentExamInfoForHomePage get_admin_student_exam_count_student(String email) throws IOException, SQLException{
		Connection connection=null;
		PreparedStatement statement=null;
		ResultSet resultSet=null;
		AdminStudentExamInfoForHomePage AdminStudentExamInfoForHomePage=new AdminStudentExamInfoForHomePage();
		
        try {
        	String url="jdbc:mysql://localhost:3306/exam_portal";
            String username="root"; 
            String password="root"; 
            
            connection = DriverManager.getConnection(url, username, password);
            String sql = "SELECT count(*) AS adminCount FROM exam_portal.admin_info";
            statement = connection.prepareStatement(sql);
            resultSet = statement.executeQuery();
            
            while (resultSet.next()) { 
                AdminStudentExamInfoForHomePage.setAdminCount(resultSet.getInt("adminCount"));
            }
            
            sql = "SELECT count(*) AS studentCount FROM exam_portal.student_info";
            statement = connection.prepareStatement(sql);
            resultSet = statement.executeQuery();
            
            while (resultSet.next()) { 
                AdminStudentExamInfoForHomePage.setStudentCount(resultSet.getInt("studentCount"));
            }
            
            sql = "SELECT count(*) AS examCount FROM exam_portal.exam_info";
            statement = connection.prepareStatement(sql);
            resultSet = statement.executeQuery();
            
            while (resultSet.next()) { 
                AdminStudentExamInfoForHomePage.setScheduledExamCount(resultSet.getInt("examCount"));
            }
            
            
            sql = "SELECT count(exam_info.exam_id) AS count FROM exam_portal.exam_info INNER JOIN "
            		+ "exam_portal.exam_result_info where exam_result_info.email_of_user='"+email+"' "
            		+ "AND exam_info.exam_id=exam_result_info.exam_id;";
            statement = connection.prepareStatement(sql);
            resultSet = statement.executeQuery();
            
            while (resultSet.next()) { 
                AdminStudentExamInfoForHomePage.setCompletedExamCount(resultSet.getInt("count"));
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
        	statement.close();
            connection.close();
            resultSet.close();
        }
		return AdminStudentExamInfoForHomePage;
	}
}
