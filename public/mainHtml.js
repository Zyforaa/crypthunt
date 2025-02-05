import { siteConfig } from "../src/config/siteConfig"

export function headAndNav(mainContent,scripts = ""){
    const div = `
    <!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>${siteConfig.siteName}</title>
    <script src="${siteConfig.cdns.tailwind}"></script>
</head>

<body class="bg-${siteConfig.bgColor}-${siteConfig.bgColorDense} text-white">

    <!-- Navbar -->
    <nav class="flex justify-between items-center py-4 px-8 bg-${siteConfig.bgColor}-${siteConfig.bgColorDense}">
       <a href="/" class="flex items-center space-x-2">
    <img src="${siteConfig.logoUrl}" alt="CryptHunt Logo" class="w-10 h-10 rounded-full object-cover">
    <h1 class="text-2xl font-bold">CryptHunt</h1>
</a>



        <ul id="menu" class="hidden md:flex space-x-6 text-lg">
            <li><a href="/" class="hover:text-blue-500">Home</a></li>
            <li><a href="/play" class="hover:text-blue-500">Play</a></li>
            <li><a href="/leaderboard" class="hover:text-blue-500">LeaderBoard</a></li>
            <li><a href="/rules" class="hover:text-blue-500">Rules</a></li>
            <li><a href="/contact" class="hover:text-blue-500">ContactUs</a></li>
        </ul>
        <div class="flex items-center space-x-4">
            <!-- Placeholder for Login/Logout/Profile -->
            <div id="auth-container">
                <div class="animate-pulse bg-gray-700 w-20 h-8 rounded"></div>
            </div>
            <!-- Hamburger Button -->
<button id="menu-btn" aria-label="Toggle menu" class="block md:hidden text-gray-300 text-2xl focus:outline-none">
    <span>☰</span>
</button>


        </div>
    </nav>
    <div id="dropdown-menu" class="hidden bg-gray-800 md:hidden">
        <ul class="space-y-2 text-lg text-center py-4">
            <li><a href="/" class="block hover:text-blue-500">Home</a></li>
            <li><a href="/play" class="block hover:text-blue-500">Play</a></li>
            <li><a href="/leaderboard" class="block hover:text-blue-500">LeaderBoard</a></li>
            <li><a href="/rules" class="block hover:text-blue-500">Rules</a></li>
            <li><a href="/contact" class="block hover:text-blue-500">ContactUs</a></li>
        </ul>
    </div>

        <!-- Main Content Start -->

        ${mainContent}

        <!-- Main Content End -->
    </body>
<script>
    const menuBtn = document.getElementById('menu-btn');
    const dropdownMenu = document.getElementById('dropdown-menu');
    menuBtn.addEventListener('click', () => {
        dropdownMenu.classList.toggle('hidden');
    });
</script>
<script>
    // Fetch and Update Auth Container
    const authContainer = document.getElementById("auth-container");

    const fetchUserStatus = async () => {
        try {
            const response = await fetch("/internal/getUser", { method: "POST", headers: { "Content-Type": "application/json" } });
            const data = await response.json();

            authContainer.innerHTML = ""; // Clear skeleton loader

            if (data.error && data.type === "user not logged in") {
                const loginBtn = document.createElement("button");
                loginBtn.textContent = "Login";
                loginBtn.classList.add("bg-blue-500", "hover:bg-blue-600", "text-white", "px-4", "py-2", "rounded-lg");
                loginBtn.addEventListener("click", () => window.location.href = "/login");
                authContainer.appendChild(loginBtn);
            } else if (!data.error && data.message === "user logged in") {
                const logoutBtn = document.createElement("button");
                const profileBtn = document.createElement("button");

                logoutBtn.textContent = "Logout";
                profileBtn.textContent = "Profile";

                logoutBtn.classList.add("bg-red-500", "hover:bg-red-600", "text-white", "px-4", "py-2", "rounded-lg");
                profileBtn.classList.add("bg-gray-500", "hover:bg-gray-600", "text-white", "px-4", "py-2", "rounded-lg", "ml-2");

                logoutBtn.addEventListener("click", () => window.location.href = "/logout");
                profileBtn.addEventListener("click", () => window.location.href = "/profile");

                authContainer.append(logoutBtn, profileBtn);
            }
        } catch (error) {
            console.error("Error fetching user status:", error);
        }
    };

    fetchUserStatus();
</script>
${scripts}
    
    `


    return div
}