import React, { useState, useEffect } from 'react';
import { UncontrolledReactSVGPanZoom } from 'react-svg-pan-zoom';
import './SierpinskiTriangle.css';

const SierpinskiTriangle = ({ depth, color }) => {
  const [triangles, setTriangles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [animationProgress, setAnimationProgress] = useState(0);

  useEffect(() => {
    setLoading(true);

    const generateTriangles = () => {
      const points = [[250, 30], [40, 450], [460, 450]];
      const newTriangles = [];
      const queue = [{ depth, points }];

      while (queue.length > 0) {
        const { depth, points } = queue.shift();

        if (depth === 0) continue;

        const [p1, p2, p3] = points;
        const [x1, y1] = p1;
        const [x2, y2] = p2;
        const [x3, y3] = p3;

        const x12 = (x1 + x2) / 2;
        const y12 = (y1 + y2) / 2;
        const x23 = (x2 + x3) / 2;
        const y23 = (y2 + y3) / 2;
        const x31 = (x3 + x1) / 2;
        const y31 = (y3 + y1) / 2;

        const newTriangle = (
          <polygon
            key={`triangle-${depth}-${x12}-${y12}-${x23}-${y23}-${x31}-${y31}`}
            points={`${x12},${y12} ${x23},${y23} ${x31},${y31}`}
            fill={color}
            style={{ opacity: 0 }} // Initialize triangles with opacity 0
          />
        );

        newTriangles.push(newTriangle);

        queue.push(
          { depth: depth - 1, points: [p1, [x12, y12], [x31, y31]] },
          { depth: depth - 1, points: [[x12, y12], p2, [x23, y23]] },
          { depth: depth - 1, points: [[x31, y31], [x23, y23], p3] }
        );
      }

      setTriangles(newTriangles);
    };

    const animateTriangles = () => {
      const animationDuration = 1000; // 1000ms (1 second) animation duration
      const startTimestamp = performance.now();

      const animateStep = (timestamp) => {
        const progress = timestamp - startTimestamp;
        const progressRatio = Math.min(progress / animationDuration, 1);

        setAnimationProgress(progressRatio);

        if (progressRatio < 1) {
          requestAnimationFrame(animateStep);
        } else {
          setAnimationProgress(1); // Ensure animation completes with final progress
          setLoading(false); // Hide loading indicator when animation is complete
        }
      };

      requestAnimationFrame(animateStep);
    };

    setTriangles([]);
    generateTriangles();
    animateTriangles();
  }, [depth, color]);

  const handleSVGOnLoad = () => {
    setLoading(false);
  };

  return (
    <>
      {loading  &&
        <div className="loading">Loading...</div>}
       <UncontrolledReactSVGPanZoom
        width={500}
        height={500}
        detectAutoPan={false}
       >
        <svg width="500" height="500" onLoad={handleSVGOnLoad}>
          {triangles.map((triangle, index) => {
            const opacity = index < triangles.length * animationProgress ? 1 : 0;
            return React.cloneElement(triangle, { style: { opacity } });
          })}
        </svg>
        </UncontrolledReactSVGPanZoom>

      
    </>
  );
};

export default SierpinskiTriangle;
