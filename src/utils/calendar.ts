/**
 * Calendar utilities to generate Google Calendar links and native .ics file downloads
 */

interface CalendarEventParams {
  title: string;
  description: string;
  location: string;
  startDateIso: string; // e.g. "2026-11-29T18:00:00+05:30"
  durationHours?: number;
}

export function createGoogleCalendarUrl(params: CalendarEventParams): string {
  const startDate = new Date(params.startDateIso);
  const durationHours = params.durationHours || 4;
  const endDate = new Date(startDate.getTime() + durationHours * 60 * 60 * 1000);

  const formatUtc = (d: Date) =>
    d.toISOString().replace(/-|:|\.\d\d\d/g, '');

  const dates = `${formatUtc(startDate)}/${formatUtc(endDate)}`;

  const url = new URL('https://calendar.google.com/calendar/render');
  url.searchParams.append('action', 'TEMPLATE');
  url.searchParams.append('text', params.title);
  url.searchParams.append('details', params.description);
  url.searchParams.append('location', params.location);
  url.searchParams.append('dates', dates);

  return url.toString();
}

export function downloadIcsFile(params: CalendarEventParams, filename = 'vineeth-alida-wedding-reception.ics'): void {
  const startDate = new Date(params.startDateIso);
  const durationHours = params.durationHours || 4;
  const endDate = new Date(startDate.getTime() + durationHours * 60 * 60 * 1000);

  const formatUtc = (d: Date) =>
    d.toISOString().replace(/-|:|\.\d\d\d/g, '');

  const startUtc = formatUtc(startDate);
  const endUtc = formatUtc(endDate);
  const nowUtc = formatUtc(new Date());

  const icsContent = [
    'BEGIN:VCALENDAR',
    'VERSION:2.0',
    'PRODID:-//Vineeth & Alida//Wedding Reception Invitation//EN',
    'CALSCALE:GREGORIAN',
    'METHOD:PUBLISH',
    'BEGIN:VEVENT',
    `UID:reception-${startDate.getTime()}@vineethalida.com`,
    `DTSTAMP:${nowUtc}`,
    `DTSTART:${startUtc}`,
    `DTEND:${endUtc}`,
    `SUMMARY:${params.title.replace(/,/g, '\\,')}`,
    `DESCRIPTION:${params.description.replace(/\n/g, '\\n')}`,
    `LOCATION:${params.location.replace(/,/g, '\\,')}`,
    'STATUS:CONFIRMED',
    'SEQUENCE:0',
    'BEGIN:VALARM',
    'TRIGGER:-P1D',
    'ACTION:DISPLAY',
    'DESCRIPTION:Reminder: Wedding Reception of Vineeth & Alida tomorrow',
    'END:VALARM',
    'END:VEVENT',
    'END:VCALENDAR',
  ].join('\r\n');

  const blob = new Blob([icsContent], { type: 'text/calendar;charset=utf-8' });
  const link = document.createElement('a');
  link.href = window.URL.createObjectURL(blob);
  link.setAttribute('download', filename);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
  window.URL.revokeObjectURL(link.href);
}
