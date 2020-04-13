import background from 'assets/images/background/main.png'
import stars from 'assets/images/background/stars.png'
import planet from 'assets/images/background/planet.png'
import planet2 from 'assets/images/background/planet2.png'
import planetCluser from 'assets/images/background/planet-cluster.png'
import playerShip from 'assets/images/ship.png'
import enemySmall from 'assets/images/enemy-small.png'
import enemyMedium from 'assets/images/enemy-medium.png'
import enemyBig from 'assets/images/enemy-big.png'
import explosion from 'assets/images/explosion.png'
import powerUps from 'assets/images/power-up.png'
import spreakerOff from 'assets/images/speaker-off.png'
import speaker from 'assets/images/speaker.png'

interface ISprite {
  KEY: string;
  PATH: string;
  FRAME_CONFIG?: {
    frameWidth: number;
    frameHeight: number;
  }
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
  EXPLOSION: ISprite,
  POWER_UPS: ISprite;
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
    PATH: playerShip,
    FRAME_CONFIG: {
      frameWidth: 16,
      frameHeight: 24
    }
  },
  ENEMY_SMALL: {
    KEY: 'enemySmall',
    PATH: enemySmall,
    FRAME_CONFIG: {
      frameWidth: 16,
      frameHeight: 16
    }
  },
  ENEMY_MEDIUM: {
    KEY: 'enemyMedium',
    PATH: enemyMedium,
    FRAME_CONFIG: {
      frameWidth: 32,
      frameHeight: 16
    }
  },
  ENEMY_BIG: {
    KEY: 'enemyBig',
    PATH: enemyBig,
    FRAME_CONFIG: {
      frameWidth: 32,
      frameHeight: 32
    }
  },
  EXPLOSION: {
    KEY: 'explosion',
    PATH: explosion,
    FRAME_CONFIG: {
      frameWidth: 16,
      frameHeight: 16
    }
  },
  POWER_UPS: {
    KEY: 'powerUps',
    PATH: powerUps,
    FRAME_CONFIG: {
      frameWidth: 16,
      frameHeight: 16
    }
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
