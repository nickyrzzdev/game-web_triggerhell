import * as ex from 'excalibur'
import { playerBullet } from '../config/collisionGroups'
import { BULLET_LIFETIME_MS, BULLET_SPEED } from '../config/constants'

export class Bullet extends ex.Actor {
  public damage = 1
  private lifetimeMs = 0

  constructor(origin: ex.Vector, targetPos: ex.Vector) {
    const direction = targetPos.sub(origin).normalize()

    super({
      pos: new ex.Vector(origin.x, origin.y),
      width: 8,
      height: 8,
      color: ex.Color.Yellow,
      vel: direction.scale(BULLET_SPEED),
      collisionType: ex.CollisionType.Passive,
      collisionGroup: playerBullet,
    })
  }

  override onPreUpdate(_engine: ex.Engine, elapsed: number): void {
    this.lifetimeMs += elapsed

    if (this.lifetimeMs >= BULLET_LIFETIME_MS || this.isOffScreen) {
      this.kill()
    }
  }
}
