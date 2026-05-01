function App() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-500 to-purple-600 flex items-center justify-center p-5">
      {/* Glassmorphism Card */}
      <div className="bg-white/20 backdrop-blur-md border border-white/30 p-10 rounded-3xl shadow-2xl text-center">
        <h1 className="text-4xl font-extrabold text-white drop-shadow-md">
          TexCalc
        </h1>
        <p className="mt-4 text-white/90 text-lg font-medium">
          Tailwind CSS v4 is now <span className="text-green-300 underline">Working!</span>
        </p>
        <button className="mt-6 px-6 py-2 bg-white text-blue-600 font-bold rounded-full hover:bg-opacity-90 transition-all">
          Get Started
        </button>
      </div>
    </div>
  )
}

export default App