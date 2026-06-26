import crypto from 'crypto';

/**
 * Génère une clé de licence unique au format RACLIF-XXXX-XXXX-XXXX-XXXX
 */
export function generateKey(): string {
  const parts = [];
  for (let i = 0; i < 4; i++) {
    parts.push(crypto.randomBytes(2).toString('hex').toUpperCase());
  }
  return `RACLIF-${parts.join('-')}`;
}

/**
 * Génère plusieurs clés
 */
export function generateBulkKeys(count: number): string[] {
  return Array.from({ length: count }, () => generateKey());
}

/**
 * Vérifie basiquement si le format de la clé est valide
 */
export function validateKeyFormat(key: string): boolean {
  return /^RACLIF-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}-[A-F0-9]{4}$/.test(key);
}
