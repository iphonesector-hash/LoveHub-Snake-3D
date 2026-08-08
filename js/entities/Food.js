/**
 * Food / collectible orbs
 */

import * as THREE from 'three';

const FOOD_TYPES = [
  { color: 0xff2d55, emissive: 0xff2d55, value: 1, growAmount: 1, radius: 0.35 },
  { color: 0x00d4ff, emissive: 0x00d4ff, value: 2, growAmount: 1, radius: 0.38 },
  { color: 0xffd60a, emissive: 0xffd60a, value: 3, growAmount: 2, radius: 0.42 },
];

export class Food {
  constructor(scene, position, typeIndex = 0) {
    this.scene = scene;
    this.type = FOOD_TYPES[typeIndex % FOOD_TYPES.length];
    this.value = this.type.value;
    this.growAmount = this.type.growAmount;
    this.alive = true;
    this.phase = Math.random() * Math.PI * 2;

    const geo = new THREE.SphereGeometry(this.type.radius, 16, 16);
    const mat = new THREE.MeshStandardMaterial({
      color: this.type.color,
      emissive: this.type.emissive,
      emissiveIntensity: 0.55,
      roughness: 0.25,
      metalness: 0.35,
    });
    this.mesh = new THREE.Mesh(geo, mat);
    this.mesh.position.copy(position);
    this.mesh.position.y = this.type.radius;
    this.mesh.castShadow = true;
    scene.add(this.mesh);

    const light = new THREE.PointLight(this.type.color, 0.6, 4);
    light.position.copy(this.mesh.position);
    this.light = light;
    scene.add(light);
  }

  getPosition() {
    return this.mesh.position;
  }

  update(dt, time) {
    if (!this.alive) return;
    const bob = Math.sin(time * 3 + this.phase) * 0.12;
    this.mesh.position.y = this.type.radius + bob;
    this.mesh.rotation.y += dt * 1.5;
    this.light.position.copy(this.mesh.position);
  }

  collect() {
    this.alive = false;
    this.dispose();
  }

  dispose() {
    this.scene.remove(this.mesh);
    this.scene.remove(this.light);
    this.mesh.geometry.dispose();
    this.mesh.material.dispose();
  }
}

export function spawnFood(scene, bounds, existing = []) {
  let pos;
  let attempts = 0;
  do {
    pos = new THREE.Vector3(
      (Math.random() - 0.5) * bounds * 2,
      0,
      (Math.random() - 0.5) * bounds * 2
    );
    attempts++;
  } while (
    attempts < 30 &&
    existing.some((f) => f.alive && f.getPosition().distanceTo(pos) < 2)
  );
  const type = Math.random() < 0.15 ? 2 : Math.random() < 0.4 ? 1 : 0;
  return new Food(scene, pos, type);
}
