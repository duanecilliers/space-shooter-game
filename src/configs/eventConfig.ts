interface IEventConfig {
  EVENTS: {
    GAME: {
      STARTED: string;
    };
    KEYBOARD: {
      KEYDOWN: string;
      KEYUP: string;
    }
    BUTTON: {
      CLICK: string;
    }
  };
}

const eventConfig: IEventConfig = {
  EVENTS: {
    GAME: {
      STARTED: 'gameStarted',
    },
    KEYBOARD: {
      KEYDOWN: 'keyDown',
      KEYUP: 'keyUp'
    },
    BUTTON: {
      CLICK: 'buttonClick'
    }
  }
}

export default eventConfig
