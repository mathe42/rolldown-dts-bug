// Simple TypeScript module to demonstrate the d.ts generation issue

export interface User {
  id: number;
  name: string;
}

export function createUser(name: string): User {
  return {
    id: 1,
    name
  };
}

export const VERSION = '1.0.0';