import siteConfig from '../../site.config';
import { siteConfigSchema, type SiteConfig } from '../../site.config.schema';

// Validate config at build time
const parsed = siteConfigSchema.safeParse(siteConfig);

if (!parsed.success) {
  console.error('❌ site.config.ts validation failed:');
  parsed.error.issues.forEach((issue) => {
    console.error(`  → ${issue.path.join('.')}: ${issue.message}`);
  });
  throw new Error('Invalid site configuration. Fix the errors above.');
}

export const config: SiteConfig = parsed.data;
export default config;

// Helper: generate CSS custom properties from theme config
export function getThemeCssVars(theme: SiteConfig['theme']): string {
  const { colors, fonts } = theme;
  return [
    `--site-primary: ${colors.primary}`,
    `--site-primary-light: ${colors.primaryLight}`,
    `--site-primary-dark: ${colors.primaryDark}`,
    `--site-accent: ${colors.accent}`,
    `--site-accent-dark: ${colors.accentDark}`,
    `--site-bg: ${colors.bg}`,
    `--site-bg-soft: ${colors.bgSoft}`,
    `--site-bg-card: ${colors.bgCard}`,
    `--site-bg-card-alt: ${colors.bgCardAlt}`,
    `--site-bg-card-alt2: ${colors.bgCardAlt2}`,
    `--site-border: ${colors.border}`,
    `--site-text: ${colors.text}`,
    `--site-text-muted: ${colors.textMuted}`,
    `--site-text-muted-light: ${colors.textMutedLight}`,
    `--site-decor-a: ${colors.decorA ?? '#C0392B'}`,
    `--site-decor-b: ${colors.decorB ?? '#2E6B9E'}`,
    `--site-white-soft: ${colors.whiteSoft ?? '#E8E0D8'}`,
    `--site-font-heading: ${fonts.heading}`,
    `--site-font-body: ${fonts.body}`,
  ].join('; ');
}
