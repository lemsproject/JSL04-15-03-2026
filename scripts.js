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
