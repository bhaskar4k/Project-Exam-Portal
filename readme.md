# Exam Portal
An exam portal which has two separate react app, one for admin access and one for student

# Tech Stack
- Frontend : React.js, JavaScript, CSS
- Backend : JAVA, Rest API, JDBC, SQL
- Database : MySQL

# Functionality
- Two separate react app. One for admin and one for student and the whole backend is based on Rest API. 
- Whatever database/backend operation I needed, I created a Rest API for each of them and from the frontend I just hit the API endpoint hosted in localhost and get the data in JSON format/string or send the data in JSON format/string.
- For each Rest API I've written logic of backend to fetch records from database or create/update/delete whatever I needed.
- After getting the data I just manipulated the react app using DOM manipulation using JavaScript or React state management which updates data in webpage without reloading.

# Features of Admin 
- An admin can register himself and login. After login he/she can update his profile information and profile photo also.
- Admin can schedule new exam where admin has to put exam name, exam duration in proper format(format mentioned over there) and question count then question_count number of question container will be loaded and then each question container should have a question description then four option then one correct option.
- Admin can view already scheduled exam by himself/herself and can also view result where result will be generated after any participation of student in any exam set by that admin.

# Features of Student
- An student can register himself and login. After login he/she can update his profile information and profile photo also.
- Student can participated on any exam scheduled by different admins.
- When a student will click on start exam button then the screen will go full and he/she can't undo the full screen and a clock timer will be started. Student has to submit the exam within the time duration set by admin. If he/she doesn't submit during the time duration then exam will be auto-submitted when timer will become 00:00:00.
- Initially the color of the timer will be green and will start being orange then deep orange then red parrallelly with the timer while timer is going down and color of timer will also be changed. Green means enough time, orange means time is going down, deep orange means 50% time crossed, red mean timer is about to end.
- Student can view result of the exams which he/she has participated and can see his/her score and also can see which is the correct answer.

# In app notification system
- Made a system where app will show notification of different tasks. Notification is basically are of three color.
- Red : means danger/error
- Orange : Warning
- Green : Success
  - While registration if the email is already registered then a red popup will arise and say "Email {email@gmail.com} is registered already"
  - If any field is empty or not in proper format while registration/login then an orange popup wiil arise and say "Please fillup all field data"
  - While login if email and password doesn't match with any records in database then a red popup will arise and say "Incorrect credentials/wrong email/password"
  - While uploading profile photo is the uploaded file is not an image file or the image file size is greater than 1MB then an orange popup will arise and say "Uploaded file should be an image file" or "Image file size should be less then 1Mb"
  - While setting exam if exam duration is not in proper format which has been mentioned there then an orange popup will arise and say "Please fillup exam duration in correct format"
  - Correct option of any question will be 1/2/3/4 and if you put other values then an orange popup will arise and say "Which question's correct option is not written properly"
  - If any question's any field is empty(such as question description/correct option/correct answer) then an orange popup will arise and say "Which question's field is empty"
  - Keeping any field empty or not in proper format(mentioned there) admin won't be able to set exam
