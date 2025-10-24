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

    case 'toggleCompleted': {
      const newTasks = currState.map((task) => {
        if (task.id == action.payload.id) {
          let newTask = {
            ...task,
            isDone: !task.isDone,
          };
          return newTask
        }
        return task;
      });
      localStorage.setItem('tasks', JSON.stringify(newTasks));
      return newTasks;
    }

    case 'getFromStorage': {
      const tasksList = JSON.parse(localStorage.getItem('tasks'));
      if (tasksList == null) {
        console.log(JSON.parse(localStorage.getItem('tasks')) == null);
        return [];
      } else {
        return tasksList;
      }

    }
    
    default: {
      throw Error('Unknown action: ' + action.type);
    }
  }
}
