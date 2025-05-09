// testSendMessage.js

const { sendMessage } = require('./utils/GeminiAIModal'); // Ensure the correct relative path

const testCases = [
  'Job Role: Full Stack Developer, Job Description: Angular, React, Node.js, MySql, Years of experience: 5, based on the details give me 5 interview questions and answers in JSON format.',
  'Job Role: Data Scientist, Job Description: Python, R, Machine Learning, Data Visualization, Years of experience: 3, based on the details give me 5 interview questions and answers in JSON format.',
  'Job Role: DevOps Engineer, Job Description: AWS, Docker, Kubernetes, CI/CD, Years of experience: 4, based on the details give me 5 interview questions and answers in JSON format.',
  'Job Role: Product Manager, Job Description: Agile, Scrum, Product Roadmap, User Stories, Years of experience: 6, based on the details give me 5 interview questions and answers in JSON format.',
  'Job Role: UX Designer, Job Description: Figma, Adobe XD, User Research, Prototyping, Years of experience: 2, based on the details give me 5 interview questions and answers in JSON format.'
];

testCases.forEach((testInput, index) => {
  sendMessage(testInput)
    .then(result => {
      console.log(`Test Case ${index + 1} Output:`, result);
    })
    .catch(error => {
      console.error(`Test Case ${index + 1} Error:`, error);
    });
});
