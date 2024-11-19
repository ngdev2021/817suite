const Tooltip = ({ text, children }) => (
  <div className="relative group">
    {children}
    <div className="absolute left-1/2 transform -translate-x-1/2 bg-black text-white text-xs rounded py-1 px-2 opacity-0 group-hover:opacity-100 transition duration-300">
      {text}
    </div>
  </div>
);

export default Tooltip;
