package com.exam_portal.backend_exam_portal.controller;

import java.sql.Statement;
import java.util.Base64;
import java.io.IOException;
import java.io.InputStream;
import java.sql.Connection;
import java.sql.DriverManager;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;

public class DatabaseStudent {	
	public Boolean register_new_student(StudentInfo student) throws SQLException {
		Connection connection=null;
		PreparedStatement statement=null;
        Boolean result=false;
		
        try {
        	String url="jdbc:mysql://localhost:3306/exam_portal";
            String username="root"; 
            String password="root"; 
            
        	connection = DriverManager.getConnection(url, username, password);
            String sql="INSERT INTO exam_portal.student_info (student_name, student_age, student_gender, student_phone, student_email, student_password) VALUES (?, ?, ?, ?, ?, ?)";           
            statement=connection.prepareStatement(sql);
            
            statement.setString(1, student.getStudentName());
            statement.setInt(2, student.getStudentAge());
            statement.setString(3, student.getStudentGender());
            statement.setLong(4, student.getStudentPhone());
            statement.setString(5, student.getStudentEmail());
            statement.setString(6, student.getStudentPassword());
            
            int rowsInserted = statement.executeUpdate();
                   
            if (rowsInserted>0) {
            	result=true;
                System.out.println("Data inserted successfully.");
            } else {
                System.out.println("Data insertion failed.");
            }            
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
        	statement.close();
            connection.close();
        }
		return result;
	}
	
	public Boolean is_this_email_already_registered(String email) throws SQLException {
		Connection connection=null;
		Statement statement=null;
		ResultSet resultSet=null;
        Boolean notValidEmail=false;
		
        try {
        	String url="jdbc:mysql://localhost:3306/exam_portal";
            String username="root"; 
            String password="root"; 
            
            connection = DriverManager.getConnection(url, username, password);          
            String sql = "SELECT count(*) AS count FROM exam_portal.student_info where student_email='"+email+"';";            
            statement = connection.createStatement();
            resultSet = statement.executeQuery(sql);          
            
            int count=0;
            while (resultSet.next()) {
            	count += resultSet.getInt("count");
            }            
            if(count>0) notValidEmail=true;
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
        	statement.close();
            connection.close();
            resultSet.close();
        }
		return notValidEmail;
	}
	
	public StudentInfo validate_student(StudentInfo student) throws SQLException {				
		Connection connection=null;
		Statement statement=null;
		ResultSet resultSet=null;
		StudentInfo loggedinStudent=new StudentInfo(-1,"NULL");
		
        try {
        	String url="jdbc:mysql://localhost:3306/exam_portal";
            String username="root"; 
            String password="root"; 
            
            connection = DriverManager.getConnection(url, username, password);          
            String sql = "SELECT student_id, student_name FROM exam_portal.student_info where student_email='"+student.getStudentEmail()+"' AND student_password='"+student.getStudentPassword()+"';";            
            statement = connection.createStatement();
            resultSet = statement.executeQuery(sql);          
            
            while (resultSet.next()) {
            	loggedinStudent.setId(resultSet.getInt("student_id"));
            	loggedinStudent.setStudentName(resultSet.getString("student_name"));
            }            
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
        	statement.close();
            connection.close();
            resultSet.close();
        }
        return loggedinStudent;
	}
	
	public int insert_image_into_database(InputStream fileInputStream, String email) throws SQLException {
		Connection connection=null;
		PreparedStatement statement=null;
		int result=0;
		
        try {
        	String url="jdbc:mysql://localhost:3306/exam_portal";
            String username="root"; 
            String password="root"; 
            
            connection = DriverManager.getConnection(url, username, password);          
            String sql = "UPDATE exam_portal.student_info SET student_profile_photo=(?) WHERE student_email='"+email+"';";            
            statement = connection.prepareStatement(sql);
            statement.setBlob(1, fileInputStream);
            result=statement.executeUpdate();        
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
        	statement.close();
            connection.close();
        }
        return result;
	}
	
	public StudentInfo get_all_student_info(String email) throws IOException, SQLException {
		Connection connection=null;
		PreparedStatement statement=null;
		ResultSet resultSet=null;
		StudentInfo studentInfo = new StudentInfo();
		
        try {
        	String url="jdbc:mysql://localhost:3306/exam_portal";
            String username="root"; 
            String password="root"; 
            
            connection = DriverManager.getConnection(url, username, password);
            String sql = "SELECT * FROM exam_portal.student_info WHERE student_email = '"+email+"'";
            statement = connection.prepareStatement(sql);
            resultSet = statement.executeQuery();
            
            while (resultSet.next()) {
            	int student_id = resultSet.getInt("student_id");
                String student_name = resultSet.getString("student_name");
                int student_age = resultSet.getInt("student_age");
                String student_gender = resultSet.getString("student_gender");
                Long student_phone = resultSet.getLong("student_phone");
                String student_email = resultSet.getString("student_email");
                String student_password = resultSet.getString("student_password");
                
                InputStream profile_photo_stream=null;
                if(resultSet.getBinaryStream("student_profile_photo")!=null) {
                	profile_photo_stream=resultSet.getBinaryStream("student_profile_photo");
                }
                
                String base64Image="NULL";
                byte[] profilePhotoBytes = null;
                if (profile_photo_stream != null) {
                    profilePhotoBytes = profile_photo_stream.readAllBytes();
                    profile_photo_stream.close();
                    base64Image = Base64.getEncoder().encodeToString(profilePhotoBytes);
                }
            
                studentInfo.setId(student_id);
                studentInfo.setStudentName(student_name);
                studentInfo.setStudentAge(student_age);
                studentInfo.setStudentGender(student_gender);
                studentInfo.setStudentPhone(student_phone);
                studentInfo.setStudentEmail(student_email);
                studentInfo.setStudentPassword(student_password);
                studentInfo.setProfilePhoto(base64Image);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
        	statement.close();
            connection.close();
            resultSet.close();
        }
        return studentInfo;
	}

	public Boolean update_student_data(StudentInfo student) throws SQLException {
		Connection connection=null;
		PreparedStatement statement=null;
        Boolean result=false;
		
        try {
        	String url="jdbc:mysql://localhost:3306/exam_portal";
            String username="root"; 
            String password="root"; 
            
        	connection = DriverManager.getConnection(url, username, password);
            String sql="UPDATE exam_portal.student_info SET student_name='"+student.getStudentName()+"', student_age='"+student.getStudentAge()+"', student_gender='"+student.getStudentGender()+"', "
            		+ "student_phone='"+student.getStudentPhone()+"', student_email='"+student.getStudentEmail()+"', student_password='"+student.getStudentPassword()+"' WHERE student_email='"+student.getStudentOldEmail()+"';";           
            statement=connection.prepareStatement(sql);
            
            int rowsUpdated = statement.executeUpdate();
                   
            if (rowsUpdated>0) {
            	result=true;
                System.out.println("Data updated successfully.");
            } else {
                System.out.println("Data updation failed.");
            }            
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
        	statement.close();
            connection.close();
        }
		return result;
	}
	
}
