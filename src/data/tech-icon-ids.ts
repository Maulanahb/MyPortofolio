/**
 * ==========================================================================
 * TECH ICON IDS (tech-icon-ids.ts)
 * Peta label teknologi → id ikon pada sprite SVG (lihat TechIconSprite.astro).
 * Sengaja dipisah dari tech-icons.ts agar bundle klien tidak ikut menyeret
 * path data SVG yang panjang.
 * ==========================================================================
 */

export const TECH_ICON_BY_LABEL: Record<string, string[]> = {
  'React 19': ['react'],
  'TypeScript': ['typescript'],
  'Google Gemini AI': ['googlegemini'],
  'Tailwind CSS': ['tailwindcss'],
  'Firebase': ['firebase'],
  'Express.js': ['express'],
  'Docker': ['docker'],
  'Flutter SDK': ['flutter'],
  'Dart': ['dart'],
  'Riverpod': ['riverpod'],
  'Cloud Firestore': ['firestore'],
  'Midtrans Payment': ['midtrans'],
  'Firebase Auth': ['firebase-auth'],
  'PHP': ['php'],
  'PostgreSQL': ['postgresql'],
  'JavaScript': ['javascript'],
  'HTML5 / CSS3': ['html5', 'css'],
  'Multi-Role RBAC': ['rbac'],
  'Laravel Framework': ['laravel'],
  'Alpine.js': ['alpinedotjs'],
  'Thermal ESC/POS': ['thermal'],
  'PHPUnit': ['phpunit']
};

/** Id ikon untuk satu label; array kosong bila label belum dipetakan. */
export function techIconIds(label: string): string[] {
  return TECH_ICON_BY_LABEL[label] ?? [];
}
