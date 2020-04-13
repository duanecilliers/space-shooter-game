import background from 'assets/images/background/main.png'
import stars from 'assets/images/background/stars.png'
import planet from 'assets/images/background/planet.png'
import planet2 from 'assets/images/background/planet2.png'
import planetCluser from 'assets/images/background/planet-cluster.png'
import playerShip from 'assets/images/ship.png'
import enemySmall from 'assets/images/enemy-small.png'
import enemyMedium from 'assets/images/enemy-medium.png'
import enemyBig from 'assets/images/enemy-big.png'
import spreakerOff from 'assets/images/speaker-off.png'
import speaker from 'assets/images/speaker.png'

interface ISprite {
  KEY: string;
  PATH: string;
}

interface ISpriteConfig {
  BACKGROUND: ISprite,
  STARS: ISprite,
  PLANET: ISprite,
  PLANET2: ISprite,
  PLANET_CLUSTER: ISprite,
  PLAYER_SHIP: ISprite,
  ENEMY_SMALL: ISprite,
  ENEMY_MEDIUM: ISprite,
  ENEMY_BIG: ISprite,
  SPEAKER: ISprite;
  SPEAKER_OFF: ISprite;
}

const spriteConfig: ISpriteConfig = {
  BACKGROUND: {
    KEY: 'background',
    PATH: background,
  },
  STARS: {
    KEY: 'stars',
    PATH: stars,
  },
  PLANET: {
    KEY: 'planet',
    PATH: planet
  },
  PLANET2: {
    KEY: 'planet2',
    PATH: planet2
  },
  PLANET_CLUSTER: {
    KEY: 'planetCluser',
    PATH: planetCluser
  },
  PLAYER_SHIP: {
    KEY: 'playerShip',
    PATH: playerShip
  },
  ENEMY_SMALL: {
    KEY: 'enemySmall',
    PATH: enemySmall
  },
  ENEMY_MEDIUM: {
    KEY: 'enemyMedium',
    PATH: enemyMedium
  },
  ENEMY_BIG: {
    KEY: 'enemyBig',
    PATH: enemyBig
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
