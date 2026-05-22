import { NextResponse } from 'next/server';
import { db } from '../../../lib/db';

export async function GET() {
  const sessionsResult = await db.execute({
    sql: 'SELECT COUNT(*) AS total_sessions FROM sessions',
    args: []
  });

  const votesResult = await db.execute({
    sql: 'SELECT candidate, COUNT(*) AS total_votes FROM votes GROUP BY candidate ORDER BY total_votes DESC',
    args: []
  });

  const sessions = sessionsResult.rows as unknown as Array<{ total_sessions: number }>;
  const votes = votesResult.rows as unknown as Array<{ candidate: string; total_votes: number }>;

  return NextResponse.json({
    totalSessions: sessions[0]?.total_sessions ?? 0,
    votesByCandidate: votes
  });
}
