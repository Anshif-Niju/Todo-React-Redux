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
} from 'lucide-react';

function Todo() {
  const todos = useSelector((state) => state.todos);
  const dispatch = useDispatch();

  const [text, setText] = useState('');
  const [editId, setEditId] = useState(null);
  const [editText, setEditText] = useState('');

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
      <div className="hand-font min-h-screen bg-[#94AD8D] flex items-center justify-center p-4">
        {alert.visible && (
          <div className="absolute top-5 right-5  z-50  animate-in fade-in zoom-in">
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
        <div className="max-w-5xl w-full grid md:grid-cols-2 gap-8 items-center bg-white/20 p-8 rounded-[40px] shadow-2xl backdrop-blur-sm">
          <div className="text-center md:text-left flex flex-col items-center md:items-start space-y-4">
            <h1 className="text-6xl font-bold text-[#1A3A1E]">ToDo App</h1>
            <p className="text-xl text-[#1A3A1E] font-medium italic">
              Let's Accomplish Tasks Together!
            </p>

            <div className="relative mt-4 ">
              <img
                src="/goat.png"
                alt="Owl"
                className="w-64 h-64 object-contain w-[500px] h-auto"
              />
            </div>
          </div>

          <div className="bg-[#1A3A1E] rounded-[30px] p-8 shadow-inner relative min-h-[500px]">
            <h2 className="text-white text-3xl font-semibold text-center mb-8">
              Get Things Done !
            </h2>

            <div className="flex mb-8 overflow-hidden rounded-md border border-gray-600">
              <input
                className="bg-transparent text-white px-4 py-3 flex-1 outline-none placeholder:text-gray-500 placeholder:italic"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="What is the task today?"
              />
              <button
                onClick={handleAdd}
                className="bg-[#94AD8D] hover:bg-[#839a7c] text-[#1A3A1E] px-4 font-bold transition-colors"
              >
                Add Task
              </button>
            </div>

            <ul className="space-y-4 max-h-[290px] overflow-y-auto pr-2 custom-scrollbar">
              {todos.map((value) => (
                <li
                  key={value.id}
                  className="bg-[#94AD8D]/90 p-4 rounded-xl flex items-center justify-between shadow-md transition-transform "
                >
                  {editId === value.id ? (
                    <div className="flex flex-1 gap-2">
                      <input
                        type="text"
                        className="bg-transparent border-b-2 border-[#1A3A1E] outline-none flex-1 text-[#1A3A1E] font-bold"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                      />
                      <button
                        onClick={() => handleEdit(value.id, editText)}
                        className="text-[#1A3A1E] font-black"
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
                          className="w-5 h-5 accent-[#1A3A1E] cursor-pointer"
                        />
                        <div className="flex flex-col">
                          <span
                            className={`text-[#ffffff] font-medium text-lg ${value.checked ? 'line-through opacity-60' : ''}`}
                          >
                            {value.text}
                          </span>
                          {!value.checked ? (
                            <span className="font-medium text-sm text-[#2f5030]">
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
                            className="text-[#1A3A1E] hover:text-white transition-colors"
                          >
                            <PencilLine className="w-5 h-5" />
                          </button>
                        )}
                        <button
                          onClick={() => dispatch(deleteTodo(value.id))}
                          className="text-[#1A3A1E] hover:text-white transition-colors"
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

        <footer className="fixed bottom-4 text-center text-[#1A3A1E]/70 font-bold">
          © {new Date().getFullYear()} Anshif – Built with React & Redux.
        </footer>
      </div>
    </>
  );
}

export default Todo;
