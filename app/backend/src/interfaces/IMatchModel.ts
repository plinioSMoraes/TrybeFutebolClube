interface IMatchModel {
  id: number,
  homeTeamId: number,
  homeTeamGoals: number,
  awayTeamId: number,
  awayTeamGoals: number,
  inProgress: boolean,
  hometeam: { teamName: string },
  awayTeam: { teamName: string }
}

export default IMatchModel;
