export type Player = {
  name: string;
  wins: number;
  losses: number;
  initials: string;
  color: string;
};

export const players: Player[] = [
  { name: "Piero", wins: 5, losses: 4, initials: "PI", color: "#e85d4a" },
  { name: "PALS", wins: 3, losses: 2, initials: "PA", color: "#d59b45" },
  { name: "Sheva", wins: 4, losses: 5, initials: "SH", color: "#7d9b78" },
  { name: "Fabri", wins: 4, losses: 3, initials: "FA", color: "#b46f54" },
  { name: "Pol", wins: 6, losses: 2, initials: "PO", color: "#7798b8" },
  { name: "Pulse", wins: 6, losses: 1, initials: "PU", color: "#9a82b7" },
  { name: "Chinefe", wins: 1, losses: 3, initials: "CH", color: "#b78c62" },
  { name: "Tarasexo", wins: 1, losses: 3, initials: "TA", color: "#8e9b58" },
  { name: "Valcra", wins: 2, losses: 6, initials: "VA", color: "#b86d83" },
  { name: "Gabriel", wins: 3, losses: 4, initials: "GA", color: "#6faaa0" },
  { name: "rek", wins: 1, losses: 0, initials: "GA", color: "#a16faa" },
];
// piero -1 pedro -1 deigo -1 valcra -1 sheva +1 fracasado +1 fabri +1 rek +1