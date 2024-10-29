import React, { useEffect, useRef } from 'react';
import styles from './FallingLeaves.module.css';
import folhaImg from '../../assets/folha.png';
import folhaImg2 from '../../assets/folha2.png';

const FallingLeaves = () => {
  const leafContainerRef = useRef(null);

  useEffect(() => {
    const container = leafContainerRef.current;
    const leaves = [];
    const leafImages = [folhaImg, folhaImg2];

    const options = {
      numLeaves: 20,
      wind: {
        magnitude: 1.2,
        maxSpeed: 12,
        duration: 300,
        start: 0,
        speed: 0,
      },
    };

    const width = container.offsetWidth;
    const height = container.offsetHeight;
    let timer = 0;

    // Initialize each leaf's properties
    function createLeaf() {
      const leaf = {
        el: document.createElement('div'),
        x: width * 2 - Math.random() * width * 1.75,
        y: -10,
        z: Math.random() * 200,
        rotation: {
          axis: 'X',
          value: 0,
          speed: Math.random() * 10,
          x: 0,
        },
        xSpeedVariation: Math.random() * 0.8 - 0.4,
        ySpeed: Math.random() + 1.5,
        image: leafImages[Math.floor(Math.random() * leafImages.length)],
      };

      leaf.el.className = styles.leaf; // Use a classe CSS para a folha
      leaf.el.style.backgroundImage = `url(${leaf.image})`;
      container.appendChild(leaf.el);
      resetLeaf(leaf);
      return leaf;
    }

    // Reset leaf position and rotation when it goes out of bounds
    function resetLeaf(leaf) {
      leaf.x = width * 2 - Math.random() * width * 1.75;
      leaf.y = -10;
      leaf.z = Math.random() * 200;
      leaf.rotation.value = Math.random() * 360;
      leaf.xSpeedVariation = Math.random() * 0.8 - 0.4;
      leaf.ySpeed = Math.random() + 1.5;
      leaf.rotation.speed = Math.random() * 10;
      return leaf;
    }

    // Update each leaf's position
    function updateLeaf(leaf) {
      const windSpeed = options.wind.speed(timer - options.wind.start, leaf.y);
      leaf.x -= windSpeed + leaf.xSpeedVariation;
      leaf.y += leaf.ySpeed;
      leaf.rotation.value += leaf.rotation.speed;

      const transform = `
        translateX(${leaf.x}px) 
        translateY(${leaf.y}px) 
        translateZ(${leaf.z}px) 
        rotate${leaf.rotation.axis}(${leaf.rotation.value}deg)
      `;

      leaf.el.style.transform = transform;

      // Reset leaf if out of view
      if (leaf.x < -10 || leaf.y > height + 10) resetLeaf(leaf);
    }

    // Update wind settings periodically
    function updateWind() {
      if (timer === 0 || timer > options.wind.start + options.wind.duration) {
        options.wind.magnitude = Math.random() * options.wind.maxSpeed;
        options.wind.duration = options.wind.magnitude * 50 + (Math.random() * 20 - 10);
        options.wind.start = timer;

        options.wind.speed = (t, y) => {
          const magnitude = options.wind.magnitude / 2;
          return magnitude * Math.sin((2 * Math.PI) / options.wind.duration * t + (3 * Math.PI / 2)) + magnitude;
        };
      }
    }

    // Render loop
    function render() {
      updateWind();
      leaves.forEach(updateLeaf);
      timer += 1;
      requestAnimationFrame(render);
    }

    // Initialize all leaves
    for (let i = 0; i < options.numLeaves; i++) {
      leaves.push(createLeaf());
    }

    render();

    return () => {
      leaves.forEach((leaf) => leaf.el.remove());
    };
  }, []);

  return <div ref={leafContainerRef} className={styles.fallingLeaves}></div>;
};

export default FallingLeaves;
