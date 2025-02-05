import { Hono } from 'hono';
import { authConfig } from '../config/authConfig';
import { findOne } from '../db/findOne';
import { cors } from 'hono/cors';
import { prettyJSON } from 'hono/pretty-json';
import { decode, sign, verify } from 'hono/jwt'
import { setCookie , getCookie } from 'hono/cookie'
import { use } from 'hono/jsx';
import { find } from '../db/find';


const backend = new Hono();

backend.use(cors());
backend.use(prettyJSON());


//login
backend.post('/login', async (c) => {
    try {
        const form = await c.req.formData()
        const username = form.get('username')
        const password = form.get('password')
        if (!username || !password) {
            return c.json({ error: 'Missing username or password' }, 400);
        }

        const dbdata = {
            baseURL: authConfig.mongo.dbUrl,
            apikey: authConfig.mongo.dbKey,
            dataSource: authConfig.mongo.dataSource,
            database: authConfig.mongo.database,
            collection: authConfig.mongo.collections.cc1,
        };

        const dbfind = await findOne(dbdata.baseURL, dbdata.apikey, dbdata.dataSource, dbdata.database, dbdata.collection, { name: username }, {});
        if (!dbfind.document) {
            return c.json({ error: 'User not found. Check username or password' }, 401);
        }

        if (dbfind.document.password !== password) {
            return c.json({ error: 'Wrong Password Entered!' }, 401);
        }

        const cookiesToken = {
            sub: dbfind.document._id,
            username: dbfind.document.name,
            email: dbfind.document.email,
            iat: new Date(),
        };

        const token = await sign(cookiesToken, authConfig.jwtSecret)
        setCookie(c, 'token', token, {
            httpOnly: true,
            secure: true,
            sameSite: 'Strict',
            maxAge: 1296000, // 15 days
        });
        return c.json({ message: 'Login successful.' });
    } catch (error) {
        console.error('Login Error:', error.message);
        return c.json({ error: 'Internal Server Error' }, 500);
    }
})

// play
backend.post('/getquestion', async (c) => {
    try {
        // Get form data
        const form = await c.req.formData();
        const queNo = parseInt(form.get('queNo'), 10);

        // Validate question number
        if (isNaN(queNo) || queNo <= 0) {
            return c.json({ error: true, type: 'invalid question number' });
        }

        // Get user token
        const token = getCookie(c, 'token');
        if (!token) {
            return c.json({ error: true, type: 'user not logged in' });
        }

        // Decode token
        const { header, payload } = decode(token);
        const username = payload?.username;

        console.log('Decoded Header:', header);
        console.log('Decoded Payload:', payload);
        console.log('Username:', username);

        if (!username) {
            return c.json({ error: true, type: 'invalid token data' });
        }

        // Fetch user data from MongoDB
        const userData = await findOne(
            authConfig.mongo.dbUrl,
            authConfig.mongo.dbKey,
            authConfig.mongo.dataSource,
            authConfig.mongo.database,
            authConfig.mongo.collections.cc1,
            { name: username },
            { attemptedQues: 1 }
        );

        if (!userData || !userData.document) {
            return c.json({ error: true, type: 'user data not found' });
        }

        // Ensure attemptedQues is a valid array
        let attemptedQuestions = userData.document.attemptedQues;

        // Convert string to an array if needed
        if (typeof attemptedQuestions === 'string') {
            try {
                attemptedQuestions = JSON.parse(attemptedQuestions);
            } catch (error) {
                console.error('Failed to parse attemptedQues:', error);
                return c.json({ error: true, type: 'corrupt user data' });
            }
        }

        // Ensure it's always an array
        if (!Array.isArray(attemptedQuestions)) {
            attemptedQuestions = [];
        }

        console.log("Attempted Questions:", attemptedQuestions);
        console.log("Attempted Questions Type:", typeof attemptedQuestions);
        console.log("Attempted Questions Length:", attemptedQuestions.length);

        // Ensure user is attempting questions sequentially
        const nextQuestion = attemptedQuestions.length + 1;
        if (queNo !== nextQuestion) {
            return c.json({
                error: true,
                type: 'attempt questions sequentially',
                nextQuestion: nextQuestion,
            });
        }

        // Fetch the requested question from MongoDB
        const question = await findOne(
            authConfig.mongo.dbUrl,
            authConfig.mongo.dbKey,
            authConfig.mongo.dataSource,
            authConfig.mongo.database,
            authConfig.mongo.collections.cc2,
            { id: queNo },
            { value: 1 }
        );

        if (!question || !question.document) {
            return c.json({ error: true, type: 'question not found' });
        }

        return c.json({ error: false, question: question.document });

    } catch (error) {
        console.error('Error in /getquestion:', error);
        return c.json({ error: true, type: 'server error', details: error.message });
    }
});



backend.post('/getUser', async (c) => {
    const cookieHeader = c.req.header('cookie');  

    if (!cookieHeader || !cookieHeader.includes('token')) {  
        return c.json({ error: true, type: 'user not logged in' });
    }

    return c.json({ error: false, message: 'user logged in' });
});

// answer submission
backend.post('/submit' , async (c) => {
    
});


//leaderboard
backend.post('/leaderboard' , async (c) => {
    const scoreJsonArray = await find(
        authConfig.mongo.dbUrl,
        authConfig.mongo.dbKey,
        authConfig.mongo.dataSource,
        authConfig.mongo.database,
        authConfig.mongo.collections.cc1,{name:1,score:1})

    

    return c.json(scoreJsonArray)
    
});


export default backend;