import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { CloseOutlined } from "@ant-design/icons";

export default function AlertDialog({
  onConfirm,
  onCancel,
  title,
  message,
  id,
  rowIndex,
  label = "Hapus",
}) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    if (rowIndex) {
      onConfirm(id, rowIndex);
    } else {
      onConfirm(id);
    }
    handleClose();
  };

  const handleCancel = () => {
    onCancel();
    handleClose();
  };

  return (
    <div>
      <button
        type="button"
        className="hover:bg-red-400 text-red-600 hover:text-white transition-colors  text-xs font-normal py-2 px-2 rounded-md"
        onClick={handleClickOpen}
      >
        <CloseOutlined className="mr-2 mt-0.5 float float-left" /> {label}
      </button>
      <Dialog
        open={open}
        onClose={handleCancel}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title" className="font-bold">
          {" "}
          {title}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="alert-dialog-description">{message}</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel}>Tidak</Button>
          <Button onClick={handleConfirm} className="text-red-500">
            Ya
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
