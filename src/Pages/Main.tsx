import React, { useEffect } from "react"
import * as THREE from "three"
import {
  geomWithRandomPosition,
  setMaterialsOnGLTF,
  sleep,
  toggleCanvasOpacity,
} from "../Lib/FuncLib"
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader.js"

const intervals = [3500]
const camera = new THREE.PerspectiveCamera(
  75,
  window.innerWidth / window.innerHeight,
  0.1,
  1000
)
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
const ambientLight = new THREE.AmbientLight(0xffffff)

const webGL_renderer_parameters: THREE.WebGLRendererParameters = {
  canvas: document.querySelector("#bg"),
}

const Main = () => {
  const scene = new THREE.Scene()
  const renderer = new THREE.WebGLRenderer(webGL_renderer_parameters)
  const gltfLoader = new GLTFLoader()

  function animate() {
    requestAnimationFrame(animate)
    const time = Date.now() * 0.00015

    camera.position.x = Math.cos(time) * 40
    camera.position.z = Math.sin(time) * 50
    camera.position.y = Math.sin(time / 1.4) * 10

    camera.lookAt(target)

    camera.updateMatrixWorld()

    renderer.render(scene, camera)
  }

  const initialize = async () => {
    renderer.setPixelRatio(window.devicePixelRatio)
    renderer.setSize(window.innerWidth, window.innerHeight)
    let lizardMesh: THREE.Group | null
    gltfLoader.load("/gltf/little_lizard_head.gltf", (gltf) => {
      lizardMesh = gltf.scene
      setMaterialsOnGLTF(lizardMesh, material)
      gltf.scene.scale.set(13, 13, 13)
      scene.add(lizardMesh)
      lizardMesh.position.x = 0
      lizardMesh.position.y = 0
      lizardMesh.position.z = 0
    })
    camera.position.setZ(30)

    scene.add(ambientLight)

    const starMaterial = useLight
      ? new THREE.MeshStandardMaterial({ color: 0xffffff })
      : new THREE.MeshBasicMaterial({
          color: 0xffffff,
          wireframe: true,
        })
    for (let i = 0; i < 200; i++) {
      scene.add(
        geomWithRandomPosition(
          new THREE.Mesh(new THREE.SphereGeometry(0.25, 24, 24), starMaterial),
          10,
          400
        )
      )
    }
    renderer.render(scene, camera)
    animate()
    for (let i = 0; i < intervals.length; i++) {
      toggleCanvasOpacity(!Boolean(i === 0 || i % 2 === 0))
      //start by removing invisible tag
      await sleep(intervals[i])
    }
  }
  useEffect(() => {
    initialize()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return <></>
}

export default Main
