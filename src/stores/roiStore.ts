import { atom } from 'nanostores';

// We use nanostores because Astro handles them well across different islands
// Value ranges from 1 to 50 (employees)
export const employeeCount = atom(10);