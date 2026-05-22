import { NextResponse } from 'next/server';
import { EJES_INFO, CANDIDATOS, validateCandidateAxisMappings } from '../../../lib/candidates';

export async function GET() {
  return NextResponse.json({
    ejes: EJES_INFO,
    candidates: CANDIDATOS,
    validation: validateCandidateAxisMappings()
  });
}
