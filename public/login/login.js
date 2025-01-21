export const login_html = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - CryptHunt</title>
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
        <h2 class="text-4xl font-bold mb-4">Login to CryptHunt</h2>
        <p class="text-gray-300 text-lg mb-8">Enter your credentials to start your journey in the CryptHunt!</p>

        <div class="max-w-md mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
            <form id="login-form">
                <div class="mb-4">
                    <label for="username" class="block mb-2">Username</label>
                    <input type="text" id="username" class="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none"
                        placeholder="Enter your username" required>
                </div>
                <div class="mb-4">
                    <label for="password" class="block mb-2">Password</label>
                    <input type="password" id="password"
                        class="w-full px-4 py-2 bg-gray-700 rounded-lg focus:outline-none"
                        placeholder="Enter your password" required>
                </div>
                <button type="submit"
                    class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-full">Login</button>
            </form>

            <div class="mt-4 text-center">
                <p class="text-gray-300">Don't have an account? <a href="/signup" class="text-blue-500">Sign up here</a></p>
            </div>
        </div>
    </section>

    <script>
        document.getElementById('login-form').addEventListener('submit', async (event) => {
            event.preventDefault(); // Prevent default form submission behavior
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            // Convert form data to x-www-form-urlencoded
            const formData = new URLSearchParams();
            formData.append('username', username);
            formData.append('password', password);

            try {
                // Send login request
                const response = await fetch('/internal/login', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/x-www-form-urlencoded',
                    },
                    body: formData.toString(),
                });

                const json = await response.json();

                if (response.ok) {
                    if (json.message === 'Login successful.') {
                        // Redirect to /play on successful login
                        window.location.href = '/play';
                    } else {
                        alert('Unexpected response: ' + json.message);
                    }
                } else {
                    // Display error message
                    alert(json.error || 'Login failed.');
                }
            } catch (error) {
                console.error('Error during login:', error);
                alert('An error occurred. Please try again.');
            }
        });
    </script>
</body>

</html>

`