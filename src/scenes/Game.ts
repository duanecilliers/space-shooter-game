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

/**
 * Responsible for delegating the various levels, holding the various core systems and such.
 */
const Game = function GameFunc() {
  const state: any = {}
  let audioManager
  let entities = List([])
  let UIScene
  let background
  // let player
  let enemyShips

  function cameraSetup() {
    state.getScene().cameras.main.setViewport(0, 0, gameConfig.GAME.VIEWWIDTH, gameConfig.GAME.VIEWHEIGHT)
    state.getScene().cameras.main.setZoom(0.8)
  }

  function createPlayer () {
    const playerState = createPlayerShip()
    playerState.create(state.getScene())
    playerState.setPosition({ x: 200, y: 200 })
    // console.log('playerState', playerState)
  }

  function createEnemies () {
    enemyShips = createEnemyShips()
    enemyShips.create(state.getScene())
    // console.log('enemyState', enemyState)
  }

  function init() {
    // After assets are loaded.
    UIScene = UI()
    state.getScene().scene.add(gameConfig.SCENES.UI, UIScene.getScene(), true)
    audioManager = AudioManager(UIScene.getScene())
  }

  function create() {
    audioManager.playMusic()
    background = createBackground(state.getScene())
    background.create()
    createPlayer()
    createEnemies()
    cameraSetup()
  }

  function update(time, delta) {
    // console.log('Game update', time, delta)
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
