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

public class DatabaseAdmin {	
	public Boolean register_new_admin(AdminInfo admin) throws SQLException {
		Connection connection=null;
		PreparedStatement statement=null;
        Boolean result=false;
		
        try {
        	String url="jdbc:mysql://localhost:3306/exam_portal";
            String username="root"; 
            String password="root"; 
            
        	connection = DriverManager.getConnection(url, username, password);
            String sql="INSERT INTO exam_portal.admin_info (admin_name, admin_age, admin_gender, admin_phone, admin_email, admin_password) VALUES (?, ?, ?, ?, ?, ?)";           
            statement=connection.prepareStatement(sql);
            
            statement.setString(1, admin.getAdminName());
            statement.setInt(2, admin.getAdminAge());
            statement.setString(3, admin.getAdminGender());
            statement.setLong(4, admin.getAdminPhone());
            statement.setString(5, admin.getAdminEmail());
            statement.setString(6, admin.getAdminPassword());
            
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
            String sql = "SELECT count(*) AS count FROM exam_portal.admin_info where admin_email='"+email+"';";            
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
	
	public AdminInfo validate_admin(AdminInfo admin) throws SQLException {				
		Connection connection=null;
		Statement statement=null;
		ResultSet resultSet=null;
        AdminInfo loggedinAdmin=new AdminInfo(-1,"NULL");
		
        try {
        	String url="jdbc:mysql://localhost:3306/exam_portal";
            String username="root"; 
            String password="root"; 
            
            connection = DriverManager.getConnection(url, username, password);          
            String sql = "SELECT admin_id, admin_name FROM exam_portal.admin_info where admin_email='"+admin.getAdminEmail()+"' AND admin_password='"+admin.getAdminPassword()+"';";            
            statement = connection.createStatement();
            resultSet = statement.executeQuery(sql);          
            
            while (resultSet.next()) {
            	loggedinAdmin.setId(resultSet.getInt("admin_id"));
            	loggedinAdmin.setAdminName(resultSet.getString("admin_name"));
            }            
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
        	statement.close();
            connection.close();
            resultSet.close();
        }
        return loggedinAdmin;
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
            String sql = "UPDATE exam_portal.admin_info SET admin_profile_photo=(?) WHERE admin_email='"+email+"';";            
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
	
	public AdminInfo get_all_admin_info(String email) throws IOException, SQLException {
		Connection connection=null;
		PreparedStatement statement=null;
		ResultSet resultSet=null;
		AdminInfo adminInfo = new AdminInfo();
		
        try {
        	String url="jdbc:mysql://localhost:3306/exam_portal";
            String username="root"; 
            String password="root"; 
            
            connection = DriverManager.getConnection(url, username, password);
            String sql = "SELECT * FROM exam_portal.admin_info WHERE admin_email = '"+email+"'";
            statement = connection.prepareStatement(sql);
            resultSet = statement.executeQuery();
            
            while (resultSet.next()) {
            	int admin_id = resultSet.getInt("admin_id");
                String admin_name = resultSet.getString("admin_name");
                int admin_age = resultSet.getInt("admin_age");
                String admin_gender = resultSet.getString("admin_gender");
                Long admin_phone = resultSet.getLong("admin_phone");
                String admin_email = resultSet.getString("admin_email");
                String admin_password = resultSet.getString("admin_password");
                
                InputStream profile_photo_stream=null;
                if(resultSet.getBinaryStream("admin_profile_photo")!=null) {
                	profile_photo_stream=resultSet.getBinaryStream("admin_profile_photo");
                }
                
                String base64Image="NULL";
                byte[] profilePhotoBytes = null;
                if (profile_photo_stream != null) {
                    profilePhotoBytes = profile_photo_stream.readAllBytes();
                    profile_photo_stream.close();
                    base64Image = Base64.getEncoder().encodeToString(profilePhotoBytes);
                }
            
                adminInfo.setId(admin_id);
                adminInfo.setAdminName(admin_name);
                adminInfo.setAdminAge(admin_age);
                adminInfo.setAdminGender(admin_gender);
                adminInfo.setAdminPhone(admin_phone);
                adminInfo.setAdminEmail(admin_email);
                adminInfo.setAdminPassword(admin_password);
                adminInfo.setProfilePhoto(base64Image);
            }
        } catch (SQLException e) {
            e.printStackTrace();
        } finally {
        	statement.close();
            connection.close();
            resultSet.close();
        }
        return adminInfo;
	}

	public Boolean update_admin_data(AdminInfo admin) throws SQLException {
		Connection connection=null;
		PreparedStatement statement=null;
        Boolean result=false;
        System.out.println("CALL COMING");
		
        try {
        	String url="jdbc:mysql://localhost:3306/exam_portal";
            String username="root"; 
            String password="root"; 
            
        	connection = DriverManager.getConnection(url, username, password);
            String sql="UPDATE exam_portal.admin_info SET admin_name='"+admin.getAdminName()+"', admin_age='"+admin.getAdminAge()+"', admin_gender='"+admin.getAdminGender()+"', "
            		+ "admin_phone='"+admin.getAdminPhone()+"', admin_email='"+admin.getAdminEmail()+"', admin_password='"+admin.getAdminPassword()+"' WHERE admin_email='"+admin.getAdminOldEmail()+"';";           
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
