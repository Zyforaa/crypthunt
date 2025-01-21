import { Hono } from 'hono';
import backend from './backend/internal.js';
import frontend from './frontend/frontend.js';
import { notFound_html } from '../public/notFound/notFound.js';


const app = new Hono();

app.route('/internal', backend);
app.route('/', frontend);

app.notFound((c) => c.html(notFound_html, 404));

export default app;