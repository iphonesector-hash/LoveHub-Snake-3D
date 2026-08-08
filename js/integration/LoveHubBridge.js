/**
 * LoveHubBridge — abstraction over existing LoveHub services.
 * Works standalone when LoveHub is unavailable.
 */

export class LoveHubBridge {
  constructor() {
    this._available = false;
    this._checkAvailability();
  }

  _checkAvailability() {
    this._available = !!(