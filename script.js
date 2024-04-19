function showGPAForm() {
    document.getElementById("gpaForm").style.display = "block";
    document.getElementById("cgpaForm").style.display = "none";
}

function showCGPAForm() {
    document.getElementById("cgpaForm").style.display = "block";
    document.getElementById("gpaForm").style.display = "none";
}

function addCourseInputs(totalCourses, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous inputs
    for (let i = 0; i < totalCourses; i++) {
        const div = document.createElement('div');
        div.classList.add('form-group');
        div.innerHTML = `
            <label for="credit${i}">Credit for Course ${i + 1}:</label>
            <input type="number" id="credit${i}" name="credit${i}" step="0.5" required>
            <label for="grade${i}">Grade for Course ${i + 1}:</label>
            <input type="text" id="grade${i}" name="grade${i}" required pattern="[A-FNSa-fns]" title="Enter grade A to F or S or N for Fail">
        `;
        container.appendChild(div);
    }
}

function addSemesterInputs(totalSemesters, containerId) {
    const container = document.getElementById(containerId);
    container.innerHTML = ''; // Clear previous inputs
    for (let i = 0; i < totalSemesters; i++) {
        const div = document.createElement('div');
        div.classList.add('form-group');
        div.innerHTML = `
            <label for="semesterCredits${i}">Credits for Semester ${i + 1}:</label>
            <input type="number" id="semesterCredits${i}" name="semesterCredits${i}" step="0.5" required>
            <label for="semesterGPA${i}">GPA for Semester ${i + 1}:</label>
            <input type="number" id="semesterGPA${i}" name="semesterGPA${i}" step="0.01" required>
        `;
        container.appendChild(div);
    }
}

function calculateGPA() {
    const form = document.getElementById("gpaCalculatorForm");
    const totalCourses = parseInt(form.totalCourses.value);
    const totalCredits = parseFloat(form.totalCredits.value);
    let totalGradePoints = 0;

    for (let i = 0; i < totalCourses; i++) {
        const credit = parseFloat(form[`credit${i}`].value);
        const grade = form[`grade${i}`].value.toUpperCase(); // Convert to uppercase

        let point = 0;
        switch (grade) {
            case 'S':
                point = 10;
                break;
            case 'A':
                point = 9;
                break;
            case 'B':
                point = 8;
                break;
            case 'C':
                point = 7;
                break;
            case 'D':
                point = 6;
                break;
            case 'E':
                point = 5;
                break;
            case 'F':
            case 'N':
                point = 0;
                break;
            default:
                alert("Invalid grade entered!");
                return false;
        }
        totalGradePoints += credit * point;
    }

    const gpa = totalGradePoints / totalCredits;
    displayResult(`Your GPA is ${gpa.toFixed(2)}`);
    return false; // Prevent form submission
}

function calculateCGPA() {
    const form = document.getElementById("cgpaCalculatorForm");
    const totalSemesters = parseInt(form.totalSemesters.value);
    let totalCredits = 0;
    let totalCGPA = 0;

    for (let j = 0; j < totalSemesters; j++) {
        const semesterCredits = parseFloat(form[`semesterCredits${j}`].value);
        const semesterGPA = parseFloat(form[`semesterGPA${j}`].value);

        totalCredits += semesterCredits;
        totalCGPA += semesterCredits * semesterGPA;
    }

    const cgpa = totalCGPA / totalCredits;
    displayResult(`Your CGPA is ${cgpa.toFixed(2)}`);
    return false; // Prevent form submission
}

function displayResult(message) {
    const outputDiv = document.getElementById('output');
    outputDiv.innerHTML = `<p>${message}</p>`;
}

document.getElementById('totalCourses').addEventListener('change', function() {
    const totalCourses = parseInt(this.value);
    addCourseInputs(totalCourses, 'coursesInput');
});

document.getElementById('totalSemesters').addEventListener('change', function() {
    const totalSemesters = parseInt(this.value);
    addSemesterInputs(totalSemesters, 'semestersInput');
});

