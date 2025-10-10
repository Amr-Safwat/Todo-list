import {
  Container,
  ButtonGroup,
  Button,
  TextField,
  Divider,
} from '@mui/material';
import {useEffect, useState} from 'react';
import Todo from './Todo';
import {v4 as uuid4} from 'uuid';


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

  const [tasksList, setTasksList] = useState(tasks);
  const [listView, setListView] = useState('all');

  useEffect(()=>{
    setTasks(JSON.parse(localStorage.getItem('tasks')));
  }, [])

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
    console.log(newTasks)
  }

  function handleCheckComplete(value) {
    const filterTasks = tasks.filter((task) => {
      if (value == 'all') {
        return task;
      } else if (value == 'done') {
        return task.isDone == true ? task : null;
      } else if (value == 'notDone') {
        return task.isDone == false ? task : null;
      }
    });
    if (value == 'done') {
      setListView('done');
      setTaskComplete(filterTasks);
    } else if (value == 'notDone') {
      setListView('notDone');
      setTaskNotComplete(filterTasks);
    } else if (value == 'all') {
      setListView('all');
    }
  }

  function handleEdit(id, text){
    const newTasks = tasks.map((task)=>{
      return task.id == id? task.taskName = text: null
    })
  }

  function viewTasks() {
    if (listView == 'all') {
      return tasks.map((task) => {
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
    } else if (listView == 'done') {
      return taskComplete.map((task) => {
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
    } else if (listView == 'notDone') {
      return taskNotComplete.map((task) => {
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
  }

  return (
    <>
      <Container
        maxWidth="xs"
        style={{textAlign: 'center', backgroundColor: '#ddd'}}
      >
        <h1>My Tasks</h1>
        <Divider />
        <ButtonGroup
          style={{margin: '15px'}}
          variant="contained"
          aria-label="Basic button group"
        >
          <Button
            onClick={() => {
              handleCheckComplete('all');
            }}
          >
            All
          </Button>
          <Button
            onClick={() => {
              handleCheckComplete('done');
            }}
          >
            Done
          </Button>
          <Button
            onClick={() => {
              handleCheckComplete('notDone');
            }}
          >
            Not Done
          </Button>
        </ButtonGroup>
        {viewTasks()}
        <div style={{paddingTop: '30px', paddingBottom: '30px', width: '100%'}}>
          <Button
            style={{marginRight: '10px', width: '60px'}}
            variant="contained"
            onClick={addTask}
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
