// Exercise 3: Control Flow

// Sample data for this exercise
const course = { id: 101, name: "JavaScript Fundamentals" };
const assignmentGroup = {
    id: 1,
    name: "Week 1 Assignments",
    course_id: 101,
    group_weight: 25
};

const assignment = {
    id: 1,
    name: "Variables Quiz",
    due_at: "2024-01-15",
    points_possible: 100
};

const submission = {
    learner_id: 1,
    assignment_id: 1,
    submission: {
        submitted_at: "2024-01-16", // Submitted one day late
        score: 85
    }
};

// Task 1: Validate course_id match
// TODO: Write an if/else statement to check if assignmentGroup.course_id matches course.id
// If they match, set isValidGroup to true, otherwise set it to false
let isValidGroup;
// (your code here)
if (assignmentGroup.course_id === course.id) {
    isValidGroup = true;
} else {
    isValidGroup = false;
}




// Task 2: Check if assignment is late
// TODO: Compare submission.submission.submitted_at with assignment.due_at
// For now, just compare the strings (we'll learn proper date comparison later)
// If submitted_at is greater than due_at, the assignment is late
let isLate;
// (your code here)
if (submission.submission.submitted_at > assignment.due_at) {
    isLate = true;
} else {
    isLate = false;

}


// Task 3: Apply late penalty
// TODO: Create a variable finalScore
// If the submission is late, subtract 10% of points_possible from the score
// Otherwise, use the original score
let finalScore;
// (your code here)
if (submission.submission.submission_at > assignment.due_at) {
    finalScore = submission.submission.score - (assignment.points_possible * 0.10);
} else {
    finalScore = submission.submission.score;

}


// Task 4: Determine letter grade using if/else
// TODO: Based on the percentage (finalScore / points_possible * 100):
// 90-100: "A", 80-89: "B", 70-79: "C", 60-69: "D", below 60: "F"
const percentage = (finalScore / assignment.points_possible) * 100;
let letterGrade;
// (your code here)
if (percentage >= 90) {
    letterGrade = "A";
}
else if (percentage >= 80) {
    letterGrade = "B";
}
else if (percentage >= 70) {
    letterGrade = "C";
}
else if (percentage >= 60) {
    letterGrade = "D";
} else {
    letterGrade = "F";
}



// Task 5: Use a switch statement to categorize assignment difficulty
// TODO: Based on points_possible, categorize the assignment:
// 0-50: "Easy", 51-100: "Medium", 101-150: "Hard", 151+: "Very Hard"
// Use a switch statement with ranges (you'll need to create a variable to switch on)
let difficulty;
// Hint: You can switch on true and use case conditions like: case (points_possible <= 50):
// (your code here)
switch (true) {
    case (assignment.points_possible <= 50):
        difficulty = "Easy";
        break;
        case (assignment.points_possible <= 100):
        difficulty = "Medium";
        break;
        case (assignment.points_possible <= 150):
        difficulty = "Hard";
        break;
        default:
            difficulty = "Very Hard";
            break;
}


// Task 6: Nested if/else - Determine if submission should count
// TODO: A submission should count if:
// 1. The assignment group is valid (isValidGroup is true)
// 2. The assignment is NOT a future assignment (for this exercise, assume all are past due)
// Set shouldCount to true or false
let shouldCount;
// (your code here)
if(isValidGroup) {
    shouldCount = true;
    
} else {
    shouldCount = false;
}


// Task 7: Complex validation
// TODO: Check if the submission data is valid:
// - points_possible should be greater than 0
// - score should be between 0 and points_possible
// - learner_id should exist (not null or undefined)
// Set isValidSubmission to true only if ALL conditions are met
let isValidSubmission;
// (your code here)
if (assignment.points_possible > 0 && score >= 0 && score <= assignment.points_possible
    && submission.learner_id != null) {
    isValidSubmission = true;
} else {
    isValidSubmission = false;
}


// Display results (don't modify this part)
console.log("=== Exercise 3 Results ===");
console.log("Is Valid Group:", isValidGroup);
console.log("Is Late:", isLate);
console.log("Final Score:", finalScore, "out of", assignment.points_possible);
console.log("Percentage:", percentage.toFixed(2) + "%");
console.log("Letter Grade:", letterGrade);
console.log("Difficulty:", difficulty);
console.log("Should Count:", shouldCount);
console.log("Is Valid Submission:", isValidSubmission);











  

  
