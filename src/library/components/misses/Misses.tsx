import './Misses.css';

export type MissesProps = {
  misses: Array<string>;
};

export const Misses: React.FunctionComponent<MissesProps> = ({ misses }) => (
  <div className="hm-misses">
    Misses:
    <br />
    <span className="cl-red">{misses.join(', ')}</span>
  </div>
);
