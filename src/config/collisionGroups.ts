import * as ex from 'excalibur'

export const player = ex.CollisionGroupManager.create('player', 0b111100)
export const playerBullet = ex.CollisionGroupManager.create('playerBullet', 0b111100)
export const enemy = ex.CollisionGroupManager.create('enemy', 0b110011)
export const boss = ex.CollisionGroupManager.create('boss', 0b110011)
export const heartPickup = ex.CollisionGroup.collidesWith([player])