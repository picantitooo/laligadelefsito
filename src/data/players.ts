export type Player = {
  name: string;
  wins: number;
  losses: number;
  initials: string;
  color: string;
};

export const players: Player[] = [
  { name: "Piero", wins: 5, losses: 3, initials: "PI", color: "#e85d4a" },
  { name: "PALS", wins: 3, losses: 2, initials: "PA", color: "#d59b45" },
  { name: "Sheva", wins: 3, losses: 5, initials: "SH", color: "#7d9b78" },
  { name: "Fabri", wins: 3, losses: 3, initials: "FA", color: "#b46f54" },
  { name: "Pol", wins: 5, losses: 2, initials: "PO", color: "#7798b8" },
  { name: "Pulse", wins: 6, losses: 0, initials: "PU", color: "#9a82b7" },
  { name: "Chinefe", wins: 1, losses: 2, initials: "CH", color: "#b78c62" },
  { name: "Tarasexo", wins: 1, losses: 3, initials: "TA", color: "#8e9b58" },
  { name: "Valcra", wins: 2, losses: 5, initials: "VA", color: "#b86d83" },
  { name: "Gabriel", wins: 3, losses: 4, initials: "GA", color: "#6faaa0" },
];