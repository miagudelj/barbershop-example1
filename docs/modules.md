# Widget-Module — Embed-Dokumentation

Die Widgets können auf jeder beliebigen HTML-Seite eingebettet werden.
Jedes Widget ist ein eigenständiges JavaScript-Bundle (IIFE) mit React.

## Verfügbare Widgets

| Widget | Container-ID | Script | Beschreibung |
|--------|-------------|--------|-------------|
| Hours | `bs-hours` | `/widgets/hours.js` | Öffnungszeiten anzeigen |
| Booking | `bs-booking` | `/widgets/booking.js` | Terminbuchung (mehrstufig) |
| Services | `bs-services` | `/widgets/services.js` | Dienstleistungen anzeigen |

## Quick Embed

Widget bringt eigene Styles mit — einfach Container + Script einfügen:

```html
<div id="bs-hours" data-config='{
  "title": "Öffnungszeiten",
  "regular": [
    {"days": "Dienstag – Freitag", "time": "09:00 – 18:30"},
    {"days": "Samstag", "time": "09:00 – 16:00"}
  ],
  "closedLabel": "Sonntag & Montag: Geschlossen"
}'></div>
<script src="https://your-domain.com/widgets/hours.js"></script>
```

## Custom Design

Kein CSS wird injiziert — du kontrollierst das Styling über dokumentierte CSS-Klassen:

```html
<div id="bs-hours" data-no-css="true" data-config='{...}'></div>
<script src="https://your-domain.com/widgets/hours.js"></script>
```

## CSS-Variablen (Theming)

Setze diese auf `:root` oder einem übergeordneten Element, um die Widgets an deine Marke anzupassen:

```css
:root {
  --bs-primary: #C9A96E;       /* Primärfarbe (Gold) */
  --bs-primary-light: #D4B87A; /* Primär hell (Hover) */
  --bs-primary-dark: #A8894E;  /* Primär dunkel */
  --bs-bg: #0A0A0A;            /* Hintergrund */
  --bs-bg-card: #1A1A1A;       /* Karten-Hintergrund */
  --bs-bg-card-alt: #2A1F14;   /* Karten-Hintergrund (alternativ) */
  --bs-text: #F5E6D0;          /* Textfarbe */
  --bs-text-muted: #9A9088;    /* Gedämpfter Text */
  --bs-border: #3D2E1E;        /* Rahmenfarbe */
  --bs-font-heading: 'Playfair Display', Georgia, serif;
  --bs-font-body: 'Inter', system-ui, sans-serif;
}
```

## Konfigurations-Optionen

### Methode 1: data-config Attribut (empfohlen)

```html
<div id="bs-hours" data-config='{"title": "Unsere Zeiten"}'></div>
```

### Methode 2: Globales Config-Objekt

```html
<script>
  window.__BS_CONFIG__ = {
    title: "Globale Config",
    regular: [...]
  };
</script>
<div id="bs-hours"></div>
<script src="/widgets/hours.js"></script>
```

---

## Hours Widget

**Container:** `#bs-hours`

### Config

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `title` | string | `"Öffnungszeiten"` | Widget-Titel |
| `regular` | array | Standardzeiten | Array von `{days, time}` Objekten |
| `closedLabel` | string | `"Sonntag & Montag: Geschlossen"` | Text für geschlossene Tage |
| `note` | string | — | Optionale Notiz (z.B. Feiertage) |

### CSS-Klassen

| Klasse | Element |
|--------|---------|
| `.bs-hours` | Container |
| `.bs-hours__title` | Titel |
| `.bs-hours__list` | Liste (ul) |
| `.bs-hours__item` | Listeneintrag (li) |
| `.bs-hours__days` | Tage-Text |
| `.bs-hours__time` | Uhrzeit-Text |
| `.bs-hours__item--closed` | Geschlossen-Eintrag |
| `.bs-hours__note` | Notiz-Text |

---

## Services Widget

**Container:** `#bs-services`

### Config

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `title` | string | `"Unsere Dienstleistungen"` | Widget-Titel |
| `services` | array | `[]` | Array von Service-Objekten |

**Service-Objekt:**
```json
{
  "id": "cut",
  "name": "Herrenschnitt",
  "description": "Präziser Schnitt mit Beratung.",
  "duration": "30 Min",
  "price": "CHF 55"
}
```

### CSS-Klassen

| Klasse | Element |
|--------|---------|
| `.bs-services` | Container |
| `.bs-services__title` | Titel |
| `.bs-services__grid` | Karten-Grid |
| `.bs-services__card` | Einzelne Karte |
| `.bs-services__card-header` | Karten-Header (Name + Preis) |
| `.bs-services__name` | Service-Name |
| `.bs-services__price` | Preis |
| `.bs-services__desc` | Beschreibung |
| `.bs-services__duration` | Dauer |

---

## Booking Widget

**Container:** `#bs-booking`

### Config

| Feld | Typ | Standard | Beschreibung |
|------|-----|----------|-------------|
| `services` | array | `[]` | Buchbare Services `{id, name, duration, price}` |
| `barbers` | array | `[]` | Verfügbare Barber `{id, name}` |
| `closedDays` | number[] | `[0, 1]` | Geschlossene Wochentage (0=So, 1=Mo) |
| `closedLabel` | string | — | Text "Montag & Sonntag geschlossen" |
| `onConfirm` | function | — | Callback bei Buchungsbestätigung |

### CSS-Klassen (Auswahl)

| Klasse | Element |
|--------|---------|
| `.bs-booking` | Container |
| `.bs-booking__progress` | Fortschrittsanzeige |
| `.bs-booking__step-dot` | Schritt-Punkt |
| `.bs-booking__step-dot--active` | Aktiver Schritt |
| `.bs-booking__service-btn` | Service-Button |
| `.bs-booking__barber-btn` | Barber-Button |
| `.bs-booking__calendar` | Kalender-Container |
| `.bs-booking__cal-day` | Kalendertag |
| `.bs-booking__cal-day--selected` | Ausgewählter Tag |
| `.bs-booking__slot` | Zeitslot |
| `.bs-booking__slot--selected` | Ausgewählter Slot |
| `.bs-booking__summary` | Buchungsübersicht |
| `.bs-booking__btn-primary` | Primär-Button |
| `.bs-booking__btn-outline` | Outline-Button |

---

## Build

```bash
# Alle Widgets bauen
npm run build:widgets

# Einzelnes Widget bauen
npm run build:widget:hours
npm run build:widget:booking
npm run build:widget:services

# Kompletter Build (Widgets + Astro-Site)
npm run build
```

Output: `public/widgets/{name}.js`
