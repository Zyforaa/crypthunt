import { siteConfig } from "../../src/config/siteConfig";
export const landing_html = `

    <section class="text-center py-32 px-8">
        <h2 class="text-4xl font-bold mb-4">The Hunt is about to begin!</h2>
        <p class="text-gray-300 text-lg mb-8">Don't miss out on the most awaited CryptHunt. Secure your spot and prepare for an exhilarating experience.</p>

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
        <div class="mt-8">
            <button id="start-btn" class="bg-green-500 hover:bg-green-600 text-white px-6 py-3 rounded-lg text-lg">
                Start the Hunt
            </button>
        </div>
    </section>

    <script>
        // Countdown Timer Script
        const countdown = (targetDate) => {
            const updateCountdown = () => {
                const now = new Date().getTime();
                const distance = targetDate - now;

                if (distance < 0) {
                    clearInterval(timer);
                    ["days", "hours", "minutes", "seconds"].forEach(id => document.getElementById(id).textContent = "00");
                    return;
                }

                const days = Math.floor(distance / (1000 * 60 * 60 * 24));
                const hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                const minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                const seconds = Math.floor((distance % (1000 * 60)) / 1000);

                document.getElementById("days").textContent = String(days).padStart(2, "0");
                document.getElementById("hours").textContent = String(hours).padStart(2, "0");
                document.getElementById("minutes").textContent = String(minutes).padStart(2, "0");
                document.getElementById("seconds").textContent = String(seconds).padStart(2, "0");
            };

            const timer = setInterval(updateCountdown, 1000);
            updateCountdown();
        };

        countdown(new Date("${siteConfig.countdownDate}").getTime());

    </script>
    <script>
    const startBtn = document.getElementById('start-btn');
    startBtn.addEventListener('click', () => {
        window.location.href = '/play';
    });
</script>
</body>

</html>`;
