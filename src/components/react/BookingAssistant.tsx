import { useState, useMemo } from 'react';

const SERVICES = [
  { id: 'cut', name: 'Herrenschnitt', duration: '30 Min', price: 'CHF 55' },
  { id: 'shave', name: 'Nassrasur', duration: '30 Min', price: 'CHF 50' },
  { id: 'combo', name: 'Schnitt & Rasur Kombi', duration: '55 Min', price: 'CHF 90' },
  { id: 'beard', name: 'Bart-Trimm & Kontur', duration: '20 Min', price: 'CHF 35' },
  { id: 'hottowel', name: 'Hot-Towel Treatment', duration: '25 Min', price: 'CHF 40' },
  { id: 'deluxe', name: 'Grand Deluxe Paket', duration: '75 Min', price: 'CHF 140' },
];

const BARBERS = [
  { id: 'marco', name: 'Marco' },
  { id: 'david', name: 'David' },
  { id: 'luca', name: 'Luca' },
  { id: 'any', name: 'Keine Präferenz' },
];

const TIME_SLOTS = [
  '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
  '13:00', '13:30', '14:00', '14:30', '15:00', '15:30',
  '16:00', '16:30', '17:00', '17:30',
];

function getMonthDays(year: number, month: number) {
  const firstDay = new Date(year, month, 1).getDay();
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const adjustedFirst = firstDay === 0 ? 6 : firstDay - 1; // Monday start
  return { firstDay: adjustedFirst, daysInMonth };
}

const MONTH_NAMES = [
  'Januar', 'Februar', 'März', 'April', 'Mai', 'Juni',
  'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'
];

