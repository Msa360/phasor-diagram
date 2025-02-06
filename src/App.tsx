import "./App.css";
import Container from "./components/Container";
import PhasorDiagram from "./components/phasors/PhasorDiagram";
import Title from "@/components/Title";

function App() {
  return (
    <>
      <Container className="flex-col">
        <Title />
        <PhasorDiagram />
      </Container>
    </>
  );
}

export default App;
