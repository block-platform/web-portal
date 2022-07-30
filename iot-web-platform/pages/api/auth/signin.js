import { withIronSessionApiRoute } from 'iron-session/next';

const cookie = {
    cookieName: process.env.COOKIE_NAME,
    password: process.env.COOKIE_PASSWORD,
    cookieOptions: { secure: process.env.NODE_ENV === 'production' },
};

export default withIronSessionApiRoute(
    async function SignIn(req, res) {
        const { email, password } = req.body;
        if (!email || !password) {
            res.status(400).json({ error: 'Missing required fields' });
            return;
        }

        const response = await fetch(`${process.env.API_URL}/users/signin`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ email, password }),
        });

        if (!response?.ok) {
            res.status(500).json({ error: 'Unable to sign in user' });
            return;
        }

        const body = await response.json();
        req.session.user = {
            emailToken: body.token || email,
        };

        await req.session.save();
        res.status(200).json({ emailToken: body.token || email });
    },
    cookie
);
