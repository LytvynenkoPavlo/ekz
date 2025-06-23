import * as THREE from 'three';

export function createRhombus(size) {
  const geometry = new THREE.OctahedronGeometry(size / 1.5);
  const material = new THREE.MeshStandardMaterial({ color: 0xee88ff });
  const mesh = new THREE.Mesh(geometry, material);

  const a = size / 1.5;

  return {
    mesh,
    metrics: {
      area: 8 * Math.sqrt(3) * a ** 2 / 4,
      volume: (Math.sqrt(2) / 3) * a ** 3,
    },
  };
}