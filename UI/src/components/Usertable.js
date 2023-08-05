import React,{useState} from 'react';
import {Table,TableContainer,TableRow,TableHead,TableCell,TableBody, makeStyles} from '@material-ui/core';
import { Paper } from '@mui/material';
import json from './Dummydata.json';

const tableStyle =makeStyles({
    table:{
        minWidth: '600px',
        // width:'fit-content'
    }
})

const Usertable = (props)=>{

    const tableClasses = tableStyle();

    const convertedJson = json.data.map(data=>{
        return{
            
            id:data.id,
            courseName:data.courseName?data.courseName:"null",
            boardName:data.boardName?data.boardName:"null",
            college:data.college?data.college:"null"
        }
    })

    const [tableData,setTableData] = useState(convertedJson);



    return (
        <>
        <TableContainer component={Paper}>
            <Table aria-label='customized table' className={tableClasses.table}>
                <TableHead>
                    <TableRow>
                        <TableCell>Id</TableCell>
                        <TableCell>Board Name</TableCell>
                        <TableCell>College Name</TableCell>
                        <TableCell>Course Name</TableCell>
                    </TableRow>
                </TableHead>
                <TableBody>
                    {
                        Object.values(tableData).map((row)=>(
                            <TableRow key={row.id}>
                                <TableCell>{row.id}</TableCell>
                                <TableCell>{row.courseName}</TableCell>
                                <TableCell>{row.boardName}</TableCell>
                                <TableCell>{row.college}</TableCell>
                            </TableRow>
                        ))
                    }
                </TableBody>

            </Table>

        </TableContainer>
        </>
    )
}


export default Usertable;

