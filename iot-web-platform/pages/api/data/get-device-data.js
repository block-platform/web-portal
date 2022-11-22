export default async function handler(req, res) {
    const { email, password, device_id } = req.body;

    if (!email || !password || !device_id) {
        res.status(400).json({ error: 'Missing required fields in get-device-data' });
        return;
    }

    const response = await fetch(`${process.env.API_URL}/iot/fetch-data/${device_id}`, {
        method: 'GET'
    });

    if (!response?.ok) {
        res.status(500).json({ error: 'Unable to fetch IoT device data' });
        return;
    }

    const body = await response.json();
    res.status(200).json(body);
}
