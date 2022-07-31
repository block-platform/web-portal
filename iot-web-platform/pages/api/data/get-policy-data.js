export default async function handler(req, res) {
    const response = await fetch(`${process.env.API_URL}/policies`);

    if (!response?.ok) {
        res.status(500).json({ error: 'Unable to fetch policy data' });
        return;
    }

    const body = await response.json();
    console.log("Returning policy data:");
    console.log(body)
    res.status(200).json(body);
}
