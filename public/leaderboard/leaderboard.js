export const leaderboard_html = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Leaderboard - CryptHunt</title>
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
    <section class="text-center py-16 px-8">
        <h2 class="text-4xl font-bold mb-8">Leaderboard</h2>
        <p class="text-gray-300 text-lg mb-12">Track your progress and see where you stand!</p>

        <!-- Leaderboard Table -->
        <div class="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
            <table class="table-auto w-full text-left text-gray-300">
                <thead>
                    <tr class="bg-gray-700 text-gray-200">
                        <th class="px-4 py-2">Rank</th>
                        <th class="px-4 py-2">Player</th>
                        <th class="px-4 py-2">Right Answers</th>
                        <th class="px-4 py-2">Wrong Answers</th>
                        <th class="px-4 py-2">Unattempted</th>
                        <th class="px-4 py-2">Score</th>
                    </tr>
                </thead>
                <tbody>
                    <!-- Example Row 1 -->
                    <tr class="bg-gray-800 hover:bg-gray-700">
                        <td class="px-4 py-2">1</td>
                        <td class="px-4 py-2">Player1</td>
                        <td class="px-4 py-2 text-green-500">15</td>
                        <td class="px-4 py-2 text-red-500">3</td>
                        <td class="px-4 py-2 text-gray-400">2</td>
                        <td class="px-4 py-2 font-bold text-blue-500">150</td>
                    </tr>
                    <!-- Example Row 2 -->
                    <tr class="bg-gray-800 hover:bg-gray-700">
                        <td class="px-4 py-2">2</td>
                        <td class="px-4 py-2">Player2</td>
                        <td class="px-4 py-2 text-green-500">12</td>
                        <td class="px-4 py-2 text-red-500">5</td>
                        <td class="px-4 py-2 text-gray-400">3</td>
                        <td class="px-4 py-2 font-bold text-blue-500">120</td>
                    </tr>
                    <!-- Example Row 3 -->
                    <tr class="bg-gray-800 hover:bg-gray-700">
                        <td class="px-4 py-2">3</td>
                        <td class="px-4 py-2">Player3</td>
                        <td class="px-4 py-2 text-green-500">10</td>
                        <td class="px-4 py-2 text-red-500">8</td>
                        <td class="px-4 py-2 text-gray-400">2</td>
                        <td class="px-4 py-2 font-bold text-blue-500">100</td>
                    </tr>
                </tbody>
            </table>
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

    <!-- JavaScript -->
    <script>
        // Show Login Modal
        const loginBtn = document.getElementById('login-btn');
        const loginModal = document.getElementById('login-modal');
        const closeModal = document.getElementBy
`