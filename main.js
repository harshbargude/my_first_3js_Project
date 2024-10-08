import * as THREE from "three";
import gsap from "gsap";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";
import "./style.css";
//Scene
const scene = new THREE.Scene();

//Create a sphere
const geometry = new THREE.SphereGeometry(3, 64, 64);
const material = new THREE.MeshStandardMaterial({
    color: 0x00ff00,
    roughness: 0.5,
});
const sphere = new THREE.Mesh(geometry, material);
scene.add(sphere);

//Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight,
};

//Lights
const light = new THREE.PointLight(0xffffff, 400, 100);
light.position.set(0, 10, 10);
scene.add(light);
light.intensity = 500.25;

//Camera
const camera = new THREE.PerspectiveCamera(
    45,
    sizes.width / sizes.height,
    0.1,
    100
);
scene.add(camera);
camera.position.z = 20;

//Renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
renderer.setPixelRatio(2);

//controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.enablePan = false;
controls.enableZoom = false;
controls.autoRotate = true;
controls.autoRotateSpeed = 5;

window.addEventListener("resize", () => {
    //Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;
    //update camera
    camera.updateProjectionMatrix();
    camera.aspect = sizes.width / sizes.height;
    renderer.setSize(sizes.width, sizes.height);
});

const loop = () => {
    controls.update();
    renderer.render(scene, camera);
    window.requestAnimationFrame(loop);
};
loop();

// const t1  = gsap.timeline({ defaults: {duration: 1} })
const t1 = gsap.timeline({ defaults: { duration: 1 } });
t1.fromTo(sphere.scale, { z: 0, x: 0, y: 0 }, { z: 1, x: 1, y: 1 });
t1.fromTo("nav", { y: "-100%" }, { y: "0%" });
t1.fromTo(".title", { opacity: 0 }, { opacity: 1 });

//Mouse animation color
let mouseDown = false;
let rgb = [];
window.addEventListener("mousedown", () => {
    mouseDown = true;
    // rgb = [Math.floor(Math.random()*256),Math.floor(Math.random()*256),Math.floor(Math.random()*256)]
});
window.addEventListener("mouseup", () => {
    mouseDown = false;
});

window.addEventListener("mousemove", (e) => {
    if (mouseDown) {
        rgb = [
            Math.round((e.pageX / sizes.width) * 255),
            Math.round((e.pageY / sizes.height) * 255),
            150,
        ];
        let newColor = new THREE.Color(`rgb(${rgb.join(",")})`);
        // new THREE.Color(`rgb(2,200,100)`)
        gsap.to(sphere.material.color, newColor);
    }
});
