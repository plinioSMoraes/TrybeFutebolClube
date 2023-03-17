import MatchesModel from '../database/models/matchesModel';
import INewMatch from '../interfaces/INewMatch';
import ITeam from '../interfaces/ITeam';
import ITeamStats from '../interfaces/ITeamStats';
import leaderboardSort from '../utils/leaderboardSort';
import MatchesServices from './matchesServices';
import TeamService from './TeamsServices';

const homeMatchesFilter = (team: ITeam, match: INewMatch) => {
  if (team.id === match.homeTeamId) {
    return match;
  }
};

const awayMatchesFilter = (team: ITeam, match: INewMatch) => {
  if (team.id === match.awayTeamId) {
    return match;
  }
};

const newLeaderboardObj = (): ITeamStats => {
  const newLeaderboard = { name: '',
    totalPoints: 0,
    totalGames: 0,
    totalVictories: 0,
    totalDraws: 0,
    totalLosses: 0,
    goalsFavor: 0,
    goalsOwn: 0,
    goalsBalance: 0,
    efficiency: 0,
  } as ITeamStats;
  return newLeaderboard;
};

const createHomeLeaderboard = (iterator: number, teamMatches: MatchesModel[][]) => {
  const newLd = newLeaderboardObj();
  teamMatches[iterator].forEach((matches) => {
    newLd.name = matches.homeTeam.teamName; newLd.goalsFavor += matches.homeTeamGoals;
    newLd.totalGames += 1; newLd.goalsOwn += matches.awayTeamGoals;
    newLd.goalsBalance = newLd.goalsFavor - newLd.goalsOwn;
    if (matches.homeTeamGoals > matches.awayTeamGoals) {
      newLd.totalPoints += 3;
      newLd.totalVictories += 1;
    } else if (matches.homeTeamGoals === matches.awayTeamGoals) {
      newLd.totalPoints += 1;
      newLd.totalDraws += 1;
    } else {
      newLd.totalLosses += 1;
    }
    newLd.efficiency = parseFloat(((newLd.totalPoints * 100) / (newLd.totalGames * 3)).toFixed(2));
  });
  return newLd;
};

const createAwayLeaderboard = (iterator: number, teamMatches: MatchesModel[][]) => {
  const newLd = newLeaderboardObj();
  teamMatches[iterator].forEach((matches) => {
    newLd.name = matches.awayTeam.teamName; newLd.goalsFavor += matches.awayTeamGoals;
    newLd.totalGames += 1; newLd.goalsOwn += matches.homeTeamGoals;
    newLd.goalsBalance = newLd.goalsFavor - newLd.goalsOwn;
    if (matches.homeTeamGoals < matches.awayTeamGoals) {
      newLd.totalPoints += 3;
      newLd.totalVictories += 1;
    } else if (matches.homeTeamGoals === matches.awayTeamGoals) {
      newLd.totalPoints += 1;
      newLd.totalDraws += 1;
    } else {
      newLd.totalLosses += 1;
    }
    newLd.efficiency = parseFloat(((newLd.totalPoints * 100) / (newLd.totalGames * 3)).toFixed(2));
  });
  return newLd;
};

const leaderboardBuilder = (teamMatches: MatchesModel[][], parameter: string) => {
  const leaderboard = [] as ITeamStats[];
  for (let iterator = 0; iterator < teamMatches.length; iterator += 1) {
    let leaderboardInfo = {} as ITeamStats;
    if (parameter === 'home') leaderboardInfo = createHomeLeaderboard(iterator, teamMatches);
    if (parameter === 'away') leaderboardInfo = createAwayLeaderboard(iterator, teamMatches);
    leaderboard.push(leaderboardInfo);
  }
  return leaderboard;
};

const sumLeaderboards = (away: ITeamStats, home: ITeamStats) => {
  console.log('');
  const totalPoints = home.totalPoints + away.totalPoints;
  const totalGames = home.totalGames + away.totalGames;
  const efficiency = parseFloat(((totalPoints * 100) / (totalGames * 3))
    .toFixed(2));
  return {
    name: home.name,
    totalPoints,
    totalGames,
    totalVictories: home.totalVictories + away.totalVictories,
    totalDraws: home.totalDraws + away.totalDraws,
    totalLosses: home.totalLosses + away.totalLosses,
    goalsFavor: home.goalsFavor + away.goalsFavor,
    goalsOwn: home.goalsOwn + away.goalsOwn,
    goalsBalance: home.goalsBalance + away.goalsBalance,
    efficiency,
  };
};

class LeaderboardService {
  constructor(
    private matchesServices = new MatchesServices(),
    private teamService = new TeamService(),
  ) { }

  public getHomeLeaderboard = async () => {
    const matches = (await this.matchesServices.getMatches()) // cata so partidas finalizadas
      .filter((match) => match.inProgress === false);
    const teams = await this.teamService.getAll();
    const homeMatches = teams.map((team) => matches.filter((match) => {
      const result = homeMatchesFilter(team, match); // callback que manda retornar partidas com o team joga em casa
      return result;
    })); // cria um array que contem um arrays das partidas em casa de cada time
    let homeLeaderboard = leaderboardBuilder(homeMatches, 'home');
    homeLeaderboard = leaderboardSort(homeLeaderboard);
    return homeLeaderboard;
  };

  public getAwayLeaderboard = async () => {
    const matches = (await this.matchesServices.getMatches()) // cata so partidas finalizadas
      .filter((match) => match.inProgress === false);
    const teams = await this.teamService.getAll();
    const awayMatches = teams.map((team) => matches.filter((match) => {
      const result = awayMatchesFilter(team, match); // callback que manda retornar partidas com o team joga fora
      return result;
    })); // cria um array que contem um arrays das partidas em casa de cada time
    let awayLeaderboard = leaderboardBuilder(awayMatches, 'away');
    awayLeaderboard = leaderboardSort(awayLeaderboard);
    return awayLeaderboard;
  };

  public getLeaderBoard = async () => {
    const awayLeaderboard = await this.getAwayLeaderboard();
    const homeLeaderboard = await this.getHomeLeaderboard();
    let completeLeaderboard = [] as ITeamStats[];
    awayLeaderboard.forEach((away) => {
      let teamStats = {} as ITeamStats;
      homeLeaderboard.forEach((home) => {
        if (home.name === away.name) {
          teamStats = sumLeaderboards(home, away);
        }
      });
      completeLeaderboard.push(teamStats);
    });
    completeLeaderboard = leaderboardSort(completeLeaderboard);
    return completeLeaderboard;
  };
}

export default LeaderboardService;
