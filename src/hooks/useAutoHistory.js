import { useEffect, useRef } from 'react';
import { useApp } from '../context/AppContext';

// useAutoHistory — saves a calculation result to history after a 1.5s debounce
// Call this hook inside each calculator component with the result value.
// entry = { calcId, calcName, category, page, tabId, resultLabel, resultValue, resultUnit }
export function useAutoHistory(entry) {
  const { addHistory } = useApp();
  const timerRef = useRef(null);
  const prevRef = useRef(null);

  useEffect(() => {
    // Only save when there's a valid numeric result
    if (
      entry.resultValue === null ||
      entry.resultValue === undefined ||
      entry.resultValue === '' ||
      isNaN(entry.resultValue)
    ) return;

    const serialized = String(entry.resultValue);
    if (serialized === prevRef.current) return; // no change

    clearTimeout(timerRef.current);
    timerRef.current = setTimeout(() => {
      prevRef.current = serialized;
      addHistory({
        ...entry,
        resultValue: typeof entry.resultValue === 'number'
          ? entry.resultValue.toFixed(3)
          : entry.resultValue,
      });
    }, 1500);

    return () => clearTimeout(timerRef.current);
  }, [entry.resultValue]); // eslint-disable-line react-hooks/exhaustive-deps
}
