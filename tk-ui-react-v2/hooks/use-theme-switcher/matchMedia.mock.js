/** @see https://jestjs.io/docs/29.4/manual-mocks */

import { vi } from 'vitest'

let prefersColorSchemeDarkMatches = false

export function setInitialPrefersColorSchemeDarkMatches(value) {
  prefersColorSchemeDarkMatches = value
}

const eventCallbacks = {}

export const mockPrefersColorSchemeDarkRemoveEventListener = vi.fn()
mockPrefersColorSchemeDarkRemoveEventListener.mockImplementation((eventName, callback) => {
  eventCallbacks[eventName] = eventCallbacks[eventName]?.filter?.(eventCallback => eventCallback !== callback)
})

function getMatchMedia(query) {
  if (query === '(prefers-color-scheme: dark)') {
    return {
      matches: prefersColorSchemeDarkMatches,
      media: query,
      onchange: null,
      addListener: vi.fn(), // deprecated
      removeListener: vi.fn(), // deprecated
      addEventListener: (eventName, callback) => {
        if (eventCallbacks[eventName] === undefined) {
          eventCallbacks[eventName] = []
        }
        eventCallbacks[eventName].push(callback)
      },
      removeEventListener: mockPrefersColorSchemeDarkRemoveEventListener,
      dispatchEvent: vi.fn(),
    }
  }
}

Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: getMatchMedia,
});

export function setMockPrefersColorSchemeDarkMatches(value) {
  if (value === prefersColorSchemeDarkMatches) {
    return
  }
  prefersColorSchemeDarkMatches = value
  eventCallbacks.change?.forEach?.(callback => callback({ matches: prefersColorSchemeDarkMatches }))
}
