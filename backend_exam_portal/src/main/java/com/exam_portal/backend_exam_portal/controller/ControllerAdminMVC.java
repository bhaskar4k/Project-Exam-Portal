package com.exam_portal.backend_exam_portal.controller;

import java.io.IOException;
import java.io.InputStream;
import java.sql.SQLException;

public class ControllerAdminMVC {
	private DatabaseAdmin databaseAdmin;	

	public String registerNewAdmin(AdminInfo admin) {
		try {
			databaseAdmin=new DatabaseAdmin();
			if(databaseAdmin.is_this_email_already_registered(admin.getAdminEmail())==true) {
				return "0|Email ID: [ "+admin.getAdminEmail()+" ] is already registered";
			}
			if(databaseAdmin.register_new_admin(admin)==true) {
				return "1|Admin [ "+admin.getAdminName()+" ] has been registered";
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return "0|Internal server error";
	}
	
	public String validateAdminAndSetSession(AdminInfo admin) {
		try {
			databaseAdmin=new DatabaseAdmin();
			AdminInfo loggedinAdmin=databaseAdmin.validate_admin(admin);
			
			if(loggedinAdmin.getId()!=-1 && loggedinAdmin.getAdminName()!="NULL") {
				return "1|"+loggedinAdmin.getAdminName();
			}else {
				return "0|Admin not registered or incorrect credentials";
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return "0|Internal server error";
	}
	
	public AdminInfo getAllAdminInfo(String email) throws SQLException, IOException {
		databaseAdmin=new DatabaseAdmin();
		AdminInfo adminInfo=databaseAdmin.get_all_admin_info(email);
		return adminInfo;
	}
	
	public String insertImageIntoDatabase(InputStream fileInputStream, String email) throws SQLException {
		databaseAdmin=new DatabaseAdmin();
		if(databaseAdmin.insert_image_into_database(fileInputStream,email)==1) {
			return "1|Image updated successfully";
		}
		return "0|Internal server error";
	}

	public String updateAdminInfo(AdminInfo admin) {
		try {
			databaseAdmin=new DatabaseAdmin();
			if(!admin.getAdminEmail().equals(admin.getAdminOldEmail()) && databaseAdmin.is_this_email_already_registered(admin.getAdminEmail())==true) {
				return "0|Email ID: [ "+admin.getAdminEmail()+" ] has been used by someone";
			}
			if(databaseAdmin.update_admin_data(admin)==true) {
				return "1|Admin data has been updated";
			}
		} catch (SQLException e) {
			e.printStackTrace();
		}
		return "0|Internal server error";
	}
}
