import { data } from '~/lib/data'
import { createGroup } from '~/services/group.server'
import { createSticker } from '~/services/sticker.server'
import { createTeam } from '~/services/team.server'
import { prisma } from './db.server'
export function dataGen() {
  const promises = []
  data.forEach(async ({ name, items }) => {
    createGroup(name.toUpperCase()).then(async res => {
      const group = await res.json()
      if (group.id) {
        items.forEach(async teamName => {
          createTeam({
            name: teamName.toUpperCase(),
            groupId: group.id,
          }).then(async res => {
            const team = await res.json()

            if (team.id) {
              for (let i = 1; i < 21; i++) {
                await createSticker({
                  number: i,
                  team: team.id,
                }).then(res => console.log(res))
              }
            }
          })
        })
      }
    })
  })
}

export async function fillFwc() {
  for (let i = 1; i < 30; i++) {
    await createSticker({
      number: i,
      team: '2b8cbd22-0729-447d-8208-02110809d577',
    }).then(res => console.log(res))
  }
}
