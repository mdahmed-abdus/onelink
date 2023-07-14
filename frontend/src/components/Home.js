import Button from './Button';
import TextInput from './TextInput';

function Home() {
  return (
    <div className="gridMainContainer">
      <div className="gridContainer">
        <div className="mt-60 grid grid-cols-1 lg:grid-cols-2 gap-10">
          <div className="text-center lg:text-start">
            <h1 className="text-7xl font-medium">Onelink</h1>
            <p className="text-2xl font-light">
              A Linktree clone built using MERN Stack
            </p>
          </div>
          <div className="flex justify-center lg:justify-end">
            <form className="flex flex-col items-center">
              <TextInput
                placeHolder="Email / Username"
                externalStyle="w-[270px]"
              />
              <TextInput
                type="password"
                placeHolder="Password"
                externalStyle="w-[270px] mt-5"
              />
              <a href="#" className="text-primary hover:underline">
                Forgot password?
              </a>
              <Button text="Login" externalStyle="mt-5 w-[270px] rounded-lg" />
              <a href="#" className="text-primary hover:underline">
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
