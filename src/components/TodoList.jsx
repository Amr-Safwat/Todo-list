import {
  Container,
  Button,
  TextField,
  Divider,
  ToggleButtonGroup,
} from '@mui/material';
import {useEffect, useState, useMemo} from 'react';
import Todo from './Todo';
import {v4 as uuid4} from 'uuid';
import {ToggleButton} from '@mui/material';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogActions from '@mui/material/DialogActions';

import {useContext} from 'react';
import {OpenSnackContext} from './contexts/SnackContext';

import { useTasks } from './contexts/todosContext';

export default function TodoList() {
  const {tasks, dispatch} = useTasks();
  const [inputValue, setInputValue] = useState('');
  const [listView, setListView] = useState('all');
  const [open, setOpen] = useState(false);
  const [taskId, setTaskId] = useState();
  const [openEditDialog, setopenEditDialog] = useState(false);
  const [editTaskId, setEditTaskId] = useState();
  const openSnack = useContext(OpenSnackContext);

  useEffect(() => {
    dispatch({type: 'getFromStorage'})
  }, []);  

  const completedTask = useMemo(() => {
    return tasks.filter((task) => {
      return task.isDone;
    });
  }, [tasks]);

  const notCompletedTask = useMemo(() => {
    return tasks.filter((task) => {
      return !task.isDone;
    });
  }, [tasks]);

  let tasksToBeRender = tasks;

  if (listView == 'done') {
    tasksToBeRender = completedTask;
  } else if (listView == 'notDone') {
    tasksToBeRender = notCompletedTask;
  } else {
    tasksToBeRender = tasks;
  }

  function addTask() {
    dispatch({
      type: 'added',
      id: uuid4(),
      taskName: inputValue,
      taskInfo: 'this is for details Task One',
      isDone: false,
    });
    setInputValue('');
    openSnack.showSnackbar('The task was added successfully');
  }

  function handleDelete(id) {
    dispatch({type: 'delete', payload: {id: id}});
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
    dispatch({type: 'edit', payload: {id: id, text: text}});
  }

  function viewTasks() {
    return tasksToBeRender.map((task) => {
      return (
        <Todo
          key={task.id}
          task={task}
          handleEdit={handleEdit}
          setOpen={setOpen}
          handleDeleteTask={handleDeleteTask}
          handleClickOpen={handleClickOpen}
          handleOpenEdit={handleOpenEdit}
        />
      );
    });
  }

  // Dialog Delete
  const handleClickOpen = (id) => {
    setTaskId(id);
    setOpen(true);
  };

  function handleDeleteTask(id) {
    handleClose(id);
  }

  function handleClose(value) {
    setOpen(false);
  }

  function DeleteTask(value) {
    value ? handleDelete(taskId) : null;
    setOpen(false);
    openSnack.showSnackbar('The task has been deleted');
  }
  // Dialog Delete/

  // Edit Dialog

  const handleOpenEdit = (id) => {
    setEditTaskId(id);
    setopenEditDialog(true);
  };

  const handleCloseEdit = () => {
    setopenEditDialog(false);
  };

  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const formJson = Object.fromEntries(formData.entries());
    const text = formJson.text;
    handleEdit(editTaskId, text);
    handleCloseEdit();
    openSnack.showSnackbar('The task has been modified');
  };
  // Edit Dialog/

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
        {/* Alert before delete */}
        <Dialog
          open={open}
          onClose={() => handleClose(false)}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">
            {'Are you sure, you want to delete this task?'}
          </DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Let Google help apps determine location. This means sending
              anonymous location data to Google, even when no apps are running.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => handleClose(false)}>No</Button>
            <Button onClick={() => DeleteTask(true)} autoFocus>
              delete
            </Button>
          </DialogActions>
        </Dialog>
        {/* /Alert before delete */}
      </Container>
      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseEdit}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the new task name, and task details
          </DialogContentText>
          <form id="subscription-form" onSubmit={handleSubmit}>
            <TextField
              autoFocus
              required
              margin="dense"
              id="name"
              name="text"
              label="Text Address"
              type="text"
              fullWidth
              variant="standard"
            />
          </form>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseEdit}>Cancel</Button>
          <Button type="submit" form="subscription-form">
            Edit
          </Button>
        </DialogActions>
      </Dialog>
      {/* Edit Dialog/ */}
    </>
  );
}
