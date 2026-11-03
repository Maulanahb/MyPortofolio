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
  'Laravel 11 & PHP 8.2': ['laravel', 'php'],
  'Alpine.js': ['alpinedotjs'],
  'Alpine.js & Tailwind CSS': ['alpinedotjs', 'tailwindcss'],
  'Thermal ESC/POS': ['thermal'],
  'Thermal ESC/POS & QR': ['thermal'],
  'PHPUnit': ['phpunit'],
  'PHPUnit & 11 Migrations': ['phpunit'],
  'React 19 & TypeScript': ['react', 'typescript'],
  'React 18 & TypeScript': ['react', 'typescript'],
  'Google Gemini AI (Server Proxy)': ['googlegemini'],
  'Google Gemini 2.5 Flash': ['googlegemini'],
  'Express.js & Node.js': ['express'],
  'Firebase Auth & Firestore': ['firebase-auth', 'firestore'],
  'Tailwind CSS & Recharts': ['tailwindcss'],
  'Tailwind CSS & Vite': ['tailwindcss'],
  'Docker & Cloud Run': ['docker'],
  'Flutter SDK & Dart': ['flutter', 'dart'],
  'Riverpod State Management': ['riverpod'],
  'Cloud Firestore & Auth': ['firestore', 'firebase-auth'],
  'Midtrans Payment Gateway': ['midtrans'],
  'PHP 8 (MVC Architecture)': ['php'],
  'PHP 8 OOP REST API': ['php'],
  'PostgreSQL (Stored Proc & MatView)': ['postgresql'],
  'PostgreSQL & SQLite': ['postgresql'],
  'PDO MySQL / SQL': ['firestore'],
  'MySQL': ['firestore'],
  'Multi-Role RBAC & Audit Log': ['rbac'],
  'PRD v1.1 & Schema SQL': ['rbac'],
  'JavaScript & Bootstrap 5': ['javascript'],
  'Odoo': ['odoo'],
  'Odoo ERP': ['odoo'],
  'Power BI': ['powerbi'],
  'Microsoft Power BI': ['powerbi'],
  'Google Antigravity': ['antigravity'],
  'Antigravity': ['antigravity']
};

/** Id ikon untuk satu label; array kosong bila label belum dipetakan. */
export function techIconIds(label: string): string[] {
  return TECH_ICON_BY_LABEL[label] ?? [];
}
