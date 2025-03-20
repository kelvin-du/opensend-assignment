import { ChartBarIcon, MailIcon, UserIcon } from "lucide-react";

export const WIDGET_TYPES = [
  {
    id: "identities-provided",
    name: "Identities Provided",
    Icon: UserIcon,
  },
  {
    id: "iterable-metrics",
    name: "Iterable Metrics",
    Icon: ChartBarIcon,
  },
  {
    id: "yotpo-metrics",
    name: "Yotpo Metrics",
    Icon: MailIcon,
  },
];
