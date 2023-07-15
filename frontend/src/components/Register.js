import Button from './Button';
import TextInput from './TextInput';

function Register() {
  return (
    <div className="gridMainContainer pb-[100px] mt-24">
      <div className="gridContainer">
        <div className="text-center">
          <h1 className="text-4xl">Create an account</h1>
          <p>
            Already have an account?{' '}
            <a href="/" className="text-primary hover:underline">
              Login
            </a>
          </p>
        </div>
        <form className="mt-10">
          <div className="flex justify-center">
            <div className="grid grid-cols-1 gap-5 w-full sm:w-1/2">
              <TextInput
                name="firstName"
                required={true}
                placeHolder="Enter your first name"
              />
              <TextInput
                name="lastName"
                required={true}
                placeHolder="Enter your last name"
              />
              <TextInput
                type="email"
                name="email"
                required={true}
                placeHolder="Enter your email"
              />
              <TextInput
                name="username"
                required={true}
                placeHolder="Enter your username"
              />
              <TextInput
                type="password"
                name="password"
                required={true}
                placeHolder="Enter your password"
              />
              <TextInput
                type="password"
                name="confirmPassword"
                required={true}
                placeHolder="Confirm your password"
              />
            </div>
          </div>
          <div className="mt-5 flex justify-center">
            <Button text="Register" />
          </div>
        </form>
      </div>
    </div>
  );
}

export default Register;
