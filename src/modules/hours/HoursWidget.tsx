export interface HoursConfig {
  title?: string;
  regular: Array<{ days: string; time: string }>;
  closedLabel?: string;
  note?: string;
}

const defaults: HoursConfig = {
  title: 'Öffnungszeiten',
  regular: [
    { days: 'Dienstag – Freitag', time: '09:00 – 18:30' },
    { days: 'Samstag', time: '09:00 – 16:00' },
  ],
  closedLabel: 'Sonntag & Montag: Geschlossen',
};

export default function HoursWidget({ config }: { config: HoursConfig }) {
  const c = { ...defaults, ...config };

  return (
    <div className="bs-hours">
      {c.title && <h3 className="bs-hours__title">{c.title}</h3>}
      <ul className="bs-hours__list">
        {c.regular.map((entry, i) => (
          <li key={i} className="bs-hours__item">
            <span className="bs-hours__days">{entry.days}</span>
            <span className="bs-hours__time">{entry.time}</span>
          </li>
        ))}
        {c.closedLabel && (
          <li className="bs-hours__item bs-hours__item--closed">
            <span className="bs-hours__days">{c.closedLabel}</span>
          </li>
        )}
      </ul>
      {c.note && <p className="bs-hours__note">{c.note}</p>}
    </div>
  );
}