export default function BookingAssistant() {
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

  // Simulate some unavailable slots
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
    if (dayOfWeek === 0 || dayOfWeek === 1) return true; // Sonntag & Montag geschlossen
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

  const selectedServiceObj = SERVICES.find(s => s.id === selectedService);
  const selectedBarberObj = BARBERS.find(s => s.id === selectedBarber);

  const handleConfirm = () => {
    setStep(4);
  };

  return (
    <div className="max-w-3xl mx-auto">
      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-1 sm:gap-2 mb-8 sm:mb-10 px-2">
        {['Leistung', 'Barber', 'Termin', 'Fertig'].map((label, i) => (
          <div key={i} className="flex items-center gap-1 sm:gap-2">
            <div className={`w-8 h-8 sm:w-9 sm:h-9 rounded-full flex items-center justify-center text-xs sm:text-sm font-medium transition-all duration-300 flex-shrink-0 ${
              i <= step
                ? 'bg-[var(--color-gold)] text-[var(--color-black)]'
                : 'bg-[var(--color-brown-light)] text-[var(--color-warm-gray)]'
            }`}>
              {i < step ? '✓' : i + 1}
            </div>
            <span className="hidden sm:inline text-xs text-[var(--color-warm-gray)] tracking-wide uppercase">
              {label}
            </span>
            {i < 3 && <div className="w-4 sm:w-10 h-px bg-[var(--color-brown-light)] flex-shrink-0" />}
          </div>
        ))}
      </div>

      {/* Step 1: Service Selection */}
      {step === 0 && (
        <div className="space-y-3">
          <h3 className="text-xl text-center mb-6 text-[var(--color-cream)]" style={{ fontFamily: 'var(--font-serif)' }}>
            Wählen Sie Ihre Dienstleistung
          </h3>
          {SERVICES.map((service) => (
            <button
              key={service.id}
              onClick={() => { setSelectedService(service.id); setStep(1); }}
              className={`w-full text-left p-5 rounded-xl border transition-all duration-300 hover:border-[var(--color-gold)] hover:shadow-lg ${
                selectedService === service.id
                  ? 'border-[var(--color-gold)] bg-[var(--color-brown)] shadow-md'
                  : 'border-[var(--color-brown-light)] bg-[var(--color-dark)]'
              }`}
            >
              <div className="flex justify-between items-center">
                <div>
                  <div className="font-medium text-[var(--color-cream)]">{service.name}</div>
                  <div className="text-sm text-[var(--color-warm-gray)] mt-1">{service.duration}</div>
                </div>
                <div className="text-[var(--color-gold)] font-semibold">{service.price}</div>
              </div>
            </button>
          ))}
        </div>
      )}

      {/* Step 2: Barber Selection */}
      {step === 1 && (
        <div>
          <h3 className="text-xl text-center mb-6 text-[var(--color-cream)]" style={{ fontFamily: 'var(--font-serif)' }}>
            Wählen Sie Ihren Barber
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            {BARBERS.map((barber) => (
              <button
                key={barber.id}
                onClick={() => { setSelectedBarber(barber.id); setStep(2); }}
                className={`p-6 rounded-xl border text-center transition-all duration-300 hover:border-[var(--color-gold)] hover:shadow-lg ${
                  selectedBarber === barber.id
                    ? 'border-[var(--color-gold)] bg-[var(--color-brown)]'
                    : 'border-[var(--color-brown-light)] bg-[var(--color-dark)]'
                }`}
              >
                <div className="w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center text-2xl"
                  style={{ background: 'linear-gradient(135deg, var(--color-brown-light), var(--color-gold-dark))' }}>
                  {barber.id === 'any' ? '✂' : '🧔'}
                </div>
                <div className="font-medium text-sm text-[var(--color-cream)]">{barber.name}</div>
              </button>
            ))}
          </div>
          <button onClick={() => setStep(0)} className="mt-6 text-sm text-[var(--color-warm-gray)] hover:text-[var(--color-gold)] transition-colors">
            ← Zurück
          </button>
        </div>
      )}

      {/* Step 3: Date & Time */}
      {step === 2 && (
        <div>
          <h3 className="text-xl text-center mb-6 text-[var(--color-cream)]" style={{ fontFamily: 'var(--font-serif)' }}>
            Wählen Sie Datum & Uhrzeit
          </h3>

          {/* Calendar */}
          <div className="bg-[var(--color-dark)] rounded-2xl p-4 sm:p-6 border border-[var(--color-brown-light)] mb-6">
            <div className="flex justify-between items-center mb-4">
              <button
                onClick={prevMonth}
                disabled={!canGoPrev}
                className="p-2 hover:bg-[var(--color-brown)] rounded-lg transition-colors disabled:opacity-30 text-[var(--color-cream)]"
              >
                ←
              </button>
              <span className="font-medium text-[var(--color-cream)]" style={{ fontFamily: 'var(--font-serif)' }}>
                {MONTH_NAMES[viewMonth]} {viewYear}
              </span>
              <button onClick={nextMonth} className="p-2 hover:bg-[var(--color-brown)] rounded-lg transition-colors text-[var(--color-cream)]">
                →
              </button>
            </div>

            <div className="grid grid-cols-7 gap-1 text-center text-xs text-[var(--color-warm-gray)] mb-2">
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
                    } ${selected ? 'selected' : 'hover:bg-[var(--color-brown)]'}`}
                  >
                    {day}
                  </button>
                );
              })}
            </div>
            <div className="mt-3 text-xs text-[var(--color-warm-gray)] text-center">
              Montag & Sonntag geschlossen
            </div>
          </div>

          {/* Time Slots */}
          {selectedDate && (
            <div className="bg-[var(--color-dark)] rounded-2xl p-4 sm:p-6 border border-[var(--color-brown-light)]">
              <h4 className="font-medium mb-4 text-sm text-[var(--color-warm-gray)] uppercase tracking-wide">
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
            <button onClick={() => setStep(1)} className="text-sm text-[var(--color-warm-gray)] hover:text-[var(--color-gold)] transition-colors">
              ← Zurück
            </button>
            {selectedDate && selectedTime && (
              <button onClick={() => setStep(3)} className="btn-gold text-sm">
                Weiter →
              </button>
            )}
          </div>
        </div>
      )}

      {/* Step 4: Confirmation */}
      {step === 3 && (
        <div className="text-center">
          <h3 className="text-xl mb-6 text-[var(--color-cream)]" style={{ fontFamily: 'var(--font-serif)' }}>
            Ihre Buchungsübersicht
          </h3>
          <div className="bg-[var(--color-dark)] rounded-2xl p-5 sm:p-8 border border-[var(--color-brown-light)] text-left space-y-4 max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row sm:justify-between border-b border-[var(--color-brown-light)] pb-3 gap-1">
              <span className="text-[var(--color-warm-gray)] text-sm">Dienstleistung</span>
              <span className="font-medium text-sm sm:text-base text-[var(--color-cream)]">{selectedServiceObj?.name}</span>
            </div>
            <div className="flex justify-between border-b border-[var(--color-brown-light)] pb-3">
              <span className="text-[var(--color-warm-gray)] text-sm">Barber</span>
              <span className="font-medium text-sm sm:text-base text-[var(--color-cream)]">{selectedBarberObj?.name}</span>
            </div>
            <div className="flex justify-between border-b border-[var(--color-brown-light)] pb-3">
              <span className="text-[var(--color-warm-gray)] text-sm">Datum</span>
              <span className="font-medium text-sm sm:text-base text-[var(--color-cream)]">{selectedDate}. {MONTH_NAMES[viewMonth]} {viewYear}</span>
            </div>
            <div className="flex justify-between border-b border-[var(--color-brown-light)] pb-3">
              <span className="text-[var(--color-warm-gray)] text-sm">Uhrzeit</span>
              <span className="font-medium text-sm sm:text-base text-[var(--color-cream)]">{selectedTime} Uhr</span>
            </div>
            <div className="flex justify-between">
              <span className="text-[var(--color-warm-gray)] text-sm">Preis</span>
              <span className="font-semibold text-[var(--color-gold)]">{selectedServiceObj?.price}</span>
            </div>
          </div>

          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mt-8 px-4">
            <button onClick={() => setStep(2)} className="btn-outline-gold text-sm">
              Zurück
            </button>
            <button onClick={handleConfirm} className="btn-gold text-sm">
              Termin bestätigen
            </button>
          </div>
        </div>
      )}

      {/* Step 5: Success */}
      {step === 4 && (
        <div className="text-center py-8">
          <div className="w-20 h-20 rounded-full mx-auto mb-6 flex items-center justify-center text-3xl"
            style={{ background: 'linear-gradient(135deg, var(--color-gold), var(--color-gold-light))' }}>
            ✓
          </div>
          <h3 className="text-2xl mb-3 text-[var(--color-cream)]" style={{ fontFamily: 'var(--font-serif)' }}>
            Vielen Dank!
          </h3>
          <p className="text-[var(--color-warm-gray)] mb-2">
            Ihr Termin wurde erfolgreich gebucht.
          </p>
          <p className="text-sm text-[var(--color-warm-gray)]">
            {selectedServiceObj?.name} bei {selectedBarberObj?.name}<br />
            {selectedDate}. {MONTH_NAMES[viewMonth]} {viewYear} um {selectedTime} Uhr
          </p>
          <p className="text-sm text-[var(--color-warm-gray-light)] mt-4">
            (Dies ist eine Demo — keine echte Buchung)
          </p>
          <button
            onClick={() => { setStep(0); setSelectedService(null); setSelectedBarber(null); setSelectedDate(null); setSelectedTime(null); }}
            className="btn-outline-gold text-sm mt-8"
          >
            Neue Buchung
          </button>
        </div>
      )}
    </div>
  );
}
