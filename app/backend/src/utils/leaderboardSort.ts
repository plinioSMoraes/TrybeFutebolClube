import ITeamStats from '../interfaces/ITeamStats';
// 1º Total de Vitórias; 2º Saldo de gols; 3º Gols a favor; 4º Gols sofridos.

const tryThis = (teamA: ITeamStats, teamB:ITeamStats) => {
  // console.log('totalPoints A ', teamA.totalPoints, 'totalPoints B ', teamB.totalPoints);
  if (teamA.totalPoints > teamB.totalPoints) return -1; // ordena de maior para menor
  if (teamA.totalPoints < teamB.totalPoints) return 1;
  // console.log('goalsBalance A ', teamA.goalsBalance, 'goalsBalance B ', teamB.goalsBalance);
  if (teamA.totalVictories > teamB.totalVictories) return -1; // ordena de maior para menor
  if (teamA.totalVictories < teamB.totalVictories) return 1;
  // console.log('goalsFavor A ', teamA.goalsFavor, 'goalsFavor B ', teamB.goalsFavor);
  if (teamA.goalsBalance > teamB.goalsBalance) return -1; // ordena de maior para menor
  if (teamA.goalsBalance < teamB.goalsBalance) return 1;

  if (teamA.goalsFavor > teamB.goalsFavor) return -1; // ordena de maior para menor
  if (teamA.goalsFavor < teamB.goalsFavor) return 1;
  // console.log('goalsOwn A ', teamA.goalsOwn, 'goalsOwn B ', teamB.goalsOwn);
  if (teamA.goalsOwn < teamB.goalsOwn) return -1; // ordena de menor para maior
  if (teamA.goalsOwn > teamB.goalsOwn) return 1;
  return 0; // nao troca os times de posição
};

const leaderboardSort = (leaderboard: ITeamStats[]) => {
  // console.log('----------Leaderboard---------');
  const sortedLeaderboard = leaderboard.sort(tryThis);
  // const sorrted = sortedLeaderboard.sort(tryThis);
  // console.log(sortedLeaderboard);
  return sortedLeaderboard;
};
export default leaderboardSort;
