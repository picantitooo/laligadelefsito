
export type Player = {
  name: string;
  wins: number;
  losses: number;
  initials: string;
  color: string;
  avatar?: string;
};

export const players: Player[] = [
  {
    name: "Piero",
    wins: 8,
    losses: 5,
    initials: "PI",
    color: "#e85d4a",
    avatar: "images/avatars/piero.png",
  },
  {
    name: "PALS",
    wins: 4,
    losses: 3,
    initials: "PA",
    color: "#d59b45",
    avatar: "images/avatars/pals.png",
  },
  {
    name: "Sheva",
    wins: 5,
    losses: 6,
    initials: "SH",
    color: "#7d9b78",
    avatar: "images/avatars/sheva.png",
  },
  {
    name: "Fabri",
    wins: 7,
    losses: 4,
    initials: "FA",
    color: "#b46f54",
    avatar: "images/avatars/fabri.png",
  },
  {
    name: "Pol",
    wins: 7,
    losses: 4,
    initials: "PO",
    color: "#7798b8",
    avatar: "images/avatars/pol.png",
  },
  {
    name: "Pulse",
    wins: 6,
    losses: 4,
    initials: "PU",
    color: "#9a82b7",
    avatar: "images/avatars/pulse.png",
  },
  {
    name: "Chinefe",
    wins: 1,
    losses: 3,
    initials: "CH",
    color: "#b78c62",
    avatar: "images/avatars/chinefe.png",
  },
  {
    name: "Tarasexo",
    wins: 1,
    losses: 5,
    initials: "TA",
    color: "#8e9b58",
    avatar: "images/avatars/tarasexo.png",
  },
  {
    name: "Valcra",
    wins: 3,
    losses: 9,
    initials: "VA",
    color: "#b86d83",
    avatar: "images/avatars/valcra.png",
  },
  {
    name: "Gabriel",
    wins: 6,
    losses: 4,
    initials: "GA",
    color: "#6faaa0",
    avatar: "images/avatars/gabriel.png",
  },
  {
    name: "rek",
    wins: 3,
    losses: 2,
    initials: "RE",
    color: "#a16faa",
    avatar: "images/avatars/rek.png",
  },
];
