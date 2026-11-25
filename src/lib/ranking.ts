
import { players } from "../data/players";
import { matches } from "../data/matches";

// ========================================
// CONFIGURACIÓN DEL SISTEMA COMPETITIVO
// ========================================

export const RANKING_CONFIG = {
  BASE_RATING: 1000,
  ELO_SCALE: 400,
  PRIOR_WEIGHT: 5,
  K_FACTOR: 32,
  MIN_RATED_GAMES: 5,
} as const;

// ========================================
// ELO INICIAL BAYESIANO
// ========================================

export function calculateInitialRating(
  wins: number,
  losses: number
): number {
  const {
    BASE_RATING,
    ELO_SCALE,
    PRIOR_WEIGHT,
  } = RANKING_CONFIG;

  return (
    BASE_RATING +
    ELO_SCALE *
      Math.log10(
        (wins + PRIOR_WEIGHT) /
        (losses + PRIOR_WEIGHT)
      )
  );
}

// ========================================
// PROBABILIDAD ESPERADA INDIVIDUAL
// ========================================

export function expectedScore(
  playerRating: number,
  opponentRating: number
): number {
  return (
    1 /
    (
      1 +
      Math.pow(
        10,
        (opponentRating - playerRating) /
          RANKING_CONFIG.ELO_SCALE
      )
    )
  );
}

// ========================================
// RANGOS COMPETITIVOS
// ========================================

export function getRank(rating: number) {
  if (rating >= 1400) {
    return {
      name: "Legendario",
      color: "#e4c955",
      tier: 6,
    };
  }

  if (rating >= 1250) {
    return {
      name: "Veterano",
      color: "#c8bd8c",
      tier: 5,
    };
  }

  if (rating >= 1100) {
    return {
      name: "Superviviente élite",
      color: "#aabf79",
      tier: 4,
    };
  }

  if (rating >= 950) {
    return {
      name: "Superviviente",
      color: "#b8bdaa",
      tier: 3,
    };
  }

  if (rating >= 800) {
    return {
      name: "Recluta",
      color: "#b39776",
      tier: 2,
    };
  }

  return {
    name: "Infectado",
    color: "#b87967",
    tier: 1,
  };
}

// ========================================
// CÁLCULO DEL LEADERBOARD
// ========================================

export function calculateRanking() {
  const ranking = players.map((player) => {
    const initialRating = calculateInitialRating(
      player.wins,
      player.losses
    );

    return {
      ...player,

      initialRating,
      rating: initialRating,

      historicalWins: player.wins,
      historicalLosses: player.losses,

      ratedGames: 0,
      ratedWins: 0,
      ratedLosses: 0,

      lastChange: 0,

      ratingHistory: [initialRating],

      recentResults: [] as ("W" | "L")[],
    };
  });

  const playerMap = new Map(
    ranking.map((player) => [
      player.name,
      player,
    ])
  );

  if (playerMap.size !== players.length) {
    throw new Error(
      "Existen nombres de jugadores duplicados."
    );
  }

  const processedMatches = new Set<number>();

  const orderedMatches = [...matches].sort(
    (a, b) => a.id - b.id
  );

  // ========================================
  // PROCESAMIENTO DE PARTIDAS
  // ========================================

  for (const match of orderedMatches) {
    const participants = [
      ...match.winners,
      ...match.losers,
    ];

    // Validar identificador.

    if (
      !Number.isInteger(match.id) ||
      match.id <= 0
    ) {
      throw new Error(
        `ID de partida inválido: ${match.id}`
      );
    }

    // Evitar partidas duplicadas.

    if (processedMatches.has(match.id)) {
      throw new Error(
        `Partida duplicada: ${match.id}`
      );
    }

    // Validar equipos.

    if (
      match.winners.length === 0 ||
      match.winners.length !== match.losers.length
    ) {
      throw new Error(
        `Equipos inválidos en partida ${match.id}`
      );
    }

    // Evitar jugadores repetidos.

    if (
      new Set(participants).size !==
      participants.length
    ) {
      throw new Error(
        `Jugadores repetidos en partida ${match.id}`
      );
    }

    // Validar jugadores registrados.

    for (const name of participants) {
      if (!playerMap.has(name)) {
        throw new Error(
          `Jugador desconocido: "${name}" ` +
          `en partida ${match.id}`
        );
      }
    }

    // Guardar Elo previo a la partida.
    // Todos los cálculos utilizan estos valores.

    const previousRatings = new Map(
      ranking.map((player) => [
        player.name,
        player.rating,
      ])
    );

    const changes = new Map<string, number>();

    // ========================================
    // ELO INDIVIDUAL DE LOS GANADORES
    // ========================================

    for (const name of match.winners) {
      const currentRating =
        previousRatings.get(name)!;

      const expected =
        match.losers.reduce(
          (sum, opponent) => {
            const opponentRating =
              previousRatings.get(opponent)!;

            return (
              sum +
              expectedScore(
                currentRating,
                opponentRating
              )
            );
          },
          0
        ) / match.losers.length;

      const change =
        RANKING_CONFIG.K_FACTOR *
        (1 - expected);

      changes.set(name, change);
    }

    // ========================================
    // ELO INDIVIDUAL DE LOS PERDEDORES
    // ========================================

    for (const name of match.losers) {
      const currentRating =
        previousRatings.get(name)!;

      const expected =
        match.winners.reduce(
          (sum, opponent) => {
            const opponentRating =
              previousRatings.get(opponent)!;

            return (
              sum +
              expectedScore(
                currentRating,
                opponentRating
              )
            );
          },
          0
        ) / match.winners.length;

      const change =
        RANKING_CONFIG.K_FACTOR *
        (0 - expected);

      changes.set(name, change);
    }

    // ========================================
    // ACTUALIZACIÓN SIMULTÁNEA
    // ========================================

    const winnerSet = new Set(match.winners);

    for (const name of participants) {
      const player = playerMap.get(name)!;
      const change = changes.get(name)!;
      const won = winnerSet.has(name);

      player.rating += change;
      player.lastChange = change;
      player.ratedGames += 1;

      if (won) {
        player.wins += 1;
        player.ratedWins += 1;
        player.recentResults.push("W");
      } else {
        player.losses += 1;
        player.ratedLosses += 1;
        player.recentResults.push("L");
      }

      player.ratingHistory.push(
        player.rating
      );

      // Conservar las últimas cinco partidas.

      player.recentResults =
        player.recentResults.slice(-5);
    }

    processedMatches.add(match.id);
  }

  // ========================================
  // ESTADÍSTICAS FINALES
  // ========================================

  const sorted = ranking
    .map((player) => {
      const total =
        player.wins + player.losses;

      const rate = total
        ? (player.wins / total) * 100
        : 0;

      const displayRating = Math.round(
        player.rating
      );

      return {
        ...player,

        total,
        rate,
        displayRating,

        displayInitialRating: Math.round(
          player.initialRating
        ),

        ratingDifference:
          player.rating - player.initialRating,

        rank: getRank(displayRating),

        provisional:
          player.ratedGames <
          RANKING_CONFIG.MIN_RATED_GAMES,
      };
    })
    .sort(
      (a, b) =>
        b.displayRating - a.displayRating ||
        a.name.localeCompare(b.name)
    );

  // ========================================
  // POSICIONES COMPARTIDAS
  // ========================================

  return sorted.map((player) => ({
    ...player,

    position:
      sorted.findIndex(
        (candidate) =>
          candidate.displayRating ===
          player.displayRating
      ) + 1,
  }));
}
