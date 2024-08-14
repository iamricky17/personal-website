document.addEventListener('DOMContentLoaded', function() {
    // User menu dropdown
    const userButton = document.getElementById('userButton');
    const userDropdown = document.getElementById('userDropdown');
    const logoutButton = document.getElementById('logoutButton');
    const courseFormContainer = document.getElementById('course_form_container');
    const coursesTableContainer = document.getElementById('courses_table');

    // Toggle user dropdown
    userButton.addEventListener('click', () => {
        userDropdown.classList.toggle('show');
    });

    // Close user dropdown on outside click
    document.addEventListener('click', (event) => {
        if (!event.target.matches('#userButton')) {
            if (userDropdown.classList.contains('show')) {
                userDropdown.classList.remove('show');
            }
        }
    });

    const loggedOutMessage = document.getElementById('loggedOutMessage');

    // Check login status and display courses or form if logged in
    checkLoginStatus().then(loggedIn => {
        if (loggedIn) {
            loggedOutMessage.style.display = 'none';
            // Existing code to display add courses form...
        } else {
            loggedOutMessage.style.display = 'block';
        }
    });


    // Check login status and display courses or form if logged in
    checkLoginStatus().then(loggedIn => {
        if (loggedIn) {
            // Display add courses form
            courseFormContainer.innerHTML = `
                <h2>Add Course</h2>
                <form action="php/save_course.php" method="post">
                    <label for="course_name">Course Name:</label>
                    <select style="background-color: #cac6bb;" id="course_name" name="course_name" required class="styled-select">
                        <option value="">Select Course</option>
                        <option value="Computer Hardware and System Maintenance">Computer Hardware and System Maintenance</option>
                        <option value="Business Computer Communication">Business Computer Communication</option>
                        <option value="Discrete Structures">Discrete Structures</option>
                        <option value="Introduction to Computer Networks">Introduction to Computer Networks</option>
                        <option value="Programming in Java">Programming in Java</option>
                        <option value="Web Programming">Web Programming</option>
                    </select><br>
                    <label for="course_code">Course Code:</label>
                    <select style="background-color: #cac6bb;" id="course_code" name="course_code" required class="styled-select">
                        <option value="">Select Course Code</option>
                        <option value="IS 158">IS 158</option>
                        <option value="CS 173">CS 173</option>
                        <option value="IS 143">IS 143</option>
                        <option value="IS 171">IS 171</option>
                        <option value="CS 175">CS 175</option>
                        <option value="IS 181">IS 181</option>
                    </select><br>
                    <label for="course_description">Course Description:</label>
                    <input type="text" id="course_description" name="course_description" maxlength="50" style="width:98%;" required><br>
                    <label for="department">Department:</label>
                    <select style="background-color: #cac6bb;" id="department" name="department" required class="styled-select">
                        <option value="">Select Department</option>
                        <option value="Department of Electronics and Telecommunication Engineering (ETE)">Department of Electronics and Telecommunication Engineering (ETE)</option>
                        <option value="Department of Computer Science & Engineering (CSE)">Department of Computer Science & Engineering (CSE)</option>
                    </select><br>
                    <label for="semester">Semester:</label>
                    <select style="background-color: #cac6bb;" id="semester" name="semester" required class="styled-select">
                        <option value="">Select Semester</option>
                        <option value="I">I</option>
                        <option value="II">II</option>
                    </select><br>
                    <label for="year">Year:</label>
                    <select style="background-color: #cac6bb;" id="year" name="year" required class="styled-select">
                        <option value="">Select Year</option>
                        <option value="2023/24">2023/24</option>
                        <option value="2024/25">2024/25</option>
                        <option value="2025/26">2025/26</option>
                        <option value="2026/27">2026/27</option>
                        <option value="2027/28">2027/28</option>
                    </select><br>
                    <label for="instructor">Instructor:</label>
                    <input type="text" id="instructor" name="instructor" maxlength="30" style="width:98%;"  required><br>
                    <label for="grade">Grade:</label>
                    <select style="background-color: #cac6bb;" id="grade" name="grade" required class="styled-select">
                        <option value="">Select Grade</option>
                        <option value="A">A</option>
                        <option value="B+">B+</option>
                        <option value="B">B</option>
                        <option value="C">C</option>
                        <option value="D">D</option>
                        <option value="F">F</option>
                    </select><br>
                    <button type="submit">Save Course</button>
                </form>
            `;

            // Fetch and display courses table
            fetchCourses().then(() => {
                // Courses are fetched and displayed
            }).catch(error => {
                console.error('Error fetching courses:', error);
            });
        }
    });

    // Logout functionality
    if (logoutButton) {
        logoutButton.addEventListener('click', function() {
            fetch('php/logout.php')
                .then(response => response.json())
                .then(data => {
                    if (data.success) {
                        location.reload();
                    }
                });
        });
    }

    async function fetchCourses() {
        try {
            const response = await fetch('php/courses.php');
            const data = await response.json();

            const table = document.createElement('table');
            table.innerHTML = `
                <thead>
                    <tr>
                        <th>Course Name</th>
                        <th>Course Code</th>
                        <th>Description</th>
                        <th>Department</th>
                        <th>Semester</th>
                        <th>Year</th>
                        <th>Instructor</th>
                        <th>Grade</th>
                    </tr>
                </thead>
                <tbody id="courses_table_body"></tbody>
            `;

            const tbody = table.querySelector('#courses_table_body');

            data.forEach(course => {
                const row = document.createElement('tr');
                row.innerHTML = `
                    <td>${course.course_name}</td>
                    <td>${course.course_code}</td>
                    <td>${course.course_description}</td>
                    <td>${course.department}</td>
                    <td>${course.semester}</td>
                    <td>${course.year}</td>
                    <td>${course.instructor}</td>
                    <td>${course.grade}</td>
                `;
                tbody.appendChild(row);
            });

            // Clear existing table content and append new one
            coursesTableContainer.innerHTML = '';
            coursesTableContainer.appendChild(table);
        } catch (error) {
            console.error('Error fetching courses:', error);
        }
    }

    async function checkLoginStatus() {
        try {
            const response = await fetch('php/check_login.php');
            const data = await response.json();
            if (data.logged_in) {
                userButton.textContent = data.username;
                return true;
            } else {
                userButton.textContent = 'User';
                return false;
            }
        } catch (error) {
            console.error('Error checking login status:', error);
            return false;
        }
    }
});
