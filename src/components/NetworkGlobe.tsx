
import React, { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';

interface LocationPoint {
  name: string;
  latitude: number;
  longitude: number;
}

const NetworkGlobe = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);
  
  // Major cities around the world
  const locations: LocationPoint[] = [
    { name: 'New York', latitude: 40.7128, longitude: -74.0060 },
    { name: 'London', latitude: 51.5074, longitude: -0.1278 },
    { name: 'Tokyo', latitude: 35.6762, longitude: 139.6503 },
    { name: 'Sydney', latitude: -33.8688, longitude: 151.2093 },
    { name: 'Dhaka', latitude: 23.8103, longitude: 90.4125 },
    { name: 'Berlin', latitude: 52.5200, longitude: 13.4050 },
    { name: 'San Francisco', latitude: 37.7749, longitude: -122.4194 },
    { name: 'Cairo', latitude: 30.0444, longitude: 31.2357 },
    { name: 'Singapore', latitude: 1.3521, longitude: 103.8198 },
    { name: 'Rio de Janeiro', latitude: -22.9068, longitude: -43.1729 }
  ];

  useEffect(() => {
    // Intersection Observer to load the globe only when it's in view
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (containerRef.current) {
      observer.observe(containerRef.current);
    }

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!isVisible || !containerRef.current) return;

    // Scene setup
    const scene = new THREE.Scene();
    
    // Add slight ambient fog for depth
    scene.fog = new THREE.FogExp2(0x000000, 0.00025);
    
    // Camera setup
    const camera = new THREE.PerspectiveCamera(
      60, 
      containerRef.current.clientWidth / containerRef.current.clientHeight, 
      0.1, 
      1000
    );
    camera.position.z = 220;
    
    // Renderer setup
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    containerRef.current.appendChild(renderer.domElement);
    
    // Globe geometry
    const globeRadius = 100;
    const globeGeometry = new THREE.SphereGeometry(globeRadius, 64, 64);
    const globeMaterial = new THREE.MeshBasicMaterial({
      color: 0x222222,
      wireframe: true,
      transparent: true,
      opacity: 0.15
    });
    const globe = new THREE.Mesh(globeGeometry, globeMaterial);
    scene.add(globe);
    
    // Add connection lines and points
    const networkGroup = new THREE.Group();
    scene.add(networkGroup);
    
    // Point material
    const pointMaterial = new THREE.MeshBasicMaterial({
      color: 0x00ff00,
      transparent: true,
      opacity: 0.8
    });
    
    const points: THREE.Mesh[] = [];
    
    // Create points for each location
    locations.forEach((location) => {
      const point = createPointAtLocation(location, globeRadius, pointMaterial);
      points.push(point);
      networkGroup.add(point);
    });
    
    // Connect points with lines
    for (let i = 0; i < points.length; i++) {
      for (let j = i + 1; j < points.length; j++) {
        if (Math.random() > 0.7) continue; // Skip some connections for cleaner look
        
        const lineMaterial = new THREE.LineBasicMaterial({
          color: 0x00ff00,
          transparent: true,
          opacity: 0.2
        });
        
        const lineGeometry = new THREE.BufferGeometry().setFromPoints([
          points[i].position,
          points[j].position
        ]);
        
        const line = new THREE.Line(lineGeometry, lineMaterial);
        networkGroup.add(line);
      }
    }
    
    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };
    
    window.addEventListener('resize', handleResize);
    
    // Animation
    const animate = () => {
      requestAnimationFrame(animate);
      
      // Rotate globe slowly
      globe.rotation.y += 0.001;
      networkGroup.rotation.y += 0.001;
      
      // Pulse effect for points
      const time = Date.now() * 0.001;
      points.forEach((point, index) => {
        // Different phase for each point
        const phase = index * 0.2;
        point.scale.setScalar(1 + 0.1 * Math.sin(time + phase));
        
        // Slight color variation
        const hue = (0.3 + 0.1 * Math.sin(time + phase)) % 1;
        (point.material as THREE.MeshBasicMaterial).color.setHSL(hue, 1, 0.5);
      });
      
      renderer.render(scene, camera);
    };
    
    animate();
    
    // Cleanup
    return () => {
      if (containerRef.current && containerRef.current.contains(renderer.domElement)) {
        containerRef.current.removeChild(renderer.domElement);
      }
      window.removeEventListener('resize', handleResize);
    };
  }, [isVisible]);
  
  return <div ref={containerRef} className="w-full h-64 md:h-80" />;
};

// Helper function to convert lat/long to 3D coordinates
function createPointAtLocation(location: LocationPoint, radius: number, material: THREE.Material): THREE.Mesh {
  const phi = (90 - location.latitude) * (Math.PI / 180);
  const theta = (location.longitude + 180) * (Math.PI / 180);
  
  const x = -radius * Math.sin(phi) * Math.cos(theta);
  const y = radius * Math.cos(phi);
  const z = radius * Math.sin(phi) * Math.sin(theta);
  
  const pointGeometry = new THREE.SphereGeometry(1.5, 16, 16);
  const point = new THREE.Mesh(pointGeometry, material.clone());
  
  point.position.set(x, y, z);
  
  return point;
}

export default NetworkGlobe;
