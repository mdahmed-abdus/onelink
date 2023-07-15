import { mail, linkedin, github, website, twitter } from '../assets';
import { links, mailTo } from '../constants';

function About() {
  const socials = [
    { icon: mail, name: 'mail', url: mailTo },
    { icon: linkedin, name: 'linkedin', url: links.linkedin },
    { icon: github, name: 'github', url: links.github },
    { icon: website, name: 'website', url: links.website },
    { icon: twitter, name: 'twitter', url: links.twitter },
  ];

  return (
    <div className="gridMainContainer pb-[100px]">
      <div className="gridContainer text-center mt-16">
        <h1 className="text-4xl">About</h1>
        <p className="mt-8">
          Onelink simplifies the process of sharing multiple online profiles and
          projects with just one link.
        </p>
        <p className="mt-4">
          Onelink is a Linktree clone built using the MERN stack (MongoDB,
          Express.js, React.js, and Node.js) as part of my portfolio.
        </p>
        <div className="mt-24">
          <p>Thank you for taking the time to visit my project.</p>
          <p className="mt-2">
            Feel free to navigate through my portfolio and reach out if you have
            any questions.
          </p>
          <div className="mt-8 flex justify-evenly sm:px-56">
            {socials.map((icon, index) => (
              <a
                key={'about_socials_' + index}
                href={icon.url}
                target={icon.name !== 'mail' && '_blank'}
              >
                <img
                  src={icon.icon}
                  alt={icon.name}
                  className="w-[25px] object-contain"
                />
              </a>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default About;
