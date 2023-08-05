import { links } from '../constants';
import Link from './Link';

function Footer() {
  return (
    <div className="z-20 fixed bottom-0 py-2 w-full bg-white">
      <p className="text-primary font-light text-sm text-center">
        Designed and developed by @
        <Link href={links.github} target="_blank" text="mdahmed-abdus" />
      </p>
    </div>
  );
}

export default Footer;
