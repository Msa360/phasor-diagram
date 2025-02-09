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
  magnitude: string;
  angleDegree: string;
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
    magnitude: "",
    angleDegree: "",
  });

  const addPhasor = () => {
    if (phasorEntry) {
      const newPhasor = Phasor.fromDegrees(
        Number(phasorEntry.magnitude),
        Number(phasorEntry.angleDegree),
        phasorEntry.label,
      );
      setPhasors([...phasors, newPhasor]);
      setPhasorEntry({
        label: "",
        magnitude: "",
        angleDegree: "",
      });
    }
  };

  const deletePhasor = (index: number) => {
    setPhasors(phasors.filter((_, i) => i !== index));
  };

  return (
    <Table className="mx-auto sm:max-w-xl">
      <TableHeader>
        <TableRow>
          <TableHead>Label</TableHead>
          <TableHead>Magnitude</TableHead>
          <TableHead>Angle (°)</TableHead>
          <TableHead>Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
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
                  magnitude: e.target.value,
                })
              }
              placeholder="Magnitude"
            />
          </TableCell>
          <TableCell>
            <Input
              value={phasorEntry.angleDegree}
              onChange={(e) =>
                setPhasorEntry({
                  ...phasorEntry,
                  angleDegree: e.target.value,
                })
              }
              placeholder="Angle"
            />
          </TableCell>
          <TableCell>
            <Button className="w-20" onClick={addPhasor}>
              Add
            </Button>
          </TableCell>
        </TableRow>
        {phasors.map((phasor, index) => (
          <TableRow key={index}>
            <TableCell>{phasor.label}</TableCell>
            <TableCell>{phasor.magnitude}</TableCell>
            <TableCell>{phasor.angleDegrees.toFixed(3)}</TableCell>
            <TableCell>
              {/* <Button className="w-20" onClick={() => editPhasor(index)}>
                Edit
              </Button> */}
              <Button
                variant="destructive"
                className="w-20"
                onClick={() => deletePhasor(index)}
              >
                Delete
              </Button>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default PhasorTable;
