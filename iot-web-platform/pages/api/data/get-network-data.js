export default async function GetNetworkData(req, res) {
    console.log("GOT IN HERE")
    const response = await fetch(`${process.env.API_URL}/devices`);

    if (!response?.ok) {
        res.status(500).json({ error: 'Unable to fetch network data' });
        return;
    }

    const body = await response.json();
    console.log("Returning network data");
    console.log(body)
    res.status(200).json(body);
}
