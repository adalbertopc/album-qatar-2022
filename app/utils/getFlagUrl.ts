import { teamsData } from '~/constants/teams'

export const getFlagUrl = (team: string) =>
  teamsData[team.toLowerCase()]?.name
    ? `https://img.icons8.com/color/48/000000/${teamsData[team.toLowerCase()].name}.png`
    : ''
