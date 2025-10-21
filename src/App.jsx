import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home.jsx";
import ArticleDetail from "./pages/ArticleDetail.jsx";
import Feedback from "./pages/Feedback.jsx";
import About from "./pages/About.jsx";
import NotFound from "./pages/NotFound.jsx";
import Header from "./shared/Header.jsx";
import Footer from "./shared/Footer.jsx";

function App() {
  return (
    <>
      <Header />
      <main style={{ paddingTop: "80px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/article/:id" element={<ArticleDetail />} />
          <Route path="/feedback" element={<Feedback />} />
          <Route path="/about" element={<About />} />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>
      <Footer />
    </>
  );
}

export default App;
