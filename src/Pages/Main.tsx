import React, { useEffect } from "react"
import * as THREE from "three"
import { abs_clamp, setMaterialsOnGLTF, sleep } from "../Lib/FuncLib"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"

const scene = new THREE.Scene()
const target = new THREE.Vector3(0, 0, 0)

const useLight = false
const material = useLight
  ? new THREE.MeshStandardMaterial({
      color: 0xff6347,
    })
  : new THREE.MeshBasicMaterial({
      color: 0xff6347,
      wireframe: true,
    })

const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)

const webGL_renderer_parameters: THREE.WebGLRendererParameters = {
  canvas: document.querySelector("#bg"),
}

const renderer = new THREE.WebGLRenderer(webGL_renderer_parameters)

renderer.setPixelRatio(window.devicePixelRatio)
renderer.setSize(window.innerWidth, window.innerHeight)

let lizardMesh: THREE.Group | null
function loadGLTF() {
  let lizardLoader = new GLTFLoader()
  lizardLoader.load("/gltf/little_lizard_head.gltf", (gltf) => {
    lizardMesh = gltf.scene
    setMaterialsOnGLTF(lizardMesh, material)
    gltf.scene.scale.set(20, 20, 20)
    scene.add(lizardMesh)
    lizardMesh.position.x = 0
    lizardMesh.position.y = 0
    lizardMesh.position.z = 0
  })
}
loadGLTF()
camera.position.setZ(30)

renderer.render(scene, camera)

const pointLight = new THREE.PointLight(0xffffff)
pointLight.position.set(15, 15, 15)
const ambientLight = new THREE.AmbientLight(0xffffff)
scene.add(pointLight, ambientLight)

function addStar() {
  const geometry = new THREE.SphereGeometry(0.25, 24, 24)
  const mat = useLight
    ? new THREE.MeshStandardMaterial({ color: 0xffffff })
    : new THREE.MeshBasicMaterial({
        color: 0xffffff,
        wireframe: true,
      })
  const star = new THREE.Mesh(geometry, mat)
  const [x, y, z] = Array(3)
    .fill(undefined)
    .map(() => abs_clamp(THREE.MathUtils.randFloatSpread(400), 10, 400))
  star.position.set(x, y, z)
  scene.add(star)
}

Array(200).fill(undefined).forEach(addStar)

function animate() {
  requestAnimationFrame(animate)

  lizardMesh!.rotation.x += 0.01
  lizardMesh!.rotation.y += 0.005
  lizardMesh!.rotation.z += 0.01
  const time = Date.now() * 0.00015

  camera.position.x = Math.cos(time) * 40
  camera.position.z = Math.sin(time) * 50
  camera.position.y = Math.sin(time / 1.4) * 10

  camera.lookAt(target)

  camera.updateMatrixWorld()

  renderer.render(scene, camera)
}

const Main = () => {
  const initialize = async () => {
    animate()
    document.querySelector("#bg")?.classList.remove("invisible")
    await sleep(2000)
    document.querySelector("#bg")?.classList.add("invisible")
    await sleep(1000)
    document.querySelector("#bg")?.classList.remove("invisible")
    await sleep(1000)
    document.querySelector("#bg")?.classList.add("invisible")
    await sleep(1000)
    document.querySelector("#bg")?.classList.remove("invisible")
  }
  useEffect(() => {
    initialize()
  }, [])
  useEffect(() => {
    console.log(camera)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [camera])
  return <></>
}

export default Main
