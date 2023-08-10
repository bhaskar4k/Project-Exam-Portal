import '../CSS for Components/Profile.css';
import NotificationPopup from './NotificationPopup';
import React, { useState } from 'react';
import EditProfile from './EditProfile';

const sessionEmail = localStorage.getItem('session_student_email');

function Profile() {
    // State management for notification popup
    const [notificationPopup, setNotificationPopup] = useState("");

    function openNotificationPopup(status, message) {
        setNotificationPopup(<NotificationPopup status={status} message={message} />);
    }

    // Show popup and close photo upload form
    function showPopupAndClosePhotoUploadForm(status, message) {
        openNotificationPopup(status, message);
        let timeoutId = setTimeout(() => {
            setNotificationPopup("");
            setSelectedFiles("Drag your files here or click in this area.");
            controlPhotoUploadForm();
            clearTimeout(timeoutId);
        }, 3000);
    }

    // Fetching student's whole data from database
    const [student, setStudent] = useState({
        id: "NULL",
        studentName: "NULL",
        studentAge: "NULL",
        studentGender: "NULL",
        studentPhone: "NULL",
        studentEmail: "NULL",
        studentPassword: "NULL",
        profilePhoto: "NULL"
    });

    const fetchStudentProfileDataFromDB = async () => {
        // Check sessionEmail and show error message if necessary
        if (sessionEmail === "" || sessionEmail === null) {
            openNotificationPopup("2", "Please login to access this section");
            student.id = "FALSE";
            let timeoutId = setTimeout(() => {
                setNotificationPopup("");
                clearTimeout(timeoutId);
                window.location.reload();
            }, 3000);
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/get_all_student_info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain'
                },
                body: sessionEmail
            });

            const jsonResponse = await response.json();
            setStudent(jsonResponse);
        } catch (error) {
            openNotificationPopup("0", "Internal server error");
            student.id = "FALSE";
            let timeoutId = setTimeout(() => {
                setNotificationPopup("");
                clearTimeout(timeoutId);
                window.location.reload();
            }, 3000);
        }
    };

    let studentProfilePhoto = "data:image/jpeg;base64," + student.profilePhoto;

    if (student.id === "NULL") fetchStudentProfileDataFromDB();

    // Upload student's profile photo
    const [selectedFiles, setSelectedFiles] = useState("Drag your files here or click in this area.");

    async function handleFileUpload() {
        const fileInput = document.getElementById('imageInput');
        const file = fileInput.files[0];
        setSelectedFiles(file.name + " has been selected");

        // Checking if the file is an image file or not
        function isImageFile(file) {
            const allowedExtensions = ["jpg", "jpeg", "png", "PNG"];
            const extension = file.name.split(".").pop().toLowerCase();
            return allowedExtensions.includes(extension);
        }

        if (!isImageFile(file)) {
            showPopupAndClosePhotoUploadForm("0", "File should be an image file and extension should be [ jpg / jpeg / png / PNG]");
            return;
        }

        // Checking if the image file size is less than or equal to 1MB or not
        function isImageSizeValid(file) {
            return file.size <= 1048576;
        }

        if (!isImageSizeValid(file)) {
            showPopupAndClosePhotoUploadForm("0", "Image size should be less than or equal to 1 MB");
            return;
        }

        const formData = new FormData();
        formData.append('image', file);
        formData.append('emailID', sessionEmail);

        try {
            const response = await fetch('http://localhost:8080/upload_student_photo', {
                method: 'POST',
                body: formData
            })
            const wholeResponse = await response.text();
            console.log(wholeResponse)

            let message = "", status = wholeResponse[0];
            for (let i = 2; i < wholeResponse.length; i++) {
                message += wholeResponse[i];
            }

            fetchStudentProfileDataFromDB();
            showPopupAndClosePhotoUploadForm(status, message);
        } catch {
            showPopupAndClosePhotoUploadForm("0", "Internal server error");
        }
    }

    // Open close photo upload form
    function controlPhotoUploadForm() {
        if (document.getElementById("containerImageUpload").style.height === "0px") {
            document.getElementById("containerImageUpload").style.display = "block";
            document.getElementById("containerImageUpload").style.transition = "0.3s all ease-in-out";
            setTimeout(function () {
                document.getElementById("containerImageUpload").style.opacity = "1";
                document.getElementById("containerImageUpload").style.height = "208px";
            }, 300);
        } else {
            document.getElementById("containerImageUpload").style.height = "0px";
            document.getElementById("containerImageUpload").style.opacity = "0";
            document.getElementById("containerImageUpload").style.transition = "0.3s all ease-in-out";
            setTimeout(function () {
                document.getElementById("containerImageUpload").style.display = "none";
            }, 300);
        }
    }

    const [editProfileForm, setEditProfileForm] = useState("");
    // Open close edit profile form
    function controlEditProfileForm() {
        if (document.getElementById("parentContainerOfAdminProfile").style.display === "block") {
            document.getElementById("parentContainerOfAdminProfile").style.display = "none";
            setEditProfileForm(<EditProfile name={student.studentName} age={student.studentAge} gender={student.studentGender} phone={student.studentPhone} email={student.studentEmail} password={student.studentPassword} />);
            document.getElementById("editButtonFirstName").innerText = "🢀 Student Profile";
            document.getElementById("editButtonSecondName").innerText = "🢀 Student Profile";
        } else {
            setEditProfileForm("");
            document.getElementById("parentContainerOfAdminProfile").style.display = "block";
            document.getElementById("editButtonFirstName").innerHTML = "Edit Info";
            document.getElementById("editButtonSecondName").innerText = "Do Edit Info";
        }
    }

    return (
        <>
            <div className="parentContainerOfAdminProfile" id="parentContainerOfAdminProfile">
                <div className="photoSection">
                    <div className="adminPhoto">
                        <img src={studentProfilePhoto} alt="NULL" />
                    </div>
                    <div>
                        <button className="profileBtn" onClick={controlPhotoUploadForm}><span>Change photo</span><span>Do Upload Photo</span></button>
                    </div>
                </div>

                <h1>Student name : {student.studentName}</h1>
                <h1>Student age : {student.studentAge}</h1>
                <h1>Student gender : {student.studentGender}</h1>
                <h1>Student phone : {student.studentPhone}</h1>
                <h1>Student email : {student.studentEmail}</h1>
                <h1>Student password : {student.studentPassword}</h1>
            </div>

            <button className="adminEditInfoButton profileBtn" onClick={controlEditProfileForm}><span id="editButtonFirstName">Edit Info</span><span id="editButtonSecondName">Do Edit Info</span></button>

            <div id="containerImageUpload">
                <form id="imageUpload">
                    <input type="file" id="imageInput" onChange={handleFileUpload} />
                    <p>{selectedFiles}</p>
                </form>
            </div>

            {notificationPopup}
            {editProfileForm}
        </>
    );
}

export default Profile;