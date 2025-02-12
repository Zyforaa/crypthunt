export const login_html = `
    

    <!-- Main Content -->
    <section class="text-center py-10 px-8">
        <h2 class="text-4xl font-bold mb-4">Login to CryptHunt</h2>
        <p class="text-gray-300 text-lg mb-8">Enter your credentials to start your journey in the CryptHunt!</p>

        <div class="max-w-md mx-auto bg-gray-800 p-8 backdrop-blur-xl bg-opacity-60 rounded-2xl shadow-lg">
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

          
        </div>
    </section>

    <script>
        document.getElementById('login-form').addEventListener('submit', async (event) => {
            event.preventDefault();  
            
            const username = document.getElementById('username').value;
            const password = document.getElementById('password').value;

            const formData = new URLSearchParams();
            formData.append('username', username);
            formData.append('password', password);

            try {
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
                        window.location.href = '/play?queNo=1';
                    } else {
                        alert('Unexpected response: ' + json.message);
                    }
                } else {
                    alert(json.error || 'Login failed.');
                }
            } catch (error) {
                console.error('Error during login:', error);
                alert('An error occurred. Please try again.');
            }
        });
    </script>

`