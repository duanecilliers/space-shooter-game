import bgScore from 'assets/audio/Philipp_Weigl_-_06_-_Full_of_Stars.mp3'
import coinWave from 'assets/audio/coin.wav'

interface IAudio {
  KEY: string;
  PATH: string;
}

interface IAudioConfig {
  MUSIC: {
    BG_SCORE: IAudio;
  };
  SFX: {
    COIN: IAudio;
  };
}

const audioConfig: IAudioConfig = {
  MUSIC: {
    BG_SCORE: {
      KEY: 'bg_score',
      PATH: bgScore
    },
  },
  SFX: {
    COIN: {
      KEY: 'coin_sfx',
      PATH: coinWave
    },
  },
}

export default audioConfig
