import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Todo from './components/Todo';

function App() {
  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="light"
      />
      <Todo />
    </>
  );
}

export default App;
