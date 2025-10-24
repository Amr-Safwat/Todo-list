export default function tasksReducer(currState, action) {
  switch (action.type) {
    case 'added': {
      let newTask = {
        id: action.id,
        taskName: action.taskName,
        taskInfo: action.taskInfo,
        isDone: action.isDone,
      };

      let updatedTasks = [...currState, newTask];

      localStorage.setItem('tasks', JSON.stringify(updatedTasks));
      return updatedTasks;
    }

    case 'delete': {
      let newTasks = currState.filter((task) => {
        return task.id == action.payload.id ? null : task;
      });
      localStorage.setItem('tasks', JSON.stringify(newTasks));
      return newTasks;
    }

    case 'edit': {
      const newTasks = currState.map((task) => {
        return task.id == action.payload.id
          ? {...task, taskName: action.payload.text}
          : task;
      });
      localStorage.setItem('tasks', JSON.stringify(newTasks));
      return newTasks;
    }

    case 'getFromStorage': {
      let tasksList = JSON.parse(localStorage.getItem('tasks'));
      return tasksList;
    }
    
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
