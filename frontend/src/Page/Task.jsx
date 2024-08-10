// import React, { useEffect, useState } from "react";
// import { useNavigate } from "react-router-dom";
// import axios from "axios";
// // import Cookies from "js-cookie";

// function Task() {
//   const [userInfo, setUserInfo] = useState(null);
//   const [tasks, setTasks] = useState([]);
//   const [isLoading, setIsLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [isTaskFormOpen, setIsTaskFormOpen] = useState(false);
//   const [editingTask, setEditingTask] = useState(null);
//   const [update, setUpdate] = useState(false);
//   const navigate = useNavigate();

//   const TaskItem = ({ task, onEdit, onDelete }) => (
//     <div className="bg-white p-4 rounded-lg shadow-md mb-4">
//       <h3 className="text-xl font-semibold">{task.title}</h3>
//       <p className="text-gray-600">{task.description}</p>
//       <div className="mt-2 flex space-x-2">
//         <button
//           onClick={() => onEdit(task)}
//           className="text-blue-500 hover:underline"
//         >
//           Edit
//         </button>
//         <button
//           onClick={() => onDelete(task.id)}
//           className="text-red-500 hover:underline"
//         >
//           Delete
//         </button>
//       </div>
//     </div>
//   );

//   const TaskForm = ({ task, onSubmit, onCancel }) => {
//     const [title, setTitle] = useState(task ? task.title : "");
//     const [description, setDescription] = useState(
//       task ? task.description : ""
//     );

//     const handleSubmit = (e, id) => {
//       e.preventDefault();
//       onSubmit({ userId: id, title, description });
//     };

//     return (
//       <form
//         onSubmit={(e) => handleSubmit(e, userInfo.id)}
//         className="space-y-4"
//       >
//         <div>
//           <label htmlFor="title" className="block text-sm font-medium mb-1">
//             Title
//           </label>
//           <input
//             id="title"
//             type="text"
//             value={title}
//             onChange={(e) => setTitle(e.target.value)}
//             required
//             className="w-full px-3 py-2 border border-gray-300 rounded-md"
//           />
//         </div>
//         <div>
//           <label
//             htmlFor="description"
//             className="block text-sm font-medium mb-1"
//           >
//             Description
//           </label>
//           <textarea
//             id="description"
//             value={description}
//             onChange={(e) => setDescription(e.target.value)}
//             required
//             rows={4}
//             className="w-full px-3 py-2 border border-gray-300 rounded-md"
//           />
//         </div>
//         <div className="flex justify-end space-x-2">
//           <button
//             type="button"
//             onClick={onCancel}
//             className="px-4 py-2 bg-gray-300 text-white rounded-md"
//           >
//             Cancel
//           </button>
//           <button
//             type="submit"
//             className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
//           >
//             {task ? "Update" : "Create"} Task
//           </button>
//         </div>
//       </form>
//     );
//   };

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         setIsLoading(true);
//         const token = Cookies.get("token");
//         if (!token) {
//           alert("No token found, please login.");
//           navigate("/login");
//           return;
//         }
//         const response = await axios.get(
//           "http://localhost:5000/api/users/protected-route",
//           {
//             headers: {
//               Authorization: `Bearer ${token}`,
//             },
//           }
//         );
//         setUserInfo(response.data);

//         const tasks = await axios.get(
//           `http://localhost:5000/api/tasks/get-tasks/${response.data.id}`
//         );
//         setTasks(tasks.data);
//       } catch (err) {
//         setError("Failed to fetch data. Please try again.");
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchData();
//   }, [update]);

//   const handleCreateTask = async (newTask) => {
//     await axios.post("http://localhost:5000/api/tasks/add-task", {
//       userId: userInfo.id,
//       title: newTask.title,
//       description: newTask.description,
//     });
//     setTasks([...tasks, { ...newTask }]);
//     setIsTaskFormOpen(false);
//   };

//   const handleEditTask = (task) => {
//     setEditingTask(task);
//     setIsTaskFormOpen(true);
//     setUpdate(false);
//   };

//   const handleUpdateTask = async (updatedTask) => {
//     setTasks(tasks.map((t) => (t.id === updatedTask.id ? updatedTask : t)));
//     setIsTaskFormOpen(false);
//     setEditingTask(null);
//     await axios.put("http://localhost:5000/api/tasks/update-task", {
//       title: updatedTask.title,
//       description: updatedTask.description,
//       id: updatedTask.id,
//     });
//     setUpdate(true);
//   };

//   const handleDeleteTask = (taskId) => {
//     setTasks(tasks.filter((t) => t.id !== taskId));
//     axios.put("http://localhost:5000/api/tasks/delete-task", {
//       id: taskId,
//     });
//     setUpdate(true);
//   };

//   const handleLogout = () => {
//     Cookies.remove("token");
//     navigate("/login");
//   };

//   if (isLoading)
//     return (
//       <div className="flex justify-center items-center h-screen">
//         <div className="w-16 h-16 border-4 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
//       </div>
//     );

//   if (error) return <div className="text-red-500">{error}</div>;

