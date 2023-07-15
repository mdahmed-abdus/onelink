import Button from './Button';
import TextInput from './TextInput';

function ForgotPassword() {
  return (
    <div className="gridMainContainer mt-24">
      <div className="gridContainer md:w-1/2 m-auto text-center">
        <h1 className="text-4xl">Forgot your password?</h1>
        <p className="mt-4">
          Enter your username or email associated with your account and we will
          send you an email with link to reset your password.
        </p>
        <form className="flex flex-col items-center justify-center">
          <TextInput
            placeHolder="Email / Username"
            externalStyle="mt-16 w-full"
          />
          <Button text="Submit" externalStyle="mt-4 w-full" />
        </form>
      </div>
    </div>
  );
}

export default ForgotPassword;
