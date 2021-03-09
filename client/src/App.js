import { useEffect, useState } from "react";
import Customer from "./components/Customer";
import CustomerAdd from "./components/CustomerAdd";

import {
    Table,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Paper,
} from "@material-ui/core";
import { fade, makeStyles } from "@material-ui/core/styles";
import CircularProgress from "@material-ui/core/CircularProgress";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import IconButton from "@material-ui/core/IconButton";
import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import MenuIcon from "@material-ui/icons/Menu";
import SearchIcon from "@material-ui/icons/Search";

import "./App.css";

const useStyles = makeStyles((theme) => ({
    root: {
        width: "100%",
        minWidth: 1080,
    },
    paper: {
        marginLeft: 18,
        marginRight: 18,
    },
    progress: {
        margin: theme.spacing(2),
    },
    tableHead: {
        fontSize: "1.0rem",
    },
    menu: {
        marginTop: 15,
        marginBottom: 15,
        display: "flex",
        justifyContent: "center",
    },
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: "none",
        [theme.breakpoints.up("sm")]: {
            display: "block",
        },
    },
    search: {
        position: "relative",
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.common.white, 0.15),
        "&:hover": {
            backgroundColor: fade(theme.palette.common.white, 0.25),
        },
        marginLeft: 0,
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            marginLeft: theme.spacing(1),
            width: "auto",
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: "100%",
        position: "absolute",
        pointerEvents: "none",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
    },
    inputRoot: {
        color: "inherit",
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("sm")]: {
            width: "12ch",
            "&:focus": {
                width: "20ch",
            },
        },
    },
}));

function App() {
    const [customers, setCustomers] = useState("");
    const [completed, setCompleted] = useState(0);
    const [searchKeyword, setSearchKeyword] = useState("");

    const stateRefresh = () => {
        setCustomers("");
        setCompleted(0);
        setSearchKeyword("");
        callApi()
            .then((res) => setCustomers(res))
            .catch((err) => console.log(err));
    };

    useEffect(() => {
        const timer = setInterval(() => {
            setCompleted((prevProgress) =>
                prevProgress >= 100 ? 0 : prevProgress + 1
            );
        }, 200000);
        callApi()
            .then((res) => setCustomers(res))
            .catch((err) => console.log(err));
        return () => clearInterval(timer);
    }, []);

    const callApi = async () => {
        const response = await fetch("/api/customers");
        const body = await response.json();

        return body;
    };

    const handleValueChange = (e) => {
        const { value } = e.target;
        setSearchKeyword(value);
    };

    const classes = useStyles();
    const cellList = [
        "번호",
        "프로필 이미지",
        "이름",
        "생년월일",
        "성별",
        "직업",
        "설정",
    ];

    const filteredComponents = (data) => {
        data = data.filter((c) => {
            return c.name.indexOf(searchKeyword) > -1;
        });
        return data.map((c) => {
            return (
                <Customer
                    stateRefresh={stateRefresh}
                    key={c.id}
                    id={c.id}
                    image={c.image}
                    name={c.name}
                    birthday={c.birthday}
                    gender={c.gender}
                    job={c.job}
                />
            );
        });
    };

    return (
        <div className={classes.root}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        edge="start"
                        className={classes.menuButton}
                        color="inherit"
                        aria-label="open drawer"
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography className={classes.title} variant="h6" noWrap>
                        고객 관리 시스템
                    </Typography>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="검색하기"
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ "aria-label": "search" }}
                            name="searchKeyword"
                            value={searchKeyword}
                            onChange={handleValueChange}
                        />
                    </div>
                </Toolbar>
            </AppBar>
            <div className={classes.menu}>
                <CustomerAdd stateRefresh={stateRefresh} />
            </div>
            <Paper className={classes.paper}>
                <Table className={classes.table}>
                    <TableHead>
                        <TableRow>
                            {cellList.map((c) => {
                                return (
                                    <TableCell className={classes.tableHead}>
                                        {c}
                                    </TableCell>
                                );
                            })}
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {customers ? (
                            filteredComponents(customers)
                        ) : (
                            <TableRow>
                                <TableCell colSpan="6" align="center">
                                    <CircularProgress
                                        className={classes.progress}
                                        variant="determinate"
                                        value={completed}
                                    />
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </Paper>
        </div>
    );
}

export default App;
