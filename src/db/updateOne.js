export async function updateOne(BaseURL, apikey, dataSource, database, collection, filter = {}, update = {}) {
    try {
        const response = await fetch(`${BaseURL}/updateOne`, {
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
                "update": update
            })
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} ${response.statusText}`);
        }

        const result = await response.json();
        return result;
    } catch (error) {
        console.error('Failed to update document:', error.message);
        throw error;
    }
}
