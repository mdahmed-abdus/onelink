import { useHistory } from 'react-router-dom/cjs/react-router-dom';
import Button from './Button';

function ComingSoon() {
  const history = useHistory();

  return (
    <div className="gridMainContainer mt-24">
      <div className="gridContainer text-center">
        <h1 className="text-4xl">Coming Soon...</h1>
        <Button
          type="button"
          text={'Go back'}
          externalStyle="mt-4"
          onClick={history.goBack}
        />
      </div>
    </div>
  );
}

export default ComingSoon;
