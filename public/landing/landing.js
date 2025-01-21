import { siteConfig } from "../../src/config/siteConfig"

export const landing_html = `<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${siteConfig.siteName}</title>
    <script src="${siteConfig.cdns.tailwind}"></script>
</head>

<body class="bg-${siteConfig.bgColor}-${siteConfig.bgColorDense} text-white">
    <!-- Navbar -->
    <nav class="flex justify-between items-center py-4 px-8 bg-gray-900">
        <!-- Logo -->
        <div class="flex items-center space-x-2">
            <div
                class="bg-gradient-to-r from-blue-500 to-purple-600 w-10 h-10 rounded-full flex justify-center items-center">
                <span class="text-white text-xl font-bold">C</span>
            </div>
            <h1 class="text-2xl font-bold">CryptHunt</h1>
        </div>

        <!-- Menu Items and Login Button -->
        <ul id="menu" class="hidden md:flex space-x-6 text-lg">
            <li><a href="/" class="hover:text-blue-500">Home</a></li>
            <li><a href="/play" class="hover:text-blue-500">Play</a></li>
            <li><a href="/leaderboard" class="hover:text-blue-500">LeaderBoard</a></li>
            <li><a href="/rules" class="hover:text-blue-500">Rules</a></li>
            <li><a href="/contact" class="hover:text-blue-500">ContactUs</a></li>
        </ul>
        <div class="flex items-center space-x-4">
            <!-- Login Button -->
            <button id="login-btn"
                class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg md:inline-block block">
                Login
            </button>
           
            <!-- Hamburger Button -->
            <button id="menu-btn" class="block md:hidden text-gray-300 text-2xl focus:outline-none">
                <span>☰</span>
            </button>

           
        </div>
    </nav>

    <!-- Dropdown Menu for Small Screens -->
    <div id="dropdown-menu" class="hidden bg-gray-800 md:hidden">
        <ul class="space-y-2 text-lg text-center py-4">
            <li><a href="/" class="block hover:text-blue-500">Home</a></li>
            <li><a href="/play" class="block hover:text-blue-500">Play</a></li>
            <li><a href="/leaderboard" class="block hover:text-blue-500">LeaderBoard</a></li>
            <li><a href="/rules" class="block hover:text-blue-500">Rules</a></li>
            <li><a href="/contact" class="block hover:text-blue-500">ContactUs</a></li>
        </ul>
    </div>

    <!-- Main Content -->
    <section class="text-center py-32 px-8">
        <h2 class="text-4xl font-bold mb-4">The Hunt is about to begin!</h2>
        <p class="text-gray-300 text-lg mb-8">Don't miss out on the most awaited CryptHunt. Secure your spot and prepare
            for an exhilarating experience.</p>

        <!-- Timer -->
        <div class="flex justify-center space-x-4 text-gray-300 text-lg">
            <div class="text-center">
                <div class="text-5xl font-mono" id="days">00</div>
                <span>Days</span>
            </div>
            <div class="text-center">
                <div class="text-5xl font-mono" id="hours">00</div>
                <span>Hours</span>
            </div>
            <div class="text-center">
                <div class="text-5xl font-mono" id="minutes">00</div>
                <span>Minutes</span>
            </div>
            <div class="text-center">
                <div class="text-5xl font-mono" id="seconds">00</div>
                <span>Seconds</span>
            </div>
        </div>

        <!-- Start Button -->
        <div class="mt-8">
            <button id="start-btn" class="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg text-lg">
                Start the Hunt
            </button>
        </div>
    </section>
    

    <!-- JavaScript -->
    <script>
        // Toggle dropdown menu for small screens
        const menuBtn = document.getElementById('menu-btn');
        const dropdownMenu = document.getElementById('dropdown-menu');
        menuBtn.addEventListener('click', () => {
            dropdownMenu.classList.toggle('hidden');
        });

 
        const loginBtn = document.getElementById('login-btn');
        const startBtn = document.getElementById('start-btn');

        loginBtn.addEventListener('click', () => {
            window.location.href = '/login';
        });
        startBtn.addEventListener('click', () => {
            window.location.href = '/play' ;
        });

    

        // Countdown Timer Script
        function countdown(targetDate) {
            const daysEl = document.getElementById("days");
            const hoursEl = document.getElementById("hours");
            const minutesEl = document.getElementById("minutes");
            const secondsEl = document.getElementById("seconds");

            function updateCountdown() {
                const now = new Date().getTime();
                const distance = targetDate - now;

                if (distance < 0) {
                    clearInterval(timer);
                    daysEl.textContent = "00";
                    hoursEl.textContent = "00";
                    minutesEl.textContent = "00";
                    secondsEl.textContent = "00";
                    return;
                }

                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                daysEl.textContent = String(days).padStart(2, "0");
                hoursEl.textContent = String(hours).padStart(2, "0");
                minutesEl.textContent = String(minutes).padStart(2, "0");
                secondsEl.textContent = String(seconds).padStart(2, "0");
            }

            updateCountdown();
            const timer = setInterval(updateCountdown, 1000);
        }

        const targetDate = new Date("2025-02-14T00:00:00").getTime(); // Set your target date here
        countdown(targetDate);
    </script>
    <script>
    // Utility function to get a cookie value by name
   function getCookie(name) {
    const cookies = document.cookie.split(';'); // Split cookies into an array
    for (let i = 0; i < cookies.length; i++) {
        const cookie = cookies[i].trim(); // Trim whitespace
        if (cookie.startsWith(name + '=')) {
            return cookie.substring(name.length + 1); // Return the value of the cookie
        }
    }
    return null; // Return null if the cookie is not found
}


    // Check for token in cookies
    const token = getCookie('token'); // Replace 'token' with the name of your cookie
    const loginBtn = document.getElementById('login-btn');
    const navContainer = loginBtn.parentElement;

    if (token) {
        // Token is present, show "Profile" button
        const profileBtn = document.createElement('button');
        profileBtn.id = 'profile-btn';
        profileBtn.className = 'bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg md:inline-block block';
        profileBtn.textContent = 'Profile';
        profileBtn.addEventListener('click', () => {
            window.location.href = '/profile'; // Adjust the URL for your profile page
        });

        // Replace the login button with the profile button
        navContainer.replaceChild(profileBtn, loginBtn);
    } else {
        // Token is not present, keep "Login" button functionality
        loginBtn.addEventListener('click', () => {
            window.location.href = '/login';
        });
    }
</script>

</body>

</html>


`