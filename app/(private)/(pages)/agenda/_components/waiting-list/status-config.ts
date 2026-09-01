import {
  BadgeCheck,
  CalendarClock,
  CheckCheck,
  Clock,
  Stethoscope,
  UserX,
  XCircle,
  type LucideIcon,
} from "lucide-react"

import type { TAttendanceStatus } from "@/app/(private)/(pages)/agenda/_components/calendar/types"

interface StatusAction {
  status: TAttendanceStatus
  label: string
  icon: LucideIcon
}

interface StatusConfigEntry {
  label: string
  icon: LucideIcon
  badgeClassName: string
  nextActions: StatusAction[]
}

const confirmarAction: StatusAction = {
  status: "confirmed",
  label: "Confirmado",
  icon: BadgeCheck,
}
const presenteAction: StatusAction = {
  status: "arrived",
  label: "Presente",
  icon: Clock,
}
const iniciarAtendimentoAction: StatusAction = {
  status: "in_attendance",
  label: "Iniciar atendimento",
  icon: Stethoscope,
}
const finalizarAction: StatusAction = {
  status: "done",
  label: "Finalizar",
  icon: CheckCheck,
}
const faltouAction: StatusAction = {
  status: "missed",
  label: "Faltou",
  icon: UserX,
}
const cancelouAction: StatusAction = {
  status: "canceled",
  label: "Cancelou",
  icon: XCircle,
}

export const ATTENDANCE_STATUS_CONFIG: Record<
  TAttendanceStatus,
  StatusConfigEntry
> = {
  scheduled: {
    label: "Pend.",
    icon: CalendarClock,
    badgeClassName:
      "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-900 dark:bg-amber-950 dark:text-amber-300",
    nextActions: [
      cancelouAction,
      faltouAction,
      confirmarAction,
      presenteAction,
      iniciarAtendimentoAction,
    ],
  },
  confirmed: {
    label: "Conf.",
    icon: BadgeCheck,
    badgeClassName:
      "border-blue-200 bg-blue-50 text-blue-700 dark:border-blue-900 dark:bg-blue-950 dark:text-blue-300",
    nextActions: [cancelouAction, faltouAction, presenteAction, iniciarAtendimentoAction],
  },
  arrived: {
    label: "Presente",
    icon: Clock,
    badgeClassName:
      "border-teal-200 bg-teal-50 text-teal-700 dark:border-teal-900 dark:bg-teal-950 dark:text-teal-300",
    nextActions: [iniciarAtendimentoAction],
  },
  in_attendance: {
    label: "Em atend.",
    icon: Stethoscope,
    badgeClassName:
      "border-purple-200 bg-purple-50 text-purple-700 dark:border-purple-900 dark:bg-purple-950 dark:text-purple-300",
    nextActions: [confirmarAction, presenteAction, finalizarAction],
  },
  done: {
    label: "Final.",
    icon: CheckCheck,
    badgeClassName:
      "border-green-200 bg-green-50 text-green-700 dark:border-green-900 dark:bg-green-950 dark:text-green-300",
    nextActions: [],
  },
  missed: {
    label: "Faltou",
    icon: UserX,
    badgeClassName:
      "border-orange-200 bg-orange-50 text-orange-700 dark:border-orange-900 dark:bg-orange-950 dark:text-orange-300",
    nextActions: [],
  },
  canceled: {
    label: "Cancelado",
    icon: XCircle,
    badgeClassName:
      "border-red-200 bg-red-50 text-red-700 dark:border-red-900 dark:bg-red-950 dark:text-red-300",
    nextActions: [],
  },
}
