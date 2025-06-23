import * as THREE from 'three';
import { MindARThree } from 'mindar-image-three';

import { createCube } from './shapes/cube.js';
import { createSphere } from './shapes/sphere.js';
import { createPrism } from './shapes/prism.js';
import { createRhombus } from './shapes/rhombus.js';

const shapeNames = ["Куб🟥", "Призма🔻", "Ромб♦️", "Сфера🔴"];
const shapeCreators = [createCube, createPrism, createRhombus, createSphere];
const markerSizesCM = [10, 15, 20, 25]; 

const activeShapes = {};      
const activeOrder = [];     

const status = document.getElementById("status");

function updateInfo() {
  const ratioEl = document.getElementById("ratio");
  const areaEl = document.getElementById("area");
  const volumeEl = document.getElementById("volume");

  const activeList = Object.keys(activeShapes);
  const shapeEntries = Object.values(activeShapes);

  // 🟢 Показати всі знайдені фігури
  if (activeList.length > 0) {
    status.textContent = `✅ Знайдено: ${activeList.join(', ')}`;
    status.style.color = "lime";
  } else {
    status.textContent = "🕵️‍♂️ Шукаю маркер...";
    status.style.color = "yellow";
  }

  // 🔢 Розрахунок коефіцієнтів
  if (shapeEntries.length >= 2) {
    const [a, b] = shapeEntries.slice(-2);
    const ratio = a.size / b.size;
    const areaRatio = a.metrics.area / b.metrics.area;
    const volumeRatio = a.metrics.volume / b.metrics.volume;

    ratioEl.textContent = `${ratio.toFixed(2)} (${a.name} / ${b.name})`;
    areaEl.textContent = `${areaRatio.toFixed(2)} (${a.name} / ${b.name})`;
    volumeEl.textContent = `${volumeRatio.toFixed(2)} (${a.name} / ${b.name})`;
  } else {
    ratioEl.textContent = "-";
    areaEl.textContent = "-";
    volumeEl.textContent = "-";
  }
}

export async function initAR() {
  const mindar = new MindARThree({
    container: document.body,
    imageTargetSrc: './src/markers/targets.mind',
    maxTrack: 4 
  });

  const { renderer, scene, camera } = mindar;
  scene.add(new THREE.HemisphereLight(0xffffff, 0x444444, 1.5));

  shapeCreators.forEach((createShape, index) => {
    const anchor = mindar.addAnchor(index);
    const shapeName = shapeNames[index];
    const sizeInMeters = markerSizesCM[index] / 100;

    anchor.onTargetFound = () => {
      console.log('FOUND', shapeName);

      status.textContent = `✅ Маркер знайдено: ${shapeName}`;
      status.style.color = "lime";

      if (!activeShapes[shapeName]) {
        const { mesh, metrics } = createShape(sizeInMeters);
        console.log(shapeName, 'metrics:', metrics);

        anchor.group.add(mesh);

        activeShapes[shapeName] = {
          name: shapeName,
          size: sizeInMeters,
          metrics,
          mesh,
          anchorGroup: anchor.group,
        };

        activeOrder.push(shapeName);
        updateInfo();
      }
    };

    anchor.onTargetLost = () => {
      console.log('LOST', shapeName);

      status.textContent = "🕵️‍♂️ Шукаю маркер...";
      status.style.color = "yellow";

      if (activeShapes[shapeName]) {
        anchor.group.clear();
        delete activeShapes[shapeName];

        const index = activeOrder.indexOf(shapeName);
        if (index !== -1) activeOrder.splice(index, 1);

        updateInfo();
      }
    };
  });

  await mindar.start();
  renderer.setAnimationLoop(() => renderer.render(scene, camera));
}

initAR();