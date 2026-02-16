import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import {
  addTodo,
  editTodo,
  deleteTodo,
  toggleTodo,
} from '../features/todo/todoSlice';
import { Alert, AlertTitle, AlertDescription } from '../components/ui/alert';
import {
  AlertCircleIcon,
  CheckCircle2Icon,
  PencilLine,
  Trash2,
  Moon,
  Sun,
} from 'lucide-react';

function Todo() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const [text, setText] = useState('');
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

  const [isDarkMode, setIsDarkMode] = useState(false);

  const [alert, setAlert] = useState({
    type: 'Success',
    message: '',
    visible: false,
  });

  const showALert = (type, message) => {
    setAlert({ type, message, visible: true });
  };

  
  useEffect(() => {
    if (alert.visible) {
      const timer = setTimeout(() => {
        setAlert((prev) => ({ ...prev, visible: false }));
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [alert.visible]);

  const handleAdd = () => {
    if (text.trim() == '') {
      showALert('Error', 'cannot add empty todo');
      return '';
    }
    dispatch(addTodo(text));
    showALert('Success', 'Todo added succefully');
    setText('');
  };

  const handleEdit = (id, text) => {
    if (!editText) return;

    dispatch(editTodo({ id, text }));
    showALert('Success', 'Todo Updated succefully');
    setEditId(null);
    setEditText('');
  };

  return (
    <>
      <div
        className={`hand-font min-h-screen flex items-center justify-center p-4 transition-colors duration-500 ${
          isDarkMode ? 'bg-gray-900' : 'bg-[#94AD8D]'
        }`}
      >
       

        {alert.visible && (
          <div className="absolute top-5 right-5 z-50 animate-in fade-in zoom-in">
            <Alert
              variant={alert.type == 'Error' ? 'destructive' : 'default'}
              className={
                alert.type == 'Error'
                  ? 'bg-red-50 text-red-900 border-red-500'
                  : 'bg-[#1A3A1E] text-white border-[#94AD8D]'
              }
            >
              {alert.type == 'Error' ? (
                <AlertCircleIcon className="w-4 h-4" />
              ) : (
                <CheckCircle2Icon className="w-4 h-4" />
              )}
              <AlertTitle>{alert.type}</AlertTitle>
              <AlertDescription className="text-[#dfe8dd]">
                {alert.message}
              </AlertDescription>
            </Alert>
          </div>
        )}

        <div
          className={`max-w-5xl w-full grid md:grid-cols-2 gap-8 items-center p-8 rounded-[40px] shadow-2xl backdrop-blur-sm transition-colors duration-500 ${
            isDarkMode ? 'bg-gray-800/40' : 'bg-white/20'
          }`}
        >
          <div className="text-center md:text-left flex flex-col items-center md:items-start space-y-4">
            <h1
              className={`text-6xl font-bold transition-colors duration-500 ${
                isDarkMode ? 'text-white' : 'text-[#1A3A1E]'
              }`}
            >
              ToDo App
            </h1>
            <p
              className={`text-xl font-medium italic transition-colors duration-500 ${
                isDarkMode ? 'text-gray-300' : 'text-[#1A3A1E]'
              }`}
            >
              Let's Accomplish Tasks Together!
            </p>

            <div className="relative mt-4 ">
              <img
                src="/goat.png"
                alt="Goat"
                className="w-64 h-64 object-contain w-[500px] h-auto"
              />
            </div>
          </div>
           <button
          onClick={() => setIsDarkMode(!isDarkMode)}
          className={`absolute top-5 left-5 p-3 rounded-full shadow-lg transition-transform hover:scale-110 z-50 ${
            isDarkMode ? 'bg-gray-800 text-yellow-400' : 'bg-white text-gray-800'
          }`}
        >
          {isDarkMode ? <Sun className="w-6 h-6" /> : <Moon className="w-6 h-6" />}
        </button>

          <div
            className={`rounded-[30px] p-8 shadow-inner relative min-h-[500px] transition-colors duration-500 ${
              isDarkMode ? 'bg-gray-800 border border-gray-700' : 'bg-[#1A3A1E]'
            }`}
          >
            <h2 className="text-white text-3xl font-semibold text-center mb-8">
              Get Things Done !
            </h2>

            <div className="flex mb-8 overflow-hidden rounded-md border border-gray-600">
              <input
                className="bg-transparent text-white px-4 py-3 flex-1 outline-none placeholder:text-gray-400 placeholder:italic"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="What is the task today?"
              />
              <button
                onClick={handleAdd}
                className={`px-4 font-bold transition-colors ${
                  isDarkMode
                    ? 'bg-gray-600 hover:bg-gray-500 text-white'
                    : 'bg-[#94AD8D] hover:bg-[#839a7c] text-[#1A3A1E]'
                }`}
              >
                Add Task
              </button>
            </div>

            <ul className="space-y-4 max-h-[290px] overflow-y-auto pr-2 custom-scrollbar">
              {[...todos].reverse().map((value) => (
                <li
                  key={value.id}
                  className={`p-4 rounded-xl flex items-center justify-between shadow-md transition-all duration-300 ${
                    isDarkMode ? 'bg-gray-700' : 'bg-[#94AD8D]/90'
                  }`}
                >
                  {editId === value.id ? (
                    <div className="flex flex-1 gap-2">
                      <input
                        type="text"
                        className={`bg-transparent border-b-2 outline-none flex-1 font-bold ${
                          isDarkMode
                            ? 'border-white text-white'
                            : 'border-[#1A3A1E] text-[#1A3A1E]'
                        }`}
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                      />
                      <button
                        onClick={() => handleEdit(value.id, editText)}
                        className={`font-black ${
                          isDarkMode ? 'text-gray-300 hover:text-white' : 'text-[#1A3A1E]'
                        }`}
                      >
                        SAVE
                      </button>
                    </div>
                  ) : (
                    <>
                      <div className="flex items-center gap-3 flex-1">
                        <input
                          type="checkbox"
                          checked={value.checked}
                          onChange={() => {
                            dispatch(toggleTodo(value.id));
                            if (!value.checked) {
                              showALert('Success', 'Todo succefully completed');
                            }
                          }}
                          className={`w-5 h-5 cursor-pointer ${
                            isDarkMode ? 'accent-gray-500' : 'accent-[#1A3A1E]'
                          }`}
                        />
                        <div className="flex flex-col">
                          <span
                            className={`font-medium text-lg ${
                              value.checked ? 'line-through opacity-60' : ''
                            } ${isDarkMode ? 'text-gray-100' : 'text-[#ffffff]'}`}
                          >
                            {value.text}
                          </span>
                          {!value.checked ? (
                            <span
                              className={`font-medium text-sm ${
                                isDarkMode ? 'text-gray-400' : 'text-[#2f5030]'
                              }`}
                            >
                              {value.createdAt}
                            </span>
                          ) : null}
                        </div>
                      </div>

                      <div className="flex gap-3">
                        {!value.checked && (
                          <button
                            onClick={() => {
                              setEditId(value.id);
                              setEditText(value.text);
                            }}
                            className={`transition-colors ${
                              isDarkMode
                                ? 'text-gray-400 hover:text-white'
                                : 'text-[#1A3A1E] hover:text-white'
                            }`}
                          >
                            <PencilLine className="w-5 h-5" />
                          </button>
                        )}
                        <button
                          onClick={() => dispatch(deleteTodo(value.id))}
                          className={`transition-colors ${
                            isDarkMode
                              ? 'text-gray-400 hover:text-red-400'
                              : 'text-[#1A3A1E] hover:text-white'
                          }`}
                        >
                          <Trash2 className="w-5 h-5" />
                        </button>
                      </div>
                    </>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </div>

        <footer
          className={`fixed bottom-4 text-center font-bold transition-colors duration-500 ${
            isDarkMode ? 'text-gray-500' : 'text-[#1A3A1E]/70'
          }`}
        >
          © {new Date().getFullYear()} Anshif – Built with React & Redux.
        </footer>
      </div>
    </>
  );
}

export default Todo;