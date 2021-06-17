# Airlearn-Assignment
Node JS v12.18.4

You need to write APIs for a minimalistic online examination system.

Here are the user stories ::

=> As a user, I should be able to create exams. 

=> As a user, I should be able to attempt exams (fetching question papers, submitting answers for the questions). 

=> As a user, I should be able to view the result of the exam after successful completion. (total marks obtained). 

An exam can have multiple questions, the questions will be of a single select MCQ type.

For each correct question the user gets 4 marks, and for incorrect questions the user gets -1 marks.  

You don't need to implement any authentication. 

Just write the APIs for the exam module.

-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------


Here are the JSON objects to be sent in the body of the POST requests for the APIs designed in this application.

--> http://localhost:3001/api/subject [POST]

    {
        "text": "Computer Science"
    }
    
    
--> http://localhost:3001/api/questions [POST]

    {
      "text": "Evaluate x << 1 if x == 1",
      "options": [
          {
              "text": "1",
              "isAnswer": false
          },
          {
              "text": "2",
              "isAnswer": true
          },
          {
              "text": "3",
              "isAnswer": false
          },
          {
              "text": "4",
              "isAnswer": false
          }
      ],
      "subject": "60cb5325781e450d085794a8"            //   subject_id 
    }
  
  
--> http://localhost:3001/api/exam  [POST]

    {
      "name": "CS-01",
      "duration": 180,
      "questions": [
          "60cb57d8a9cb825678f27507",
          "60cb57eba9cb825678f2750c",
          "60cb586ca9cb825678f27511"
      ],
      "subject": "60cb5325781e450d085794a8"
    }
  
 
--> http://localhost:3001/api/exam/60cb5e8193035b3ec8014d2d  [GET]       //exam_id
  
    GETs the questions by sending the EXAM id
  
    
--> http://localhost:3001/api/exam/submit   [POST]

    Submits the Exam
    
  {
  
    "examId": "60cb5e8193035b3ec8014d2d",
    
    "answers": [ 
        "60cb565750a545362c4beecb", 
        "60cb5757a9cb825678f274fb", 
        "60cb57afa9cb825678f27501"
    ]
  }
