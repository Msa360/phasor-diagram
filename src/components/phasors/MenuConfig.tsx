import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface MenuConfigProps {
  width: number;
  setWidth: (width: number) => void;
  height: number;
  setHeight: (height: number) => void;
}

function MenuConfig({ width, setWidth, height, setHeight }: MenuConfigProps) {
  return (
    <>
      <div className="inline-flex items-center justify-center space-x-2 rounded-md border-2 border-foreground p-2">
        <Label htmlFor="widthEntry">width:</Label>
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
    </>
  );
}

export default MenuConfig;
