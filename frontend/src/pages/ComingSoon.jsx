import { Link } from 'react-router-dom';

export default function ComingSoon({ title, stageNote }) {
  return (
    <div className="coming-soon">
      <h1>{title}</h1>
      <p>{stageNote}</p>
      <Link to="/" className="btn btn--primary">
        Back to Home
      </Link>
    </div>
  );
}
