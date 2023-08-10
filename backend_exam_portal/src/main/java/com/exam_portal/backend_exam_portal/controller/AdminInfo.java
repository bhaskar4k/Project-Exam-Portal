package com.exam_portal.backend_exam_portal.controller;

public class AdminInfo {
    private int id;
    private String adminName;
    private int adminAge;
    private String adminGender;
    private Long adminPhone;
    private String adminEmail;
    private String adminOldEmail;
    private String adminPassword;
    String profilePhoto;
    
    public AdminInfo(String adminName, int adminAge, String adminGender, Long adminPhone, String adminEmail,
			String adminPassword, String adminOldEmail) {
		super();
		this.adminName = adminName;
		this.adminAge = adminAge;
		this.adminGender = adminGender;
		this.adminPhone = adminPhone;
		this.adminEmail = adminEmail;
		this.adminPassword = adminPassword;
		this.adminOldEmail = adminOldEmail;
	}

	public AdminInfo(int id, String adminName, int adminAge, String adminGender, Long adminPhone, String adminEmail,
			String adminPassword, String profilePhoto) {
		super();
		this.id = id;
		this.adminName = adminName;
		this.adminAge = adminAge;
		this.adminGender = adminGender;
		this.adminPhone = adminPhone;
		this.adminEmail = adminEmail;
		this.adminPassword = adminPassword;
		this.profilePhoto = profilePhoto;
	}

	public AdminInfo(int id, String adminName, int adminAge, String adminGender, Long adminPhone, String adminEmail,
			String adminPassword) {
		super();
		this.id = id;
		this.adminName = adminName;
		this.adminAge = adminAge;
		this.adminGender = adminGender;
		this.adminPhone = adminPhone;
		this.adminEmail = adminEmail;
		this.adminPassword = adminPassword;
	}
	
	public AdminInfo(String adminName, int adminAge, String adminGender, Long adminPhone, String adminEmail,
			String adminPassword) {
		super();
		this.adminName = adminName;
		this.adminAge = adminAge;
		this.adminGender = adminGender;
		this.adminPhone = adminPhone;
		this.adminEmail = adminEmail;
		this.adminPassword = adminPassword;
	}
	
	public AdminInfo(String adminEmail, String adminPassword) {
		super();
		this.adminEmail = adminEmail;
		this.adminPassword = adminPassword;
	}
	
	public AdminInfo(int id, String adminName) {
		super();
		this.id = id;
		this.adminName = adminName;
	}

	public AdminInfo() {
		super();
		// TODO Auto-generated constructor stub
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getAdminName() {
		return adminName;
	}

	public void setAdminName(String adminName) {
		this.adminName = adminName;
	}

	public int getAdminAge() {
		return adminAge;
	}

	public void setAdminAge(int adminAge) {
		this.adminAge = adminAge;
	}

	public String getAdminGender() {
		return adminGender;
	}

	public void setAdminGender(String adminGender) {
		this.adminGender = adminGender;
	}

	public Long getAdminPhone() {
		return adminPhone;
	}

	public void setAdminPhone(Long adminPhone) {
		this.adminPhone = adminPhone;
	}

	public String getAdminEmail() {
		return adminEmail;
	}

	public void setAdminEmail(String adminEmail) {
		this.adminEmail = adminEmail;
	}

	public String getAdminPassword() {
		return adminPassword;
	}

	public void setAdminPassword(String adminPassword) {
		this.adminPassword = adminPassword;
	}

	public String getProfilePhoto() {
		return profilePhoto;
	}

	public void setProfilePhoto(String profilePhoto) {
		this.profilePhoto = profilePhoto;
	}

	public String getAdminOldEmail() {
		return adminOldEmail;
	}

	public void setAdminOldEmail(String adminOldEmail) {
		this.adminOldEmail = adminOldEmail;
	}

	@Override
	public String toString() {
		return "AdminInfo [id=" + id + ", adminName=" + adminName + ", adminAge=" + adminAge + ", adminGender="
				+ adminGender + ", adminPhone=" + adminPhone + ", adminEmail=" + adminEmail + ", adminPassword="
				+ adminPassword + "]";
	}
	
	public void printData() {
		System.out.println("[adminName=" + adminName + ", adminAge=" + adminAge + ", adminGender="
				+ adminGender + ", adminPhone=" + adminPhone + ", adminEmail=" + adminEmail + ", adminPassword="
				+ adminPassword + "]");
	}
}

