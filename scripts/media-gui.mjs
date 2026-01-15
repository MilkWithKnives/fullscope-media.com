#!/usr/bin/env node

/**
 * Lightweight local GUI to manage portfolio media.
 * - Runs an Express server with a single-page UI.
 * - Lets you upload images/videos into static/ (carousel + portfolio).
 * - Writes entries into src/lib/data/portfolio-data.json.
 *
 * Local-only: there is no auth. Run when you need to update media, then stop it.
 *
 * Usage:
 *   pnpm add -D express multer   # once, if not installed
 *   npm run media-gui
 */

import express from 'express';
import multer from 'multer';
import fs from 'node:fs';
import path from 'node:path';

const root = process.cwd();
const port = Number(process.env.MEDIA_GUI_PORT || 4174);

const dataPath = path.join(root, 'src', 'lib', 'data', 'portfolio-data.json');
const imageRoot = path.join(root, 'static', 'images', 'portfolio');
const videoRoot = path.join(root, 'static', 'videos', 'portfolio');

const categoryList = [
	{ id: '3d-tours', name: '3D Tours' },
	{ id: 'interior', name: 'Interior Photography' },
	{ id: 'exterior', name: 'Exterior Photography' },
	{ id: 'drone', name: 'Drone & Aerial' },
	{ id: 'virtual-staging', name: 'Virtual Staging' },
	{ id: 'floorplans', name: 'Floorplans (Cubicasa)' },
	{ id: 'portraits', name: 'Portraits & Headshots' }
];

function ensureDefaults() {
	[imageRoot, videoRoot].forEach((dir) => fs.mkdirSync(dir, { recursive: true }));
	categoryList.forEach((c) => fs.mkdirSync(path.join(imageRoot, c.id), { recursive: true }));
	if (!fs.existsSync(dataPath)) {
		fs.writeFileSync(dataPath, '[]', 'utf8');
	}
}

function readData() {
	try {
		return JSON.parse(fs.readFileSync(dataPath, 'utf8'));
	} catch {
		return [];
	}
}

function writeData(items) {
	fs.writeFileSync(dataPath, JSON.stringify(items, null, 2));
}

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		const isVideo = file.mimetype.startsWith('video/');
		const category = req.body.category || 'uncategorized';
		const dest = isVideo ? videoRoot : path.join(imageRoot, category);
		fs.mkdirSync(dest, { recursive: true });
		cb(null, dest);
	},
	filename: (_req, file, cb) => {
		const ext = path.extname(file.originalname);
		const base = path.basename(file.originalname, ext);
		const safe =
			base
				.toLowerCase()
				.replace(/[^a-z0-9]+/g, '-')
				.replace(/^-+|-+$/g, '') || 'media';
		cb(null, `${Date.now()}-${safe}${ext}`);
	}
});

const upload = multer({ storage });

ensureDefaults();

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/api/data', (_req, res) => {
	const items = readData();
	res.json({ categories: categoryList, items });
});

app.post('/api/upload', upload.single('file'), (req, res) => {
	if (!req.file) {
		return res.status(400).json({ error: 'File is required' });
	}

	const items = readData();
	const nextId = items.reduce((max, item) => Math.max(max, Number(item.id) || 0), 0) + 1;

	const isVideo = req.file.mimetype.startsWith('video/');
	const category = req.body.category || 'interior';
	const publicPath = isVideo
		? `/videos/portfolio/${req.file.filename}`
		: `/images/portfolio/${category}/${req.file.filename}`;

	const tags =
		(req.body.tags || '')
			.split(',')
			.map((t) => t.trim())
			.filter(Boolean) || [];

	const newItem = {
		id: nextId,
		title: req.body.title || req.file.originalname,
		category,
		description: req.body.description || '',
		image: isVideo ? undefined : publicPath,
		video: isVideo ? publicPath : undefined,
		tags,
		date: req.body.date || new Date().toISOString().slice(0, 10),
		client: req.body.client || '',
		results: req.body.results || ''
	};

	items.push(newItem);
	writeData(items);

	res.json({ ok: true, item: newItem });
});

app.get('/', (_req, res) => {
	res.type('html').send(renderPage());
});

app.listen(port, () => {
	console.log(`Media GUI running at http://localhost:${port}`);
	console.log('Tip: stop the server when you are done (Ctrl+C).');
});

