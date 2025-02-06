import { useEffect, useRef, useState } from "react";
import p5 from "p5";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const PhasorDiagram = () => {
  const canvasRef = useRef<HTMLDivElement | null>(null);
  const [width, setWidth] = useState(500);
  const [height, setHeight] = useState(500);

  useEffect(() => {
    const sketch = (p: p5) => {
      p.setup = () => {
        p.createCanvas(width, height).parent(canvasRef.current!);
      };

      p.draw = () => {
        p.background(255);
        p.translate(p.width / 2, p.height / 2);

        const phasors = [
          { magnitude: 111.34, angle: -90, label: "QT" },
          { magnitude: 123.01, angle: -90, label: "Qc" },
          { magnitude: 144, angle: -53.13, label: "Qch" },
          { magnitude: 4.8, angle: 46.87, label: "S" },
        ];

        const scaleFactor = 2;

        p.stroke(150);
        p.line(-p.width / 2, 0, p.width / 2, 0);
        p.line(0, -p.height / 2, 0, p.height / 2);

        for (const phasor of phasors) {
          const angleRad = p.radians(phasor.angle);
          const x = phasor.magnitude * p.cos(angleRad) * scaleFactor;
          const y = phasor.magnitude * p.sin(angleRad) * scaleFactor;

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
  }, [width, height]);

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

      <div className="inline-flex items-center justify-center space-x-2 rounded-sm border p-2">
        <Label htmlFor="widthEntry" className="">
          width:
        </Label>
        <Input
          className="w-20 p-1"
          id="width"
          type="number"
          value={width}
          onChange={(e) => setWidth(Number(e.target.value))}
        />
        <Label htmlFor="heightEntry">height:</Label>
        <Input
          className="w-20 p-1"
          id="heightEntry"
          type="number"
          value={height}
          onChange={(e) => setHeight(Number(e.target.value))}
        />
      </div>
      <Button onClick={downloadDiagram}>Download PNG</Button>
    </div>
  );
};

export default PhasorDiagram;
