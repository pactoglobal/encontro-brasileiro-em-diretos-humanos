import { Navbar } from "./components/Navbar";
import { Hero } from "./components/Hero";
import { About } from "./components/About";
import { Agenda } from "./components/Agenda";
import { Speakers } from "./components/Speakers";
import { Venue } from "./components/Venue";
import { Organizers } from "./components/Organizers";
import { Contact } from "./components/Contact";
import { Footer } from "./components/Footer";
import { CustomCursor } from "./components/CustomCursor";

function App() {
  return (
    <>
      <CustomCursor />
      <Navbar />
      <main>
        <Hero />
        <About />
        <Agenda />
        <Speakers />
        <Venue />
        <Organizers />
        <Contact />
      </main>
      <Footer />
    </>
  );
}

export default App;
