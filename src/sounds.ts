import * as ex from 'excalibur'

const base = import.meta.env.BASE_URL

export const sounds = {
  enemyDeath: new ex.Sound(`${base}assets/sounds/enemy_death.wav`),
  enemyHit: new ex.Sound(`${base}assets/sounds/enemy_hit.wav`),
  enemyShoot: new ex.Sound(`${base}assets/sounds/enemy_shoot.wav`),
  gameOver: new ex.Sound(`${base}assets/sounds/game_over.wav`),
  ottoWarning: new ex.Sound(`${base}assets/sounds/otto_warning.wav`),
  playerHurt: new ex.Sound(`${base}assets/sounds/player_hurt.wav`),
  playerShoot: new ex.Sound(`${base}assets/sounds/player_shoot.wav`),
  roomClear: new ex.Sound(`${base}assets/sounds/room_clear.wav`),
}

