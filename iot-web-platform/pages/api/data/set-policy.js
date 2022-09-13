export default async function handler(req, res) {
    const { device_id, accessing_device_id, accessing_user_id, token } = req.body;
    if (!device_id || !accessing_device_id || !accessing_user_id || !token) {
        res.status(400).json({ error: 'Missing required fields in set-policy' });
        return;
    }

    const response = await fetch(`${process.env.API_URL}/policies`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ device_id, accessing_device_id, accessing_user_id }),
    });

    if (!response?.ok) {
        res.status(500).json({ error: 'Unable to add policy' });
        return;
    }

    res.status(200).json();
}
