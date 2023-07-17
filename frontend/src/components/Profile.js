import Button from './Button';
import { useState } from 'react';
import Link from './Link';

function ConfirmRedirect({ url, setShowRedirect }) {
  return (
    <div className="z-10 py-6 w-screen h-screen absolute top-1/2 left-1/2 translate-y-[-50%] translate-x-[-50%] flex flex-col items-center justify-center rounded-lg backdrop-blur-xl bg-primary bg-opacity-20">
      <h2 className="text-2xl">Click on link if trusted</h2>
      <Link
        href={url}
        text={url}
        target="_blank"
        onClick={() => setShowRedirect(false)}
      />
      <Button
        text="Cancel"
        externalStyle="mt-16"
        onClick={() => setShowRedirect(false)}
      />
    </div>
  );
}

function Profile() {
  const [showRedirect, setShowRedirect] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState('');

  const user = {
    firstName: 'John',
    lastName: 'Doe',
    username: 'john-doe',
    links: [
      { title: 'Linkedin', url: 'https://www.linkedin.com/' },
      { title: 'Twitter', url: 'https://twitter.com/' },
    ],
  };

  const onClick = url => {
    setRedirectUrl(url);
    setShowRedirect(true);
  };

  return (
    <div className="gridMainContainer pb-[100px] mt-24">
      <div className="gridContainer text-center">
        {showRedirect && (
          <ConfirmRedirect
            url={redirectUrl}
            setShowRedirect={setShowRedirect}
          />
        )}
        <h1 className="text-4xl">{user.firstName + ' ' + user.lastName}</h1>
        <span className="mt-2">@{user.username}</span>
        <div className="mt-6 mx-auto w-full sm:min-w-[400px] sm:w-fit flex flex-col">
          {user.links.map((link, index) => (
            <Button
              key={'profile_links_' + index}
              type="button"
              externalStyle="mt-4"
              text={link.title}
              onClick={() => onClick(link.url)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
