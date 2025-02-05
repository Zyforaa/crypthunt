import { Hono } from 'hono';
import { authConfig } from '../config/authConfig';
import { headAndNav } from '../../public/mainHtml';
import { login_html } from '../../public/login/login';
import { landing_html } from '../../public/landing/landing';
import { rules_html } from '../../public/rules/rules';
import { contact_html } from '../../public/contactUs/contact';
import { leaderboard_html } from '../../public/leaderboard/leaderboard';
import { play_html } from '../../public/play/play';
import { getCookie , deleteCookie } from 'hono/cookie';
// import { dev_html } from '../../public/dev/dev';

const frontend = new Hono();

// Homepage route
frontend.get('/', async (c) => {
    return c.html(headAndNav(landing_html), 200);
});

// Login route
frontend.get('/login', async (c) => {
    return c.html(headAndNav(login_html), 200);
});

// Rules route
frontend.get('/rules', async (c) => {
    return c.html(headAndNav(rules_html), 200);
});

// Contact route
frontend.get('/contact', async (c) => {
    return c.html(headAndNav(contact_html), 200);
});

// Leaderboard route
frontend.get('/leaderboard', async (c) => {
    return c.html(headAndNav(leaderboard_html), 200);
});

// Developer route
frontend.get('/dev', (c) => {
    return c.redirect(authConfig.devFolio, 301)
})

// Play route
frontend.get('/play', (c) => {
    const token = getCookie(c, 'token');

    if (!token) {
        return c.html(headAndNav(login_html), 200);
    }

    return c.html(headAndNav(play_html), 200);
});

//profile
frontend.get('/profile',(c) => {
    return c.html(headAndNav("Name || Score || Attempted Questions"))
})

// logout
frontend.get('/logout', (c) => {
    deleteCookie(c, 'token');
 
    return c.redirect('/login');   
 });


export default frontend;
