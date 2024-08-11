const Toggle = ({ enabled, label, onChange }) => {
  return (
    <div className="flex items-center justify-center w-full">
      <label htmlFor="toggle" className="flex items-center cursor-pointer py-2">
        <div className="relative flex items-center">
          {/* Toggle Line */}
          <div
            className={`w-10 h-6 bg-gray-400 rounded-full shadow-inner transition-colors duration-300 ${enabled ? 'bg-teal-500' : 'bg-gray-400'}`}
          ></div>
          {/* Toggle Circle */}
          <div
            className={`absolute top-0 left-0 w-6 h-6 bg-white border-2 border-gray-400 rounded-full transition-transform duration-300 transform ${enabled ? 'translate-x-4' : 'translate-x-0'}`}
          ></div>
        </div>
        <input
          id="toggle"
          type="checkbox"
          className="hidden"
          checked={enabled}
          onChange={onChange}
        />
        <span className="ml-3 text-gray-700 font-medium">{label}</span>
      </label>
    </div>
  );
};

export default Toggle;
