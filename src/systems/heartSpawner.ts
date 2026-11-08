import type { Scene } from 'excalibur'
import { ENEMY_COLLIDER } from '../assets/sprites'
import { HEART_MIN_DISTANCE_FROM_PLAYER_TILES, HEART_SPAWN_COUNT } from '../config/constants'
import { Enemy } from '../actors/Enemy'
import { HeartPickup } from '../actors/HeartPickup'
import { Player } from '../actors/Player'
import type { Room, Cell } from '../world/RoomGenerator'

function isOpenSpace(room: Room, col: number, row: number): boolean {
  for (let dy = -1; dy <= 1; dy++) {
    for (let dx = -1; dx <= 1; dx++) {
      const neighborCol = col + dx
      const neighborRow = row + dy
      if (
        neighborCol < 0 ||
        neighborRow < 0 ||
        neighborCol >= room.cols ||
        neighborRow >= room.rows ||
        room.walls[neighborRow][neighborCol]
      ) {
        return false
      }
    }
  }

  return true
}

function shuffleCells(cells: Cell[]): Cell[] {
  for (let i = cells.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const current = cells[i]
    cells[i] = cells[j]
    cells[j] = current
  }
  return cells
}

function hasRoomForAnother(cells: Cell[], candidate: Cell): boolean {
  return cells.every(
    (cell) => Math.abs(cell.col - candidate.col) > 1 || Math.abs(cell.row - candidate.row) > 1,
  )
}

export function spawnHeartPickups(
  scene: Scene,
  room: Room,
  player: Player,
  enemies: readonly Enemy[],
): HeartPickup[] {
  const candidates: Cell[] = []
  const playerCol = player.pos.x / room.tileSize
  const playerRow = player.pos.y / room.tileSize

  for (let row = 1; row < room.rows - 1; row++) {
    for (let col = 1; col < room.cols - 1; col++) {
      const centerX = (col + 0.5) * room.tileSize
      const centerY = (row + 0.5) * room.tileSize
      if (
        !isOpenSpace(room, col, row) ||
        Math.hypot(col + 0.5 - playerCol, row + 0.5 - playerRow) <
          HEART_MIN_DISTANCE_FROM_PLAYER_TILES ||
        enemies.some(
          (enemy) =>
            Math.abs(enemy.pos.x - centerX) < (room.tileSize + ENEMY_COLLIDER.width) / 2 &&
            Math.abs(enemy.pos.y - centerY) < (room.tileSize + ENEMY_COLLIDER.height) / 2,
        )
      ) {
        continue
      }

      candidates.push({ col, row })
    }
  }

  let selected: Cell[] = []
  for (let attempt = 0; attempt < 100 && selected.length < HEART_SPAWN_COUNT; attempt++) {
    const attemptSelection: Cell[] = []
    for (const candidate of shuffleCells([...candidates])) {
      if (hasRoomForAnother(attemptSelection, candidate)) {
        attemptSelection.push(candidate)
      }
      if (attemptSelection.length === HEART_SPAWN_COUNT) {
        break
      }
    }
    if (attemptSelection.length > selected.length) {
      selected = attemptSelection
    }
  }

  return selected.map((cell) => {
    const heart = new HeartPickup(
      (cell.col + 0.5) * room.tileSize,
      (cell.row + 0.5) * room.tileSize,
    )
    scene.add(heart)
    return heart
  })
}
