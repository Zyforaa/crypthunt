import { Hono } from 'hono';
import { authConfig } from '../config/authConfig';
import { findOne } from '../db/findOne';
import { updateOne } from '../db/updateOne';
import { updateScore } from '../helpers/updateScore';
import { cors } from 'hono/cors';
import { prettyJSON } from 'hono/pretty-json';
import { decode, sign, verify } from 'hono/jwt'
import { setCookie, getCookie } from 'hono/cookie'
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
backend.post('/getQuestion', async (c) => {
    try {
        const form = await c.req.json();
        const queNo = parseInt(form.questionNumber, 10);
        console.log(queNo)

        if (isNaN(queNo) || queNo <= 0) {
            return c.json({ error: true, type: 'invalid question number' });
        }

        const question = await findOne(
            authConfig.mongo.dbUrl,
            authConfig.mongo.dbKey,
            authConfig.mongo.dataSource,
            authConfig.mongo.database,
            authConfig.mongo.collections.cc2,
            { id: String(queNo) },
            { value: 1 }
        );
        console.log(question)
        if (!question || !question.document) {
            return c.json({ error: true, type: 'question not found' }, 404);
        }

        return c.json({ error: false, question: question.document.value });

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
backend.post('/submit', async (c) => {
    const token = getCookie(c, 'token');
    const username = decode(token).payload.username
    const data = await c.req.json();
    //update score here
     const scoreUpdate = await updateScore(username,data)
console.log(scoreUpdate)
    const dbupdate = await updateOne(
        authConfig.mongo.dbUrl,
        authConfig.mongo.dbKey,
        authConfig.mongo.dataSource,
        authConfig.mongo.database,
        authConfig.mongo.collections.cc1,
        { "name": username },
        {
            "$set": {
                "attemptedQues": data.questionNumber

            },
            "$push": {
                "responses": data
            }
        })

    console.log(dbupdate)
    return c.json({ "nextqueNumber": parseInt(data.questionNumber, 10) + 1 })
});


//leaderboard
backend.post('/leaderboard', async (c) => {
    const scoreJsonArray = await find(
        authConfig.mongo.dbUrl,
        authConfig.mongo.dbKey,
        authConfig.mongo.dataSource,
        authConfig.mongo.database,
        authConfig.mongo.collections.cc1, { name: 1, score: 1 })



    return c.json(scoreJsonArray)

});

backend.post('/getQuestionsStatus', async (c) => {
    try {
        const token = getCookie(c, 'token');
        const username = decode(token).payload.username
        console.log(username);
        const dbfetch = await findOne(authConfig.mongo.dbUrl, authConfig.mongo.dbKey, authConfig.mongo.dataSource, authConfig.mongo.database, authConfig.mongo.collections.cc1, { "name": username }, {});
        console.log(dbfetch);
        const queNo = dbfetch.document.attemptedQues;

        return c.json({ lastAttemptedQuestion: queNo })
    } catch (error) {

    }
})

backend.post('/calculateScore', async (c) => {
    /*
    
     1. Get user response from DB
     2. Get actaual answers from DB
     3. Compare user answers with actual answers 
     4. Grant 100 for each matched answer else 0 
     5. Update the score field in the DB
     6. return OK
    
     */

    try {
        //getting users responses
        const getResponses = await find(
            authConfig.mongo.dbUrl,
            authConfig.mongo.dbKey,
            authConfig.mongo.dataSource,
            authConfig.mongo.database,
            authConfig.mongo.collections.cc1,
            { responses: 1 }
        );

        //getting actual answers
        const getAnswers = await find(
            authConfig.mongo.dbUrl,
            authConfig.mongo.dbKey,
            authConfig.mongo.dataSource,
            authConfig.mongo.database,
            authConfig.mongo.collections.cc2,
            {id:1,answer:1}
        );


    } catch (error) {

    }

});


export default backend;