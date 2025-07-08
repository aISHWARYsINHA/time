import { useState, useEffect } from "react";
import { Sun, Moon } from "lucide-react";

export default function Home() {
  const [currentTime, setCurrentTime] = useState<string>("");
  const [userTimezone, setUserTimezone] = useState<string>("");
  const [isError, setIsError] = useState<boolean>(false);
  const [clockSize, setClockSize] = useState<number>(12);
  const [isDarkMode, setIsDarkMode] = useState<boolean>(true);
  const [is24Hour, setIs24Hour] = useState<boolean>(true);
  const [showTooltip, setShowTooltip] = useState<boolean>(false);

  // Detect user's timezone using Intl API
  const detectTimezone = (): string | null => {
    try {
      return Intl.DateTimeFormat().resolvedOptions().timeZone;
    } catch (error) {
      console.error('Timezone detection failed:', error);
      return null;
    }
  };

  // Format timezone display with abbreviation and offset
  const formatTimezoneDisplay = (timezone: string): string => {
    try {
      const now = new Date();
      
      // Get timezone abbreviation
      const formatter = new Intl.DateTimeFormat('en', {
        timeZone: timezone,
        timeZoneName: 'short'
      });
      const parts = formatter.formatToParts(now);
      const timeZoneName = parts.find(part => part.type === 'timeZoneName')?.value || '';
      
      // Get UTC offset in minutes and format it properly
      const utcTime = new Date(now.toLocaleString("en-US", {timeZone: "UTC"}));
      const localTime = new Date(now.toLocaleString("en-US", {timeZone: timezone}));
      const offsetMinutes = (localTime.getTime() - utcTime.getTime()) / (1000 * 60);
      const offsetHours = Math.floor(Math.abs(offsetMinutes) / 60);
      const offsetMins = Math.abs(offsetMinutes) % 60;
      const sign = offsetMinutes >= 0 ? '+' : '-';
      const formattedOffset = `GMT${sign}${offsetHours.toString().padStart(2, '0')}:${offsetMins.toString().padStart(2, '0')}`;
      
      return `${timeZoneName} ${formattedOffset}`;
    } catch (error) {
      console.error('Timezone formatting failed:', error);
      return timezone || 'Unknown Timezone';
    }
  };

  // Update time with timezone awareness
  const updateTime = () => {
    try {
      const now = new Date();
      const timeString = now.toLocaleTimeString('en-US', {
        hour12: !is24Hour,
        hour: '2-digit',
        minute: '2-digit', 
        second: '2-digit'
      });
      setCurrentTime(timeString);
      setIsError(false);
    } catch (error) {
      console.error('Time update failed:', error);
      setIsError(true);
      setCurrentTime('--:--:--');
    }
  };

  // Update CSS custom properties for dynamic sizing
  useEffect(() => {
    const root = document.documentElement;
    root.style.setProperty('--clock-size', `${clockSize}vw`);
  }, [clockSize]);

  // Handle clock responsiveness
  useEffect(() => {
    const handleResize = () => {
      // Force re-render of CSS custom properties on window resize
      const root = document.documentElement;
      root.style.setProperty('--clock-size', `${clockSize}vw`);
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [clockSize]);

  // Handle dark mode
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Update time immediately when format changes
  useEffect(() => {
    updateTime();
  }, [is24Hour]);

  // Initialize timezone detection and time updates
  useEffect(() => {
    // Set up timezone
    const timezone = detectTimezone();
    if (timezone) {
      const formattedTimezone = formatTimezoneDisplay(timezone);
      setUserTimezone(formattedTimezone);
    } else {
      setUserTimezone('Unknown Timezone');
      setIsError(true);
    }

    // Initial time update
    updateTime();

    // Set up interval for time updates
    const interval = setInterval(updateTime, 1000);

    // Handle visibility change (when tab becomes visible again)
    const handleVisibilityChange = () => {
      if (!document.hidden) {
        updateTime();
      }
    };

    // Handle window focus (when window becomes active again)
    const handleFocus = () => {
      updateTime();
    };

    document.addEventListener('visibilitychange', handleVisibilityChange);
    window.addEventListener('focus', handleFocus);

    // Cleanup
    return () => {
      clearInterval(interval);
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      window.removeEventListener('focus', handleFocus);
    };
  }, [is24Hour, userTimezone]); // Re-run when time format changes

  return (
    <div className="bg-white dark:bg-black min-h-screen overflow-hidden flex flex-col justify-between items-center p-4">
      {/* Main Clock Display */}
      <div className="flex-1 flex items-center justify-center w-full">
        <div className="text-center clock-container relative">
          {/* Time Display - Dynamic size based on CSS custom property */}
          <div 
            className="text-black dark:text-white font-light tracking-tight select-none time-display transition-opacity duration-100 cursor-default"
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
          >
            {currentTime || "00:00:00"}
          </div>
          
          {/* Timezone Tooltip */}
          {showTooltip && userTimezone && (
            <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-4 px-3 py-2 bg-gray-800 dark:bg-gray-200 text-white dark:text-black text-sm rounded-lg shadow-lg whitespace-nowrap z-10 pointer-events-none">
              {userTimezone}
              <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-b-4 border-transparent border-b-gray-800 dark:border-b-gray-200"></div>
            </div>
          )}
          
          {/* Error Display */}
          {isError && (
            <div className="text-red-500 dark:text-red-400 text-lg mt-4">
              Time display failed
            </div>
          )}
        </div>
      </div>

      {/* Bottom Controls */}
      <div className="w-full max-w-md mx-auto space-y-6 pb-8">
        {/* Clock Size Control */}
        <div className="space-y-3">
          <input
            type="range"
            min="8"
            max="20"
            step="0.2"
            value={clockSize}
            onChange={(e) => {
              const newSize = Number(e.target.value);
              setClockSize(newSize);
              // Force immediate CSS update
              document.documentElement.style.setProperty('--clock-size', `${newSize}vw`);
            }}
            className="w-full h-2 bg-gray-200 dark:bg-gray-700 rounded-lg appearance-none cursor-pointer slider"
          />
        </div>

        {/* Time Format Toggle */}
        <div className="space-y-3">
          <button
            onClick={() => setIs24Hour(!is24Hour)}
            className="flex items-center justify-center gap-3 w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-black dark:text-white px-4 py-3 rounded-md text-sm font-medium transition-colors"
          >
            {is24Hour ? '12 Hour Format' : '24 Hour Format'}
          </button>
        </div>

        {/* Theme Toggle */}
        <div className="space-y-3">
          <button
            onClick={() => setIsDarkMode(!isDarkMode)}
            className="flex items-center justify-center gap-3 w-full bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600 text-black dark:text-white px-4 py-3 rounded-md text-sm font-medium transition-colors"
          >
            {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
            {isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          </button>
        </div>
      </div>
    </div>
  );
}