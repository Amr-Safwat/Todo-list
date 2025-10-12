import {
  Container,
  ButtonGroup,
  Button,
  TextField,
  Divider,
  ToggleButtonGroup,
} from '@mui/material';
import {useEffect, useState} from 'react';
import Todo from './Todo';
import {v4 as uuid4} from 'uuid';
import {ToggleButton} from '@mui/material';

export default function TodoList() {
  const [tasks, setTasks] = useState([
    {
      id: uuid4(),
      taskName: 'Task 1',
      taskInfo: 'this is for details Task One',
      isDone: false,
    },
  ]);
  const [taskComplete, setTaskComplete] = useState([]);
  const [taskNotComplete, setTaskNotComplete] = useState([]);
  const [inputValue, setInputValue] = useState('');

  // const [tasksList, setTasksList] = useState(tasks);
  const [listView, setListView] = useState('all');

  useEffect(() => {
    setTasks( JSON.parse(localStorage.getItem('tasks')) ?? []);
  }, []);

  const completedTask = tasks.filter((task) => {
    return task.isDone;
  });

  const notCompletedTask = tasks.filter((task) => {
    return !task.isDone;
  });

  let tasksToBeRender = tasks;

  if (listView == 'done') {
    tasksToBeRender = completedTask;
  } else if (listView == 'notDone') {
    tasksToBeRender = notCompletedTask;
  } else {
    tasksToBeRender = tasks;
  }

  function addTask() {
    let newTask = {
      id: uuid4(),
      taskName: inputValue,
      taskInfo: 'this is for details Task One',
      isDone: false,
    };

    const updateTasks = [...tasks, newTask];
    setTasks(updateTasks);
    localStorage.setItem('tasks', JSON.stringify(updateTasks));
    setInputValue('');
  }

  // localStorage.clear()

  function handleCheck(id) {
    const newTasks = tasks.map((task) => {
      if (task.id == id) {
        task.isDone = !task.isDone;
      }
      return task;
    });
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  }

  function handleDelete(id) {
    let newTasks = tasks.filter((task) => {
      return task.id == id ? null : task;
    });
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  }

  function handleCheckComplete(value) {
    if (value == 'done') {
      setListView(value); 
    } else if (value == 'notDone') {
      setListView(value);
    } else if (value == 'all') {
      setListView(value);
    }
  }

  function handleEdit(id, text) {
    const newTasks = tasks.map((task) => {
      return task.id == id ? {...task, taskName: text} : task;
    });
    setTasks(newTasks);
    localStorage.setItem('tasks', JSON.stringify(newTasks));
  }

  // let taskComplete = tasks

  function viewTasks() {
    return tasksToBeRender.map((task) => {
      return (
        <Todo
          key={task.id}
          task={task}
          handleCheck={handleCheck}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      );
    });
  }

  return (
    <>
      <Container
        maxWidth="xs"
        style={{textAlign: 'center', backgroundColor: '#ddd'}}
      >
        <h1>My Tasks</h1>
        <Divider />
        <ToggleButtonGroup
          value={listView}
          style={{margin: '15px'}}
          variant="contained"
          aria-label="Basic button group"
        >
          <ToggleButton
            value={'all'}
            onClick={() => {
              handleCheckComplete('all');
            }}
          >
            All
          </ToggleButton>
          <ToggleButton
            value={'done'}
            onClick={() => {
              handleCheckComplete('done');
            }}
          >
            Done
          </ToggleButton>
          <ToggleButton
            value={'notDone'}
            onClick={() => {
              handleCheckComplete('notDone');
            }}
          >
            Not Done
          </ToggleButton>
        </ToggleButtonGroup>
        <div className="tasks">{viewTasks()}</div>
        <div style={{paddingTop: '30px', paddingBottom: '30px', width: '100%'}}>
          <Button
            style={{marginRight: '10px', width: '60px'}}
            variant="contained"
            onClick={addTask}
            disabled={inputValue.length == 0}
          >
            Add
          </Button>
          <TextField
            size="small"
            sx={{width: '300px'}}
            id="outlined-basic"
            label="Task name"
            variant="outlined"
            value={inputValue}
            onChange={(event) => {
              setInputValue(event.target.value);
            }}
          />
        </div>
      </Container>
    </>
  );
}
