import { PrismaClient } from '@prisma/client';
import moment from 'moment';
import { ROLES_LIST, RoleType } from '../config/config';
export const db = new PrismaClient();
export function calculateHoursPassed(
  startDateTime: string,
  endDateTime: string
) {
  const start = moment(startDateTime, 'HH:mm');
  const end = moment(endDateTime, 'HH:mm');

  // Calculate the difference in milliseconds
  const duration = moment.duration(end.diff(start));

  // Get the total hours
  let hours = duration.asHours();
  if (hours < 0) {
    // If duration is negative, add 24 hours to it
    hours += 24;
  }

  return hours;
}

// Function to get the numerical value of a role
export const getRoleValue = (role: RoleType): number => {
  return ROLES_LIST[role];
};

// Function to get the role name from a numerical value
export const getRoleName = (value: number): RoleType | undefined => {
  return (Object.keys(ROLES_LIST) as RoleType[]).find(
    (role) => ROLES_LIST[role] === value
  );
};
