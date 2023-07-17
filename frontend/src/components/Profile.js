import Button from './Button';
import { useState } from 'react';
import Link from './Link';
import BlurredBgCenteredItems from './BlurredBgCenteredItems';
import TextInput from './TextInput';

function ConfirmRedirect({ url, setShowRedirect }) {
  return (
    <BlurredBgCenteredItems
      items={
        <>
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
        </>
      }
    />
  );
}

function AddNewLink({ setShowAddNewLink }) {
  return (
    <BlurredBgCenteredItems
      items={
        <form className="flex flex-col p-6">
          <h2 className="text-2xl">Enter link details</h2>
          <TextInput
            name="title"
            required={true}
            placeHolder="Enter title"
            externalStyle="mt-8 shadow-sm"
          />
          <TextInput
            name="url"
            required={true}
            placeHolder="Enter URL link"
            externalStyle="mt-4 shadow-sm"
          />
          <div>
            <Button
              type="Submit"
              text="Submit"
              onClick={() => setShowAddNewLink(false)}
              externalStyle="mt-16"
            />
            <Button
              type="button"
              text="Cancel"
              onClick={() => setShowAddNewLink(false)}
              externalStyle="mt-8 sm:ml-8"
            />
          </div>
        </form>
      }
    />
  );
}

function Profile() {
  const isLoggedIn = true;

  const [showRedirect, setShowRedirect] = useState(false);
  const [redirectUrl, setRedirectUrl] = useState('');
  const [showAddNewLink, setShowAddNewLink] = useState(false);

  const user = {
    firstName: 'John',
    lastName: 'Doe',
    username: 'john-doe',
    links: [
      { title: 'Linkedin', url: 'https://www.linkedin.com/' },
      { title: 'Twitter', url: 'https://twitter.com/' },
    ],
  };

  const onClickLink = url => {
    setRedirectUrl(url);
    setShowRedirect(true);
  };

  const onClickAddNewLink = () => {
    setShowAddNewLink(true);
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
        {showAddNewLink && <AddNewLink setShowAddNewLink={setShowAddNewLink} />}
        {isLoggedIn ? (
          <>
            <div className="sm:flex justify-between">
              <h1 className="text-4xl">Hi {user.firstName}!</h1>
              <Button
                text="Add new link"
                onClick={onClickAddNewLink}
                externalStyle="mt-4 sm:mt-0"
              />
            </div>
          </>
        ) : (
          <>
            <h1 className="text-4xl">{user.firstName + ' ' + user.lastName}</h1>
            <span className="mt-2">@{user.username}</span>
          </>
        )}
        <div className="mt-8 mx-auto w-full sm:min-w-[400px] sm:w-fit flex flex-col">
          {user.links.map((link, index) => (
            <Button
              key={'profile_links_' + index}
              type="button"
              externalStyle="mt-4"
              text={link.title}
              onClick={() => onClickLink(link.url)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
