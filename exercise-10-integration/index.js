// Exercise 10: SBA Integration - Putting It All Together

// This exercise combines everything you've learned!
// Complete the getLearnerData function to process student submissions

// Sample Course Data
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
};

// Sample Assignment Group
const AssignmentGroup = {
    id: 12345,
    name: "Fundamentals of JavaScript",
    course_id: 451,
    group_weight: 25,
    assignments: [
        {
            id: 1,
            name: "Declare a Variable",
            due_at: "2023-01-25",
            points_possible: 50
        },
        {
            id: 2,
            name: "Write a Function",
            due_at: "2023-02-27",
            points_possible: 150
        },
        {
            id: 3,
            name: "Code the World",
            due_at: "3156-11-15", // Future assignment - should be excluded!
            points_possible: 500
        }
    ]
};

// Sample Learner Submissions
const LearnerSubmissions = [
    {
        learner_id: 125,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-25",
            score: 47
        }
    },
    {
        learner_id: 125,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-02-12",
            score: 150
        }
    },
    {
        learner_id: 125,
        assignment_id: 3,
        submission: {
            submitted_at: "2023-01-25",
            score: 400
        }
    },
    {
        learner_id: 132,
        assignment_id: 1,
        submission: {
            submitted_at: "2023-01-24",
            score: 39
        }
    },
    {
        learner_id: 132,
        assignment_id: 2,
        submission: {
            submitted_at: "2023-03-07", // Late submission!
            score: 140
        }
    }
];

// TODO: Complete the getLearnerData function
// This function should return an array of objects like:
// [
//   {
//     id: 125,
//     avg: 0.985,  // weighted average
//     1: 0.94,     // assignment 1 percentage
//     2: 1.0       // assignment 2 percentage
//   },
//   ...
// ]

function getLearnerData(course, ag, submissions) {
    // TODO: Step 1 - Validate that ag.course_id matches course.id
    // If not, throw an error
    try {
        if (ag.course_id !== course.id) {
            throw new Error("Invalid input: assignment group does not belong to this course");
        }
    } catch (error) {
        console.log("Error:", error.message);
        return [];
    }

    // TODO: Step 2 - Get current date to filter out future assignments
    const currentDate = new Date();

    // TODO: Step 3 - Helper function to check if assignment is due
    function isAssignmentDue(assignment) {
        // TODO: Return true if assignment.due_at <= currentDate
     const dueDate = new Date(assignment.due_at);
     return dueDate <= currentDate;
    }

    // TODO: Step 4 - Helper function to check if submission is late
    function isSubmissionLate(submission, assignment) {
        // TODO: Compare submission.submission.submitted_at with assignment.due_at
    const submissionDate = new Date(submission.submission.submitted_at);
    const dueDate = new Date(assignment.due_at);
    
    return submissionDate > dueDate;
    }

    // TODO: Step 5 - Helper function to calculate final score (with late penalty if needed)
    function calculateFinalScore(submission, assignment) {
        // TODO: If late, subtract 10% of points_possible from score
        let score = submission.submission.score;

        if(isSubmissionLate(submission, assignment)) {
            score = score - (assignment.points_possible * .1);
        }

    }

    // TODO: Step 6 - Helper function to find assignment by id
    function findAssignment(assignmentId) {
        // TODO: Search through ag.assignments to find matching id
        for (const assignment of ag.assignments) {
            if (assignment.id === assignmentId) {
                return assignment;
            }
        }
        return null;
    }

    // TODO: Step 7 - Get unique learner IDs from submissions
    function getUniqueLearnerIds() {
        // TODO: Extract unique learner_id values
    }

    // TODO: Step 8 - Main processing logic
    const results = [];
    const learnerIds = getUniqueLearnerIds();

    // TODO: For each learner...
    for (const learnerId of learnerIds) {
        // Create result object
        const result = {
            id: learnerId,
            avg: 0
        };

        let totalScore = 0;
        let totalPossible = 0;

        // TODO: Process each submission for this learner
        for (const submission of submissions) {
            if (submission.learner_id === learnerId) {
                // Find the assignment
                const assignment = findAssignment(submission.assignment_id);

                // TODO: Skip if assignment not found or not yet due
                if (!assignment || !isAssignmentDue(assignment)) {
                    continue;
                }

                // TODO: Calculate final score with late penalty
                const finalScore = calculateFinalScore(submission, assignment);

                // TODO: Calculate percentage
                const percentage = finalScore / assignment.points_possible;

                // TODO: Add to result object
                result[assignment.id] = percentage;

                // TODO: Add to totals for weighted average
                totalScore += finalScore;
                totalPossible += assignment.points_possible;
            }
        }

        // TODO: Calculate weighted average
        if (totalPossible > 0) {
            result.avg = totalScore / totalPossible;
        }

        results.push(result);
    }

    return results;
}

// Test the function
console.log("=== Exercise 10: Integration Test ===\n");

try {
    const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
    console.log("Results:");
    console.log(JSON.stringify(result, null, 2));
    
    console.log("\n=== Expected Output (approximately) ===");
    console.log(`[
  {
    "id": 125,
    "avg": 0.985,
    "1": 0.94,
    "2": 1.0
  },
  {
    "id": 132,
    "avg": 0.82,
    "1": 0.78,
    "2": 0.833...
  }
]`);
    
    console.log("\n✓ If your output is close to this, you're ready for the SBA!");
} catch (error) {
    console.log("Error:", error.message);
}

// TODO: After completing the function, test with edge cases:
// - What if points_possible is 0?
// - What if there are submissions for non-existent assignments?
// - What if course_id doesn't match?
