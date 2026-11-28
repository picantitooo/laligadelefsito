
export type Match = {
  id: number;
  winners: string[];
  losers: string[];
  abandonedBy?: string;
};

export const matches: Match[] = [
  {
    id: 1,
    winners: ["Piero", "Sheva", "Pulse", "Pol"],
    losers: ["PALS", "Tarasexo", "Valcra", "rek"]
  },
  {
    id: 2,
    winners: ["Tarasexo", "Piero", "Pol", "rek"],
    losers: ["Pulse", "Sheva", "PALS", "Valcra"],
    abandonedBy: "Pulse"
  }
];
