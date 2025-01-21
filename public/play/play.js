export const play_html = '<!DOCTYPE html>' +
'<html lang="en">' +
'<head>' +
    '<meta charset="UTF-8">' +
    '<meta name="viewport" content="width=device-width, initial-scale=1.0">' +
    '<title>Question Page</title>' +
    '<script src="https://cdn.tailwindcss.com"></script>' +
'</head>' +
'<body class="bg-gray-900 text-white">' +
    '<!-- Navbar -->' +
    '<nav class="flex justify-between items-center py-4 px-8 bg-gray-800">' +
        '<div class="flex items-center space-x-2">' +
            '<div class="bg-gradient-to-r from-blue-500 to-purple-600 w-10 h-10 rounded-full flex justify-center items-center">' +
                '<span class="text-white text-xl font-bold">C</span>' +
            '</div>' +
            '<h1 class="text-2xl font-bold">CryptHunt</h1>' +
        '</div>' +
        '<ul class="hidden md:flex space-x-6 text-lg">' +
            '<li><a href="/" class="hover:text-blue-500">Home</a></li>' +
            '<li><a href="/leaderboard" class="hover:text-blue-500">LeaderBoard</a></li>' +
            '<li><a href="/rules" class="hover:text-blue-500">Rules</a></li>' +
        '</ul>' +
    '</nav>' +
    '<section class="text-center py-16 px-8">' +
        '<div class="bg-gray-800 p-6 rounded-lg shadow-lg">' +
            '<h2 id="question" class="text-2xl font-bold mb-4">Loading question...</h2>' +
            '<input type="text" id="answer" class="w-full p-3 bg-gray-700 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your answer here" />' +
            '<div class="flex justify-center space-x-4 mt-6">' +
                '<button id="submit-btn" class="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg text-lg">Submit</button>' +
                '<button id="next-btn" class="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg text-lg">Next Question</button>' +
            '</div>' +
        '</div>' +
    '</section>' +
    '<script>' +
        'function getQueryParam(param) {' +
            'const urlParams = new URLSearchParams(window.location.search);' +
            'return urlParams.get(param);' +
        '}' +
        'const questionElement = document.getElementById("question");' +
        'const answerInput = document.getElementById("answer");' +
        'const submitBtn = document.getElementById("submit-btn");' +
        'const nextBtn = document.getElementById("next-btn");' +
        'async function fetchQuestion(queNo) {' +
            'try {' +
                'const response = await fetch("/internal/getquestion", {' +
                    'method: "POST",' +
                    'headers: {' +
                        '"Content-Type": "application/x-www-form-urlencoded"' +
                    '},' +
                    'body: "queNo=" + queNo' +
                '});' +
                'if (!response.ok) {' +
                    'throw new Error("Failed to fetch question");' +
                '}' +
                'const data = await response.json();' +
                'if (data.success) {' +
                    'questionElement.textContent = data.question || "No question found!";' +
                '} else {' +
                    'questionElement.textContent = "Failed to fetch question!";' +
                '}' +
            '} catch (error) {' +
                'console.error("Error fetching question:", error);' +
                'questionElement.textContent = "Error loading question!";' +
            '}' +
        '}' +
        'const queNo = getQueryParam("queNo");' +
        'if (queNo) {' +
            'fetchQuestion(queNo);' +
        '} else {' +
            'questionElement.textContent = "Invalid question number!";' +
        '}' +
        'submitBtn.addEventListener("click", () => {' +
            'const userAnswer = answerInput.value.trim();' +
            'alert("You submitted: " + userAnswer);' +
        '});' +
        'nextBtn.addEventListener("click", () => {' +
            'const nextQueNo = parseInt(queNo, 10) + 1;' +
            'window.location.href = "/play?queNo=" + nextQueNo;' +
        '});' +
    '</script>' +
'</body>' +
'</html>';

