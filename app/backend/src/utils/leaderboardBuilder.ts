import INewMatch from '../interfaces/INewMatch';
import ITeam from '../interfaces/ITeam';
import ITeamStats from '../interfaces/ITeamStats';

const leaderboardBuilder = (team: ITeam, match: INewMatch) => {
  const leaderboard = {} as ITeamStats;
  if (team.id === match.homeTeamId) {
    leaderboard.name = team.teamName;
    // leaderboard.goalsFavor += match?.homeTeamGoals;
  }
};

export default leaderboardBuilder;
