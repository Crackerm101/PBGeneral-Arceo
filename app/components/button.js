'use client';

import { useEffect, useState } from 'react';

export default function ComposeEmail() {
  // Change these four lines to suit your message
  const TO       = 'cincoglennoliver@yahoo.com';
  const SUBJECT  = '';
  const BODY     = '';
  const CC       = ''; // optional, leave blank if not needed

  const [blocked, setBlocked] = useState(false);

  /**
   * Returns true for most mobile browsers (iOS & Android).
   * You can refine the RegExp if you need stricter detection.
   */
  const isMobile = () =>
    typeof navigator !== 'undefined' &&
    /Android|iPhone|iPad|iPod|Opera Mini|IEMobile/i.test(navigator.userAgent);

  /**
   * Build a proper `mailto:` URL.
   * `encodeURIComponent` takes care of spaces & punctuation in subject line.
   */
  const buildMailto = () => {
    const params = [
      SUBJECT && `subject=${encodeURIComponent(SUBJECT)}`,
      BODY    && `body=${BODY}`,
      CC      && `cc=${encodeURIComponent(CC)}`,
    ]
      .filter(Boolean)
      .join('&');

    return `mailto:${TO}?${params}`;
  };

  /**
   * Attempt an automatic redirect on mount if we’re on mobile.
   * A short delay (≈300–500 ms) helps avoid some popup blockers.
   */
  useEffect(() => {
    if (isMobile()) {
      const timer = setTimeout(() => {
        try {
          window.location.href = buildMailto();
        } catch {
          setBlocked(true);
        }
      }, 400);

      return () => clearTimeout(timer);
    }
  }, []);

  const handleClick = () => {
    window.location.href = buildMailto();
  };

  return (
    <button
      onClick={handleClick}
    >
    </button>
  );
}

