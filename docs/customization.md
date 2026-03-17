# Kunden-Anpassung — Anleitung

## Neuen Kunden erstellen

1. `site.config.ts` kopieren und anpassen
2. Bilder in `public/images/` austauschen
3. `npm run build` — fertig

## Was kann angepasst werden?

### Farben & Fonts (`theme`)

```typescript
theme: {
  colors: {
    primary: '#C9A96E',      // Hauptfarbe (z.B. Gold, Blau, Rot)
    primaryLight: '#D4B87A',  // Heller Variant
    primaryDark: '#A8894E',   // Dunkler Variant
    accent: '#F5E6D0',        // Akzent (z.B. Creme)
    bg: '#0A0A0A',            // Hintergrund
    bgSoft: '#141414',        // Weicher Hintergrund
    bgCard: '#1A1A1A',        // Karten
    text: '#F5E6D0',          // Text
    textMuted: '#9A9088',     // Gedämpfter Text
    // ... etc
  },
  fonts: {
    heading: "'Playfair Display', Georgia, serif",
    body: "'Inter', system-ui, sans-serif",
    googleFontsUrl: 'https://fonts.googleapis.com/css2?family=...',
  },
}
```

### Geschäfts-Daten (`business`, `contact`)

- Name, Tagline, Beschreibung
- Telefon, E-Mail, Adresse
- Social Media Links
- Google Maps Embed URL
- Gründungsjahr

### Inhalte

- **Services**: Name, Beschreibung, Dauer, Preis, Icon
- **Team**: Name, Rolle, Bio, Foto
- **Gallery**: Titel, Bild, Featured-Flag
- **Testimonials**: Text, Autor, Detail, Rating
- **Hero**: Titel, Beschreibung, CTA-Buttons, Hero-Bild
- **About**: Geschichte, Stats, Badge

### Sektions-Texte (`sections`)

Jede Sektion hat eigene Labels:
- `subtitle`: Kleine Überschrift oben
- `title`: Hauptüberschrift
- `titleHighlight`: Hervorgehobenes Wort (wird kursiv + Primärfarbe)
- `description`: Beschreibungstext

### Navigation (`nav`)

- Links: Array von `{label, href}` — Reihenfolge und Anzahl frei wählbar
- CTA-Button: Label und Link

### Module (`modules`)

```typescript
modules: {
  booking: { enabled: true },  // Buchungssystem ein/aus
  hours: { enabled: true },    // Öffnungszeiten-Widget
  services: { enabled: true }, // Services-Widget
}
```

### Sonstiges

- **Loader**: `enabled: true/false` — Ladebildschirm an/aus
- **Footer**: Copyright-Text, Barber-Pole-Stripe an/aus

## Bilder austauschen

Bilder liegen in `public/images/`. Ersetze sie einfach mit gleichen Dateinamen oder ändere die Pfade in `site.config.ts`.

Empfohlene Grössen:
- **Hero**: 800px+ Breite, 3:4 Verhältnis
- **Shop Interior**: 800px+ Breite, 4:5 Verhältnis
- **Gallery**: 600px+ Breite, quadratisch oder hochformat
- **Team**: 400px+ Breite, quadratisch (wird rund zugeschnitten)

## Validierung

Die Config wird beim Build automatisch mit Zod validiert. Fehlende oder falsche Felder werden als Fehler gemeldet:

```
❌ site.config.ts validation failed:
  → contact.email: Invalid email
  → services.0.price: Required
```

## Projektstruktur

```
site.config.ts            ← DIESE DATEI ANPASSEN (pro Kunde)
site.config.schema.ts     ← Schema (nicht anfassen)
src/
├── config/index.ts       ← Config-Import + Validierung
├── sections/             ← Sektions-Komponenten (datengetrieben)
├── components/
│   ├── ui/               ← Shared UI (SectionHeader, ServiceIcon)
│   └── react/            ← React-Komponenten (BookingAssistant)
├── modules/              ← Widget-Quellcode
│   ├── hours/
│   ├── booking/
│   └── services/
├── layouts/Layout.astro  ← Haupt-Layout (config-driven)
├── pages/index.astro     ← Seitenkomposition (21 Zeilen)
└── styles/global.css     ← CSS mit semantischen Variablen
```
