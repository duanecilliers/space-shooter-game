import background from 'assets/images/background/parallax-space-backgound.png'
import spreakerOff from 'assets/images/speaker-off.png'
import speaker from 'assets/images/speaker.png'

interface ISprite {
  KEY: string;
  PATH: string;
}

interface ISpriteConfig {
  BACKGROUND: ISprite,
  SPEAKER: ISprite;
  SPEAKER_OFF: ISprite;
}

const spriteConfig: ISpriteConfig = {
  BACKGROUND: {
    KEY: 'background',
    PATH: background,
  },
  SPEAKER: {
    KEY: 'speaker',
    PATH: speaker,
  },
  SPEAKER_OFF: {
    KEY: 'speaker_off',
    PATH: spreakerOff,
  },
}

export default spriteConfig
