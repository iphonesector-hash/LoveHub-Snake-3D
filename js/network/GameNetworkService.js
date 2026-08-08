/**
 * GameNetworkService — offline stub for future multiplayer.
 * Engine must NEVER depend on a live network implementation.
 */

export class GameNetworkService {
  constructor() {
    this.connected = false;
    this.roomId = null;
    this.players = new Map();
  }

  async connect() {
    // Phase 11+: real WebSocket / Supabase Realtime
    this.connected = false;
    return { ok: false, reason: 'offline-single-player' };
  }

  async disconnect() {
    this.connected = false;
    this.roomId = null;
    this.players.clear();
  }

  async createRoom(_options = {}) {
    return { ok: false, reason: 'multiplayer-not-enabled' };
  }

  async joinRoom(_roomId) {
    return { ok: false, reason: 'multiplayer-not-enabled' };
  }

  sendState(_state) {
    // no-op in single-player
  }

  onRemoteState(_cb) {
    // no-op
  }

  isMultiplayer() {
    return false;
  }
}
