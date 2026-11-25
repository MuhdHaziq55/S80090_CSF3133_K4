// ===== Part 1: Errors found and fixed (line numbers refer to the ORIGINAL given code) =====
// Error 1 (grade.html, Line 10): onsubmit="checkMark()" did not return the result, so the form still
//   submitted and reloaded the page even when validation failed. Fixed: onsubmit="return checkMark()".
// Error 2 (grade.html, Line 18): onclick="showtable()" does not match the function name (JavaScript is
//   case-sensitive). Fixed: onclick="showTable()".
// Error 3 (grade.js, Line 5): if(name = " ") uses = (assignment) instead of comparison, and " " is not
//   an empty string. The condition was always true/false wrongly. Fixed: name.trim() === "".
// Error 4 (grade.js, Line 16): mark < 0 && mark > 100 can never be true. Fixed: use || (or).
// Error 5 (grade.js, Line 34): return true let the form submit and reload, so the result disappeared
//   immediately. Fixed: return false after showing the result.
// Error 6 (grade.js, Line 37): function{ has no name or (), a syntax error. Fixed: function showTable().
// Error 7 (grade.js, Line 41): the loop started at i = 1, so grade A (index 0) was missing from the
//   table. Fixed: start at i = 0.
// Error 8 (grade.js, Line 42): range[i] is not defined (the array is named ranges), and * was used
//   instead of + to join strings. Fixed: ranges[i] + "</td></tr>".
// Error 9 (grade.js, Lines 10 and 15): isNaN("") is false and parseInt() cuts off decimals (72.9 -> 72),
//   so an empty or decimal mark slipped through. Fixed: check for empty first and use Number().

// ===== checkMark(): validate the form and show the grade =====
function checkMark() {
    let name = document.forms["gradeForm"]["name"].value;
    let mark = document.forms["gradeForm"]["mark"].value;

    // Name must not be empty (trim() removes spaces so "   " also counts as empty)
    if (name.trim() === "") {
        alert("Name must be filled out.");
        return false;
    }

    // Part 2 (item 5): the mark must not be empty
    if (mark.trim() === "") {
        alert("Mark field cannot be empty.");
        return false;
    }

    // Mark must be a number
    mark = Number(mark);
    if (isNaN(mark)) {
        alert("Please enter a valid numeric value.");
        return false;
    }

    // Mark must be between 0 and 100
    if (mark < 0 || mark > 100) {
        alert("Mark must be between 0 and 100.");
        return false;
    }

    // Work out the grade
    let grade;
    if (mark >= 80) {
        grade = "A";
    } else if (mark >= 65) {
        grade = "B";
    } else if (mark >= 50) {
        grade = "C";
    } else {
        grade = "F";
    }

    // Show the result
    let result = document.getElementById("result");
    result.innerHTML = name + " got grade " + grade;

    // Part 2 (item 6): colour depends on the grade (A, B = green; C = orange; F = red)
    if (grade === "A" || grade === "B") {
        result.style.color = "green";
    } else if (grade === "C") {
        result.style.color = "orange";
    } else {
        result.style.color = "red";
    }

    // Part 2 (item 8): show the date and time of the check
    document.getElementById("checkedTime").innerHTML = "Checked on: " + new Date();

    // Return false so the form does not submit and the result stays on the page
    return false;
}

// ===== Part 2 (item 7): randomMark() puts a random whole number 0-100 in the mark field =====
function randomMark() {
    document.getElementById("mark").value = Math.floor(Math.random() * 101);
}

// ===== showTable(): build the grade table =====
function showTable() {
    let grade = ["A", "B", "C", "F"];
    let ranges = ["80 - 100", "65 - 79", "50 - 64", "0 - 49"];
    // Header row added so the table can have a coloured header (Part 2, item 9)
    let tableHTML = "<table><tr><th>Grade</th><th>Mark range</th></tr>";
    for (let i = 0; i < grade.length; i++) {
        tableHTML += "<tr><td>" + grade[i] + "</td><td>" + ranges[i] + "</td></tr>";
    }
    tableHTML += "</table>";
    document.getElementById("tableContainer").innerHTML = tableHTML;
}
