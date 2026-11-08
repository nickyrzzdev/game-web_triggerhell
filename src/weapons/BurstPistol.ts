import * as ex from 'excalibur'
import { Bullet } from '../actors/Bullet'
import {
  BURST_COOLDOWN_MS,
  BURST_SHOT_INTERVAL_MS,
  BURST_SIZE,
} from '../config/constants'

export class BurstPistol {
  private remainingShots = 0
  private nextShotAt = 0
  private nextBurstAt = Number.NEGATIVE_INFINITY
  private lastShotAt: number | undefined
  private burstScene: ex.Scene | undefined

  update(
    scene: ex.Scene,
    origin: ex.Vector,
    targetPos: ex.Vector,
    triggerDown: boolean,
  ): void {
    const now = scene.engine.clock.now()

    if (this.remainingShots > 0 && this.burstScene !== scene) {
      this.cancel()
      return
    }

    if (this.remainingShots === 0) {
      if (!triggerDown || now < this.nextBurstAt) {
        return
      }

      this.burstScene = scene
      this.remainingShots = BURST_SIZE
      this.lastShotAt = undefined
      this.fireShot(scene, origin, targetPos, now)
      return
    }

    if (now >= this.nextShotAt) {
      this.fireShot(scene, origin, targetPos, now)
    }
  }

  cancel(): void {
    if (this.remainingShots > 0 && this.lastShotAt !== undefined) {
      this.nextBurstAt = this.lastShotAt + BURST_COOLDOWN_MS
    }

    this.remainingShots = 0
    this.lastShotAt = undefined
    this.burstScene = undefined
  }

  private fireShot(
    scene: ex.Scene,
    origin: ex.Vector,
    targetPos: ex.Vector,
    now: number,
  ): void {
    const direction = targetPos.sub(origin)

    if (direction.magnitude > 0) {
      scene.add(new Bullet(origin.clone(), direction.normalize()))
      this.lastShotAt = now
    }

    this.remainingShots -= 1

    if (this.remainingShots > 0) {
      this.nextShotAt = now + BURST_SHOT_INTERVAL_MS
      return
    }

    if (this.lastShotAt !== undefined) {
      this.nextBurstAt = this.lastShotAt + BURST_COOLDOWN_MS
    }

    this.burstScene = undefined
  }
}
