export default async function handler(req, res) {
    const { token } = JSON.parse(req.body);

    if (!token) {
        res.status(400).json({ error: 'Missing required fields in get-network-data' });
        return;
        // console.log("Missing required fields in get-network-data");
    }

    const response = await fetch(`${process.env.API_URL}/devices`, {
        method: 'GET',
        headers: {
            'Authorization': `Bearer ${token}`,
        },
    });

    if (!response?.ok) {
        res.status(500).json({ error: 'Unable to fetch network data' });
        return;
    }

    const body = await response.json();
    console.log("Returning network data:");
    // console.log(body)
    res.status(200).json(body);
}
