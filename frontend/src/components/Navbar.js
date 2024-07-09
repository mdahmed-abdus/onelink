import { useState } from 'react';
import { menu, close } from '../assets';
import { useAuthContext } from '../hooks/useAuthContext';

function NavLink({ href, text, className }) {
  return (
    <a href={href} className={`text-black hover:text-primary ${className}`}>
      {text}
    </a>
  );
}

function Navbar() {
  const [toggle, setToggle] = useState(false);
  const { user } = useAuthContext();

  const links = [{ text: 'About', url: '/about' }];

  if (user) {
    links.push({ text: 'Log out', url: '/logout' });
  } else {
    links.push(
      { text: 'Continue as Demo User', url: '/demo/request' },
      { text: 'Log In', url: '/' }
    );
  }

  return (
    <nav className="fixed top-0 w-full z-20 bg-white">
      <div className="gridMainContainer">
        <div className="gridContainer my-5 flex justify-between">
          <NavLink href="/" text="Onelink" className="text-xl" />
          <ul className="hidden sm:flex font-light">
            {links.map((link, index) => (
              <li key={'navbar_link_' + index}>
                <NavLink
                  href={link.url}
                  text={link.text}
                  className={index === 0 ? '' : 'ml-5'}
                />
              </li>
            ))}
          </ul>
          <div className="sm:hidden flex flex-1 justify-end items-center">
            <img
              src={toggle ? close : menu}
              alt="menu"
              className="w-[20px] h-[20px] object-contain cursor-pointer"
              onClick={() => setToggle(!toggle)}
            />
            <div
              className={`absolute p-6 top-14 right-6 rounded-lg bg-secondary ${
                toggle ? 'flex' : 'hidden'
              }`}
            >
              <ul className="list-none flex justify-end items-start flex-col gap-4">
                {links.map((link, index) => (
                  <li
                    key={'navbar_link_mob_' + index}
                    onClick={() => setToggle(!toggle)}
                  >
                    <NavLink href={link.url} text={link.text} />
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
