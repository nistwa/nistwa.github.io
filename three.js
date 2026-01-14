const container = document.getElementById("auv3d");

// SAHNE
const scene = new THREE.Scene();

// KAMERA
const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 5000);

// RENDER
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
renderer.setSize(400, 400);
renderer.setPixelRatio(window.devicePixelRatio);
container.appendChild(renderer.domElement);

// IŞIKLAR
scene.add(new THREE.AmbientLight(0xffffff, 1));

const dirLight = new THREE.DirectionalLight(0xffffff, 1.5);
dirLight.position.set(10, 10, 10);
scene.add(dirLight);

// KONTROL
const controls = new THREE.OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.enablePan = false;

// MODEL
let model;

const loader = new THREE.OBJLoader();
loader.load(
  "model.obj",
  obj => {
    // MATERYAL ATA
    obj.traverse(child => {
      if (child.isMesh) {
        child.material = new THREE.MeshStandardMaterial({
          color: 0x7c3aed,
          metalness: 0.5,
          roughness: 0.4
        });
      }
    });

    // BOUNDING BOX
    const box = new THREE.Box3().setFromObject(obj);
    const size = box.getSize(new THREE.Vector3()).length();
    const center = box.getCenter(new THREE.Vector3());

    // ORTALA
    obj.position.sub(center);

    // ÖLÇEKLE
    const scale = 2 / size;
    obj.scale.setScalar(scale);

    // KAMERA AYARI
    camera.position.set(0, 0, 4);
    camera.lookAt(0, 0, 0);

    model = obj;
    scene.add(model);
  },
  undefined,
  error => {
    console.error("OBJ yüklenemedi:", error);
  }
);

// LOOP
function animate() {
  requestAnimationFrame(animate);

  if (model) model.rotation.y += 0.004;

  controls.update();
  renderer.render(scene, camera);
}

animate();
