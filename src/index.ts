import express, { Request, Response } from 'express';

const app = express();
const port = 3000;

app.get('/api/user/:userId', async (req: Request, res: Response) => {
    const userId = req.params.userId;
    const userInfo = await getUserInfo(userId); // Use await here
    res.json(userInfo);
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});

async function getUserInfo(userId: string): Promise<any> {
    // Simulating an asynchronous operation, replace this with your actual logic
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve({ userId, name: 'John Doe', email: 'john.doe@example.com' });
        }, 1000); // Simulating a delay of 1 second
    });
}
