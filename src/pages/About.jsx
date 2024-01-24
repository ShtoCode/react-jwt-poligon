import Navbar from "../components/Navbar"

const About = () => {
  return (
    <>
    <Navbar />
    <div className="max-w-2xl mx-auto p-4 mt-12">
      <h2 className="text-3xl font-bold mb-4">Acerca del Proyecto</h2>
      <p className="mb-4">
        Este proyecto fue creado con React y Vite, utilizando diversas bibliotecas para facilitar el desarrollo.
        También integra la API de Polygon para obtener datos financieros y de mercado en tiempo real.
      </p>

      <h3 className="text-2xl font-bold mb-2">Librerías Utilizadas:</h3>
      <ul className="list-disc pl-6 mb-4">
        <li>React Router DOM: Para la navegación en la aplicación.</li>
        <li>Chart.js y react-chartjs-2: Para visualización de gráficos y estadísticas.</li>
        <li>Formik: Para la gestión de formularios.</li>
        <li>JWT: Para la autenticación y gestión de tokens.</li>
        <li>Contexto de React: Para la gestión del estado global en la aplicación.</li>
        <li>API de Polygon: Para obtener datos financieros y de mercado en tiempo real.</li>
      </ul>

    <h3 className="text-2xl font-bold mb-2">Recursos Adicionales:</h3>
      <p className="mb-4">
        Si deseas obtener más información o contribuir al proyecto, puedes visitar el repositorio en GitHub.
      </p>
      <a
        href="https://github.com/ShtoCode/react-jwt-poligon"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-500 hover:underline"
      >
        Repositorio en GitHub
      </a>


    </div>
    </>
  )
}

export default About
