import { readFileSync } from 'fs';
import { join } from 'path';

export async function GET() {
  const file = join(process.cwd(), 'public', 'index.html');
  const html = readFileSync(file, 'utf8');
  return new Response(html, {
    status: 200,
    headers: { 'Content-Type': 'text/html; charset=utf-8' }
  });
}
