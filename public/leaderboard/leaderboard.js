export const leaderboard_html = `



    <!-- Main Content -->
    <section class="text-center py-16 px-8">
        <h2 class="text-4xl font-bold mb-8">Leaderboard</h2>
        <p class="text-gray-300 text-lg mb-12">Track your progress and see where you stand!</p>

        <div class="max-w-4xl mx-auto bg-gray-800 p-6 rounded-lg shadow-lg">
            <table class="table-auto w-full text-left text-gray-300">
                <thead>
                    <tr class="bg-gray-700 text-gray-200">
                        <th class="px-4 py-2">S.No</th>
                        <th class="px-4 py-2">Team Name</th>
                        <th class="px-4 py-2">Score</th>
                    </tr>
                </thead>
                <tbody id="leaderboard-body">
                    <tr>
                        <td colspan="3" class="text-center py-4 text-gray-400">Loading...</td>
                    </tr>
                </tbody>
            </table>
        </div>
    </section>

<script>
    async function fetchLeaderboard() {
        try {
            const response = await fetch('/internal/leaderboard', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' }
            });
            const result = await response.json();

            const leaderboardBody = document.getElementById('leaderboard-body');
            leaderboardBody.innerHTML = '';

            if (result.error) {
                leaderboardBody.innerHTML = '<tr>' +
                    '<td colspan="3" class="text-center py-4 text-red-500">' + result.message + '</td>' +
                '</tr>';
                return;
            }

            // Sort teams by score in descending order (convert score to number)
            const sortedTeams = result.documents.sort((a, b) => Number(b.score) - Number(a.score));

            let rows = '';
            sortedTeams.forEach((team, index) => {
                rows += '<tr class="bg-gray-800 hover:bg-gray-700">' +
                            '<td class="px-4 py-2">' + (index + 1) + '</td>' +
                            '<td class="px-4 py-2">' + team.name + '</td>' +
                            '<td class="px-4 py-2 font-bold text-blue-500">' + team.score + '</td>' +
                        '</tr>';
            });

            leaderboardBody.innerHTML = rows;

        } catch (error) {
            document.getElementById('leaderboard-body').innerHTML = '<tr>' +
                '<td colspan="3" class="text-center py-4 text-red-500">Failed to load leaderboard.</td>' +
            '</tr>';
        }
    }

    window.onload = fetchLeaderboard;
</script>


`;
