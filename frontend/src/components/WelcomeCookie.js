import { useCookies } from 'react-cookie';
import Button from './Button';

function WelcomeCookie() {
  const [cookie, setCookie] = useCookies(['welcomeCookie']);

  if (cookie.welcomeCookie) {
    return <></>;
  }

  const today = new Date();
  const nextYear = new Date();
  nextYear.setDate(today.getDate() + 365);

  return (
    <div className="z-30 fixed bottom-0 py-2 w-full bg-white">
      <div className="text-primary font-light text-sm text-center">
        <p>This website uses only essential cookies.</p>
        <Button
          type="button"
          text="I understand."
          buttonType="underline"
          externalStyle="!p-0"
          onClick={() =>
            setCookie('welcomeCookie', true, { expires: nextYear })
          }
        />
      </div>
    </div>
  );
}

export default WelcomeCookie;
