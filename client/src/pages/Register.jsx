import { useContext } from "react";
import { Link } from "react-router-dom";
import AuthContext from "../context/AuthContext";
import { Formik } from "formik";
import Swal from "sweetalert2";

const Login = () => {
  const { registerUser } = useContext(AuthContext);
  const handleSubmit = (e) => {
    e.preventDefault();
    if (e.target.password.value !== e.target.repeatpassword.value) {
      Swal.fire({
        icon: 'error',
        title: 'Oops...',
        text: 'Las contraseñas no coinciden',
        confirmButtonText: 'Ok',
        confirmButtonColor: 'blue',
      })
      return
    }
    registerUser(e);
  };


  return (
    <div>
      <Formik>
        <form className="w-[1000px] p-4 mx-auto mt-16 bg-slate-200 md:w-[500px] md:p-8 md:mt-16 sm:w-[400px]" onSubmit={handleSubmit}>
          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="nombre">Nombre</label>
          <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="nombre" required placeholder="Docky" />

          <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white" htmlFor="email">Email</label>
          <input className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" type="text" name="email" required placeholder="docky@correo.cl" />

          <label htmlFor="password">Contraseña</label>
          <input type="password" name="password" placeholder="********" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />

          <label htmlFor="repeatpassword">Repita la contraseña</label>
          <input type="password" name="repeatpassword" placeholder="********" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required />

          <div className="flex justify-between">
            <button className="text-white bg-blue-700 hover:bg-blue-800 w-full mt-4 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800" type="submit">Registrar</button>

            <Link to={"/login"} className="text-white bg-blue-700 hover:bg-blue-800 w-full mt-4 ml-40 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Ir a Login</Link>
          </div>
        </form>
      </Formik>
    </div>
  );
};

export default Login
