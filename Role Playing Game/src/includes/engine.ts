import { WithBasicsType } from './abilities'
import { Character, Player } from './types'
import { createPlayer } from './assets'

export function createGame<T extends Character & WithBasicsType>(
  characters: Array<T>
) {
  let playerPanels: PlayerPanelType[],
    messagePanel: MessagePanelType,
    messageLogger: MessageLoggerType

  function init() {
    Stage.mount('#app')
    messagePanel = MessagePanel('.js-announcements')
    messageLogger = MessageLogger(messagePanel)

    messageLogger.clear()

    setTimeout(() => {
      messageLogger.add('Testar')
      messageLogger.add('Testar2')
    }, 1000)

    //*----- Create players and attach to player panels -----*/
    playerPanels = []
    characters.forEach((character, index) => {
      const player = createPlayer(character, 40)
      const panel: PlayerPanelType = PlayerPanel(player, index)
      panel.mount('.js-players')
      panel.updateCommands()
      playerPanels.push(panel)
    })
  }

  // start
  // -- Init stage
  // Loop
  // -- updateCommands()
  // -- updateAnnouncements
  // -- advanceRound()
  // -- bossLogic()
  // -- checkState()
  // -- render()
  // End screen

  init()
}

type PlayerPanelType = ReturnType<typeof PlayerPanel>
function PlayerPanel<T extends Player & WithBasicsType>(
  player: T = null,
  index: number = -1
) {
  let el: HTMLDivElement

  return {
    updateCommands() {
      let output = ['<ul>']
      output = output.concat(
        player
          .getMoveList()
          .map(
            (move) =>
              `<li><button class="js-command" data-name="${move.name} data-type="${move.type}">${move.name}</button></li>`
          )
      )
      output.push('</ul>')
      el.querySelector('.js-commands').innerHTML = output.join('\n')
    },
    mount(selector) {
      const target = document.querySelector<HTMLDivElement>(selector)!
      if (el == null && target != null) {
        target.innerHTML += `
          <div class="Player js-player" data-index="${index}" style="--player-accent-color: ${player.getColor()};">
            <div class="Player-panel js-panel">
              <div class="Player-header">
                <h4>${player.getName()}</h4>
                <div class="Player-health"><strong>${
                  player.currentEnergy
                }</strong> / ${player.getEnergy()}</div>
              </div>                  
              <div class="Player-commands js-commands"></div>
              <div class="Player-actionMeter Meter js-actionMeter"></div>
            </div>
          </div>
        `
        el = target.querySelector(`.js-player[data-index="${index}"]`)
      } else if (el != null) {
        console.error(
          `PlayerPanel.mount(): ${player.getName()} has already been mounted`
        )
      } else {
        console.error(
          `PlayerPanel.mount(): Invalid target selector: ${selector}`
        )
      }
    },
  }
}

type MessageLoggerType = ReturnType<typeof MessageLogger>
function MessageLogger(msgPanel: MessagePanelType) {
  let log: string[] = [],
    msgQueue = MessageQueue(msgPanel)

  return {
    get() {
      return log
    },
    add(msg: string, duration = 2500) {
      log.push(msg)
      msgQueue.add(msg, duration)
    },
    clear() {
      log = []
      msgQueue.clear()
    },
  }
}

type MessageQueueData = { message: string; duration: number }
function MessageQueue(msgPanel: MessagePanelType) {
  let queued: MessageQueueData[] = [],
    state: 'idle' | 'displaying' | 'waiting' = 'idle',
    timer = 0

  const updateQueue = () => {
    switch (state) {
      case 'idle':
        if (queued.length > 0) {
          state = 'displaying'
          const firstItem = queued.shift()
          msgPanel.update([firstItem.message])
          timer = setTimeout(() => {
            updateQueue()
          }, firstItem.duration)
        }
        break
      case 'displaying':
        msgPanel.update([])

        if (queued.length > 0) {
          state = 'waiting'
          msgPanel.update([])
          timer = setTimeout(() => {
            state = 'idle'
            updateQueue()
          }, 300)
        } else {
          state = 'idle'
        }
        break
      case 'waiting':
        break
    }
  }
  return {
    add(message: string, duration = 2500) {
      queued.push({ message, duration })

      if (state !== 'displaying') {
        updateQueue()
      }
    },
    clear() {
      queued = []
      updateQueue()
    },
  }
}

type MessagePanelType = ReturnType<typeof MessagePanel>
function MessagePanel(selector: string) {
  let el: HTMLDivElement

  const target = document.querySelector<HTMLDivElement>(selector)!
  if (target != null) {
    target.innerHTML = `<div class="MsgPanel js-msgPanel"></div>`
    el = target.querySelector('.js-msgPanel')
  } else {
    console.error(`MessagePanel.mount(): Invalid target selector: ${selector}`)
  }

  return {
    update(messages: string[]) {
      if (el != null) {
        if (messages.length > 0) {
          let output = ['<ul>']
          output.push(messages.map((msg) => `<li>${msg}</li>`).join('\n'))
          output.push('</ul>')
          el.innerHTML = output.join('\n')
          el.classList.add('is-visible')
        } else {
          el.classList.remove('is-visible')
        }
        // Scroll to bottom
      } else {
        console.error(`MessagePanel.draw(): Container not mounted yet`)
      }
    },
  }
}

const Stage = (() => {
  let el: HTMLDivElement

  return {
    mount(selector) {
      const target = document.querySelector<HTMLDivElement>(selector)!
      if (target != null) {
        target.innerHTML = `
          <div class="Stage js-stage">
            <div class="Stage-announcements js-announcements"></div>
            <div class="Stage-opponent"> 
              <div class="Opponent">    
                <div class="Opponent-meter">
                  Boss
                  <div class="Meter js-bossMeter"></div>
                </div>
              </div>
            </div>
            <div class="Stage-players js-players"></div>
          </div>
          `
        el = target.querySelector('.js-stage')
      } else {
        console.error(`Stage.mount(): Invalid target selector: ${selector}`)
      }
    },
  }
})()
