import React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { CloseOutlined } from "@ant-design/icons";

export default function ConfirmDialog({ visible, onConfirm, onCancel, title, component, message, okText, cancelText }) {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = () => {
    onConfirm();
    setOpen(false);
  };

  const handleCancel = () => {
    onCancel();
    handleClose();
  };

  return (
    <div>
      <span onClick={handleClickOpen}>{component}</span>
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
          <Button onClick={handleCancel}>{cancelText ?? "Tidak"}</Button>
          <Button onClick={handleConfirm}>{okText ?? "Ya"}</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
