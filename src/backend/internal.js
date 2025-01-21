import { Hono } from 'hono';
import { authConfig } from '../config/authConfig';
import { findOne } from '../db/findOne';
import { cors } from 'hono/cors';
import { prettyJSON } from 'hono/pretty-json';
import { decode, sign, verify } from 'hono/jwt'
import { setCookie } from 'hono/cookie'


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


/*backend.post('/play/:queNo', async (c) =>{

})*/

export default backend;