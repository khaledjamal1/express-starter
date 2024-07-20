export const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:4173',
  'https://ramphr.netlify.app',
];

export const corsOptions = {
  origin: allowedOrigins,
  optionsSuccessStatus: 200, // some legacy browsers (IE11, various SmartTVs) choke on 204
  allowedHeaders:
    'Content-Type, Authorization, XMLHttpRequest, X-Requested-With, Accept, Origin',
};

export const ROLES_LIST = {
  DEV: 5150,
  MANAGER: 1984,
  SUPERVISOR: 2001,
  RAMP: 1995,
} as const;

export type RoleType = keyof typeof ROLES_LIST;
