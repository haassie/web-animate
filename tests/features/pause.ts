import { animate } from '../../src/index'
import { IEffectTiming } from '../../src/types'
import { wait } from '../tools/timing';

test('pause() from running', async (done) => {
    const el = document.createElement('div')
    document.body.appendChild(el)

    const keyframes = [{ opacity: 0 }, { opacity: 1 }]
    const player = animate(el, keyframes, 100)

    await wait(50)
    player.pause()

    // it is hard to use await to test actual play time,
    // so we have to use a range.
    expect(player.currentTime).toBeGreaterThan(20)
    expect(player.currentTime).toBeLessThan(80)
    expect(player.playState).toEqual('paused')
    expect(player.playbackRate).toEqual(1)
    expect(player.pending).toEqual(false)
    expect(player.id).toBeTruthy()
    done()
})


test('pause() from running => play() => pause()', async (done) => {
    const el = document.createElement('div')
    document.body.appendChild(el)

    const keyframes = [{ opacity: 0 }, { opacity: 1 }]
    const player = animate(el, keyframes, 200)

    await wait(25)
    player.pause()
    player.play()

    await wait(25)
    player.pause()

    // it is hard to use await to test actual play time,
    // so we have to use a range.
    expect(player.currentTime).toBeGreaterThan(20)
    expect(player.currentTime).toBeLessThan(80)
    expect(player.playState).toEqual('paused')
    expect(player.playbackRate).toEqual(1)
    expect(player.pending).toEqual(false)
    expect(player.id).toBeTruthy()


    done()
})

test('pause() from idle', () => {
    const el = document.createElement('div')
    document.body.appendChild(el)

    const keyframes = [{ opacity: 0 }, { opacity: 1 }]
    const player = animate(el, keyframes, 100)
    player.cancel()
    player.pause()

    expect(player.currentTime).toEqual(0)
    expect(player.playState).toEqual('paused')
    expect(player.playbackRate).toEqual(1)
    expect(player.pending).toEqual(false)
    expect(player.id).toBeTruthy()
})

test('pause() from paused', () => {
    const el = document.createElement('div')
    document.body.appendChild(el)

    const keyframes = [{ opacity: 0 }, { opacity: 1 }]
    const player = animate(el, keyframes, 100)
    player.pause()
    player.currentTime = 50
    player.pause()

    expect(player.currentTime).toEqual(50)
    expect(player.playState).toEqual('paused')
    expect(player.playbackRate).toEqual(1)
    expect(player.pending).toEqual(false)
    expect(player.id).toBeTruthy()
})

test('pause() from finished', () => {
    const el = document.createElement('div')
    document.body.appendChild(el)

    const keyframes = [{ opacity: 0 }, { opacity: 1 }]
    const timing: IEffectTiming = { duration: 100, fill: 'forwards' }
    const player = animate(el, keyframes, timing)
    player.finish()
    player.pause()

    expect(Math.round(player.currentTime)).toBe(100)
    expect(player.playState).toEqual('finished')
    expect(player.playbackRate).toEqual(1)
    expect(player.pending).toEqual(false)
    expect(player.id).toBeTruthy()
})

test('pause() from running', () => {
    const el = document.createElement('div')
    document.body.appendChild(el)

    const keyframes = [{ opacity: 0 }, { opacity: 1 }]
    const player = animate(el, keyframes, 100)
    player.currentTime = 50
    player.pause()

    expect(player.currentTime).toBe(50)
    expect(player.playState).toEqual('paused')
    expect(player.playbackRate).toEqual(1)
    expect(player.pending).toEqual(false)
    expect(player.id).toBeTruthy()
})

