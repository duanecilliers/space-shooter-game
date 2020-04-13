interface IKey {
  CODE: number;
  KEY: string;
}

export interface IGameConfig {
  GAME: {
    VIEWHEIGHT: number;
    VIEWWIDTH: number;
    TITLE: string;
  };
  SCENES: {
    BOOT: string;
    LOAD: string;
    GAME: string;
    UI: string;
  };
  DEFAULT_TEXT_STYLE: {
    font: string;
    fontSize: number;
    fill: string;
    smoothed: boolean;
  };
  UI_DEFAULT: {
    tint: number;
  };
  AUDIO: {
    musicKeys: string[];
    sfxKeys: string[];
  };
  PLAYER: {
    SPEED: number;
  };
  KEYS: {
    LEFT_ARROW: IKey;
    UP_ARROW: IKey;
    RIGHT_ARROW: IKey;
    DOWN_ARROW: IKey;
    Z: IKey;
    X: IKey;
    COMMA: IKey;
    DOT: IKey;
    A: IKey;
    S: IKey;
    K: IKey;
    L: IKey;
    ENTER: IKey;
    ESCAPE: IKey;
  };
}

const gameConfig: IGameConfig = {
  GAME: {
    VIEWHEIGHT: 800,
    VIEWWIDTH: 600,
    TITLE: 'Space Shooter',
  },
  SCENES: {
    BOOT: 'game_boot',
    LOAD: 'game_load',
    GAME: 'game_game',
    UI: 'UI',
  },
  DEFAULT_TEXT_STYLE: {
    font: 'Roboto',
    fontSize: 20,
    fill: '#ffffff',
    smoothed: false,
  },
  UI_DEFAULT: {
    tint: 0xaaaaaa,
  },
  AUDIO: {
    musicKeys: ['bgScore'],
    sfxKeys: ['coinSfx'],
  },
  PLAYER: {
    SPEED: 300
  },
  KEYS: {
    LEFT_ARROW: {
      CODE: 37,
      KEY: '',
    },
    UP_ARROW: {
      CODE: 38,
      KEY: '',
    },
    RIGHT_ARROW: {
      CODE: 39,
      KEY: '',
    },
    DOWN_ARROW: {
      CODE: 40,
      KEY: '',
    },
    Z: {
      CODE: 90,
      KEY: 'Z',
    },
    X: {
      CODE: 88,
      KEY: 'X',
    },
    COMMA: {
      CODE: 188,
      KEY: ',',
    },
    DOT: {
      CODE: 190,
      KEY: '.',
    },
    A: {
      CODE: 65,
      KEY: 'A',
    },
    S: {
      CODE: 83,
      KEY: 'S',
    },
    K: {
      CODE: 75,
      KEY: 'K',
    },
    L: {
      CODE: 76,
      KEY: 'L',
    },
    ENTER: {
      CODE: 13,
      KEY: '',
    },
    ESCAPE: {
      CODE: 27,
      KEY: '',
    },
  },
};

export default gameConfig
