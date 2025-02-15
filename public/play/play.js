export const play_html = `
    <section class="text-center py-16 px-8">
        <!-- Question Section -->
        <div class="bg-gray-800 p-6 rounded-lg shadow-lg">
            <h2 id="question" class="text-2xl font-bold mb-4">Loading question...</h2>

            <!-- Answer Input -->
            <input type="text" id="answer" class="w-full p-3 bg-gray-700 rounded-lg text-lg focus:outline-none focus:ring-2 focus:ring-blue-500" placeholder="Enter your answer here" />

            <!-- Buttons -->
            <div class="flex justify-center space-x-4 mt-6">
                <button id="submit-btn" class="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg text-lg">
                    Submit
                </button>
               
            </div>
        </div>
    </section>
</body>
<script>
document.addEventListener("DOMContentLoaded", async () => {
    let currentQuestionNumber = 0;

    // Function to fetch and display the next question
    async function fetchQuestion(questionNumber) {
        try {
            const response = await fetch("/internal/getQuestion", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ questionNumber }),
            });

            if (!response.ok) throw new Error("Failed to fetch question");

            const data = await response.json();
            document.getElementById("question").innerText = data.question;
            document.getElementById("answer").value = ""; // Clear input
            currentQuestionNumber = questionNumber;
        } catch (error) {
            console.error("Error fetching question:", error);
            alert("Failed to load question. Please try again.");
        }
    }

    try {
        // Fetch last attempted question number
        const statusResponse = await fetch("/internal/getQuestionsStatus", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });

        if (!statusResponse.ok) throw new Error("Failed to fetch question status");

        const statusData = await statusResponse.json();
        currentQuestionNumber = statusData.lastAttemptedQuestion + 1;

        // Fetch and display the first question
        await fetchQuestion(currentQuestionNumber);

// Handle submit button click
document.getElementById("submit-btn").addEventListener("click", async () => {
    const answerInput = document.getElementById("answer");
    const answer = answerInput.value.trim();

    if (!answer) {
        alert("Please enter an answer before submitting.");
        return;
    }

    try {
        // Submit answer along with question number
        const submitResponse = await fetch("/internal/submit", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ questionNumber: currentQuestionNumber, answer }),
        });

        if (!submitResponse.ok) {
            alert("Failed to submit answer");
            return; // Stop execution
        }

        const submitData = await submitResponse.json();

        // If the answer is wrong, alert and stop
        if (submitData.wrong) {
            alert("Wrong Answer");
            return; // Do not fetch next question
        }

        // If there's a next question, fetch it
        if (submitData.nextqueNumber) {
            fetchQuestion(submitData.nextqueNumber);
        } else {
            alert("No more questions available.");
        }
    } catch (error) {
        console.error("Error submitting answer:", error);
        alert("An error occurred. Please try again.");
    }
});

    } catch (error) {
        console.error("Error:", error);
        alert("An error occurred. Please try again.");
    }
});

</script>
</html>
`

