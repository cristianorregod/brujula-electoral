import { NextRequest, NextResponse } from 'next/server';
import { randomUUID } from 'crypto';
import { db } from '../../../lib/db';
import { isValidCandidate, getCandidateSlugs } from '../../../lib/candidates';

export async function POST(req: NextRequest) {
  const body = await req.json();
  const sessionId = typeof body.sessionId === 'string' ? body.sessionId : randomUUID();
  const candidate = typeof body.candidate === 'string' ? body.candidate : null;
  const payload = body.payload ? JSON.stringify(body.payload) : null;

  if (!candidate || !isValidCandidate(candidate)) {
    return NextResponse.json({ error: 'Candidate not valid' }, { status: 400 });
  }

  const sessionExists = await db.execute({
    sql: 'SELECT 1 FROM sessions WHERE id = ? LIMIT 1',
    args: [sessionId]
  });

  if (sessionExists.rows.length === 0) {
    await db.execute({
      sql: 'INSERT INTO sessions (id, created_at, last_seen) VALUES (?, CURRENT_TIMESTAMP, CURRENT_TIMESTAMP)',
      args: [sessionId]
    });
  } else {
    await db.execute({
      sql: 'UPDATE sessions SET last_seen = CURRENT_TIMESTAMP WHERE id = ?',
      args: [sessionId]
    });
  }

  await db.execute({
    sql: 'INSERT INTO votes (id, session_id, candidate, payload, created_at) VALUES (?, ?, ?, ?, CURRENT_TIMESTAMP)',
    args: [randomUUID(), sessionId, candidate, payload]
  });

  return NextResponse.json({ sessionId, candidate, recordedAt: new Date().toISOString() });
}
