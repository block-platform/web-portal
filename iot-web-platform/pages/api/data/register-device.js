export default async function handler(req, res) {
    const { name, owner, region } = req.body;
    if (!name || !owner || !region) {
        res.status(400).json({ error: 'Missing required fields in register-device' });
        return;
    }

    const response = await fetch(`${process.env.API_URL}/devices`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, owner, region }),
    });

    if (!response?.ok) {
        res.status(500).json({ error: 'Unable to register device' });
        return;
    }

    res.status(200).json();
}
