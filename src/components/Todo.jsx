import * as React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import DeleteIcon from '@mui/icons-material/Delete';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import IconButton from '@mui/material/IconButton';
import EditIcon from '@mui/icons-material/Edit';


export default function Todo({
  task,
  handleCheck,
  setOpen,
  handleEdit,
  handleDeleteTask,
  handleClickOpen,
  handleOpenEdit,
}) {
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
                onClick={() => handleClickOpen(task.id)}
              >
                <DeleteIcon />
              </IconButton>
              <IconButton aria-label="edit" onClick={() => handleOpenEdit(task.id)}>
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
    </>
  );
}
