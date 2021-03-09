import React, { useState } from "react";
import { post } from "axios";
import Dialog from "@material-ui/core/Dialog";
import DialogActions from "@material-ui/core/DialogActions";
import DialogContent from "@material-ui/core/DialogContent";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
    hidden: {
        display: "none",
    },
}));

function CustomerAdd({ stateRefresh }) {
    const [info, setInfo] = useState({
        file: null,
        userName: "",
        birthday: "",
        gender: "",
        job: "",
        fileName: "",
        open: false,
    });

    const { file, userName, birthday, gender, job, fileName } = info;

    const handleFormSubmit = (e) => {
        e.preventDefault();
        addCustomer().then((response) => {
            console.log(response.data);
            stateRefresh();
        });

        setInfo({
            file: null,
            userName: "",
            birthday: "",
            gender: "",
            job: "",
            fileName: "",
            open: false,
        });
    };

    const addCustomer = () => {
        const url = "/api/customers";
        const formData = new FormData();
        formData.append("image", file);
        formData.append("userName", userName);
        formData.append("birthday", birthday);
        formData.append("gender", gender);
        formData.append("job", job);

        const config = {
            headers: {
                "content-type": "multipart/form-data",
            },
        };

        return post(url, formData, config);
    };

    const handleFileChange = (e) => {
        const { value } = e.target;
        setInfo({
            ...info,
            file: e.target.files[0],
            fileName: value,
        });
    };

    const handleValueChange = (e) => {
        const { name, value } = e.target;
        setInfo({
            ...info,
            [name]: value,
        });
    };

    const handleClickOpen = () => {
        setInfo({
            ...info,
            open: true,
        });
    };

    const handleClickClose = () => {
        setInfo({
            file: null,
            userName: "",
            birthday: "",
            gender: "",
            job: "",
            fileName: "",
            open: false,
        });
    };

    const classes = useStyles();

    return (
        <div>
            <Button
                variant="contained"
                color="primary"
                onClick={handleClickOpen}
            >
                고객 추가하기
            </Button>
            <Dialog open={info.open} onClose={handleClickClose}>
                <DialogTitle>고객 추가</DialogTitle>
                <DialogContent>
                    <input
                        className={classes.hidden}
                        accept="image/*"
                        id="raised-button-file"
                        type="file"
                        file={file}
                        value={fileName}
                        onChange={handleFileChange}
                    />
                    <br />
                    <label htmlFor="raised-button-file">
                        <Button
                            variant="contained"
                            color="primary"
                            component="span"
                            name="file"
                        >
                            {fileName === "" ? "프로필 이미지 선택" : fileName}
                        </Button>
                    </label>
                    <br />
                    <TextField
                        label="이름"
                        type="text"
                        name="userName"
                        value={userName}
                        onChange={handleValueChange}
                    />
                    <br />
                    <TextField
                        label="생년월일"
                        type="text"
                        name="birthday"
                        value={birthday}
                        onChange={handleValueChange}
                    />
                    <br />
                    <TextField
                        label="성별"
                        type="text"
                        name="gender"
                        value={gender}
                        onChange={handleValueChange}
                    />
                    <br />
                    <TextField
                        label="직업"
                        type="text"
                        name="job"
                        value={job}
                        onChange={handleValueChange}
                    />
                    <br />
                </DialogContent>
                <DialogActions>
                    <Button
                        variant="contained"
                        color="primary"
                        onClick={handleFormSubmit}
                    >
                        추가
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
        </div>
    );
}

export default CustomerAdd;
