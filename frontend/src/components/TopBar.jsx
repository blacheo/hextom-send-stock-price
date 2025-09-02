
export  function TopBar({ title = "Stock Tracker", rightButtons = null }) {
  return (
    <header className="w-full bg-gray-800 text-white shadow-md">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          
          {/* Left side: Logo / App Name */}
          <div className="flex items-center space-x-2">
            <div className="text-xl font-bold">{title}</div>
          </div>

          {/* Right side: optional buttons */}
          <div className="flex items-center space-x-4">
            {rightButtons}
          </div>

        </div>
      </div>
    </header>
  );
}
