import { Context, Schema, h } from 'koishi'
import { resolve } from 'path'

export const name = 'random-yuzusoft-linestamp'

export interface Config {
  fileShow: boolean
}

export const Config: Schema<Config> = Schema.object({
  fileShow: Schema.boolean().default(true)
    .description('输出发出的图片信息')
})

const randomArrayIndex = (length) => (length <= 0) ? 0 : Math.floor(Math.random() * (length - 1));

const stampsInfo = [
  { name: 'yuzusoft-sanoba', length: 40 },
  { name: 'yuzusoft-senrenbanka', length: 40 },
  { name: 'yuzusoft-riddlejoker', length: 40 },
  { name: 'yuzusoft-cafestella', length: 40 },
  { name: 'yuzusoft-tenshisouzou', length: 40 },
];

export function apply(ctx: Context, config: Config) {
  ctx.command('random-yuzusoft-linestamp')
    .action(async ({ session }) => {
      const stampInfo = stampsInfo[randomArrayIndex(stampsInfo.length)];
      const fileName = `${stampInfo.name}-${randomArrayIndex(stampInfo.length)}.png`
      if (config.fileShow) {
        session.send(`stamp: ${fileName}`);
      }
      const url = 'file:///' + resolve(__dirname, `../stamps/${stampInfo.name}/${fileName}`);
      session.send(h('img', { src: url }));
    })
}
