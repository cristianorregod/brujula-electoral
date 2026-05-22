export const EJES = [
  'economico',
  'seguridad',
  'ambiental',
  'paz',
  'reformas'
] as const;

export type EjeSlug = (typeof EJES)[number];

export const EJES_INFO: Record<EjeSlug, {
  nombre: string;
  icon: string;
  left: string;
  right: string;
  color: string;
}> = {
  economico: { nombre: 'Económico', icon: '💰', left: 'Estado activo', right: 'Mercado libre', color: '#1d4ed8' },
  seguridad: { nombre: 'Seguridad', icon: '🛡️', left: 'Política social', right: 'Mano dura', color: '#c2410c' },
  ambiental: { nombre: 'Ambiental', icon: '🌱', left: 'Transición', right: 'Extractivismo', color: '#047857' },
  paz: { nombre: 'Paz', icon: '🕊️', left: 'Negociación', right: 'Confrontación', color: '#7c3aed' },
  reformas: { nombre: 'Reformas', icon: '🔄', left: 'Continuidad', right: 'Ruptura', color: '#db2777' }
};

export type CandidateSlug = 'abelardo' | 'paloma' | 'cepeda';

export const CANDIDATOS = {
  abelardo: {
    nombre: 'Abelardo De La Espriella',
    nombreCorto: 'Abelardo',
    tagline: 'Defensores de la Patria · Mano firme y reducción del Estado',
    desc: 'Propone una agenda de seguridad de confrontación directa contra el crimen organizado, reducción significativa del tamaño del Estado, libre mercado con menos impuestos y regulación, y defensa de las instituciones tradicionales como núcleo del orden social.',
    pos: { economico: 9, seguridad: 9, ambiental: 5, paz: -9, reformas: 9 },
    color: 'var(--abelardo)',
    colorHex: '#c2410c',
    bg: 'var(--abelardo-bg)'
  },
  paloma: {
    nombre: 'Paloma Valencia & Juan Daniel Oviedo',
    nombreCorto: 'Paloma',
    tagline: 'Colombia Más Grande · Reforma gerencial con tecnología',
    desc: 'Propone modernizar el Estado con tecnología, recuperar la confianza inversionista, reducir el déficit fiscal con disciplina, fortalecer la Fuerza Pública con un Plan 30-30 y combinar inversión pública con incentivos al sector privado.',
    pos: { economico: 6, seguridad: 6, ambiental: 8, paz: -4, reformas: 4 },
    color: 'var(--paloma)',
    colorHex: '#1d4ed8',
    bg: 'var(--paloma-bg)'
  },
  cepeda: {
    nombre: 'Iván Cepeda',
    nombreCorto: 'Cepeda',
    tagline: 'El Poder de la Verdad · Continuidad y profundización del cambio',
    desc: 'Propone una segunda fase del gobierno Petro centrada en revolución agraria, seguridad humana basada en política social, implementación plena del Acuerdo de Paz de 2016, transición energética sin fracking y una política contra la macrocorrupción como sistema.',
    pos: { economico: -8, seguridad: -8, ambiental: -9, paz: 9, reformas: -9 },
    color: 'var(--cepeda)',
    colorHex: '#047857',
    bg: 'var(--cepeda-bg)'
  }
} as const;

export type CandidateConfig = typeof CANDIDATOS[CandidateSlug];

export function validateCandidateAxisMappings() {
  return Object.entries(CANDIDATOS).map(([slug, candidate]) => {
    const invalidAxes = Object.keys(candidate.pos).filter(axis => !EJES.includes(axis as EjeSlug));
    return {
      candidate: slug,
      invalidAxes,
      valid: invalidAxes.length === 0
    };
  });
}

export function getCandidateSlugs() {
  return Object.keys(CANDIDATOS) as CandidateSlug[];
}

export function isValidCandidate(slug: string): slug is CandidateSlug {
  return getCandidateSlugs().includes(slug as CandidateSlug);
}
