import * as ex from 'excalibur'
import { getInputDirection } from '../input/playerInput'
import { PLAYER_SPEED } from '../config/constants'
import { Pistol } from '../weapons/Pistol'

export class Player extends ex.Actor {
  private readonly pistol = new Pistol()
  private leftMouseHeld = false

  constructor(x: number, y: number) {
    super({
      x,
      y,
      width: 32,
      height: 32,
      color: ex.Color.Cyan,
    })
  }

  override onPreUpdate(engine: ex.Engine, _elapsed: number): void {
    // Lê os controles a cada atualização e aplica a velocidade do jogador.
    this.vel = getInputDirection(engine).scale(PLAYER_SPEED)
    this.handleShooting(engine)
  }

  private handleShooting(engine: ex.Engine): void {
    const pointers = engine.input.pointers

    for (const event of pointers.currentFrameDown) {
      if (event.pointerId === 0 && event.button === ex.PointerButton.Left) {
        this.leftMouseHeld = true
      }
    }

    for (const event of pointers.currentFrameUp) {
      if (event.pointerId === 0 && event.button === ex.PointerButton.Left) {
        this.leftMouseHeld = false
      }
    }

    if (!pointers.isDown(0)) {
      this.leftMouseHeld = false
    }

    const targetPos = pointers.primary.lastWorldPos
    if (!this.leftMouseHeld || !targetPos) {
      return
    }

    this.pistol.tryShoot(engine.currentScene, this.pos, targetPos)
  }
}
