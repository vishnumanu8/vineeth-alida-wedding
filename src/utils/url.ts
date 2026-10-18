/**
 * Helper to safely extract and sanitize guest names from URL parameters.
 * Supports ?guest=..., ?to=..., ?name=...
 */
export function getGuestNameFromUrl(): string | null {
  if (typeof window === 'undefined') return null;

  try {
    const params = new URLSearchParams(window.location.search);
    const guestParam = params.get('guest') || params.get('to') || params.get('name');

    if (!guestParam) return null;

    // Decode and sanitize
    const decoded = decodeURIComponent(guestParam).trim();

    // Strip any HTML or potential script injections
    const sanitized = decoded
      .replace(/[<>'"/\\`]/g, '')
      .replace(/\s+/g, ' ')
      .slice(0, 60);

    return sanitized.length > 0 ? sanitized : null;
  } catch {
    return null;
  }
}
