import * as THREE from "three"

export const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms))
export const clamp = (input: number, min: number, max: number) =>
  input > max ? max : input < min ? min : input
export const abs_clamp = (input: number, min: number, max: number) => {
  if (input > 0) {
    return input > max ? max : input < min ? min : input
  } else {
    return input < -max ? -max : input > -min ? -min : input
  }
}
export function setMaterialsOnGLTF(
  object3D: any,
  material: THREE.MeshStandardMaterial | THREE.MeshBasicMaterial
) {
  if (object3D.material) {
    //const newMaterial = new THREE.MeshPhongMaterial( { map: object3D.material.map } );
    object3D.material = material
  }
  if (!object3D.children) {
    return
  }
  for (let i = 0; i < object3D.children.length; i++) {
    setMaterialsOnGLTF(object3D.children[i], material)
  }
}
export const toggleCanvasOpacity = (visible: boolean) => {
  visible
    ? document.querySelector("#bg")?.classList.add("invisible")
    : document.querySelector("#bg")?.classList.remove("invisible")
}
export const geomWithRandomPosition = (
  geom: THREE.Mesh,
  min: number,
  max: number
) => {
  const [x, y, z] = Array(3)
    .fill(undefined)
    .map(() => abs_clamp(THREE.MathUtils.randFloatSpread(max), min, max))
  geom.position.set(x, y, z)
  return geom
}
export const randomHexColor = () => {
  return Math.floor(Math.random() * 16777215)
}
export const formatHexColor = (hexColor: number) => {
  return "#" + hexColor.toString(16)
}
export const adjustBrightness = (
  hexColor: number,
  percentage: number
): number => {
  let color = formatHexColor(hexColor)
  let output =
    "#" +
    color
      .replace(/^#/, "")
      .replace(/../g, (color) =>
        (
          "0" +
          Math.min(255, Math.max(0, parseInt(color, 16) + percentage)).toString(
            16
          )
        ).substr(-2)
      )
  return parseInt(output.slice(1), 16)
}
