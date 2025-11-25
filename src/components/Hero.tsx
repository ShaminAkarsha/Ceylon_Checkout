export default function Hero() {
  return (
    <div className="pt-20 relative h-96 bg-gradient-to-r from-emerald-600 to-teal-600 overflow-hidden">
      <div className="absolute inset-0 bg-black opacity-20"></div>
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage:
            "url('https://images.pexels.com/photos/1007426/pexels-photo-1007426.jpeg?auto=compress&cs=tinysrgb&w=1600')",
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      ></div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-full flex flex-col justify-center items-center text-center">
        <h1 className="text-5xl md:text-6xl font-bold text-white mb-4">
          Discover Sri Lanka
        </h1>
        <p className="text-xl md:text-2xl text-white mb-8 max-w-2xl">
          Experience authentic tours and handcrafted treasures from the Pearl of
          the Indian Ocean
        </p>
        <div className="flex space-x-4">
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-6 py-4">
            <p className="text-3xl font-bold text-white">14</p>
            <p className="text-sm text-white">Products</p>
          </div>
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-6 py-4">
            <p className="text-3xl font-bold text-white">6</p>
            <p className="text-sm text-white">Tours</p>
          </div>
          <div className="bg-white bg-opacity-20 backdrop-blur-sm rounded-lg px-6 py-4">
            <p className="text-3xl font-bold text-white">8</p>
            <p className="text-sm text-white">Handicrafts</p>
          </div>
        </div>
      </div>
    </div>
  );
}
