const Card = ({ title, children, className = '', gradient }) => (
  <div
    className={`${
      gradient
        ? `bg-gradient-to-r from-${gradient.from} via-${gradient.via} to-${gradient.to} text-white`
        : 'bg-white'
    } shadow-lg rounded-lg p-6 border transition transform hover:shadow-xl hover:scale-105 ${className}`}
  >
    <h3 className="text-xl font-bold mb-4">{title}</h3>
    {children}
  </div>
);

export default Card;
