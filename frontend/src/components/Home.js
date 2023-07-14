import Button from './Button';
import TextInput from './TextInput';

function Home() {
  return (
    <div className="gridMainContainer">
      <div className="gridContainer">
        <div className="mt-24 sm:mt-60 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="text-center lg:text-start">
            <h1 className="text-6xl sm:text-7xl font-medium">Onelink</h1>
            <p className="mt-2 text-xl sm:text-2xl font-light">
              A Linktree clone built using MERN Stack
            </p>
          </div>
          <div className="flex justify-center lg:justify-end">
            <form className="flex flex-col items-center sm:w-3/4">
              <TextInput
                placeHolder="Email / Username"
                required={true}
                externalStyle="w-full"
              />
              <TextInput
                type="password"
                required={true}
                placeHolder="Password"
                externalStyle="mt-5 w-full"
              />
              <a href="#" className="text-primary hover:underline">
                Forgot password?
              </a>
              <Button text="Login" externalStyle="mt-5 w-full" />
              <a href="/register" className="text-primary hover:underline">
                Create an account
              </a>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
