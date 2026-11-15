export type Player = {
  name: string;
  wins: number;
  losses: number;
  initials: string;
  color: string;
};

export const players: Player[] = [
  { name: "Piero", wins: 3, losses: 0, initials: "PI", color: "#e85d4a" },
  { name: "PALS", wins: 2, losses: 1, initials: "PA", color: "#d59b45" },
  { name: "Sheva", wins: 1, losses: 2, initials: "SH", color: "#7d9b78" },
  { name: "Fabri", wins: 1, losses: 0, initials: "FA", color: "#b46f54" },
  { name: "Pol", wins: 2, losses: 0, initials: "PO", color: "#7798b8" },
  { name: "Pulse", wins: 1, losses: 0, initials: "PU", color: "#9a82b7" },
  { name: "Chinefe", wins: 0, losses: 1, initials: "CH", color: "#b78c62" },
  { name: "Tarasexo", wins: 0, losses: 2, initials: "TA", color: "#8e9b58" },
  { name: "Valcra", wins: 0, losses: 3, initials: "VA", color: "#b86d83" },
  { name: "Gabriel", wins: 2, losses: 1, initials: "GA", color: "#6faaa0" },
  { name: "Pantera", wins: 0, losses: 0, initials: "PA", color: "#8b8f9e" },
  { name: "Rek", wins: 0, losses: 0, initials: "RE", color: "#c08b45" }
];
