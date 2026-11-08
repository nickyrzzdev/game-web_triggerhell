import * as ex from 'excalibur'
import { allSpriteImages } from './sprites'

const sound = (name: string) =>
  new ex.Sound(`${import.meta.env.BASE_URL}assets/sounds/${name}.wav`)

export const sounds = {
  playerShoot: sound('player_shoot'),
  enemyShoot: sound('enemy_shoot'),
  enemyHit: sound('enemy_hit'),
  enemyDeath: sound('enemy_death'),
  playerHurt: sound('player_hurt'),
  roomClear: sound('room_clear'),
  gameOver: sound('game_over'),
  ottoWarning: sound('otto_warning'),
}
export const loader = new ex.Loader()
loader.addResources(allSpriteImages)
loader.addResources(Object.values(sounds))
loader.backgroundColor = '#151821'
loader.loadingBarColor = ex.Color.fromHex('#f97316')
loader.playButtonText = 'Jogar'
loader.logo = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="520" height="100" viewBox="0 0 520 100"><text x="260" y="70" text-anchor="middle" fill="#ff6b35" font-family="sans-serif" font-size="68" font-weight="bold">SnoopyScape</text></svg>',
)}`
loader.logoWidth = 520
loader.logoHeight = 100
