export default async function handler(req, res) {
    const { name, owner, region, token, id } = req.body;
    if (!name || !owner || !region || !token || !id) {
        res.status(400).json({ error: 'Missing required fields in register-device' });
        return;
    }

    const response = await fetch(`${process.env.API_URL}/devices`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ name, owner, region, id }),
    });

    if (!response?.ok) {
        res.status(500).json({ error: 'Unable to register device' });
        return;
    }

    res.status(200).json();
}
