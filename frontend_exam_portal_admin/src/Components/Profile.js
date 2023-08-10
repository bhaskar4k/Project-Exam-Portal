import '../CSS for Components/Profile.css';
import NotificationPopup from './NotificationPopup';
import React, { useState } from 'react';
import EditProfile from './EditProfile';

const sessionEmail = localStorage.getItem('session_admin_email');

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

    // Fetching admin's whole data from database
    const [admin, setAdmin] = useState({
        id: "NULL",
        adminName: "NULL",
        adminAge: "NULL",
        adminGender: "NULL",
        adminPhone: "NULL",
        adminEmail: "NULL",
        adminPassword: "NULL",
        profilePhoto: "NULL"
    });

    const fetchAdminProfileDataFromDB = async () => {
        // Check sessionEmail and show error message if necessary
        if (sessionEmail === "" || sessionEmail === null) {
            openNotificationPopup("2", "Please login to access this section");
            admin.id = "FALSE";
            let timeoutId = setTimeout(() => {
                setNotificationPopup("");
                clearTimeout(timeoutId);
                window.location.reload();
            }, 3000);
            return;
        }

        try {
            const response = await fetch('http://localhost:8080/get_all_admin_info', {
                method: 'POST',
                headers: {
                    'Content-Type': 'text/plain'
                },
                body: sessionEmail
            });

            const jsonResponse = await response.json();
            setAdmin(jsonResponse);
        } catch (error) {
            openNotificationPopup("0", "Internal server error");
            admin.id = "FALSE";
            let timeoutId = setTimeout(() => {
                setNotificationPopup("");
                clearTimeout(timeoutId);
                window.location.reload();
            }, 3000);
        }
    };

    let adminProfilePhoto = "data:image/jpeg;base64," + admin.profilePhoto;

    if (admin.id === "NULL") fetchAdminProfileDataFromDB();

    // Upload admin's profile photo
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
            const response = await fetch('http://localhost:8080/upload_admin_photo', {
                method: 'POST',
                body: formData
            })
            const wholeResponse = await response.text();
            console.log(wholeResponse)

            let message = "", status = wholeResponse[0];
            for (let i = 2; i < wholeResponse.length; i++) {
                message += wholeResponse[i];
            }

            fetchAdminProfileDataFromDB();
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
            setEditProfileForm(<EditProfile name={admin.adminName} age={admin.adminAge} gender={admin.adminGender} phone={admin.adminPhone} email={admin.adminEmail} password={admin.adminPassword} />);
            document.getElementById("editButtonFirstName").innerText = "🢀 Admin Profile";
            document.getElementById("editButtonSecondName").innerText = "🢀 Admin Profile";
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
                        <img src={adminProfilePhoto} alt="NULL" />
                    </div>
                    <div>
                        <button className="profileBtn" onClick={controlPhotoUploadForm}><span>Change photo</span><span>Do Upload Photo</span></button>
                    </div>
                </div>

                <h1>Admin name : {admin.adminName}</h1>
                <h1>Admin age : {admin.adminAge}</h1>
                <h1>Admin gender : {admin.adminGender}</h1>
                <h1>Admin phone : {admin.adminPhone}</h1>
                <h1>Admin email : {admin.adminEmail}</h1>
                <h1>Admin password : {admin.adminPassword}</h1>
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