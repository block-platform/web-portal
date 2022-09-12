export default async function handler(req, res) {
    const { email, password, token } = req.body;
    if (!email || !password || !token) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
    }

    const response = await fetch(`${process.env.API_URL}/clients`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({ email, password }),
    });

    if (!response?.ok) {
        res.status(500).json({ error: 'Unable to register client' });
        return;
    }

    res.status(200).json({ emailToken: email });
}
