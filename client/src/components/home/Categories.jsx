import Banner from "./Banner";
import Posts from "./Posts";
import {Button, makeStyles, Table, TableBody, TableCell, TableHead, TableRow} from "@material-ui/core";
import {categories} from "../../constants/data";
import {Link} from "react-router-dom";

const useStyle = makeStyles({
    create: {
        margin: 20,
        background: '#6495ED',
        color: '#fff',
    },
    table: {
        border: '1px solid rgba(224, 224, 224, 1)'
    },
    write: {
        margin: 20,
        width: '85%',
        background: '#6495ED',
        color: '#fff',
        textDecoration: 'none'
    },
    link: {
        textDecoration: 'none',
        color: 'inherit'
    }
})
const Categories = () => {
    const classes = useStyle();
    return (
        <>
            <Link to='create' className={classes.link}><Button variant="contained" className={classes.create}>Create
                Blog</Button></Link>
            <Table className={classes.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>
                            <Link className={classes.link} to={`/`}>
                                All Categories
                            </Link>
                        </TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        categories.map(category => (
                            <TableRow>
                                <TableCell>
                                    <Link className={classes.link} to={`/?category=${category}`}>{category}</Link>
                                </TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>
            </Table>
        </>
    )
}
export default Categories;