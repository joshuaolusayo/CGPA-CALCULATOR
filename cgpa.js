var add = document.getElementById("addRow");                                                        //this get the button for adding new courses
var calcCGPA = document.getElementById("calculateCGPA");                                            //this get the button for adding the cgpa
var table = document.getElementById("table");                                                       //this get the table used for the construction of the grades

var getAllCourses = document.getElementsByName("code");                                             //this get the list of all the listed courses
var getAllUnits = document.getElementsByName("unit");                                               //this get the list of all units of the listed courses
var getAllScores = document.getElementsByName("score");                                             //this get the list of all scores of the listed courses

var unitsTaken = document.getElementById("creditsTaken");                                           //this holds the total of all the units taken
var unitsPassed = document.getElementById("creditsPassed");                                         //this holds the total of all the units passed
var showCGPA = document.getElementById("cgpa");                                                     //this holds the cgpa of the student
var showGrade = document.getElementById("grade");                                                   //this holds the equivalent grade of the students

var count = 1;                                                                                      //this acts as suffix to the name of input and score id
var confirmResult = false;                                                                          //this holds the result of each row (course) test

function confirm() {                                                                                //this checks the result of all the courses input fields
    var unitResult = true, scoreResult = true, courseCode = true;

    for (i = 0; i < getAllUnits.length; i++) {
        var course = getAllCourses[i];
        var unit = getAllUnits[i];
        var score = getAllScores[i];

        unit.value = Math.floor(unit.value);

        if (course.value == "" || !isNaN(course.value.charAt(0))) {
            course.style.borderColor = "red";
            alert("The course code should not be empty or start with empty space or be a number.");
            courseCode = false;
        } else {
            course.style.borderColor = "";
        }

        if (unit.value < 1 || unit.value > 10) {
            unit.style.borderColor = "red";
            unit.value = "";
            alert("Invalid unit. Unit must be a positive integer between 1 and 10.");
            unitResult = false;
        } else {
            unit.style.borderColor = "";
        }

        if (score.value < 1 || score.value > 100) {
            score.style.borderColor = "red";
            score.value = "";
            alert("Invalid score. Score must be a positive integer between 1 and 100.");
            scoreResult = false;
        } else {
            score.style.borderColor = "";
        }
    }

    if (unitResult && scoreResult && courseCode) {
        confirmResult = true;
    } else {
        confirmResult = false;
    }
}

function addCourse() {                                                                              //this add an empty course field to the table
    showCGPA.innerHTML = "";
    showGrade.innerHTML = "";
    unitsTaken.innerHTML = "";
    unitsPassed.innerHTML = "";
    confirm();
    count++;
    if (confirmResult == true) {
        var emptyRow = document.createElement("tr");
        var removeBtn = document.createElement("button");
        for (i = 0; i < 3; i++) {
            var emptyColumn = document.createElement("td");
            var input = document.createElement("input");

            switch (i) {
                case 0:
                    input.type = "text";
                    input.maxLength = 12;
                    input.name = "code";
                    input.placeholder = "e.g. Mat442, CSC247";
                    removeBtn.id = "remove";
                    removeBtn.className = "removeBtn";
                    removeBtn.innerHTML = "Remove";
                    emptyColumn.appendChild(removeBtn);
                    break;
                case 1:
                    input.type = "number";
                    input.min = 1;
                    input.max = 10;
                    input.id = "input" + count;
                    input.name = "unit";
                    input.placeholder = "1 - 10";
                    break;
                case 2:
                    input.type = "number";
                    input.min = 1;
                    input.max = 100;
                    input.id = "score" + count;
                    input.name = "score";
                    input.placeholder = "1 - 100";
                    break;
            }

            emptyColumn.appendChild(input);
            emptyRow.appendChild(emptyColumn);
            table.appendChild(emptyRow);
        }
    }
    confirmResult = false;                                                                                  //set the confirmResult to the default
                                                                                                            //value so as to ensure the process is 
                                                                                                            //repeated next time when adding a course

    removeBtn.addEventListener("click", removeCourse);                                                      //to remove a course from the list

    function removeCourse() {
        table.removeChild(emptyRow);
        showCGPA.innerHTML = "";
        showGrade.innerHTML = "";
    }
}

