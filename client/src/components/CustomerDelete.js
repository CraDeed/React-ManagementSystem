import React, { useState } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";

function CustomerDelete({ stateRefresh, id }) {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClickClose = () => {
        setOpen(false);
    };

    const deleteCustomer = (id) => {
        const url = "/api/customers/" + id;
        fetch(url, {
            method: "DELETE",
        });

        stateRefresh();
    };

    return (
        <>
            <Button
                variant="contained"
                color="secondary"
                onClick={handleClickOpen}
            >
                삭제
            </Button>
            <Dialog open={open} onClose={handleClickClose}>
                <DialogTitle onClose={handleClickClose}>삭제 경고</DialogTitle>
                <DialogContent>
                    <Typography gutterBottom>
                        선택한 고객 정보가 삭제됩니다.
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={(e) => deleteCustomer(id)}
                    >
                        삭제
                    </Button>
                    <Button
                        variant="outlined"
                        color="primary"
                        onClick={handleClickClose}
                    >
                        닫기
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}

export default CustomerDelete;
