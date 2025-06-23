🔧 Технічна документація

🔗 Залежності

mindar-image-three: для AR-розпізнавання маркерів

three: для побудови 3D-фігур

📦 Структура коду

src/shapes/*.js — окремі модулі для генерації кожної фігури:

cube.js, sphere.js, prism.js, rhombus.js


⚙️ Основні функції

getMarkerSizeFromImage() — розрахунок реального розміру маркера у см

createCube(), createSphere() тощо — створення відповідних 3D-об'єктів