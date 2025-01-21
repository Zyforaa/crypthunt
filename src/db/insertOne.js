export async function insertOne(BaseURL, apikey, dataSource, database, collection, document = {}) {
    try {
        const response = await fetch(`${BaseURL}/insertOne`, {
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
                "document": document
            })
        });

        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }

        const result = await response.json();
        return result;

    } catch (error) {
        console.error('Failed to insert document:', error.message);
        throw error;
    }
}