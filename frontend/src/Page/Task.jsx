// import React, { useState, useEffect } from "react";
// import axios from "axios";

// const Tasks = () => {
//   const [tasks, setTasks] = useState([]);
//   const [newTask, setNewTask] = useState({ title: "", description: "" });
//   const [editingTask, setEditingTask] = useState(null);

//   const token = localStorage.getItem("token");
//   const userId = localStorage.getItem("userId");

//   useEffect(() => {
//     if (userId) {
//       fetchTasks();
//     }
//   }, [userId]);

//   const fetchTasks = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:5000/api/tasks/get-tasks/${userId}`,
//         {
//           headers: { Authorization: `Bearer ${token}` },
//         }
//       );
//       setTasks(response.data);
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//     }
//   };

//   const addTask = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.post(
//         "http://localhost:5000/api/tasks/add-task",
//         { ...newTask, userId },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setNewTask({ title: "", description: "" });
//       fetchTasks();
//     } catch (error) {
//       console.error("Error adding task:", error);
//     }
//   };

//   const updateTask = async (e) => {
//     e.preventDefault();
//     try {
//       await axios.put(
//         `http://localhost:5000/api/tasks/update-task/${editingTask.id}`,
//         { title: editingTask.title, description: editingTask.description },
//         { headers: { Authorization: `Bearer ${token}` } }
//       );
//       setEditingTask(null);
//       fetchTasks();
//     } catch (error) {
//       console.error("Error updating task:", error);
//     }
//   };

//   const deleteTask = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/api/tasks/delete-task/${id}`, {
//         headers: { Authorization: `Bearer ${token}` },
//         data: { id },
//       });
//       fetchTasks();
//     } catch (error) {
//       console.error("Error deleting task:", error);
//     }
//   };

//   const handleInputChange = (e, setter) => {
//     const { name, value } = e.target;
//     setter((prevState) => ({ ...prevState, [name]: value }));
//   };

//   return (
//     <div>
//       <h1>Tasks</h1>

//       <form onSubmit={addTask}>
//         <input
//           type="text"
//           name="title"
//           value={newTask.title}
//           onChange={(e) => handleInputChange(e, setNewTask)}
//           placeholder="Title"
//           required
//         />
//         <input
//           type="text"
//           name="description"
//           value={newTask.description}
//           onChange={(e) => handleInputChange(e, setNewTask)}
//           placeholder="Description"
//           required
//         />
//         <button type="submit">Add Task</button>
//       </form>

//       <ul>
//         {tasks.map((task) => (
//           <li key={task.id}>
//             {editingTask && editingTask.id === task.id ? (
//               <form onSubmit={updateTask}>
//                 <input
//                   type="text"
//                   name="title"
//                   value={editingTask.title}
//                   onChange={(e) => handleInputChange(e, setEditingTask)}
//                   required
//                 />
//                 <input
//                   type="text"
//                   name="description"
//                   value={editingTask.description}
//                   onChange={(e) => handleInputChange(e, setEditingTask)}
//                   required
//                 />
//                 <button type="submit">Save</button>
//                 <button type="button" onClick={() => setEditingTask(null)}>
//                   Cancel
//                 </button>
//               </form>
//             ) : (
//               <>
//                 <h3>{task.title}</h3>
//                 <p>{task.description}</p>
//                 <button onClick={() => setEditingTask(task)}>Edit</button>
//                 <button onClick={() => deleteTask(task.id)}>Delete</button>
//               </>
//             )}
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// };

// export default Tasks;

import React, { useState, useEffect } from "react";
import axios from "axios";

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState({ title: "", description: "" });
  const [editingTask, setEditingTask] = useState(null);

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  useEffect(() => {
    if (userId) {
      fetchTasks();
    }
  }, [userId]);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/tasks/get-tasks/${userId}`,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        "http://localhost:5000/api/tasks/add-task",
        { ...newTask, userId },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setNewTask({ title: "", description: "" });
      fetchTasks();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const updateTask = async (e) => {
    e.preventDefault();
    try {
      await axios.put(
        `http://localhost:5000/api/tasks/update-task/${editingTask.id}`,
        { title: editingTask.title, description: editingTask.description },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setEditingTask(null);
      fetchTasks();
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/api/tasks/delete-task/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
        data: { id },
      });
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const handleInputChange = (e, setter) => {
    const { name, value } = e.target;
    setter((prevState) => ({ ...prevState, [name]: value }));
  };

  return (
    <div className="flex flex-col items-center min-h-screen bg-gray-100 p-6">
      <div className="w-full max-w-md p-8 bg-white bg-opacity-80 text-gray-800 rounded-lg shadow-lg">
        <h1 className="text-3xl font-bold mb-6 text-center text-teal-700">
          Tasks
        </h1>

        <form onSubmit={addTask} className="space-y-6 mb-8">
          <input
            type="text"
            name="title"
            value={newTask.title}
            onChange={(e) => handleInputChange(e, setNewTask)}
            placeholder="Title"
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
          <input
            type="text"
            name="description"
            value={newTask.description}
            onChange={(e) => handleInputChange(e, setNewTask)}
            placeholder="Description"
            className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
            required
          />
          <button
            type="submit"
            className="w-full bg-teal-700 text-white py-2 rounded-md hover:bg-teal-800 transition-colors duration-200"
          >
            Add Task
          </button>
        </form>

        <ul className="space-y-4">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="p-4 bg-white border border-gray-200 rounded-md shadow-sm"
            >
              {editingTask && editingTask.id === task.id ? (
                <form onSubmit={updateTask} className="space-y-4">
                  <input
                    type="text"
                    name="title"
                    value={editingTask.title}
                    onChange={(e) => handleInputChange(e, setEditingTask)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                  <input
                    type="text"
                    name="description"
                    value={editingTask.description}
                    onChange={(e) => handleInputChange(e, setEditingTask)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md bg-white text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
                    required
                  />
                  <div className="flex space-x-4">
                    <button
                      type="submit"
                      className="bg-teal-700 text-white py-2 px-4 rounded-md hover:bg-teal-800 transition-colors duration-200"
                    >
                      Save
                    </button>
                    <button
                      type="button"
                      onClick={() => setEditingTask(null)}
                      className="bg-gray-300 text-gray-800 py-2 px-4 rounded-md hover:bg-gray-400 transition-colors duration-200"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <>
                  <h3 className="text-xl font-semibold">{task.title}</h3>
                  <p className="text-gray-600">{task.description}</p>
                  <div className="mt-4 flex space-x-4">
                    <button
                      onClick={() => setEditingTask(task)}
                      className="bg-teal-700 text-white py-2 px-4 rounded-md hover:bg-teal-800 transition-colors duration-200"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteTask(task.id)}
                      className="bg-red-700 text-white py-2 px-4 rounded-md hover:bg-red-800 transition-colors duration-200"
                    >
                      Delete
                    </button>
                  </div>
                </>
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Tasks;
