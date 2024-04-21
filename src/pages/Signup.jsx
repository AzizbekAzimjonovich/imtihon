import { useSignup } from "../hooks/useSignup";
import { FcGoogle } from "react-icons/fc";
import { Link, Form, useActionData } from "react-router-dom";
import FormInput from "../components/FormInput";
import { useEffect } from "react";

export const action = async ({ request }) => {
  let formData = await request.formData();
  let name = formData.get("Name");
  let email = formData.get("Email");
  let password = formData.get("Password");

  return { name, email, password };
};

function Signup() {
  const userSignup = useActionData();
  console.log(userSignup);
  const { signupWithGoogle, user, error, signupWithPasswordAndEmail } =
    useSignup();
  useEffect(() => {
    if (userSignup) {
      signupWithPasswordAndEmail(userSignup.email, userSignup.password);
    }
  }, [userSignup]);
  return (
    <div className="min-h-screen grid place-items-center">
      <div className="max-w-96  w-full items-center">
        <FormInput type="text" label="Name:" />
        <FormInput type="email" label="Email:" />
        <FormInput type="password" label="Password:" />
        <Form method="post">
          <div className="items-center">
            <button className="btn btn-secondary w-full mb-5" type="submit">
              Submit
            </button>
            <button
              type="button"
              onClick={signupWithGoogle}
              className="btn btn-secondary w-full mb-5"
            >
              <FcGoogle className="w-10 h-10 mr-2 " />
              <span className="text-2xl">Google</span>
            </button>
            <p className="text-center">
              Are you alredy registered?
              <Link to="/signin" className="link text-cyan-500">
                Signin
              </Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Signup;
