import { useSignup } from "../hooks/useSignup";
import { FcGoogle } from "react-icons/fc";
import { Link, Form, useActionData } from "react-router-dom";
import FormInput from "../components/FormInput";
import { useEffect } from "react";

import useLogin from "../hooks/useLogin";

export const action = async ({ request }) => {
  let formData = await request.formData();
  let email = formData.get("Email");
  let password = formData.get("Password");

  return { email, password };
};
function Signin() {
  const userSignin = useActionData();

  const { signInEmailAndPassword } = useLogin();

  useEffect(() => {
    if (userSignin) {
      signInEmailAndPassword(userSignin.email, userSignin.password);
    }
  }, [userSignin]);

  const { signupWithGoogle, user, error } = useSignup();

  return (
    <div className="min-h-screen grid place-items-center">
      <div className="max-w-96  w-full items-center">
        <FormInput type="email" label="Email:" name="email" />
        <FormInput type="password" label="Password:" name="password" />
        <Form method="post">
          <div>
            <button
              className="btn btn-secondary w-full mb-5 text-2xl"
              type="submit"
            >
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
              If you dont have account
              <Link to="/signup" className="link text-cyan-500">
                Signup
              </Link>
            </p>
          </div>
        </Form>
      </div>
    </div>
  );
}

export default Signin;
