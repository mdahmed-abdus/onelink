import { useState } from 'react';
import { menu, close } from '../assets';
import Link from './Link';

function Navbar() {
  const [toggle, setToggle] = useState(false);

  const links = [
    { text: 'Continue as Demo User', url: '#' },
    { text: 'About', url: '/about' },
  ];

  return (
    <nav className="fixed top-0 w-full z-20 bg-white">
      <div className="gridMainContainer">
        <div className="gridContainer my-5 flex justify-between">
          <Link
            href="/"
            text="Onelink"
            externalStyle="text-xl text-black hover:text-primary hover:no-underline"
          />
          <ul className="hidden sm:flex font-light">
            {links.map((link, index) => (
              <li key={'navbar_link_' + index}>
                <Link
                  href={link.url}
                  text={link.text}
                  externalStyle={
                    'text-black hover:text-primary hover:no-underline ' +
                    (index === links.length - 1 ? 'ml-5' : '')
                  }
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
                !toggle ? 'hidden' : 'flex'
              }`}
            >
              <ul className="list-none flex justify-end items-start flex-col gap-4">
                {links.map((link, index) => (
                  <li
                    key={'navbar_link_mob_' + index}
                    onClick={() => setToggle(!toggle)}
                  >
                    <Link
                      href={link.url}
                      text={link.text}
                      externalStyle="text-black hover:text-primary hover:no-underline"
                    />
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
