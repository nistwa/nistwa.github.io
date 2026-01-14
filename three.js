const container = document.getElementById("auv3d");

// SAHNE
const scene = new THREE.Scene();

// KAMERA
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
camera.position.set(0, 1.5, 3);

// RENDER
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(400, 400);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// IŞIKLAR
scene.add(new THREE.AmbientLight(0xffffff, 0.8));

const dirLight = new THREE.DirectionalLight(0x7c3aed, 1.3);
dirLight.position.set(5, 5, 5);
scene.add(dirLight);

// KONTROL
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;

// MODEL
let model;

const objLoader = new THREE.OBJLoader();
objLoader.load("model.obj", obj => {

  // RENK & MATERYAL ATA
  obj.traverse(child => {
    if (child.isMesh) {
      child.material = new THREE.MeshStandardMaterial({
        color: 0x7c3aed,       // mor neon ton
        metalness: 0.6,
        roughness: 0.3
      });
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });

  model = obj;
  model.scale.set(0.8, 0.8, 0.8);
  scene.add(model);
});

// ANİMASYON
function animate() {
  requestAnimationFrame(animate);

  if (model) model.rotation.y += 0.003;

  controls.update();
  renderer.render(scene, camera);
}

animate();
