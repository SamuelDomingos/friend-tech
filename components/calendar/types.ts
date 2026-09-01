export type TCalendarView = "day" | "week" | "month" | "year" | "agenda";
export type TEventColor =
  | "blue"
  | "green"
  | "red"
  | "yellow"
  | "purple"
  | "orange"
  | "gray";
export type TBadgeVariant = "dot" | "colored" | "mixed";
export type TWorkingHours = { [key: number]: { from: number; to: number } };
export type TVisibleHours = { from: number; to: number };

export type ConfigData = {
  config: {
    autoAdjustVisibleHours: boolean;
    visibleStartMinutes: number | null;
    visibleEndMinutes: number | null;
  };
  workingHours: {
    dayOfWeek: number;
    startMinutes: number;
    endMinutes: number;
    isOpen: boolean;
  }[];
} | null;
