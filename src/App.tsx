
import ReflectionForm from "./components/ReflectionForm";

const App = () => {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-4">
      <div className="bg-white p-6 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-xl font-bold mb-4 text-center">Emotion Reflection Tool</h1>
        <ReflectionForm />
      </div>
    </div>
  );
};

export default App;