//   return (
//     <>
//       <header className="bg-gray-800 text-white p-4">
//         <div className="flex justify-between items-center">
//           <h1 className="text-xl font-semibold">Task Management System</h1>
//           <button
//             onClick={handleLogout}
//             className="flex items-center text-white"
//           >
//             Logout
//           </button>
//         </div>
//       </header>
//       <main className="container mx-auto p-4">
//         <h2 className="text-2xl font-semibold mb-4">
//           Welcome, {userInfo.username}
//         </h2>
//         <button
//           onClick={() => setIsTaskFormOpen(true)}
//           className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 mb-4"
//         >
//           Create New Task
//         </button>
//         {tasks.map((task) => (
//           <TaskItem
//             key={task.id}
//             task={task}
//             onEdit={handleEditTask}
//             onDelete={handleDeleteTask}
//           />
//         ))}
//         {isTaskFormOpen && (
//           <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
//             <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
//               <h3 className="text-xl font-semibold mb-4">
//                 {editingTask ? "Edit Task" : "Create New Task"}
//               </h3>
//               <TaskForm
//                 task={editingTask}
//                 onSubmit={editingTask ? handleUpdateTask : handleCreateTask}
//                 onCancel={() => {
//                   setIsTaskFormOpen(false);
//                   setEditingTask(null);
//                 }}
//               />
//             </div>
//           </div>
//         )}
//       </main>
//     </>
//   );
// }

// export default Task;

// import React, { useState, useEffect } from "react";
// import axios from "axios";

// function Task() {
//   const [tasks, setTasks] = useState([]);
//   // ---------------انشاء مهمة جديدة------------------
//   const [newTask, setNewTask] = useState({
//     task_name: "",
//     task_description: "",
//   });
//   // ---------------------- تعديل على مهمة --------------------------
//   // const [editTask, setEditTask] = useState(null); /

//   useEffect(() => {
//     fetchTasks();
//   }, []);
//   // ---------------- جلب المهمام -----------------
//   const fetchTasks = async () => {
//     try {
//       const response = await axios.get("http://localhost:5000/tasks", {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       setTasks(response.data);
//     } catch (error) {
//       console.error("Error fetching tasks:", error);
//     }
//   };
//   // --------------------- انشاء مهمة جديدة ----------------------------
//   const handleCreateTask = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post(
//         "http://localhost:5000/tasks",
//         newTask,
//         {
//           headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//         }
//       );
//       setNewTask({ task_name: "", task_description: "" });
//       fetchTasks();
//     } catch (error) {
//       console.error(
//         "خطأ في إنشاء المهمة:",
//         error.response ? error.response.data : error.message
//       );
//     }
//   };
//   // --------------------------------- حذف مهمة --------------------------------------
//   const handleDeleteTask = async (id) => {
//     try {
//       await axios.delete(`http://localhost:5000/tasks/${id}`, {
//         headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
//       });
//       fetchTasks();
//     } catch (error) {
//       console.error("Error deleting task:", error);
//     }
//   };

//   return (
//     <div>
//       <h2>tasks</h2>
//       <form onSubmit={handleCreateTask}>
//         <input
//           type="text"
//           placeholder="Task Name"
//           value={newTask.task_name}
//           onChange={(e) =>
//             setNewTask({ ...newTask, task_name: e.target.value })
//           }
//         />
//         <input
//           type="text"
//           placeholder="Task Description"
//           value={newTask.task_description}
//           onChange={(e) =>
//             setNewTask({ ...newTask, task_description: e.target.value })
//           }
//         />
//         <button type="submit">Create Task</button>
//       </form>
//       <ul>
//         {tasks.map((task) => (
//           <li key={task.task_id}>
//             {task.task_name} - {task.task_description}
//             <button onClick={() => handleDeleteTask(task.task_id)}>
//               Delete
//             </button>
//           </li>
//         ))}
//       </ul>
//     </div>
//   );
// }

// export default Task;

import React, { useState, useEffect } from "react";
import axios from "axios";

const API_URL = "http://localhost:5000/tasks";

function Task() {
  const [tasks, setTasks] = useState([]);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [editingTask, setEditingTask] = useState(null);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(API_URL);
      console.log("Tasks fetched:", response.data); // سجل البيانات التي تم جلبها

      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (editingTask) {
      try {
        await axios.put(`${API_URL}/${editingTask.id}`, {
          name,
          description,
        });
        console.log("Task updated");
        setEditingTask(null);
      } catch (error) {
        console.error("Error updating task:", error);
      }
    } else {
      try {
        await axios.post(API_URL, { name, description});
        console.log("Task added");
      } catch (error) {
        console.error("Error creating task:", error);
      }
    }
    setName("");
    setDescription("");
    fetchTasks();
  };

  const handleEdit = (task) => {
    setName(task.name);
    setDescription(task.description);
    setEditingTask(task);
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="w-full max-w-lg p-8 bg-white bg-opacity-80 shadow-lg rounded-lg">
        <h1 className="text-3xl font-bold mb-6 text-teal-700 text-center">
          {editingTask ? "Edit Task" : "Add Task"}
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium mb-1 text-gray-700"
            >
              Task Name
            </label>
            <input
              type="text"
              id="name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter task name"
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium mb-1 text-gray-700"
            >
              Task Description
            </label>
            <textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Enter task description"
              className="w-full px-4 py-2 border border-gray-300 rounded-md bg-gray-50 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-teal-500"
              required
            />
          </div>
    
          <button
            type="submit"
            className="w-full bg-teal-700 text-white py-2 rounded-md hover:bg-teal-800 transition-colors duration-200"
          >
            {editingTask ? "Update Task" : "Add Task"}
          </button>
        </form>
        <ul className="mt-8">
          {tasks.map((task) => (
            <li
              key={task.id}
              className="border border-gray-300 p-4 mb-4 rounded-md flex justify-between items-center bg-gray-50 shadow-sm"
            >
              <div>
                <h2 className="font-bold text-lg text-gray-800">{task.name}</h2>
                <p className="text-gray-600">{task.description}</p>
                <p className="text-gray-500">Duration: {task.duration} hours</p>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => handleEdit(task)}
                  className="bg-yellow-500 text-white py-1 px-3 rounded-md hover:bg-yellow-600 transition-colors duration-200"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(task.id)}
                  className="bg-red-500 text-white py-1 px-3 rounded-md hover:bg-red-600 transition-colors duration-200"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Task;
