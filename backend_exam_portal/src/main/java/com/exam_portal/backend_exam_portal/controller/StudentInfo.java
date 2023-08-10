package com.exam_portal.backend_exam_portal.controller;

public class StudentInfo {
	private int id;
    private String studentName;
    private int studentAge;
    private String studentGender;
    private Long studentPhone;
    private String studentEmail;
    private String studentOldEmail;
    private String studentPassword;
    String profilePhoto;
    
    public StudentInfo(String studentName, int studentAge, String studentGender, Long studentPhone, String studentEmail,
			String studentPassword, String studentOldEmail) {
		super();
		this.studentName = studentName;
		this.studentAge = studentAge;
		this.studentGender = studentGender;
		this.studentPhone = studentPhone;
		this.studentEmail = studentEmail;
		this.studentPassword = studentPassword;
		this.studentOldEmail = studentOldEmail;
	}

	public StudentInfo(int id, String studentName, int studentAge, String studentGender, Long studentPhone, String studentEmail,
			String studentPassword, String profilePhoto) {
		super();
		this.id = id;
		this.studentName = studentName;
		this.studentAge = studentAge;
		this.studentGender = studentGender;
		this.studentPhone = studentPhone;
		this.studentEmail = studentEmail;
		this.studentPassword = studentPassword;
		this.profilePhoto = profilePhoto;
	}

	public StudentInfo(int id, String studentName, int studentAge, String studentGender, Long studentPhone, String studentEmail,
			String studentPassword) {
		super();
		this.id = id;
		this.studentName = studentName;
		this.studentAge = studentAge;
		this.studentGender = studentGender;
		this.studentPhone = studentPhone;
		this.studentEmail = studentEmail;
		this.studentPassword = studentPassword;
	}
	
	public StudentInfo(String studentName, int studentAge, String studentGender, Long studentPhone, String studentEmail,
			String studentPassword) {
		super();
		this.studentName = studentName;
		this.studentAge = studentAge;
		this.studentGender = studentGender;
		this.studentPhone = studentPhone;
		this.studentEmail = studentEmail;
		this.studentPassword = studentPassword;
	}
	
	public StudentInfo(String studentEmail, String studentPassword) {
		super();
		this.studentEmail = studentEmail;
		this.studentPassword = studentPassword;
	}
	
	public StudentInfo(int id, String studentName) {
		super();
		this.id = id;
		this.studentName = studentName;
	}

	public StudentInfo() {
		super();
		// TODO Auto-generated constructor stub
	}

	public int getId() {
		return id;
	}

	public void setId(int id) {
		this.id = id;
	}

	public String getStudentName() {
		return studentName;
	}

	public void setStudentName(String studentName) {
		this.studentName = studentName;
	}

	public int getStudentAge() {
		return studentAge;
	}

	public void setStudentAge(int studentAge) {
		this.studentAge = studentAge;
	}

	public String getStudentGender() {
		return studentGender;
	}

	public void setStudentGender(String studentGender) {
		this.studentGender = studentGender;
	}

	public Long getStudentPhone() {
		return studentPhone;
	}

	public void setStudentPhone(Long studentPhone) {
		this.studentPhone = studentPhone;
	}

	public String getStudentEmail() {
		return studentEmail;
	}

	public void setStudentEmail(String studentEmail) {
		this.studentEmail = studentEmail;
	}

	public String getStudentOldEmail() {
		return studentOldEmail;
	}

	public void setStudentOldEmail(String studentOldEmail) {
		this.studentOldEmail = studentOldEmail;
	}

	public String getStudentPassword() {
		return studentPassword;
	}

	public void setStudentPassword(String studentPassword) {
		this.studentPassword = studentPassword;
	}

	public String getProfilePhoto() {
		return profilePhoto;
	}

	public void setProfilePhoto(String profilePhoto) {
		this.profilePhoto = profilePhoto;
	}

	@Override
	public String toString() {
		return "StudentInfo [id=" + id + ", studentName=" + studentName + ", studentAge=" + studentAge
				+ ", studentGender=" + studentGender + ", studentPhone=" + studentPhone + ", studentEmail="
				+ studentEmail + ", studentOldEmail=" + studentOldEmail + ", studentPassword=" + studentPassword
				+ ", profilePhoto=" + profilePhoto + "]";
	}
}
