import '../CSS for Components/Header.css';
import dropdownImage from './Images/dropdown.png';

const sessionName = localStorage.getItem('session_student_name');
let headerName;
if (sessionName) {
    headerName = " [ " + sessionName + " ]"
}

// Open close left side container
let leftSideContainerParentID = "leftSideContainerParentID";
let leftSideContainerChildID1 = "leftSideContainerChildID1";
let leftSideContainerChildID2 = "leftSideContainerChildID2";

let rightSideContainerParentID = "rightSideContainerParentID";

function dropdownImageFunction() {
    if (document.getElementById("dropdownImageID").style.transform === "rotate(0deg)") {
        document.getElementById("dropdownImageID").style.transform = "rotate(180deg)";

        setTimeout(function () {
            document.getElementById(leftSideContainerChildID1).style.display = "none";
            document.getElementById(leftSideContainerChildID2).style.display = "none";
        }, 300);
        document.getElementById(leftSideContainerParentID).style.width = "0%";
        document.getElementById(rightSideContainerParentID).style.width = "94%";
        document.getElementById(rightSideContainerParentID).style.marginLeft = "0px";
    } else {
        document.getElementById("dropdownImageID").style.transform = "rotate(0deg)";

        setTimeout(function () {
            document.getElementById(leftSideContainerParentID).style.width = "20%";
            document.getElementById(rightSideContainerParentID).style.width = "70%";
            document.getElementById(rightSideContainerParentID).style.marginLeft = "60px";
        }, 300);
        document.getElementById(leftSideContainerChildID1).style.display = "block";
        document.getElementById(leftSideContainerChildID2).style.display = "block";

    }
}

function Header() {
    return (
        <div>
            <div className="headerParent">
                <div className="headerContainer">
                    <div className="leftSideControllerBtn">
                        <img src={dropdownImage} onClick={dropdownImageFunction} id="dropdownImageID" alt="dropdown button" style={{ transform: 'rotate(0deg)' }} />
                    </div>
                    <div className="logo">
                        <h2>STUDENT{headerName}</h2>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;