import * as THREE from 'three';

export function createSphere(size) {
  const radius = size / 2;
  const geometry = new THREE.SphereGeometry(radius, 32, 32);
  const material = new THREE.MeshStandardMaterial({ color: 0x44ccff });
  const mesh = new THREE.Mesh(geometry, material);

  return {
    mesh,
    metrics: {
      area: 4 * Math.PI * radius ** 2,
      volume: (4 / 3) * Math.PI * radius ** 3,
    },
  };
}