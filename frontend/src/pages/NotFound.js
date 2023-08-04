import Link from '../components/Link';

function NotFound() {
  return (
    <div className="gridMainContainer pb-[100px] mt-24">
      <div className="gridContainer text-center">
        <p className="mb-4">Not Found</p>
        <Link text="Go to home page" href="/" />
      </div>
    </div>
  );
}

export default NotFound;
