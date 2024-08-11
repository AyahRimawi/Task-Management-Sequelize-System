// controllers/taskController.js
const Task = require("../models/taskModel"); // تأكد من أن المسار صحيح إلى نموذج المهمة

const addTask = async (req, res) => {
  const { userId, title, description } = req.body;
  console.log("Received request to add task:", { userId, title, description });

  try {
    // استخدام Sequelize لإنشاء مهمة جديدة
    const newTask = await Task.create({
      user_id: userId, // تأكد من أن اسم العمود هو user_id
      title,
      description,
    });
    console.log("Task created successfully:", newTask);
    res.status(200).json(newTask);
  } catch (err) {
    console.error("Error adding task:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const getTasks = async (req, res) => {
  const userId = req.params.id;
  console.log("Received request to get tasks for user:", userId);
  if (!userId) {
    return res.status(400).json({ message: "User ID is required" });
  }

  try {
    // استخدام Sequelize للبحث عن المهام الخاصة بالمستخدم
    const tasks = await Task.findAll({ where: { user_id: userId } });
    if (tasks.length === 0) {
      return res.status(404).json({ message: "No tasks found for this user" });
    }
    console.log("Tasks retrieved successfully:", tasks);
    res.status(200).json(tasks);
  } catch (err) {
    console.error("Error retrieving tasks:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const updateTask = async (req, res) => {
  const id = req.params.id;
  const { title, description } = req.body;
  console.log("Received request to update task:", { id, title, description });
  if (!title && !description) {
    return res.status(400).json({
      message:
        "At least one field (title or description) is required to update",
    });
  }
  try {
    // استخدام Sequelize لتحديث المهمة
    const [updated] = await Task.update(
      { title, description },
      { where: { id } }
    );

    if (updated) {
      const updatedTask = await Task.findByPk(id);
      console.log("Task updated successfully:", updatedTask);
      res.status(200).json(updatedTask);
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (err) {
    console.error("Error updating task:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

const deleteTask = async (req, res) => {
  const { id } = req.body;
  console.log("Received request to delete task:", id);

  try {
    // استخدام Sequelize لحذف المهمة
    const deleted = await Task.destroy({ where: { id } });

    if (deleted) {
      console.log("Task deleted successfully:", id);
      res.status(200).json({ message: "Task deleted" });
    } else {
      res.status(404).json({ message: "Task not found" });
    }
  } catch (err) {
    console.error("Error deleting task:", err.message);
    res.status(500).json({ message: "Server error" });
  }
};

module.exports = { addTask, getTasks, updateTask, deleteTask };
