import React from "react";
import { Link } from "react-router-dom";
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

export const listItems=(
    <>
    <Link  to='/regulated'>
        <ListItemButton>
        <ListItemIcon>
         <InboxIcon /> 
        </ListItemIcon>
        <ListItemText primary="Regulated" />
        </ListItemButton>
    </Link>

    <Link to='/private' >
        <ListItemButton>
        <ListItemIcon>
        <MailIcon /> 
        </ListItemIcon>
        <ListItemText primary="Organization" />
        </ListItemButton>
    </Link>

    <Link to='/platform' >
        <ListItemButton>
        <ListItemIcon>
         <InboxIcon /> 
        </ListItemIcon>
        <ListItemText primary="Private" />
        </ListItemButton>
    </Link>

    <Link to='/student' >
        <ListItemButton>
        <ListItemIcon>
        <MailIcon /> 
        </ListItemIcon>
        <ListItemText primary="Student" />
        </ListItemButton>
    </Link>
         
    </>
)
