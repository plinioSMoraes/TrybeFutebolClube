import ITeamStats from '../interfaces/ITeamStats';
// Regra de negocio
// 1º Total de pontos 2º Total de Vitórias; 3º Saldo de gols; 4º Gols a favor; 5º Gols sofridos.

const sortConfig = (teamA: ITeamStats, teamB:ITeamStats) => {
  if (teamA.totalPoints > teamB.totalPoints) return -1; // ordena de maior para menor
  if (teamA.totalPoints < teamB.totalPoints) return 1;

  if (teamA.totalVictories > teamB.totalVictories) return -1; // ordena de maior para menor
  if (teamA.totalVictories < teamB.totalVictories) return 1;

  if (teamA.goalsBalance > teamB.goalsBalance) return -1; // ordena de maior para menor
  if (teamA.goalsBalance < teamB.goalsBalance) return 1;

  if (teamA.goalsFavor > teamB.goalsFavor) return -1; // ordena de maior para menor
  if (teamA.goalsFavor < teamB.goalsFavor) return 1;

  if (teamA.goalsOwn < teamB.goalsOwn) return -1; // ordena de menor para maior
  if (teamA.goalsOwn > teamB.goalsOwn) return 1;
  return 0; // nao troca os times de posição
};

const leaderboardSort = (leaderboard: ITeamStats[]) => {
  const sortedLeaderboard = leaderboard.sort(sortConfig);
  return sortedLeaderboard;
};

export default leaderboardSort;
