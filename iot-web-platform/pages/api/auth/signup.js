export default async function handler(req, res) {
    const { email, password, company } = req.body;
    if (!email || !password || !company) {
        res.status(400).json({ error: 'Missing required fields' });
        return;
    }

    const response = await fetch(`${process.env.API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password, company }),
    });

    if (!response?.ok) {
        res.status(500).json({ error: 'Unable to register user' });
        return;
    }

    res.status(200).json({ emailToken: email });
}
