import { z } from 'zod';

const navLinkSchema = z.object({
  label: z.string(),
  href: z.string(),
});

const serviceSchema = z.object({
  id: z.string(),
  name: z.string(),
  description: z.string(),
  duration: z.string(),
  price: z.string(),
  icon: z.string().optional(),
});

const teamMemberSchema = z.object({
  id: z.string(),
  name: z.string(),
  role: z.string(),
  bio: z.string(),
  image: z.string(),
});

const galleryItemSchema = z.object({
  title: z.string(),
  image: z.string(),
  featured: z.boolean().optional(),
});

const testimonialSchema = z.object({
  text: z.string(),
  author: z.string(),
  detail: z.string(),
  rating: z.number().min(1).max(5),
});

const sectionLabelSchema = z.object({
  subtitle: z.string(),
  title: z.string(),
  titleHighlight: z.string().optional(),
  description: z.string().optional(),
});

export const siteConfigSchema = z.object({
  business: z.object({
    name: z.string(),
    tagline: z.string(),
    description: z.string(),
    foundedYear: z.number(),
    locale: z.string(),
  }),

  contact: z.object({
    phone: z.string(),
    phoneRaw: z.string(),
    email: z.string().email(),
    address: z.object({
      street: z.string(),
      city: z.string(),
    }),
    social: z.object({
      instagram: z.string().optional(),
      facebook: z.string().optional(),
    }).optional(),
    mapEmbedUrl: z.string().optional(),
  }),

  hours: z.object({
    regular: z.array(z.object({
      days: z.string(),
      time: z.string(),
    })),
    closedDays: z.array(z.number()),
    closedLabel: z.string(),
  }),

  theme: z.object({
    colors: z.object({
      primary: z.string(),
      primaryLight: z.string(),
      primaryDark: z.string(),
      accent: z.string(),
      accentDark: z.string(),
      bg: z.string(),
      bgSoft: z.string(),
      bgCard: z.string(),
      bgCardAlt: z.string(),
      bgCardAlt2: z.string(),
      border: z.string(),
      text: z.string(),
      textMuted: z.string(),
      textMutedLight: z.string(),
      decorA: z.string().optional(),
      decorB: z.string().optional(),
      whiteSoft: z.string().optional(),
    }),
    fonts: z.object({
      heading: z.string(),
      body: z.string(),
      googleFontsUrl: z.string().optional(),
    }),
  }),

  services: z.array(serviceSchema),
  team: z.array(teamMemberSchema),
  gallery: z.array(galleryItemSchema),
  testimonials: z.array(testimonialSchema),

  hero: z.object({
    subtitle: z.string(),
    titleLine1: z.string(),
    titleLine2: z.string(),
    description: z.string(),
    heroImage: z.string(),
    ctaPrimary: navLinkSchema,
    ctaSecondary: navLinkSchema.optional(),
  }),

  about: z.object({
    subtitle: z.string(),
    title: z.string(),
    titleHighlight: z.string().optional(),
    paragraphs: z.array(z.string()),
    image: z.string(),
    stats: z.array(z.object({
      value: z.string(),
      label: z.string(),
    })),
    highlightBadge: z.object({
      value: z.string(),
      label: z.string(),
    }).optional(),
  }),

  sections: z.object({
    services: sectionLabelSchema,
    gallery: sectionLabelSchema,
    team: sectionLabelSchema,
    testimonials: sectionLabelSchema,
    booking: sectionLabelSchema,
    contact: sectionLabelSchema,
  }),

  loader: z.object({
    enabled: z.boolean(),
  }),

  footer: z.object({
    copyright: z.string(),
    showBarberPoleStripe: z.boolean(),
  }),

  modules: z.object({
    booking: z.object({ enabled: z.boolean() }),
    hours: z.object({ enabled: z.boolean() }),
    services: z.object({ enabled: z.boolean() }),
  }),

  nav: z.object({
    links: z.array(navLinkSchema),
    cta: navLinkSchema,
  }),
});

export type SiteConfig = z.infer<typeof siteConfigSchema>;
