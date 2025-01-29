import { Context, Schema, h } from 'koishi'
import { resolve } from 'path'

export const name = 'random-yuzusoft-linestamp'

export interface Config { }

export const Config: Schema<Config> = Schema.object({})

const randomArrayIndex = (length) => (length <= 0) ? 0 : Math.floor(Math.random() * (length - 1));

const stampsInfo = [
  { name: 'yuzusoft-sanoba', length: 40 },
  { name: 'yuzusoft-senrenbanka', length: 40 },
  { name: 'yuzusoft-riddlejoker', length: 40 },
  { name: 'yuzusoft-cafestella', length: 40 },
  { name: 'yuzusoft-tenshisouzou', length: 40 },
];

export function apply(ctx: Context) {
  ctx.command('random-yuzusoft-linestamp')
    .action(async ({ session }) => {
      const stampInfo = stampsInfo[randomArrayIndex(stampsInfo.length)];
      console.log(stampInfo)
      const fileName = `${stampInfo.name}-${randomArrayIndex(stampInfo.length)}.png`
      session.send(`stamp: ${fileName}`);
      const url = 'file:///' + resolve(__dirname, `../stamps/${stampInfo.name}/${fileName}`);
      console.log(url)
      session.send(h('img', { src: url }));
    })
}
