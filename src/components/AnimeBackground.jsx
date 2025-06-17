// src/components/AnimeBackground.jsx
import { useRef, useEffect } from "react";
import * as THREE from "three";

const AnimeBackground = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    if (!mountRef.current) return;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;

    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    mountRef.current.appendChild(renderer.domElement);

    // Load sakura petal texture
    const textureLoader = new THREE.TextureLoader();
    const petalTexture = textureLoader.load("/sakura.png");

    const petalCount = 200;
    const positions = new Float32Array(petalCount * 3);
    const velocities = new Float32Array(petalCount * 3);
    const rotations = new Float32Array(petalCount);
    const swaySpeeds = new Float32Array(petalCount);

    for (let i = 0; i < petalCount; i++) {
      const i3 = i * 3;
      positions[i3 + 0] = (Math.random() - 0.5) * 10;
      positions[i3 + 1] = Math.random() * 5;
      positions[i3 + 2] = (Math.random() - 0.5) * 10;

      // Slower falling speed
      velocities[i3 + 0] = 0;
      velocities[i3 + 1] = -0.005 - Math.random() * 0.005; // Reduced from -0.01
      velocities[i3 + 2] = 0;

      // Add rotation and sway
      rotations[i] = Math.random() * Math.PI * 2;
      swaySpeeds[i] = 0.2 + Math.random() * 0.3;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

    const material = new THREE.PointsMaterial({
      size: 0.3,
      map: petalTexture,
      transparent: true,
      alphaTest: 0.5,
      depthWrite: false,
    });

    const petals = new THREE.Points(geometry, material);
    scene.add(petals);

    let time = 0;
    const animate = () => {
      requestAnimationFrame(animate);
      time += 0.01;
      const pos = petals.geometry.attributes.position.array;

      for (let i = 0; i < petalCount; i++) {
        const i3 = i * 3;
        
        // Add gentle swaying motion
        pos[i3 + 0] += Math.sin(time * swaySpeeds[i]) * 0.01;
        pos[i3 + 2] += Math.cos(time * swaySpeeds[i]) * 0.01;
        
        // Slower falling
        pos[i3 + 1] += velocities[i3 + 1];

        // Reset when it falls below
        if (pos[i3 + 1] < -2) {
          pos[i3 + 1] = 5;
          pos[i3 + 0] = (Math.random() - 0.5) * 10;
          pos[i3 + 2] = (Math.random() - 0.5) * 10;
          // Reset sway speed for variety
          swaySpeeds[i] = 0.2 + Math.random() * 0.3;
        }
      }

      petals.geometry.attributes.position.needsUpdate = true;
      renderer.render(scene, camera);
    };
    animate();

    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    return () => {
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener("resize", handleResize);
      renderer.dispose();
    };
  }, []);

  return (
    <div
      ref={mountRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100vw",
        height: "100vh",
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
    />
  );
};

export default AnimeBackground;
