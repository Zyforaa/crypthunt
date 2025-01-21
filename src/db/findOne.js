export async function findOne(BaseURL, apikey, dataSource, database, collection, filter = {}, projection = {}) {
    try {
        const response = await fetch(`${BaseURL}/findOne`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Request-Headers': '*',
                'api-key': apikey
            },
            body: JSON.stringify({
                "dataSource": dataSource,
                "database": database,
                "collection": collection,
                "filter": filter,
                "projection": projection
            })
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Failed to fetch document:', error.message);
        throw error;
    }
}