function renderPage() {
	return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>Full Scope Media – Media GUI</title>
  <style>
    :root { font-family: 'Inter', system-ui, -apple-system, sans-serif; color: #0f172a; background: #f8fafc; }
    body { margin: 0; padding: 24px; }
    h1 { margin: 0 0 16px; }
    .layout { display: grid; grid-template-columns: 420px 1fr; gap: 24px; align-items: start; }
    form { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; padding: 16px; box-shadow: 0 10px 30px rgba(15,23,42,0.06); }
    label { display: block; font-weight: 600; margin-top: 12px; }
    input, select, textarea { width: 100%; padding: 10px 12px; border: 1px solid #cbd5e1; border-radius: 8px; font-size: 14px; }
    textarea { min-height: 80px; resize: vertical; }
    button { margin-top: 16px; padding: 12px 14px; background: linear-gradient(135deg, #111827, #0f172a); color: #fff; border: none; border-radius: 10px; font-weight: 700; cursor: pointer; }
    button:hover { filter: brightness(1.05); }
    .pill { display: inline-flex; align-items: center; gap: 6px; background: #e2e8f0; padding: 6px 10px; border-radius: 999px; font-size: 12px; margin: 0 6px 6px 0; }
    .grid { display: grid; grid-template-columns: repeat(auto-fill, minmax(240px, 1fr)); gap: 16px; }
    .card { background: #fff; border: 1px solid #e2e8f0; border-radius: 12px; overflow: hidden; box-shadow: 0 10px 30px rgba(15,23,42,0.06); }
    .card img, .card video { width: 100%; display: block; aspect-ratio: 4 / 3; object-fit: cover; background: #0f172a10; }
    .card .content { padding: 12px; }
    .muted { color: #475569; font-size: 13px; }
    .tags { margin-top: 8px; }
    .banner { margin-bottom: 16px; padding: 12px 16px; background: #111827; color: #f8fafc; border-radius: 12px; }
    @media (max-width: 900px) { .layout { grid-template-columns: 1fr; } }
  </style>
</head>
<body>
  <h1>Full Scope Media — Media Manager</h1>
  <div class="banner">
    <strong>Local-only.</strong> Uploads save into <code>static/</code> and update <code>portfolio-data.json</code>. Stop this server when finished.
  </div>
  <div class="layout">
    <form id="upload-form">
      <label>Category
        <select name="category" required id="category"></select>
      </label>
      <label>Title
        <input name="title" placeholder="Kitchen refresh in Okemos" />
      </label>
      <label>Description
        <textarea name="description" placeholder="Short description"></textarea>
      </label>
      <label>Client (optional)
        <input name="client" placeholder="Acme Realty" />
      </label>
      <label>Results (optional)
        <input name="results" placeholder="e.g., Listing under contract in 5 days" />
      </label>
      <label>Date (YYYY-MM-DD)
        <input name="date" type="date" />
      </label>
      <label>Tags (comma-separated)
        <input name="tags" placeholder="interior, natural light, drone" />
      </label>
      <label>Media file (image or video)
        <input type="file" name="file" accept="image/*,video/*" required />
      </label>
      <button type="submit">Upload &amp; Save</button>
      <div class="muted" style="margin-top:8px;">Images go to <code>static/images/portfolio/&lt;category&gt;</code>, videos to <code>static/videos/portfolio</code>.</div>
    </form>
    <div>
      <h2 style="margin:0 0 12px;">Current items</h2>
      <div id="items" class="grid"></div>
    </div>
  </div>

  <script>
    const catSelect = document.getElementById('category');
    const itemsEl = document.getElementById('items');

    async function loadData() {
      const res = await fetch('/api/data');
      const { categories, items } = await res.json();
      catSelect.innerHTML = categories.map(c => \`<option value="\${c.id}">\${c.name}</option>\`).join('');
      renderItems(items);
    }

    function renderItems(items) {
      if (!items.length) {
        itemsEl.innerHTML = '<p class="muted">No items yet.</p>';
        return;
      }
      itemsEl.innerHTML = items.map(item => {
        const media = item.video
          ? \`<video controls preload="metadata" src="\${item.video}"></video>\`
          : \`<img src="\${item.image}" alt="\${item.title}" loading="lazy" />\`;
        const tags = (item.tags || []).map(t => \`<span class="pill">\${t}</span>\`).join('');
        return \`
          <div class="card">
            \${media}
            <div class="content">
              <div style="font-weight:700;">\${item.title}</div>
              <div class="muted">\${item.category} • \${item.date || ''}</div>
              <div class="muted">\${item.description || ''}</div>
              <div class="tags">\${tags}</div>
            </div>
          </div>
        \`;
      }).join('');
    }

    document.getElementById('upload-form').addEventListener('submit', async (e) => {
      e.preventDefault();
      const form = e.currentTarget;
      const data = new FormData(form);
      const btn = form.querySelector('button');
      btn.disabled = true;
      btn.textContent = 'Uploading...';
      try {
        const res = await fetch('/api/upload', { method: 'POST', body: data });
        const json = await res.json();
        if (!json.ok) throw new Error(json.error || 'Upload failed');
        form.reset();
        await loadData();
        alert('Saved');
      } catch (err) {
        alert(err.message);
      } finally {
        btn.disabled = false;
        btn.textContent = 'Upload & Save';
      }
    });

    loadData();
  </script>
</body>
</html>`;
}