function getBritishGrade(score) {                                                                           //calculate the British grade of each course
    var grade;
    if (score < 40) {
        grade = 0
    } else if (score < 45) {
        grade = 1;
    } else if (score < 50) {
        grade = 2;
    } else if (score < 60) {
        grade = 3;
    } else if (score < 70) {
        grade = 4;
    } else {
        grade = 5;
    }
    return grade;
}

function getAmericanGrade(score) {                                                                          //calculate the American grade of each course
    var grade;
    if (score >= 93) {
        grade = "4.00";
    } else if (score >= 90) {
        grade = "3.67";
    } else if (score >= 87) {
        grade = 3.33;
    } else if (score >= 83) {
        grade = 3.00;
    } else if (score >= 80) {
        grade = 2.67;
    } else if (score >= 77) {
        grade = 2.33;
    } else if (score >= 73) {
        grade = 2.00;
    } else if (score >= 70) {
        grade = 1.67;
    } else if (score >= 67) {
        grade = 1.33;
    } else if (score >= 63) {
        grade = 1.00;
    } else if (score >= 60) {
        grade = 0.67;
    } else {
        grade = 0.00;
    }
    return grade;
}

function getEquivalentGrade(finalGrade) {                                                                   //calculate the American final grade
    var result;
    if (finalGrade >= 4.00) {
        result = "A";
    } else if (finalGrade >= 3.67) {
        result = "A-";
    } else if (finalGrade >= 3.33) {
        result = "B+";
    } else if (finalGrade >= 3.00) {
        result = "B";
    } else if (finalGrade >= 2.67) {
        result = "B-";
    } else if (finalGrade >= 2.33) {
        result = "C+";
    } else if (finalGrade >= 2.00) {
        result = "C";
    } else if (finalGrade >= 1.67) {
        result = "C-";
    } else if (finalGrade >= 1.33) {
        result = "D+";
    } else if (finalGrade >= 1.00) {
        result = "D";
    } else if (finalGrade >= 0.67) {
        result = "D-";
    } else {
        result = "F";
    }
    return result;
}

function getClassOfGrade(finalGrade) {                                                                      //calculate the British final grade
    var result;
    if (finalGrade >= 4.50) {
        result = "First Class Honours";
    } else if (finalGrade >= 3.50) {
        result = "Second Class Honours (Upper Division)";
    } else if (finalGrade >= 2.40) {
        result = "Second Class Honours (Lower Division)";
    } else if (finalGrade >= 1.50) {
        result = "Third Class Honours";
    } else {
        result = "Pass";
    }
    return result;
}

function calculateCGPA() {                                                                                  //calculate the CGPA
    confirm();

    var cgpa, cgpa2;

    if (confirmResult == true) {
        var totalUnits = 0;
        var totalUnitsPassed = 0, totalUnitsPassed2 = 0;
        var totalScores = 0, totalScores2 = 0;

        for (i = 0; i < getAllUnits.length; i++) {
            totalUnits += parseInt(getAllUnits[i].value);
            totalScores += (getBritishGrade(getAllScores[i].value) * getAllUnits[i].value);
            totalScores2 += (getAmericanGrade(getAllScores[i].value) * getAllUnits[i].value);
            if (getAllScores[i].value >= 40) {
                totalUnitsPassed += parseInt(getAllUnits[i].value);
            }
            if (getAllScores[i].value >= 60) {
                totalUnitsPassed2 += parseInt(getAllUnits[i].value);
            }
        }

        cgpa = (totalScores / totalUnits).toFixed(2);
        cgpa2 = (totalScores2 / totalUnits).toFixed(2);
                                                                                                            //display the result
        unitsTaken.innerHTML = "Total units taken: " + totalUnits;
        unitsPassed.innerHTML = "Total units passed: " + totalUnitsPassed + " (British)\
        <br>Total units passed: " + totalUnitsPassed2 + " (American)";
        showCGPA.innerHTML = "Your CGPA is " + cgpa + " (using 5.0 British grading scale)\
        <br>Your CGPA is " + cgpa2 + " (using 4.0 American grading scale)";
        showGrade.innerHTML = "Class of grade: " + getClassOfGrade(cgpa) + " (British)\
        <br>Grade: " + getEquivalentGrade(cgpa2) + " (American)";
    } else {
        alert("Make sure your input are correct in order to calculate your CGPA.");
    }
}

add.addEventListener("click", addCourse);
calcCGPA.addEventListener("click", calculateCGPA);