import * as THREE from 'three';

export function createCube(size) {
  const geometry = new THREE.BoxGeometry(size, size, size);
  const material = new THREE.MeshStandardMaterial({ color: 0x23C159 });
  const mesh = new THREE.Mesh(geometry, material);

  return {
    mesh,
    metrics: {
      area: 6 * size * size,
      volume: size ** 3,
    },
  };
}