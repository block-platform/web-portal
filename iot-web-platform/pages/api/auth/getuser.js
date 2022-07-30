export default async function GetAuthenticatedUser(req, res) {
    const defaultReturnObject = { authenticated: false, user: null };
    try {
        // Make API call to get user
        // if (!nextUser) {
        //     res.status(400).json(defaultReturnObject);
        //     return;
        // }

        // Hardcoded response for now
        console.log("Returning hardcoded user");
        res.status(200).json({ authenticated: true, user: { email: "tester@gmail.com" } });
    }
    catch (err) {
        console.log('GetAuthenticatedUser, Something Went Wrong', err);
        res.status(400).json(defaultReturnObject);
    }
}
