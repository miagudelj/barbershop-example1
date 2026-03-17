import { useState, useMemo } from 'react';

interface Service {
  id: string;
  name: string;
  duration: string;
  price: string;
}

interface Barber {
  id: string;
  name: string;
}

interface BookingAssistantProps {
  services: Service[];
  barbers: Barber[];
  closedDays: number[];
  closedLabel?: string;
}

const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30',
];

const MONTH_NAMES = [
  'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
];

function getMonthDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const adjustedFirst = firstDay === 0 ? 6 : firstDay - 1;
  return { firstDay: adjustedFirst, daysInMonth };
}

export default function BookingAssistant({ services, barbers, closedDays, closedLabel }: BookingAssistantProps) {
  const [step, setStep] = useState(0);
  const [selectedService, setSelectedService] = useState<string | null>(null);
  const [selectedBarber, setSelectedBarber] = useState<string | null>(null);
  const [selectedDate, setSelectedDate] = useState<number | null>(null);
  const [selectedTime, setSelectedTime] = useState<string | null>(null);

  const today = new Date();
  const [viewMonth, setViewMonth] = useState(today.getMonth());
  const [viewYear, setViewYear] = useState(today.getFullYear());

  const { firstDay, daysInMonth } = useMemo(
    () => getMonthDays(viewYear, viewMonth),
    [viewYear, viewMonth]
  );

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
    const dayOfWeek = date.getDay();
    if (closedDays.includes(dayOfWeek)) return true;
    if (viewYear === today.getFullYear() && viewMonth === today.getMonth() && day <= today.getDate()) return true;
    return false;
  };

  const prevMonth = () => {
    if (viewMonth === 0) { setViewMonth(11); setViewYear(y => y - 1); }
    else setViewMonth(m => m - 1);
  };

  const nextMonth = () => {
    if (viewMonth === 11) { setViewMonth(0); setViewYear(y => y + 1); }
    else setViewMonth(m => m + 1);
  };

  const canGoPrev = viewYear > today.getFullYear() || (viewYear === today.getFullYear() && viewMonth > today.getMonth());

  const selectedServiceObj = services.find(s => s.id === selectedService);
  const selectedBarberObj = barbers.find(s => s.id === selectedBarber);

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-1 sm:gap-2 mb-8 sm:mb-10 px-2">
        {['Leistung', 'Barber', 'Termin', 'Fertig'].map((label, i) => (
          <div key={i} className="flex items-center gap-1 sm:gap-2">
            <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium transition-all duration-300 flex-shrink-0 ${
              i <= step
                ? 'bg-[var(--color-primary)] text-[var(--color-bg)]'
                : 'bg-[var(--color-border)] text-[var(--color-text-muted)]'
            }`}>
              {i < step ? '✓' : i + 1}
            </div>
            <span className="hidden sm:inline text-xs text-[var(--color-text-muted)] tracking-wide uppercase">
              {label}
            </span>
            {i < 3 && <div className="w-4 sm:w-10 h-px bg-[var(--color-border)] flex-shrink-0" />}
          </div>
        ))}
      </div>

      {/* Step 1: Service Selection */}
      {step === 0 && (
        <div className="space-y-3">
          <h3 className="text-xl text-center mb-6 text-[var(--color-text)]" style={{ fontFamily: 'var(--font-serif)' }}>
            Wählen Sie Ihre Dienstleistung
          </h3>
          {services.map((service) => (
            <button
              key={service.id}
              onClick={() => { setSelectedService(service.id); setStep(1); }}
              className={`w-full text-left p-5 rounded-xl border transition-all duration-300 hover:border-[var(--color-primary)] hover:shadow-lg ${
                selectedService === service.id
                  ? 'border-[var(--color-primary)] bg-[var(--color-bg-card-alt2)] shadow-md'
                  : 'border-[var(--color-border)] bg-[var(--color-bg-card)]'
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium text-[var(--color-text)]">{service.name}</div>
                  <div className="text-sm text-[var(--color-text-muted)] mt-1">{service.duration}</div>
                </div>
                <div className="text-[var(--color-primary)] font-semibold">{service.price}</div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Step 2: Barber Selection */}
      {step === 1 && (
        <div>
          <h3 className="text-xl text-center mb-6 text-[var(--color-text)]" style={{ fontFamily: 'var(--font-serif)' }}>
            Wählen Sie Ihren Barber
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {barbers.map((barber) => (
              <button
                key={barber.id}
                onClick={() => { setSelectedBarber(barber.id); setStep(2); }}
                className={`p-6 rounded-xl border text-center transition-all duration-300 hover:border-[var(--color-primary)] hover:shadow-lg ${
                  selectedBarber === barber.id
                    ? 'border-[var(--color-primary)] bg-[var(--color-bg-card-alt2)]'
                    : 'border-[var(--color-border)] bg-[var(--color-bg-card)]'
                }`}
              >
                <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl"
                  style={{ background: 'linear-gradient(135deg, var(--color-border), var(--color-primary-dark))' }}>
                  {barber.id === 'any' ? '✂' : '🧔'}
                </div>
                <div className="font-medium text-sm text-[var(--color-text)]">{barber.name}</div>
              </button>
            ))}
          </div>
          <button onClick={() => setStep(0)} className="mt-6 text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">
            ← Zurück
          </button>
        </div>
      )}

      {/* Step 3: Date & Time */}
      {step === 2 && (
        <div>
          <h3 className="text-xl text-center mb-6 text-[var(--color-text)]" style={{ fontFamily: 'var(--font-serif)' }}>
            Wählen Sie Datum & Uhrzeit
          </h3>

          <div className="bg-[var(--color-bg-card)] rounded-2xl p-4 sm:p-6 border border-[var(--color-border)] mb-6">
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={prevMonth}
                disabled={!canGoPrev}
                className="p-2 hover:bg-[var(--color-bg-card-alt2)] rounded-lg transition-colors disabled:opacity-30 text-[var(--color-text)]"
              >
                ←
              </button>
              <span className="font-medium text-[var(--color-text)]" style={{ fontFamily: 'var(--font-serif)' }}>
                {MONTH_NAMES[viewMonth]} {viewYear}
              </span>
              <button onClick={nextMonth} className="p-2 hover:bg-[var(--color-bg-card-alt2)] rounded-lg transition-colors text-[var(--color-text)]">
                →
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-xs text-[var(--color-text-muted)] mb-2">
              {['Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa', 'So'].map(d => (
                <div key={d} className="py-2 font-medium">{d}</div>
              ))}
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-sm">
              {Array.from({ length: firstDay }).map((_, i) => (
                <div key={`empty-${i}`} />
              ))}
              {Array.from({ length: daysInMonth }).map((_, i) => {
                const day = i + 1;
                const disabled = isDateDisabled(day);
                const selected = selectedDate === day;
                return (
                  <button
                    key={day}
                    disabled={disabled}
                    onClick={() => { setSelectedDate(day); setSelectedTime(null); }}
                    className={`calendar-day py-2.5 rounded-lg text-sm transition-all ${
                      disabled ? 'disabled' : ''
                    } ${selected ? 'selected' : 'hover:bg-[var(--color-bg-card-alt2)]'}`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
            {closedLabel && (
              <div className="mt-3 text-xs text-[var(--color-text-muted)] text-center">{closedLabel}</div>
            )}
          </div>

          {selectedDate && (
            <div className="bg-[var(--color-bg-card)] rounded-2xl p-4 sm:p-6 border border-[var(--color-border)]">
              <h4 className="font-medium mb-4 text-sm text-[var(--color-text-muted)] uppercase tracking-wide">
                Verfügbare Zeiten am {selectedDate}. {MONTH_NAMES[viewMonth]}
              </h4>
              <div className="grid grid-cols-2 xs:grid-cols-3 sm:grid-cols-4 gap-2">
                {TIME_SLOTS.map((slot) => {
                  const unavail = unavailableSlots.has(slot);
                  return (
                    <button
                      key={slot}
                      disabled={unavail}
                      onClick={() => setSelectedTime(slot)}
                      className={`time-slot text-sm ${unavail ? 'unavailable' : ''} ${
                        selectedTime === slot ? 'selected' : ''
                      }`}
                    >
                      {slot}
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          <div className="flex justify-between mt-6">
            <button onClick={() => setStep(1)} className="text-sm text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors">
              ← Zurück
            </button>
            {selectedDate && selectedTime && (
              <button onClick={() => setStep(3)} className="btn-primary text-sm">
                Weiter →
              </button>
            )}
          </div>
        </div>
      )}

      {/* Step 4: Confirmation */}
      {step === 3 && (
        <div className="text-center">
          <h3 className="text-xl mb-6 text-[var(--color-text)]" style={{ fontFamily: 'var(--font-serif)' }}>
            Ihre Buchungsübersicht
          </h3>
          <div className="bg-[var(--color-bg-card)] rounded-2xl p-5 sm:p-8 border border-[var(--color-border)] text-left space-y-4 max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row sm:justify-between border-b border-[var(--color-border)] pb-3 gap-1">
              <span className="text-[var(--color-text-muted)] text-sm">Dienstleistung</span>
              <span className="font-medium text-sm sm:text-base text-[var(--color-text)]">{selectedServiceObj?.name}</span>
            </div>
            <div className="flex justify-between border-b border-[var(--color-border)] pb-3">
              <span className="text-[var(--color-text-muted)] text-sm">Barber</span>
              <span className="font-medium text-sm sm:text-base text-[var(--color-text)]">{selectedBarberObj?.name}</span>
            </div>
            <div className="flex justify-between border-b border-[var(--color-border)] pb-3">
              <span className="text-[var(--color-text-muted)] text-sm">Datum</span>
              <span className="font-medium text-sm sm:text-base text-[var(--color-text)]">{selectedDate}. {MONTH_NAMES[viewMonth]} {viewYear}</span>
            </div>
            <div className="flex justify-between border-b border-[var(--color-border)] pb-3">
              <span className="text-[var(--color-text-muted)] text-sm">Uhrzeit</span>
              <span className="font-medium text-sm sm:text-base text-[var(--color-text)]">{selectedTime} Uhr</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--color-text-muted)] text-sm">Preis</span>
              <span className="font-semibold text-[var(--color-primary)]">{selectedServiceObj?.price}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-8 px-4">
            <button onClick={() => setStep(2)} className="btn-outline text-sm">
              Zurück
            </button>
            <button onClick={() => setStep(4)} className="btn-primary text-sm">
              Termin bestätigen
            </button>
          </div>
        </div>
      )}

      {/* Step 5: Success */}
      {step === 4 && (
        <div className="text-center py-8">
          <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl"
            style={{ background: 'linear-gradient(135deg, var(--color-primary), var(--color-primary-light))' }}>
            ✓
          </div>
          <h3 className="text-2xl mb-3 text-[var(--color-text)]" style={{ fontFamily: 'var(--font-serif)' }}>
            Vielen Dank!
          </h3>
          <p className="text-[var(--color-text-muted)] mb-2">
            Ihr Termin wurde erfolgreich gebucht.
          </p>
          <p className="text-sm text-[var(--color-text-muted)]">
            {selectedServiceObj?.name} bei {selectedBarberObj?.name}<br />
            {selectedDate}. {MONTH_NAMES[viewMonth]} {viewYear} um {selectedTime} Uhr
          </p>
          <p className="text-sm text-[var(--color-text-muted-light)] mt-4">
            (Dies ist eine Demo — keine echte Buchung)
          </p>
          <button
            onClick={() => { setStep(0); setSelectedService(null); setSelectedBarber(null); setSelectedDate(null); setSelectedTime(null); }}
            className="btn-outline text-sm mt-8"
          >
            Neue Buchung
          </button>
        </div>
      )}
    </div>
  );
}
