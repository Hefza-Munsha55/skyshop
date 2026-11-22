export default function EmptyState({ title, subtitle, onReset }) {
  return (
    <div className="empty-box">
      <div className="empty-icon">??</div>
      <h2>{title}</h2>
      <p>{subtitle}</p>
      {onReset && <button className="btn-primary" onClick={onReset}>Show All Products</button>}
    </div>
  );
}

