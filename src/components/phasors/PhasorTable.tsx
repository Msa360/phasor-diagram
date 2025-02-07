import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phasor } from "@/lib/phasor";

interface PhasorEntryData {
  label: string;
  magnitude: number;
  angleDegree: number;
}

function PhasorTable({
  phasors,
  setPhasors,
}: {
  phasors: Phasor[];
  setPhasors: React.Dispatch<React.SetStateAction<Phasor[]>>;
}) {
  const [PhasorEntry, setPhasorEntry] = useState<PhasorEntryData>({
    label: "",
    magnitude: 0,
    angleDegree: 0,
  });

  const addPhasor = () => {
    if (PhasorEntry) {
      const newPhasor = Phasor.fromDegrees(
        PhasorEntry.magnitude,
        PhasorEntry.angleDegree,
        PhasorEntry.label,
      );
      setPhasors([...phasors, newPhasor]);
      setPhasorEntry({
        label: "",
        magnitude: 0,
        angleDegree: 0,
      });
    }
  };

  const deletePhasor = (index: number) => {
    setPhasors(phasors.filter((_, i) => i !== index));
  };

  return (
    <div>
      <table>
        <thead>
          <tr>
            <th>Label</th>
            <th>Magnitude</th>
            <th>Angle</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {phasors.map((phasor, index) => (
            <tr key={index}>
              <td>{phasor.label}</td>
              <td>{phasor.magnitude}</td>
              <td>{phasor.angle}</td>
              <td>
                <Button onClick={() => deletePhasor(index)}>Delete</Button>
              </td>
            </tr>
          ))}
          <tr>
            <td>
              <Input
                value={PhasorEntry.label}
                onChange={(e) =>
                  setPhasorEntry({ ...PhasorEntry, label: e.target.value })
                }
                placeholder="Label"
              />
            </td>
            <td>
              <Input
                value={PhasorEntry.magnitude}
                onChange={(e) =>
                  setPhasorEntry({
                    ...PhasorEntry,
                    magnitude: Number(e.target.value),
                  })
                }
                placeholder="Magnitude"
                type="number"
              />
            </td>
            <td>
              <Input
                value={PhasorEntry.angleDegree}
                onChange={(e) =>
                  setPhasorEntry({
                    ...PhasorEntry,
                    angleDegree: Number(e.target.value),
                  })
                }
                placeholder="Angle"
                type="number"
              />
            </td>
            <td>
              <Button onClick={addPhasor}>Add</Button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default PhasorTable;
