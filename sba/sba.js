// The provided course information.
const CourseInfo = {
    id: 451,
    name: "Introduction to JavaScript"
};

// The provided assignment group.
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
            due_at: "3156-11-15",
            points_possible: 500
        }
    ]
};

// The provided learner submission data.
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
            submitted_at: "2023-03-07",
            score: 140
        }
    }
];

function getLearnerData(course, ag, submissions) {
    // here, we would process this data to achieve the desired result.
    try {

        if (ag.course_id !== course.id) {
            throw new Error("Assignment group does not belong to the specified course."); //Validate if this is the correct data for the correct class
        }
    } catch (error) {
        console.error(error.message);
        return [];
    }
        //make a date so that we can compare the due date to see if its late
    const currentDate = new Date();

    //create function so we can see when the assignment is due
    function isAssignmentDue(assignment) {
        const dueDate = new Date(assignment.due_at);//load data from assignment due date into variable
        return dueDate <= currentDate; //returns true if the assignment is due on the current date
    }

    
    function isSubmissionLate(submission, assignment) {
        const submissionDate = new Date(submission.submission.submitted_at);
        const dueDate = new Date(assignment.due_at);

        return submissionDate > dueDate; //returns true if the assignment is late
                                            
    }

    function calculateFinalScore(submission, assignment) {
        let score = submission.submission.score;
        if (isSubmissionLate(submission, assignment)) {
            score = score - (assignment.points_possible * .1);//apply penalty if isSubmissionLate returns true
        }
        return score;
    }

    function findAssignmentById(assignmentId) {
        for (const assignment of ag.assignments)
            if (assignment.id === assignmentId) {
                return assignment;
            }
        return null;
    }

    function getLearnerIds() {

        const learnerIds = [];      //creating array of learners by id

        for (const submission of submissions) {
            if (!learnerIds.includes(submission.learner_id)){
                learnerIds.push(submission.learner_id)  //putting learners into our array by their id so we can then group them 
            }
        }
        return learnerIds;
    }

    const results = [];
    const learnerIds = getLearnerIds();    //callng learnerid fucnction and making it a variable learnerIds
     
    for(const learnerId of learnerIds){ //looping through our array learnerIds,
                                        //storing their results in object result
        const result = {
            id: learnerId,
            avg: 0
        };

        let totalScore = 0;
        let totalPossible = 0;

        for (const submission of submissions) {
            if(submission.learner_id === learnerId) {  //connecting submissions by id to the learner id who submitted them 
                const assignment = findAssignmentById(submission.assignment_id);
                if(!assignment || !isAssignmentDue(assignment)){ //ignore if the assignment isn't there or it isn't due
                    continue;
                }
                const finalScore = calculateFinalScore(submission, assignment);
                const percentage = finalScore / assignment.points_possible;
                result[assignment.id] = percentage;
                totalScore += finalScore;
                totalPossible += assignment.points_possible;
            }
        }

        if (totalPossible > 0) {
            result.avg = totalScore / totalPossible;
        }

        results.push(result); //putting results into our results object
    }
    return results;
}

console.log("-----SBA Test-----\n");

try {
    const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);
    console.log("Results:");
    console.log(JSON.stringify(result,null,2));
} catch (error) {
    console.error("Error:", error.message);
}   



//const result = [
   // {
        //id: 125,
       // avg: 0.985, // (47 + 150) / (50 + 150)
       // 1: 0.94, // 47 / 50
       // 2: 1.0 // 150 / 150
    //},
    //{
      //  id: 132,
      //  avg: 0.82, // (39 + 125) / (50 + 150)
      //  1: 0.78, // 39 / 50
     //   2: 0.833 // late: (140 - 15) / 150
   // }
//];

//return result;
    

//const result = getLearnerData(CourseInfo, AssignmentGroup, LearnerSubmissions);

//console.log(result);




