import React from "react"
import * as THREE from "three"

const scene = new THREE.Scene()

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
camera.position.setZ(30)
renderer.render(scene, camera)

const geometry = new THREE.IcosahedronGeometry(10, 1)
const material = new THREE.MeshBasicMaterial({
  color: 0xff6347,
  wireframe: true,
}) //no light required
const icosahedron = new THREE.Mesh(geometry, material)

scene.add(icosahedron)

function animate() {
  requestAnimationFrame(animate)

  icosahedron.rotation.x += 0.01
  icosahedron.rotation.y += 0.005
  icosahedron.rotation.z += 0.01

  renderer.render(scene, camera)
}

animate()

const Main = () => {
  return <></>
}

export default Main
