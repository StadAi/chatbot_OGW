export default function handler(req, res) {
    if (req.method === 'GET') {
        return res.status(200).json({ antwoord: "Hallo! Hoe kan ik je helpen?" });
    } else {
        return res.status(405).json({ error: "Methode niet toegestaan" });
    }
}