import * as Phaser from 'phaser'
import 'assets/styles/main.css'
import gameConfig from 'configs/gameConfig'

import BootScene from 'scenes/Boot'
import LoadScene from 'scenes/Load'
import Game from 'scenes/Game'
import resizeCanvas from 'utils/resizeCanvas'
import createMessageBus from 'core/createMessageBus'
import store from './store'

const phaserConfig: Phaser.Types.Core.GameConfig = {
  type: Phaser.WEBGL,
  width: gameConfig.GAME.VIEWWIDTH,
  height: gameConfig.GAME.VIEWHEIGHT,
  backgroundColor: '#555555',
  parent: 'game',
  scene: [BootScene().getScene(), LoadScene().getScene(), Game().getScene()],
  physics: {
    default: 'arcade',
    arcade: {
      debug: false
    }
  }
}

store.messageBus = createMessageBus()
const game: Phaser.Game = new Phaser.Game(phaserConfig)

window.onload = function () {
  window.addEventListener('resize', resizeCanvas)
}
