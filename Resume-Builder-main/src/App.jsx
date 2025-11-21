import { Routes, Route, Link } from "react-router-dom";
import ResumeBuilder from "./pages/ResumeBuilder.jsx";

function App() {
  

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navbar */}
      <nav className="flex items-center justify-between px-6 py-4 bg-slate-900 text-white shadow-md">
        <Link to="/" className="text-xl font-bold tracking-wide">
          Portfolio
        </Link>
        <div className="flex gap-6">
          <Link to="/" className="hover:text-indigo-400 transition">
            Home
          </Link>
          <Link to="/resume-builder" className="hover:text-indigo-400 transition">
            Resume Builder
          </Link>
        </div>
      </nav>

      {/* Routes */}
      <Routes>
        {/* Home Page */}
        <Route
          path="/"
          element={
            <div className="flex flex-col items-center justify-center h-[80vh] text-center px-6">
              <h1 className="text-4xl font-extrabold text-slate-800">
                Welcome to My Portfolio 🚀
              </h1>
              <p className="mt-4 text-lg text-gray-600 max-w-2xl">
                This is a simple project built with <span className="font-semibold">React + Vite + Tailwind</span>.  
                You can try out the <span className="font-semibold">Resume Builder</span> below.
              </p>
              <Link
                to="/resume-builder"
                className="mt-6 px-6 py-3 bg-indigo-600 text-white font-medium rounded-xl shadow hover:bg-indigo-700 transition"
              >
                Go to Resume Builder
              </Link>
            </div>
          }
        />

        {/* Resume Builder Page */}
        <Route path="/resume-builder" element={<ResumeBuilder />} />
      </Routes>
    </div>
  )
}

export default App
