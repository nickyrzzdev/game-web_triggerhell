import * as ex from 'excalibur'
import { OTTO_ACCEL, OTTO_BASE_SPEED, OTTO_ENRAGE_AFTER_MS, OTTO_HIT_RADIUS, OTTO_MAX_SPEED, OTTO_RADIUS, OTTO_SPAWN_DELAY_MS, OTTO_WARNING_MS } from '../config/constants'
import { boss } from '../config/collisionGroups'
import { createEvilOttoSprite } from '../assets/sprites'
import type { Room } from '../world/RoomGenerator'
import { Bullet } from './Bullet'
import { Player } from './Player'
import { sounds } from '../sounds'

export class EvilOtto extends ex.Actor {
  private state = 'dormant'
  private elapsed = 0
  private clearing = false

  constructor(private readonly target: Player) {
    super({ radius: OTTO_RADIUS, collisionType: ex.CollisionType.Passive, collisionGroup: boss, z: 5 })
    this.on('collisionstart', (event) => {
      if ((this.state === 'chasing' || this.state === 'enraged') && event.other.owner instanceof Bullet) event.other.owner.kill()
    })
  }

  override onInitialize(): void { this.graphics.use(createEvilOttoSprite()) }

  onWaveStart(room: Room): void {
    this.pos.setTo((this.target.pos.x < room.cols * room.tileSize / 2 ? room.cols - 2 : 1) * room.tileSize + room.tileSize / 2, (this.target.pos.y < room.rows * room.tileSize / 2 ? room.rows - 2 : 1) * room.tileSize + room.tileSize / 2)
    this.state = 'dormant'
    this.elapsed = 0
    this.clearing = false
    this.graphics.opacity = 0
  }

  onWaveCleared(): void {
    this.clearing = true
    this.vel = ex.Vector.Zero
  }

  override onPreUpdate(_engine: ex.Engine, delta: number): void {
    if (this.clearing) {
      this.graphics.opacity = Math.max(0, this.graphics.opacity - delta / 300)
      return
    }
    if (this.state === 'dormant') {
      this.elapsed += delta
      if (this.elapsed >= OTTO_SPAWN_DELAY_MS) {
        this.state = 'spawning'
        this.elapsed = 0
        sounds.ottoWarning.play()
      }
    }
    if (this.state === 'spawning') {
      this.elapsed += delta
      this.graphics.opacity = Math.floor(this.elapsed / 100) % 2 ? 0.2 : 1
      if (this.elapsed >= OTTO_WARNING_MS) {
        this.state = 'chasing'
        this.elapsed = 0
        this.graphics.opacity = 1
      }
    }
    if (this.state === 'chasing' || this.state === 'enraged') {
      this.elapsed += delta
      if (this.elapsed >= OTTO_ENRAGE_AFTER_MS) this.state = 'enraged'
      const dx = this.target.pos.x - this.pos.x
      const dy = this.target.pos.y - this.pos.y
      const distance = Math.max(Math.hypot(dx, dy), 0.001)
      const speed = Math.min(OTTO_BASE_SPEED + OTTO_ACCEL * this.elapsed / 1000, OTTO_MAX_SPEED) * (this.state === 'enraged' ? 1.3 : 1)
      this.vel.setTo((dx / distance - dy / distance * Math.sin(this.elapsed / 1000) * 0.6) * speed, (dy / distance + dx / distance * Math.sin(this.elapsed / 1000) * 0.6) * speed)
      if (distance < OTTO_HIT_RADIUS) this.target.takeDamage()
    }
  }
}
