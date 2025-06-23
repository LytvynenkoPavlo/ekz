import * as THREE from 'three';

export function createPrism(size) {
  const geometry = new THREE.CylinderGeometry(size / 2, size / 2, size, 3);
  const material = new THREE.MeshStandardMaterial({ color: 0x88ff88 });
  const mesh = new THREE.Mesh(geometry, material);

  return {
    mesh,
    metrics: {
      area: size ** 2 + 3 * size * size / 2,
      volume: (Math.sqrt(3) / 4) * size ** 2 * size,
    },
  };
}