import { React, chatLogo, chatLogo72, signIn, login, UserLogin } from "../imports";

const Login: React.FC = () => {
  const [userLogin, setUserLogin] = React.useState<UserLogin>({
    email: "",
    password: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.currentTarget;
    setUserLogin({ ...userLogin, [id]: value });
  };

  const handleFormSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    login(userLogin);
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <form
        onSubmit={handleFormSubmit}
        className="flex flex-col items-center h-105 w-75 sm:w-100 bg-[#2d3337] gap-3 rounded shadow-lg "
      >
        <img src={chatLogo} srcSet={`${chatLogo} 48w, ${chatLogo72} 72w`} className="mt-4" width={"48"} height={"48"} alt="Form logo" />
        <label htmlFor="email" className="text-xl sm:text-2xl text-white">
          EMAIL
        </label>
        <input
          onChange={handleInputChange}
          id="email"
          type="email"
          className="p-2 border h-8 w-55 sm:w-72 text-white rounded bg-[#434343] focus:bg-green-100 focus:outline-none focus:text-black"
          value={userLogin.email}
        />
        <label htmlFor="password" className="text-xl sm:text-2xl text-white">
          PASSWORD
        </label>
        <input
          onChange={handleInputChange}
          id="password"
          type="password"
          className="p-2 border h-8 w-55 sm:w-72 text-white rounded bg-[#434343] focus:bg-green-100 focus:outline-none focus:text-black"
          value={userLogin.password}
        />
        <label className="text-white me-21 sm:me-38">Forgot password?</label>

        <input className="w-12 h-12 sm:w-15 sm:h-15" type="image" src={signIn} alt="Sign in" />

        <label className="text-white text-xl">Don't have an account? Signup now</label>
      </form>
    </div>
  );
};

export default Login;
