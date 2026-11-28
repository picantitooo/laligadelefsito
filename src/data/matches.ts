
export type Match = {
  id: number;
  winners: string[];
  losers: string[];
};

export const matches: Match[] = [
  // Registrar únicamente las partidas nuevas.
  {
    id: 1,
    winners: ["Piero", "Sheva", "Pulse", "Pol"],
    losers: ["PALS", "Tarasexo", "Valcra", "rek"]
  },
  {
    id: 2,
    winners: ["Tarasexo", "Piero", "Pol", "rek"],
    losers: ["Pulse", "", "", ""]
  }
];
