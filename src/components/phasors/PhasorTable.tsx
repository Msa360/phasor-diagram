import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Phasor } from "@/lib/phasor";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

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
  const [phasorEntry, setPhasorEntry] = useState<PhasorEntryData>({
    label: "",
    magnitude: 0,
    angleDegree: 0,
  });

  const addPhasor = () => {
    if (phasorEntry) {
      const newPhasor = Phasor.fromDegrees(
        phasorEntry.magnitude,
        phasorEntry.angleDegree,
        phasorEntry.label,
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
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Label</TableHead>
          <TableHead>Magnitude</TableHead>
          <TableHead>Angle</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {phasors.map((phasor, index) => (
          <TableRow key={index}>
            <TableCell>{phasor.label}</TableCell>
            <TableCell>{phasor.magnitude}</TableCell>
            <TableCell>{phasor.angle}</TableCell>
            <TableCell>
              <Button onClick={() => deletePhasor(index)}>Delete</Button>
            </TableCell>
          </TableRow>
        ))}
        <TableRow>
          <TableCell>
            <Input
              value={phasorEntry.label}
              onChange={(e) =>
                setPhasorEntry({ ...phasorEntry, label: e.target.value })
              }
              placeholder="Label"
            />
          </TableCell>
          <TableCell>
            <Input
              value={phasorEntry.magnitude}
              onChange={(e) =>
                setPhasorEntry({
                  ...phasorEntry,
                  magnitude: Number(e.target.value),
                })
              }
              placeholder="Magnitude"
              type="number"
            />
          </TableCell>
          <TableCell>
            <Input
              value={phasorEntry.angleDegree}
              onChange={(e) =>
                setPhasorEntry({
                  ...phasorEntry,
                  angleDegree: Number(e.target.value),
                })
              }
              placeholder="Angle"
              type="number"
            />
          </TableCell>
          <TableCell>
            <Button onClick={addPhasor}>Add</Button>
          </TableCell>
        </TableRow>
      </TableBody>
    </Table>
  );
}

export default PhasorTable;
