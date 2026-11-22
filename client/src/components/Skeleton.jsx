export default function Skeleton() {
  return (
    <div className="grid">
      {[1,2,3,4,5,6].map(i => (
        <div key={i} className="card skeleton-card">
          <div className="skeleton-img shimmer"></div>
          <div className="skeleton-line shimmer"></div>
          <div className="skeleton-line short shimmer"></div>
        </div>
      ))}
    </div>
  );
}

