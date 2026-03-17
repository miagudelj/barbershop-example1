import { useState, useMemo } from 'react';

export interface BookingService {
  id: string;
  name: string;
  duration: string;
  price: string;
}

export interface BookingBarber {
  id: string;
  name: string;
}

export interface BookingConfig {
  services: BookingService[];
  barbers: BookingBarber[];
  closedDays?: number[];
  closedLabel?: string;
  title?: string;
  onConfirm?: (booking: BookingData) => void;
}

export interface BookingData {
  service: BookingService;
  barber: BookingBarber;
  date: string;
  time: string;
}

const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30',
];

const MONTH_NAMES = [
  'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember',
];

function getMonthDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const adjustedFirst = firstDay === 0 ? 6 : firstDay - 1;
  return { firstDay: adjustedFirst, daysInMonth };
}

export default function BookingWidget({ config }: { config: BookingConfig }) {
  const { services, barbers, closedDays = [0, 1], closedLabel, onConfirm } = config;

  const [step, setStep] = useState(0);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedBarber, setSelectedBarber] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());

  const { firstDay, daysInMonth } = useMemo(() => getMonthDays(viewYear, viewMonth), [viewYear, viewMonth]);

  const unavailableSlots = useMemo(() => {
    const set = new Set<string>();
    if (selectedDate) {
      const seed = selectedDate * 7;
      TIME_SLOTS.forEach((slot, i) => {
        if ((seed + i * 13) % 5 === 0) set.add(slot);
      });
    }
    return set;
  }, [selectedDate]);

  const isDateDisabled = (day: number) => {
    const date = new Date(viewYear, viewMonth, day);
    if (closedDays.includes(date.getDay())) return true;
    if (viewYear === today.getFullYear() && viewMonth === today.getMonth() && day <= today.getDate()) return true;
    return false;
  };

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); } else setViewMonth(m => m - 1);
  };
  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); } else setViewMonth(m => m + 1);
  };
  const canGoPrev = viewYear > today.getFullYear() || (viewYear === today.getFullYear() && viewMonth > today.getMonth());

  const serviceObj = services.find(s => s.id === selectedService);
  const barberObj = barbers.find(b => b.id === selectedBarber);

  const handleConfirm = () => {
    if (serviceObj && barberObj && selectedDate && selectedTime) {
      onConfirm?.({
        service: serviceObj,
        barber: barberObj,
        date: `${selectedDate}. ${MONTH_NAMES[viewMonth]} ${viewYear}`,
        time: selectedTime,
      });
    }
    setStep(4);
  };

  const reset = () => {
    setStep(0); setSelectedService(null); setSelectedBarber(null);
    setSelectedDate(null); setSelectedTime(null);
  };

  return (
    <div className="bs-booking">
      {/* Progress */}
      <div className="bs-booking__progress">
        {['Leistung', 'Barber', 'Termin', 'Fertig'].map((label, i) => (
          <div key={i} className="bs-booking__step-item">
            <div className={`bs-booking__step-dot ${i <= step ? 'bs-booking__step-dot--active' : ''}`}>
              {i < step ? '✓' : i + 1}
            </div>
            <span className="bs-booking__step-label">{label}</span>
            {i < 3 && <div className="bs-booking__step-line" />}
          </div>
        ))}
      </div>

      {/* Step 0: Services */}
      {step === 0 && (
        <div className="bs-booking__panel">
          <h3 className="bs-booking__heading">Wählen Sie Ihre Dienstleistung</h3>
          <div className="bs-booking__service-list">
            {services.map((s) => (
              <button key={s.id} onClick={() => { setSelectedService(s.id); setStep(1); }}
                className={`bs-booking__service-btn ${selectedService === s.id ? 'bs-booking__service-btn--active' : ''}`}>
                <div>
                  <div className="bs-booking__service-name">{s.name}</div>
                  <div className="bs-booking__service-duration">{s.duration}</div>
                </div>
                <div className="bs-booking__service-price">{s.price}</div>
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Step 1: Barber */}
      {step === 1 && (
        <div className="bs-booking__panel">
          <h3 className="bs-booking__heading">Wählen Sie Ihren Barber</h3>
          <div className="bs-booking__barber-grid">
            {barbers.map((b) => (
              <button key={b.id} onClick={() => { setSelectedBarber(b.id); setStep(2); }}
                className={`bs-booking__barber-btn ${selectedBarber === b.id ? 'bs-booking__barber-btn--active' : ''}`}>
                <div className="bs-booking__barber-avatar">{b.id === 'any' ? '✂' : '🧔'}</div>
                <div className="bs-booking__barber-name">{b.name}</div>
              </button>
            ))}
          </div>
          <button onClick={() => setStep(0)} className="bs-booking__back">← Zurück</button>
        </div>
      )}

      {/* Step 2: Date & Time */}
      {step === 2 && (
        <div className="bs-booking__panel">
          <h3 className="bs-booking__heading">Wählen Sie Datum & Uhrzeit</h3>

          <div className="bs-booking__calendar">
            <div className="bs-booking__cal-nav">
              <button onClick={prevMonth} disabled={!canGoPrev} className="bs-booking__cal-btn">←</button>
              <span className="bs-booking__cal-month">{MONTH_NAMES[viewMonth]} {viewYear}</span>
              <button onClick={nextMonth} className="bs-booking__cal-btn">→</button>
            </div>
            <div className="bs-booking__cal-header">
              {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map(d => (
                <div key={d} className="bs-booking__cal-day-name">{d}</div>
              ))}
            </div>
            <div className="bs-booking__cal-grid">
              {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const disabled = isDateDisabled(day);
                const selected = selectedDate === day;
                return (
                  <button key={day} disabled={disabled} onClick={() => { setSelectedDate(day); setSelectedTime(null); }}
                    className={`bs-booking__cal-day ${disabled ? 'bs-booking__cal-day--disabled' : ''} ${selected ? 'bs-booking__cal-day--selected' : ''}`}>
                    {day}
                  </button>
                );
              })}
            </div>
            {closedLabel && <div className="bs-booking__cal-note">{closedLabel}</div>}
          </div>

          {selectedDate && (
            <div className="bs-booking__timeslots">
              <h4 className="bs-booking__timeslots-title">
                Verfügbare Zeiten am {selectedDate}. {MONTH_NAMES[viewMonth]}
              </h4>
              <div className="bs-booking__timeslots-grid">
                {TIME_SLOTS.map((slot) => {
                  const unavail = unavailableSlots.has(slot);
                  return (
                    <button key={slot} disabled={unavail} onClick={() => setSelectedTime(slot)}
                      className={`bs-booking__slot ${unavail ? 'bs-booking__slot--unavail' : ''} ${selectedTime === slot ? 'bs-booking__slot--selected' : ''}`}>
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="bs-booking__nav">
            <button onClick={() => setStep(1)} className="bs-booking__back">← Zurück</button>
            {selectedDate && selectedTime && (
              <button onClick={() => setStep(3)} className="bs-booking__next">Weiter →</button>
            )}
          </div>
        </div>
      )}

      {/* Step 3: Confirm */}
      {step === 3 && (
        <div className="bs-booking__panel bs-booking__panel--center">
          <h3 className="bs-booking__heading">Ihre Buchungsübersicht</h3>
          <div className="bs-booking__summary">
            <div className="bs-booking__summary-row">
              <span className="bs-booking__summary-label">Dienstleistung</span>
              <span className="bs-booking__summary-value">{serviceObj?.name}</span>
            </div>
            <div className="bs-booking__summary-row">
              <span className="bs-booking__summary-label">Barber</span>
              <span className="bs-booking__summary-value">{barberObj?.name}</span>
            </div>
            <div className="bs-booking__summary-row">
              <span className="bs-booking__summary-label">Datum</span>
              <span className="bs-booking__summary-value">{selectedDate}. {MONTH_NAMES[viewMonth]} {viewYear}</span>
            </div>
            <div className="bs-booking__summary-row">
              <span className="bs-booking__summary-label">Uhrzeit</span>
              <span className="bs-booking__summary-value">{selectedTime} Uhr</span>
            </div>
            <div className="bs-booking__summary-row bs-booking__summary-row--total">
              <span className="bs-booking__summary-label">Preis</span>
              <span className="bs-booking__summary-price">{serviceObj?.price}</span>
            </div>
          </div>
          <div className="bs-booking__actions">
            <button onClick={() => setStep(2)} className="bs-booking__btn-outline">Zurück</button>
            <button onClick={handleConfirm} className="bs-booking__btn-primary">Termin bestätigen</button>
          </div>
        </div>
      )}

      {/* Step 4: Success */}
      {step === 4 && (
        <div className="bs-booking__panel bs-booking__panel--center">
          <div className="bs-booking__success-icon">✓</div>
          <h3 className="bs-booking__heading">Vielen Dank!</h3>
          <p className="bs-booking__text">Ihr Termin wurde erfolgreich gebucht.</p>
          <p className="bs-booking__text-small">
            {serviceObj?.name} bei {barberObj?.name}<br />
            {selectedDate}. {MONTH_NAMES[viewMonth]} {viewYear} um {selectedTime} Uhr
          </p>
          <p className="bs-booking__text-muted">(Dies ist eine Demo — keine echte Buchung)</p>
          <button onClick={reset} className="bs-booking__btn-outline">Neue Buchung</button>
        </div>
      )}
    </div>
  );
}
