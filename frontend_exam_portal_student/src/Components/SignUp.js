import '../CSS for Components/SignUp.css';
import NotificationPopup from './NotificationPopup';
import React, { useState } from 'react';

let notificationPopup = null, APIstatus = null, notificationMessage = null;
function SignUp() {
    // Signup form to login form switch
    function signUpToLoginFunction() {
        document.getElementById('loginBox').style.left = '50%';
        document.getElementById('loginBox').style.transform = 'translate(-50%, -50%)';
        document.getElementById('signUpBox').style.left = '-100%';
        document.getElementById('signUpBox').style.transform = 'translate(-0%, -50%)';
        document.getElementById('signupParent').style.height = '350px';
    }

    // Login form to signup form switch
    function loginToSignUpFunction() {
        document.getElementById('loginBox').style.left = '100%';
        document.getElementById('loginBox').style.transform = 'translate(0%, -50%)';
        document.getElementById('signUpBox').style.left = '50%';
        document.getElementById('signUpBox').style.transform = 'translate(-50%, -50%)';
        document.getElementById('signupParent').style.height = '550px';
    }

    // State management for notification popup
    const [notificationPopupStatus, setNotificationPopupStatus] = useState(false);

    function openNotificationPopup(status, message) {
        setNotificationPopupStatus(true);
        APIstatus = status;
        notificationMessage = message;
    }

    if (notificationPopupStatus) {
        notificationPopup = <NotificationPopup status={APIstatus} message={notificationMessage} />;
        let timeoutId = setTimeout(() => {
            setNotificationPopupStatus(false);
            notificationPopup = null;
            APIstatus = null;
            notificationMessage = null;
            clearTimeout(timeoutId);
        }, 3000);
    }

    // Register Student
    function registerUserInDB() {
        const radioButtons = document.querySelectorAll('input[name="gender"]');
        let selectedGender = '';
        radioButtons.forEach(radioButton => {
            if (radioButton.checked) {
                selectedGender = radioButton.value;
            }
        });

        const studentData = {
            studentName: document.getElementById('name').value,
            studentAge: document.getElementById('age').value,
            studentGender: selectedGender,
            studentPhone: document.getElementById('phone').value,
            studentEmail: document.getElementById('signemail').value,
            studentPassword: document.getElementById('signpassword').value
        };

        if (studentData.studentName === "" || studentData.studentName === null ||
            studentData.studentAge === "" || studentData.studentAge === null ||
            studentData.studentGender === "" || studentData.studentGender === null ||
            studentData.studentPhone === "" || studentData.studentPhone === null ||
            studentData.studentEmail === "" || studentData.studentEmail === null ||
            studentData.studentPassword === "" || studentData.studentPassword === null) {
            openNotificationPopup("2", "Please fillup all field data");
            return;
        }

        sendAdminData(studentData);

        async function sendAdminData(studentData) {
            try {
                const response = await fetch('http://localhost:8080/register_student', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(studentData)
                });

                const wholeResponse = await response.text();

                let message = "", status = wholeResponse[0];
                for (let i = 2; i < wholeResponse.length; i++) {
                    message += wholeResponse[i];
                }

                if (status === "1") {
                    document.getElementById('name').value = "";
                    document.getElementById('age').value = "";
                    document.getElementById('male').checked = false;
                    document.getElementById('female').checked = false;
                    document.getElementById('other').checked = false;
                    document.getElementById('phone').value = "";
                    document.getElementById('signemail').value = "";
                    document.getElementById('signpassword').value = "";
                }
                openNotificationPopup(status, message);
            } catch (error) {
                openNotificationPopup("0", "Internal server error");
            }
        }
    }

    // Login ststudent
    function validateLoginByDB() {
        const studentData = {
            studentEmail: document.getElementById('loginemail').value,
            studentPassword: document.getElementById('loginpassword').value
        };

        if (studentData.studentEmail === "" || studentData.studentEmail === null ||
            studentData.studentPassword === "" || studentData.studentPassword === null) {
            openNotificationPopup("2", "Please fillup all field data");
            return;
        }

        sendAdminData(studentData);

        async function sendAdminData(studentData) {
            try {
                const response = await fetch('http://localhost:8080/login_of_student', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify(studentData)
                });

                const wholeResponse = await response.text();

                let nameOfLoggedinStudent = "", status = wholeResponse[0];
                for (let i = 2; i < wholeResponse.length; i++) {
                    nameOfLoggedinStudent += wholeResponse[i];
                }

                if (status === "1") {
                    localStorage.setItem('session_student_email', studentData.studentEmail);
                    localStorage.setItem('session_student_name', nameOfLoggedinStudent);
                    document.getElementById('loginemail').value = "";
                    document.getElementById('loginpassword').value = "";
                    window.location.reload();
                } else {
                    openNotificationPopup("0", nameOfLoggedinStudent);
                }
            } catch (error) {
                openNotificationPopup("0", "Internal server error");
            }
        }
    }

    return (
        <>
            <div id="signupParent">
                <div className="signUpBox" id="signUpBox">
                    <div className="aboutForm">
                        <h2>SIGN UP</h2>
                        <span id="lineUnderH2"></span>
                    </div>
                    <input className="normalInput" type="text" name="name" id="name" placeholder="Enter your name"></input>
                    <input className="normalInput" type="number" name="age" id="age" placeholder="Enter your age"></input>

                    <div className="genderSelection">
                        <p>Gender</p>
                        <div className="genderContainer">
                            <input type="radio" id="male" name="gender" value="Male"></input>
                            <label htmlFor="male">Male</label><br></br>
                            <input type="radio" id="female" name="gender" value="Female"></input>
                            <label htmlFor="female">Female</label><br></br>
                            <input type="radio" id="other" name="gender" value="Other"></input>
                            <label htmlFor="other">Other</label><br></br>
                        </div>
                    </div>

                    <input className="normalInput" type="number" name="phone" id="phone" placeholder="Enter your phone"></input>
                    <input className="normalInput" type="email" name="email" id="signemail" placeholder="Enter your email"></input>
                    <input className="normalInput" type="password" name="password" id="signpassword" placeholder="Enter your password"></input>
                    <br></br>

                    <button className="signupbtn" onClick={registerUserInDB}>SIGN UP</button>

                    <div className="dontHave" onClick={signUpToLoginFunction}>
                        <p>Already have account?</p>
                        <p>Login Now</p>
                    </div>
                </div>


                <div className="loginBox" id="loginBox">
                    <div className="aboutForm">
                        <h2>LOGIN</h2>
                        <span id="lineUnderH2"></span>
                    </div>
                    <input className="normalInput" type="email" name="email" id="loginemail" placeholder="Enter your email"></input>
                    <input className="normalInput" type="password" name="password" id="loginpassword" placeholder="Enter your password"></input>
                    <br></br>

                    <button className="loginbtn" onClick={validateLoginByDB}>LOGIN</button>

                    <div className="dontHave" onClick={loginToSignUpFunction}>
                        <p>Don't have account?</p>
                        <p>Sign Up Now</p>
                    </div>
                </div>
            </div>
            {notificationPopup}
        </>
    );
}

export default SignUp;