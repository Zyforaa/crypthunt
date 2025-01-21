import { Hono } from 'hono';
import { login_html } from '../../public/login/login';
import { landing_html } from '../../public/landing/landing';
import { rules_html } from '../../public/rules/rules';
import { contact_html } from '../../public/contactUs/contact';
import { leaderboard_html } from '../../public/leaderboard/leaderboard';
import { play_html } from '../../public/play/play';
// import { dev_html } from '../../public/dev/dev';

const frontend = new Hono();

// Homepage route
frontend.get('/', async (c) => {
    return c.html(landing_html, 200);
});

// Login route
frontend.get('/login', async (c) => {
    return c.html(login_html, 200);
});

// Rules route
frontend.get('/rules', async (c) => {
    return c.html(rules_html, 200);
});

// Contact route
frontend.get('/contact', async (c) => {
    return c.html(contact_html, 200);
});

// Leaderboard route
frontend.get('/leaderboard', async (c) => {
    return c.html(leaderboard_html, 200);
});

// Developer route
frontend.get('/play', async (c) => {
    return c.html(play_html, 200);
});

export default frontend;
