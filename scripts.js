import { initialData } from "./initialData.js";

/**
 * Application task state - array of task objects
 * @type {Array<Object>}
 */
let tasks = [...initialData];

/**
 * Tracks the ID of the currently selected task for editing
 * @type {number|null}
 */
let selectedTaskId = null;

/**
 * Initialize the application when DOM is loaded
 */
document.addEventListener("DOMContentLoaded", () => {
  renderTasks();
  setupModalEvents();
});

/**
 * Render all tasks into their correct columns based on status
 */
function renderTasks() {
  clearColumns();

  tasks.forEach((task) => {
    const taskCard = createTaskCard(task);
    const column = document.querySelector(
      `.column-div[data-status="${task.status}"] .tasks-container`,
    );

    if (column) {
      column.appendChild(taskCard);
    }
  });

  updateColumnCounts();
}

/**
 * Clears all task cards from the UI columns
 */
function clearColumns() {
  document
    .querySelectorAll(".tasks-container")
    .forEach((container) => (container.innerHTML = ""));
}

/**
 * Creates a DOM element representing a task card
 * @param {Object} task - The task object with id, title, description, status
 * @param {number} task.id - Unique identifier for the task
 * @param {string} task.title - Title of the task
 * @param {string} task.description - Description of the task
 * @param {string} task.status - Current status of the task
 * @returns {HTMLElement} The task card element
 */
function createTaskCard(task) {
  const taskDiv = document.createElement("div");
  taskDiv.classList.add("task-div");
  taskDiv.textContent = task.title;
  taskDiv.addEventListener("click", () => openTaskModal(task.id));
  return taskDiv;
}
/**
 * Opens the modal dialog and populates it with the selected task's information
 * @param {number} taskId - The ID of the task to display in the modal
 */
function openTaskModal(taskId) {
  const task = tasks.find((t) => t.id === taskId);
  if (!task) return;

  selectedTaskId = taskId;

  document.getElementById("task-title").value = task.title;
  document.getElementById("task-desc").value = task.description;
  document.getElementById("task-status").value = task.status;

  document.getElementById("task-modal").showModal();
}
/**
 * Closes the modal dialog
 */
function closeModal() {
  document.getElementById("task-modal").close();
}

/**
 * Saves the changes made in the modal to the selected task and updates the UI
 */
function saveTaskChanges() {
  const task = tasks.find((t) => t.id === selectedTaskId);
  if (!task) return;

  task.title = document.getElementById("task-title").value;
  task.description = document.getElementById("task-desc").value;
  task.status = document.getElementById("task-status").value;

  renderTasks();
  closeModal();
}
