import { List } from 'immutable'
import gameConfig from 'configs/gameConfig'
import AudioManager from 'core/createAudioManager'
import createPlayerShip from 'entities/createPlayerShip'
import UI from 'scenes/UI'
import canListen from 'components/events/canListen'
import isScene from 'components/isScene'
import createState from 'utils/createState'
import createEnemyShips from 'entities/createEnemyShips'
import createBackground from 'entities/createBackground'
import createPowerUps from 'entities/createPowerUps'

/**
 * Responsible for delegating the various levels, holding the various core systems and such.
 */
const Game = function GameFunc() {
  const state: any = {}
  let audioManager
  // let entities = List([])
  let UIScene
  let background
  let player
  let powerUpsEntity
  let powerUps
  let projectiles
  let enemyShips

  function _setupCamera () {
    state.getScene().cameras.main
      .setViewport(0, 0, gameConfig.GAME.VIEWWIDTH, gameConfig.GAME.VIEWHEIGHT)
      .setZoom(0.8)
  }

  function _createBackground () {
    background = createBackground(state.getScene())
    background.create()
  }

  function _createPowerUps() {
    powerUpsEntity = createPowerUps(state.getScene())
    powerUpsEntity.create()
  }

  function _createPlayer () {
    player = createPlayerShip(state.getScene())
    player.create()
  }

  function _createEnemies () {
    enemyShips = createEnemyShips(state.getScene())
    enemyShips.create()
  }

  function init() {
    // After assets are loaded.
    UIScene = UI()
    state.getScene().scene.add(gameConfig.SCENES.UI, UIScene.getScene(), true)
    audioManager = AudioManager(UIScene.getScene())
  }

  function create() {
    audioManager.playMusic()
    _createBackground()
    _createPowerUps()
    _createPlayer()
    _createEnemies()
    _setupCamera()

    const scene: Phaser.Scene = state.getScene()

    // projectiles and powerUps collission
    powerUps = powerUpsEntity.getPowerUps()
    projectiles = player.getProjectiles()
    scene.physics.add.collider(projectiles, powerUps, (projectile, powerUp) => {
      projectile.destroy()
    })

    // player and powerUps
    scene.physics.add.overlap(player.getShip(), powerUps, player.consumePowerUp)
  }

  function update(time, delta) {
    // console.log('Game update', time, delta)
    player.update()
    enemyShips.update()
    background.update()
  }

  function destroy() {
    background.destroy()
    if (UI) UI.destroy()
  }

  const localState = {
    // props
    // methods
    init,
    create,
    update,
    destroy,
  }

  return createState('Game', state, {
    localState,
    canListen: canListen(state),
    isScene: isScene(state, gameConfig.SCENES.GAME)
  })
}

export default Game
