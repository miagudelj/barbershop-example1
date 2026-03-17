export interface ServiceItem {
  id: string;
  name: string;
  description?: string;
  duration: string;
  price: string;
}

export interface ServicesConfig {
  title?: string;
  services: ServiceItem[];
}

const defaults: ServicesConfig = {
  title: 'Unsere Dienstleistungen',
  services: [],
};

export default function ServicesWidget({ config }: { config: ServicesConfig }) {
  const c = { ...defaults, ...config };

  if (c.services.length === 0) {
    return <div className="bs-services bs-services--empty">Keine Dienstleistungen konfiguriert.</div>;
  }

  return (
    <div className="bs-services">
      {c.title && <h3 className="bs-services__title">{c.title}</h3>}
      <div className="bs-services__grid">
        {c.services.map((service) => (
          <div key={service.id} className="bs-services__card">
            <div className="bs-services__card-header">
              <h4 className="bs-services__name">{service.name}</h4>
              <span className="bs-services__price">{service.price}</span>
            </div>
            {service.description && (
              <p className="bs-services__desc">{service.description}</p>
            )}
            <span className="bs-services__duration">ca. {service.duration}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
