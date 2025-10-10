import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';
import {useState} from 'react';

import Dialog from '@mui/material/Dialog';
import { Button } from '@mui/material';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import {TextField} from '@mui/material';

export default function Todo({task, handleCheck, handleDelete, handleEdit}) {
  const [open, setOpen] = React.useState(false);
  // Open and close to alert
  const handleClickOpen = () => {
    setOpen(true);
  };

  function handleClose(value)  {
    setOpen(false);
    value? handleDelete(task.id) : null;
  };
  // Open and close to alert/
  // Open and close edit dialog
    const [openEditDialog, setopenEditDialog] = React.useState(false);

    const handleOpenEdit = () => {
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
      console.log(text);
      handleEdit(task.id, text)
      handleCloseEdit();
    };
  // Open and close edit dialog/

  return (
    <>
      <Card
        sx={{
          backgroundColor: task.isDone ? 'green' : '',
          minWidth: 275,
          borderRadius: '10px',
          marginBottom: '5px',
        }}
      >
        <CardContent sx={{padding: '15px !important'}}>
          <Grid container spacing={1} sx={{textAlign: 'right'}}>
            <Grid
              size={5}
              sx={{}}
              display={'flex'}
              justifyContent={'start'}
              alignItems={'center'}
            >
              <IconButton
                aria-label="delete"
                // onClick={()=>{handleDelete(task.id)}}

                onClick={handleClickOpen}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton aria-label="edit" onClick={handleOpenEdit}>
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="check"
                onClick={() => {
                  handleCheck(task.id);
                }}
              >
                <CheckCircleOutlineIcon />
              </IconButton>
            </Grid>
            <Grid size={7}>
              <Typography
                gutterBottom
                sx={{color: 'text.secondary', fontSize: 16}}
              >
                {task.taskName}
              </Typography>
              <Typography
                gutterBottom
                sx={{color: 'text.secondary', fontSize: 12}}
              >
                this is for details Task One
              </Typography>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
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
          <Button onClick={() => handleClose(true)} autoFocus>
            delete
          </Button>
        </DialogActions>
      </Dialog>
      {/* /Alert before delete */}

      {/* Edit Dialog */}
      <Dialog open={openEditDialog} onClose={handleCloseEdit}>
        <DialogTitle>Edit Task</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Enter the new task name, and task details
          </DialogContentText>
          <form onSubmit={handleSubmit} id="subscription-form">
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
