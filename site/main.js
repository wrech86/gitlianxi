import './style.css'
import * as THREE from 'three'


const pc = document.getElementById('pc')
const nav = document.getElementById('nav')
let width = window.innerWidth
let height = window.innerHeight-nav.clientHeight


const scene = new THREE.Scene()
const camera = new THREE.PerspectiveCamera(45,width/height,0.1,1000)
camera.position.set(0,0,10)
const renderer = new THREE.WebGLRenderer({canvas:pc,antialias:true})
renderer.setPixelRatio(Math.min(window.devicePixelRatio||2));
renderer.setSize(width,height)
renderer.render(scene,camera)

let map = new THREE.TextureLoader().load('/img/herobg.png')
// map.wrapS = THREE.RepeatWrapping
// map.wrapT = THREE.RepeatWrapping
// map.minFilter = THREE.NearestFilter
// map.magFilter = THREE.NearestFilter
// map.anisotropy = renderer.capabilities.getMaxAnisotropy() 

let planeW = 20
let planeH = (planeW*height)/width
let planeG = new THREE.PlaneGeometry(planeW,planeH)
let planeM = new THREE.MeshBasicMaterial({map:map})
let plane = new THREE.Mesh(planeG,planeM)
scene.add(plane)
// let mesh = new THREE.Mesh(new THREE.BoxGeometry(1,1,1),new THREE.MeshBasicMaterial({color:0x999999}))
// scene.add(mesh)
// mesh.position.set(0,0,0)

function time(){
  requestAnimationFrame(time)
  renderer.render(scene,camera)
}
time()
window.addEventListener('resize',()=>{
  width = window.innerWidth
  height = window.innerHeight-nav.clientHeight
  camera.aspect = width/height
  //必须更新投影矩阵不然就会扭曲
  camera.updateProjectionMatrix()
  renderer.setSize(width,height)
})