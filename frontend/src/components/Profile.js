import Button from './Button';
import { useState } from 'react';
import Link from './Link';
import BlurredBgCenteredItems from './BlurredBgCenteredItems';
import TextInput from './TextInput';
import IconButton from './IconButton';
import { edit } from '../assets';

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

function LinkForm({ link, setLink, formFor, closeAllFormView }) {
  const heading =
    formFor === 'update' ? 'Update link details' : 'Enter new link details';

  return (
    <BlurredBgCenteredItems
      items={
        <form className="flex flex-col p-6">
          <h2 className="text-2xl">{heading}</h2>
          <TextInput
            name="title"
            value={link.title}
            onChange={e => setLink({ ...link, title: e.target.value })}
            required={true}
            placeHolder="Enter title"
            externalStyle="mt-8 shadow-sm"
          />
          <TextInput
            name="url"
            value={link.url}
            onChange={e => setLink({ ...link, url: e.target.value })}
            required={true}
            placeHolder="Enter URL link"
            externalStyle="mt-4 shadow-sm"
          />
          <div className="flex flex-col sm:flex-row mt-16">
            <Button type="submit" text="Submit" onClick={closeAllFormView} />
            <Button
              type="button"
              text="Cancel"
              onClick={closeAllFormView}
              externalStyle="mt-8 sm:mt-0 sm:ml-8"
            />
            {formFor === 'update' && (
              <Button
                type="button"
                text="Delete"
                onClick={closeAllFormView}
                externalStyle="mt-8 sm:mt-0 sm:ml-8"
              />
            )}
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

  const [showAddNewLinkForm, setShowAddNewLinkForm] = useState(false);
  const [showEditLinkForm, setShowEditLinkForm] = useState(false);
  const [link, setLink] = useState({ title: '', url: '' });

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

  const onClickEditLink = link => {
    setShowEditLinkForm(true);
    setLink(link);
  };

  const closeAllFormView = () => {
    setShowAddNewLinkForm(false);
    setShowEditLinkForm(false);
    setLink({ title: '', url: '' });
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
        {showAddNewLinkForm && (
          <LinkForm
            link={link}
            setLink={setLink}
            formFor="new"
            closeAllFormView={closeAllFormView}
          />
        )}
        {showEditLinkForm && (
          <LinkForm
            link={link}
            setLink={setLink}
            formFor="update"
            closeAllFormView={closeAllFormView}
          />
        )}
        {isLoggedIn ? (
          <>
            <div className="sm:flex justify-between">
              <h1 className="text-4xl">Hi {user.firstName}!</h1>
              <Button
                text="Add new link"
                onClick={() => setShowAddNewLinkForm(true)}
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
            <div
              key={'profile_links_' + index}
              className="mt-4 flex items-center"
            >
              <Button
                type="button"
                externalStyle="w-full border border-primary"
                text={link.title}
                onClick={() => onClickLink(link.url)}
              />
              {isLoggedIn && (
                <IconButton
                  icon={{ icon: edit, name: 'edit icon' }}
                  className="ml-2 bg-white"
                  onClick={() => onClickEditLink(link)}
                />
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Profile;
