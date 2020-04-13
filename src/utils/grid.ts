interface IGridConfig {
  scene: Phaser.Scene;
  rows?: number;
  cols?: number;
  height?: number;
  width?: number;
}

const createGrid = (config: IGridConfig) => {
  const {
    scene,
    rows = 5,
    cols = 5,
    height = config.scene.game.config.height,
    width = config.scene.game.config.width
  } = config

  const cellWidth = parseInt(String(width)) / cols
  const cellHeight = parseInt(String(height)) / rows

  function placeAt(x, y, obj) {
    // calculate position based on the cellWidth and cellHeight
    const x2 = cellWidth * x
    const y2 = cellHeight * y
    obj.x = x2 + cellWidth / 2
    obj.y = y2 + cellHeight / 2
  }

  function placeAtIndex(index, obj) {
    const y = Math.floor(index / cols)
    const x = index - (y * cols)
    placeAt(x, y, obj)
  }

  function showNumbers() {
    let count = 0
    for (let i = 0; i < rows; i++) {
      for (let j = 0; j < cols; j++) {
        const numText = scene.add.text(0, 0, String(count), { color: '#ff0000' })
        numText.setOrigin(0.5, 0.5)
        placeAtIndex(count, numText)
        count++
      }
    }
  }

  function show() {
    const graphics = scene.add.graphics()
      .lineStyle(2, 0xff0000)

    // draw vertical lines
    for (let i = 0; i < width; i += cellWidth) {
      graphics.moveTo(i, 0).lineTo(i, parseInt(String(height)))
    }

    // draw horiztonal lines
    for (let i = 0; i < height; i += cellHeight) {
      graphics.moveTo(0, i).lineTo(parseInt(String(width)), i)
    }

    graphics.strokePath()
  }

  return {
    placeAt,
    placeAtIndex,
    show,
    showNumbers
  }
}

export default createGrid
