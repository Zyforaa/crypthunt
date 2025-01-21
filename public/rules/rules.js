export const rules_html = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Rules - CryptHunt</title>
    <script src="https://cdn.tailwindcss.com"></script>
</head>

<body class="bg-gray-900 text-white">
    <!-- Navbar -->
    <nav class="flex justify-between items-center py-4 px-8 bg-gray-900">
        <div class="flex items-center space-x-2">
            <div
                class="bg-gradient-to-r from-blue-500 to-purple-600 w-10 h-10 rounded-full flex justify-center items-center">
                <span class="text-white text-xl font-bold">C</span>
            </div>
            <h1 class="text-2xl font-bold">CryptHunt</h1>
        </div>

        <ul id="menu" class="hidden md:flex space-x-6 text-lg">
            <li><a href="/play" class="hover:text-blue-500">Play</a></li>
            <li><a href="/leaderboard" class="hover:text-blue-500">LeaderBoard</a></li>
            <li><a href="/rules" class="hover:text-blue-500">Rules</a></li>
            <li><a href="/contact" class="hover:text-blue-500">ContactUs</a></li>
        </ul>

        <div class="flex items-center space-x-4">
            <button id="login-btn"
                class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg md:inline-block block">
                Login
            </button>
        </div>
    </nav>

    <!-- Main Content -->
    <section class="text-center py-32 px-8">
        <h2 class="text-4xl font-bold mb-4">CryptHunt Rules</h2>
        <p class="text-gray-300 text-lg mb-8">Please read and follow the rules for an exciting and fair competition.</p>

        <div class="space-y-4 text-left max-w-4xl mx-auto">
            <h3 class="text-2xl font-bold">1. Eligibility</h3>
            <p>Participants must be registered users to join the CryptHunt event. Anyone with valid registration can play.</p>

            <h3 class="text-2xl font-bold">2. Participation</h3>
            <p>Each participant will be given a set of clues. The goal is to decode and find the answers in the shortest time.</p>

            <h3 class="text-2xl font-bold">3. Fair Play</h3>
            <p>No cheating, collaboration, or external tools allowed. Participants must rely solely on their problem-solving skills.</p>

            <h3 class="text-2xl font-bold">4. Points and Leaderboard</h3>
            <p>Points will be awarded based on the time taken to solve the puzzles. The leaderboard will show the top players.</p>

            <h3 class="text-2xl font-bold">5. Prize</h3>
            <p>The winners will receive exciting rewards and recognition during the closing ceremony.</p>
        </div>
    </section>

    <!-- Login Modal -->
    <div id="login-modal" class="fixed inset-0 bg-black bg-opacity-50 hidden flex justify-center items-center">
        <div class="bg-gray-800 p-8 rounded-lg shadow-lg w-80">
            <h2 class="text-2xl font-bold mb-4">Login</h2>
            <form>
                <div class="mb-4">
                    <label for="username" class="block mb-2">Username</label>
                    <input type="text" id="username" class="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none"
                        placeholder="Enter your username">
                </div>
                <div class="mb-4">
                    <label for="password" class="block mb-2">Password</label>
                    <input type="password" id="password"
                        class="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none"
                        placeholder="Enter your password">
                </div>
                <button type="submit"
                    class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-full">Login</button>
            </form>
            <button id="close-modal"
                class="mt-4 text-gray-400 hover:text-gray-300 focus:outline-none w-full">Cancel</button>
        </div>
    </div>

    <script>
        // Show Login Modal
        const loginBtn = document.getElementById('login-btn');
        const loginModal = document.getElementById('login-modal');
        const closeModal = document.getElementById('close-modal');

        loginBtn.addEventListener('click', () => {
            loginModal.classList.remove('hidden');
        });

        closeModal.addEventListener('click', () => {
            loginModal.classList.add('hidden');
        });
    </script>
</body>

</html>
`