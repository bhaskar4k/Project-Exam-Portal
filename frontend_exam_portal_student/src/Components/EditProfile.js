import '../CSS for Components/EditProfile.css';
import NotificationPopup from './NotificationPopup';
import React, { useState } from 'react';

const sessionEmail = localStorage.getItem('session_student_email');
function EditProfile(props) {
    // State management for notification popup
    const [notificationPopup, setNotificationPopup] = useState("");

    function openNotificationPopup(status, message) {
        setNotificationPopup(<NotificationPopup status={status} message={message} />);
    }

    // Update info
    function updateInformation() {
        const radioButtons = document.querySelectorAll('input[name="gender"]');
        let selectedGender = '';
        radioButtons.forEach(radioButton => {
            if (radioButton.checked) {
                selectedGender = radioButton.value;
            }
        });

        const studentNewData = {
            studentName: document.getElementById('name').value,
            studentAge: document.getElementById('age').value,
            studentGender: selectedGender,
            studentPhone: document.getElementById('phone').value,
            studentEmail: document.getElementById('email').value,
            studentPassword: document.getElementById('password').value,
            studentOldEmail: sessionEmail
        };

        if (studentNewData.studentName === "" || studentNewData.studentName === null ||
            studentNewData.studentAge === "" || studentNewData.studentAge === null ||
            studentNewData.studentGender === "" || studentNewData.studentGender === null ||
            studentNewData.studentPhone === "" || studentNewData.studentPhone === null ||
            studentNewData.studentEmail === "" || studentNewData.studentEmail === null ||
            studentNewData.studentPassword === "" || studentNewData.studentPassword === null) {
            openNotificationPopup("2", "Please fillup all field data");
            return;
        }

        updateAdminInformation(studentNewData);

        async function updateAdminInformation(studentNewData) {
            try {
                const response = await fetch('http://localhost:8080/update_student_info', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(studentNewData)
                });

                const wholeResponse = await response.text();

                let message = "", status = wholeResponse[0];
                for (let i = 2; i < wholeResponse.length; i++) {
                    message += wholeResponse[i];
                }

                if (status === "1") {
                    openNotificationPopup(status, message);
                    let timeoutId = setTimeout(() => {
                        setNotificationPopup("");
                        clearTimeout(timeoutId);
                        doLogout();
                    }, 3000);
                }

                openNotificationPopup(status, message);
                let timeoutId = setTimeout(() => {
                    setNotificationPopup("");
                    clearTimeout(timeoutId);
                }, 3000);
            } catch (error) {
                openNotificationPopup("0", "Internal server error");
                let timeoutId = setTimeout(() => {
                    setNotificationPopup("");
                    clearTimeout(timeoutId);
                }, 3000);
            }
        }
    }

    function doLogout() {
        localStorage.removeItem('session_student_email');
        localStorage.removeItem('session_student_name');
        window.location.reload();
    }

    const [name, setName] = useState(props.name);
    const [age, setAge] = useState(props.age);
    const [gender, setGender] = useState(props.gender);
    const [phone, setPhone] = useState(props.phone);
    const [email, setEmail] = useState(props.email);
    const [password, setPassword] = useState(props.password);

    const handleInputChangeName = (e) => {
        setName(e.target.value);
    };
    const handleInputChangeAge = (e) => {
        setAge(e.target.value);
    };
    const handleInputChangeGender = (e) => {
        setGender(e.target.value);
    };
    const handleInputChangePhone = (e) => {
        setPhone(e.target.value);
    };
    const handleInputChangeEmail = (e) => {
        setEmail(e.target.value);
    };
    const handleInputChangePassword = (e) => {
        setPassword(e.target.value);
    };

    return (
        <>
            <div id="editInfoParent">
                <div className="editInfoBox" id="editInfoBox">
                    <div className="aboutForm">
                        <h2>EDIT INFO</h2>
                        <span id="lineUnderH2"></span>
                    </div>
                    <input className="normalInput" type="text" name="name" id="name" placeholder="Enter your name" value={name} onChange={handleInputChangeName}></input>
                    <input className="normalInput" type="number" name="age" id="age" placeholder="Enter your age" value={age} onChange={handleInputChangeAge}></input>

                    <div className="genderSelection">
                        <p>Gender</p>
                        <div className="genderContainer">
                            <input type="radio" id="male" name="gender" value="Male" checked={gender === "Male"} onChange={handleInputChangeGender}></input>
                            <label htmlFor="male">Male</label><br></br>
                            <input type="radio" id="female" name="gender" value="Female" checked={gender === "Female"} onChange={handleInputChangeGender}></input>
                            <label htmlFor="female">Female</label><br></br>
                            <input type="radio" id="other" name="gender" value="Other" checked={gender === "Other"} onChange={handleInputChangeGender}></input>
                            <label htmlFor="other">Other</label><br></br>
                        </div>
                    </div>

                    <input className="normalInput" type="number" name="phone" id="phone" placeholder="Enter your phone" value={phone} onChange={handleInputChangePhone}></input>
                    <input className="normalInput" type="email" name="email" id="email" placeholder="Enter your email" value={email} onChange={handleInputChangeEmail}></input>
                    <input className="normalInput" type="password" name="password" id="password" placeholder="Enter your password" value={password} onChange={handleInputChangePassword}></input>
                    <br></br>

                    <button className="signupbtn" onClick={updateInformation}>EDIT INFO</button>
                </div>
            </div>
            {notificationPopup}
        </>
    );
}

export default EditProfile;