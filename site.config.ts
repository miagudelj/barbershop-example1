import type { SiteConfig } from './site.config.schema';

const config: SiteConfig = {
  // === Brand Identity ===
  business: {
    name: 'The Grand Barber',
    tagline: 'Premium Barbershop für den modernen Gentleman',
    description: 'The Grand Barber – Premium Barbershop in Zürich. Klassische Herrenschnitte, Rasuren und Bartpflege in edlem Ambiente.',
    foundedYear: 2015,
    locale: 'de-CH',
  },

  // === Contact & Location ===
  contact: {
    phone: '+41 44 123 45 67',
    phoneRaw: '+41441234567',
    email: 'info@thegrandbarber.ch',
    address: {
      street: 'Bederstrasse 58',
      city: '8002 Zürich-Enge',
    },
    social: {
      instagram: '#',
      facebook: '#',
    },
    mapEmbedUrl: undefined,
  },

  // === Opening Hours ===
  hours: {
    regular: [
      { days: 'Dienstag – Freitag', time: '09:00 – 18:30' },
      { days: 'Samstag', time: '09:00 – 16:00' },
    ],
    closedDays: [0, 1], // Sunday, Monday (JS day indices)
    closedLabel: 'Sonntag & Montag: Geschlossen',
  },

  // === Theming ===
  theme: {
    colors: {
      primary: '#C9A96E',
      primaryLight: '#D4B87A',
      primaryDark: '#A8894E',
      accent: '#F5E6D0',
      accentDark: '#D4C4AE',
      bg: '#0A0A0A',
      bgSoft: '#141414',
      bgCard: '#1A1A1A',
      bgCardAlt: '#1E1710',
      bgCardAlt2: '#2A1F14',
      border: '#3D2E1E',
      text: '#F5E6D0',
      textMuted: '#9A9088',
      textMutedLight: '#B5ACA4',
      decorA: '#C0392B',
      decorB: '#2E6B9E',
      whiteSoft: '#E8E0D8',
    },
    fonts: {
      heading: "'Playfair Display', Georgia, serif",
      body: "'Inter', system-ui, sans-serif",
      googleFontsUrl: 'https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,500;0,600;0,700;1,400;1,500&display=swap',
    },
  },

  // === Services ===
  services: [
    {
      id: 'cut',
      name: 'Herrenschnitt',
      description: 'Der Klassiker — präziser Schnitt mit Beratung, Waschen und Styling. Von Fade über Undercut bis zum klassischen Seitenscheitel.',
      duration: '30 Min',
      price: 'CHF 55',
      icon: 'haircut',
    },
    {
      id: 'shave',
      name: 'Nassrasur',
      description: 'Die königliche Nassrasur mit heissem Tuch, Premium-Rasierschaum und Rasiermesser für die glatteste Rasur Ihres Lebens.',
      duration: '30 Min',
      price: 'CHF 50',
      icon: 'shave',
    },
    {
      id: 'combo',
      name: 'Schnitt & Rasur Kombi',
      description: 'Das Beste aus beiden Welten — perfekter Haarschnitt kombiniert mit einer klassischen Nassrasur. Das volle Barbershop-Erlebnis.',
      duration: '55 Min',
      price: 'CHF 90',
      icon: 'combo',
    },
    {
      id: 'beard',
      name: 'Bart-Trimm & Kontur',
      description: 'Professionelle Bartpflege — exaktes Trimmen, scharfe Konturen und Pflege mit hochwertigen Bartölen für den perfekten Look.',
      duration: '20 Min',
      price: 'CHF 35',
      icon: 'beard',
    },
    {
      id: 'hottowel',
      name: 'Hot-Towel Treatment',
      description: 'Luxuriöse Gesichtsbehandlung mit heissen Tüchern, Dampf und Premium-Pflege. Die perfekte Entspannung für den Gentleman.',
      duration: '25 Min',
      price: 'CHF 40',
      icon: 'hottowel',
    },
    {
      id: 'deluxe',
      name: 'Grand Deluxe Paket',
      description: 'Das Rundum-Erlebnis: Schnitt, Nassrasur, Bartpflege, Hot-Towel Treatment und Styling. Für den Mann, der alles verdient.',
      duration: '75 Min',
      price: 'CHF 140',
      icon: 'deluxe',
    },
  ],

  // === Team ===
  team: [
    {
      id: 'marco',
      name: 'Marco Rossi',
      role: 'Gründer & Master Barber',
      bio: 'Mit über 15 Jahren Erfahrung und einer Leidenschaft für klassisches Barberhandwerk ist Marco das Herzstück von The Grand Barber.',
      image: '/images/team-marco.jpg',
    },
    {
      id: 'david',
      name: 'David Schneider',
      role: 'Fade-Spezialist',
      bio: 'David ist der Meister des Übergangs. Ob Skin Fade, Taper oder Drop Fade — seine Fades sind legendär in der ganzen Stadt.',
      image: '/images/team-david.jpg',
    },
    {
      id: 'luca',
      name: 'Luca Baumann',
      role: 'Rasur & Bartpflege',
      bio: 'Luca verwandelt jede Rasur in ein Erlebnis. Seine Nassrasuren mit dem Rasiermesser sind ein echtes Ritual der Entspannung.',
      image: '/images/team-luca.jpg',
    },
  ],

  // === Gallery ===
  gallery: [
    { title: 'Classic Fade', image: '/images/gallery-classic-fade.jpg', featured: true },
    { title: 'Nassrasur', image: '/images/gallery-nassrasur.jpg' },
    { title: 'Beard Styling', image: '/images/gallery-beard-styling.jpg' },
    { title: 'Pompadour', image: '/images/gallery-pompadour.jpg' },
    { title: 'Skin Fade', image: '/images/gallery-skin-fade.jpg' },
    { title: 'Gentleman Cut', image: '/images/gallery-gentleman-cut.jpg' },
  ],

  // === Testimonials ===
  testimonials: [
    {
      text: '«Seit ich bei Marco war, gehe ich nirgendwo anders mehr hin. Er versteht genau, was ich will, und der Laden hat eine unglaubliche Atmosphäre. Wie eine Zeitreise.»',
      author: 'Thomas Keller',
      detail: 'Stammkunde seit 2018',
      rating: 5,
    },
    {
      text: '«David hat mir den besten Fade meines Lebens verpasst. Die Jungs hier sind echte Künstler. Dazu ein Whisky und gute Gespräche — was will man mehr?»',
      author: 'Patrick Müller',
      detail: 'via Google Reviews',
      rating: 5,
    },
    {
      text: '«Die Nassrasur bei Luca ist ein Erlebnis! Heisse Tücher, perfekte Technik und danach fühlt man sich wie neugeboren. Absolut empfehlenswert für jeden Mann.»',
      author: 'Stefan Brunner',
      detail: 'Stammkunde seit 2020',
      rating: 5,
    },
  ],

  // === Hero Section ===
  hero: {
    subtitle: 'Willkommen bei',
    titleLine1: 'The Grand',
    titleLine2: 'Barber',
    description: 'Premium Barbershop für den modernen Gentleman in Zürich. Wo Tradition auf Handwerkskunst trifft — seit 2015.',
    heroImage: '/images/hero-barber.jpg',
    ctaPrimary: { label: 'Termin buchen', href: '#booking' },
    ctaSecondary: { label: '+41 44 123 45 67', href: 'tel:+41441234567' },
  },

  // === About Section ===
  about: {
    subtitle: 'Unsere Geschichte',
    title: 'Wo Tradition auf\nHandwerk trifft',
    titleHighlight: 'Handwerk',
    paragraphs: [
      'The Grand Barber wurde 2015 von Marco Rossi mit einer klaren Vision gegründet: Ein Ort, an dem sich jeder Mann wie ein Gentleman fühlt. Im Herzen von Zürich-Enge gelegen, verbinden wir klassisches Barberhandwerk mit modernem Stil in einer Atmosphäre, die an die goldenen Zeiten erinnert.',
      'Unser Team aus drei erfahrenen Barbern beherrscht alles — vom klassischen Herrenschnitt über die perfekte Nassrasur bis hin zur kunstvollen Bartpflege. Wir verwenden ausschliesslich hochwertige Produkte und nehmen uns die Zeit, die Ihr Look verdient.',
    ],
    image: '/images/shop-interior.jpg',
    stats: [
      { value: "5'000+", label: 'Zufriedene Kunden' },
      { value: '100%', label: 'Premiumprodukte' },
      { value: '4.9 ★', label: 'Google Bewertung' },
    ],
    highlightBadge: { value: '10+', label: 'Jahre Erfahrung' },
  },

  // === Section Labels ===
  sections: {
    services: {
      subtitle: 'Was wir bieten',
      title: 'Unsere Dienstleistungen',
      titleHighlight: 'Dienstleistungen',
      description: 'Vom klassischen Schnitt bis zur luxuriösen Nassrasur — wir bieten alles, was den modernen Gentleman ausmacht.',
    },
    gallery: {
      subtitle: 'Unsere Arbeiten',
      title: 'Die Galerie',
      titleHighlight: 'Galerie',
    },
    team: {
      subtitle: 'Die Experten',
      title: 'Unser Team',
      titleHighlight: 'Team',
      description: 'Drei leidenschaftliche Barber, die Ihr Haar und Ihren Bart in besten Händen halten.',
    },
    testimonials: {
      subtitle: 'Kundenstimmen',
      title: 'Was unsere Kunden sagen',
      titleHighlight: 'Kunden',
    },
    booking: {
      subtitle: 'Online buchen',
      title: 'Termin vereinbaren',
      titleHighlight: 'vereinbaren',
      description: 'Wählen Sie Ihre Wunsch-Dienstleistung, Ihren Barber und einen passenden Termin — ganz bequem online.',
    },
    contact: {
      subtitle: 'Kontakt',
      title: 'Besuchen Sie uns',
      titleHighlight: 'uns',
    },
  },

  // === Loader ===
  loader: {
    enabled: true,
  },

  // === Footer ===
  footer: {
    copyright: '© 2024 The Grand Barber. Alle Rechte vorbehalten. Dies ist eine Demoseite.',
    showBarberPoleStripe: true,
  },

  // === Modules ===
  modules: {
    booking: { enabled: true },
    hours: { enabled: true },
    services: { enabled: true },
  },

  // === Navigation ===
  nav: {
    links: [
      { label: 'Über uns', href: '#about' },
      { label: 'Leistungen', href: '#services' },
      { label: 'Galerie', href: '#gallery' },
      { label: 'Team', href: '#team' },
      { label: 'Termin', href: '#booking' },
    ],
    cta: { label: 'Anrufen', href: 'tel:+41441234567' },
  },
};

export default config;
