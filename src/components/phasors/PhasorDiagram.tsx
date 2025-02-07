import { useEffect, useRef, useState } from "react";
import p5 from "p5";
import { Button } from "@/components/ui/button";
import Container from "@/components/Container";
import MenuConfig from "@/components/phasors/MenuConfig";
import PhasorTable from "@/components/phasors/PhasorTable";
import { Phasor } from "@/lib/phasor";

const PhasorDiagram = () => {
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(500);
  const [height, setHeight] = useState(500);
  const [phasors, setPhasors] = useState([
    Phasor.fromDegrees(100, 0, "V"),
    Phasor.fromDegrees(90.34, -90, "QT"),
    Phasor.fromDegrees(74.01, -90, "Qc"),
    Phasor.fromDegrees(74, 124.13, "Va"),
    Phasor.fromDegrees(49.8, 46.87, "S"),
  ]);

  useEffect(() => {
    const sketch = (p: p5) => {
      p.setup = () => {
        p.createCanvas(width, height).parent(canvasRef.current!);
      };

      p.draw = () => {
        p.background(255);
        p.translate(p.width / 2, p.height / 2);

        const scaleFactor = 2;

        p.stroke(150);
        p.line(-p.width / 2, 0, p.width / 2, 0);
        p.line(0, -p.height / 2, 0, p.height / 2);

        for (const phasor of phasors) {
          const x = phasor.magnitude * p.cos(phasor.angle) * scaleFactor;
          const y = phasor.magnitude * p.sin(phasor.angle) * scaleFactor;

          p.stroke(0, 0, 255);
          p.strokeWeight(2);
          p.line(0, 0, x, -y);

          p.fill(0);
          p.textSize(14);
          p.textAlign(p.CENTER, p.CENTER);
          p.text(phasor.label, x * 1.1, -y * 1.1);
        }
      };
    };

    const myP5 = new p5(sketch);

    return () => {
      myP5.remove();
    };
  }, [width, height, phasors]);

  const downloadDiagram = () => {
    const canvas = document.querySelector("canvas");
    if (canvas) {
      const link = document.createElement("a");
      link.download = "phasor_diagram.png";
      link.href = canvas.toDataURL("image/png");
      link.click();
    }
  };

  return (
    <div>
      <div ref={canvasRef}></div>

      <Container className="my-4 flex-row space-x-4">
        <MenuConfig
          width={width}
          setWidth={setWidth}
          height={height}
          setHeight={setHeight}
        />
        <Button onClick={downloadDiagram}>Download as PNG</Button>
      </Container>
      <PhasorTable phasors={phasors} setPhasors={setPhasors} />
    </div>
  );
};

export default PhasorDiagram;
