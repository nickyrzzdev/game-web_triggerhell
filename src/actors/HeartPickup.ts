import * as ex from 'excalibur'
import { HEART_HEAL_AMOUNT, TILE_SIZE } from '../config/constants'
import { heartPickup } from '../config/collisionGroups'
import { createHeartFullSprite } from '../assets/sprites'
import { Player } from './Player'

export class HeartPickup extends ex.Actor {
  constructor(x: number, y: number) {
    super({
      x,
      y,
      width: TILE_SIZE / 2,
      height: TILE_SIZE / 2,
      collisionType: ex.CollisionType.Passive,
      collisionGroup: heartPickup,
    })
  }

  override onInitialize(): void {
    this.graphics.use(createHeartFullSprite())
    this.on('collisionstart', (event) => {
      if (event.other.owner instanceof Player && event.other.owner.heal(HEART_HEAL_AMOUNT)) {
        this.kill()
      }
    })
  }
}
