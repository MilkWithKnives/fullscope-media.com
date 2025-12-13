#!/usr/bin/env node
const fs = require('fs');
const path = require('path');
const { spawn } = require('child_process');

const root = path.resolve(__dirname, '..');
const mcpPath = path.join(root, '.mcp.json');
if (!fs.existsSync(mcpPath)) {
  console.error('.mcp.json not found at', mcpPath);
  process.exit(1);
}

const cfg = JSON.parse(fs.readFileSync(mcpPath, 'utf8'));
const servers = cfg.mcpServers || {};
const names = Object.keys(servers);
if (names.length === 0) {
  console.log('No MCP servers configured in .mcp.json');
  process.exit(0);
}

const procs = [];

names.forEach((name) => {
  const s = servers[name];
  let cmd = s.command;
  let args = Array.isArray(s.args) ? s.args.slice() : [];
  const env = Object.assign({}, process.env, s.env || {});
  env.MCP_SERVER_NAME = name;

  // Prefer pnpm dlx when pnpm is available instead of npx, and strip npx flags like -y
  try {
    const spawnSync = require('child_process').spawnSync;
    if (cmd === 'npx') {
      const res = spawnSync('pnpm', ['-v'], { stdio: 'ignore' });
      if (res && res.status === 0) {
        cmd = 'pnpm';
        // remove common npx flags that pnpm dlx doesn't accept
        const filtered = args.filter(a => a !== '-y' && a !== '--yes');
        args = ['dlx', ...filtered];
      }
    }
  } catch (e) {
    // ignore and fall back to original command
  }

  console.log(`Starting ${name}: ${cmd} ${args.join(' ')}`);
  const p = spawn(cmd, args, { cwd: root, env, stdio: 'inherit', shell: false });

  p.on('exit', (code, signal) => {
    console.log(`${name} exited with code=${code} signal=${signal}`);
  });

  p.on('error', (err) => {
    console.error(`${name} failed to start:`, err && err.message);
  });

  procs.push(p);
});

process.on('SIGINT', () => {
  console.log('\nStopping MCP servers...');
  procs.forEach((p) => {
    try { p.kill('SIGINT'); } catch (e) { /* ignore */ }
  });
  setTimeout(() => process.exit(0), 250);
});
