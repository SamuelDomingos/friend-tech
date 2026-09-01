import type { TAttendanceStatus, TEventColor } from "@/app/(private)/(pages)/agenda/_components/calendar/types";

export interface IUser {
  id: string;
  name: string;
  avatar: string | null;
  isFavorite: boolean;
}

export interface IEvent {
  id: string;
  startDate: string;
  endDate: string;
  title: string;
  color: TEventColor;
  description: string;
  user: IUser;
  unidadeId: string;
  patientName: string;
  procedureName: string;
  status: TAttendanceStatus;
  paymentMethod: string;
  patientPhone?: string;
  patientAge?: number;
}

export interface ICalendarCell {
  day: number;
  currentMonth: boolean;
  date: Date;
}
