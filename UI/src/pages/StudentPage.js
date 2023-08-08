import React,{useState} from "react";
import { styled } from '@mui/material/styles';
import Form from './Regulated/Form';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Usertable from "../components/Usertable";


const drawerWidth = 240;

const StudentPage =(props)=>{


  const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
  };
  

    const Main = styled('main', { shouldForwardProp: (prop) => prop !== 'open' })(
        ({ theme, open }) => ({
          flexGrow: 1,
          padding: theme.spacing(3),
          transition: theme.transitions.create('margin', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          marginLeft: `-${drawerWidth}px`,
          ...(open && {
            transition: theme.transitions.create('margin', {
              easing: theme.transitions.easing.easeOut,
              duration: theme.transitions.duration.enteringScreen,
            }),
            marginLeft: 0,
          }),
        }),
      );

      const DrawerHeader = styled('div')(({ theme }) => ({
        display: 'flex',
        alignItems: 'center',
        padding: theme.spacing(0, 1),
        // necessary for content to be below app bar
        ...theme.mixins.toolbar,
        justifyContent: 'flex-end',
      }));


      const [isClicked,setIsClicked] = useState(false);
      const [event,setEvent] = useState('');


      const createHandler =(e)=>{
         setIsClicked(true);
         setEvent(e);
      }

      const closeHandler = ()=>{
        setIsClicked(false);
      }

    return(<>
     <Main open={props.open}>
        <DrawerHeader />
        <Button onClick={()=>(createHandler('RegisterCollege'))}> Admission in Regulated</Button>
        <Button onClick={()=>(createHandler('Student'))}>Enroll to Regulated</Button>
        <Button onClick={()=>(createHandler('RegCertificate'))}>Regulated Certificate</Button>
        <Button onClick={()=>(createHandler('PrivateReg'))}>Register to Private</Button>
        <Button onClick={()=>(createHandler('StudentPlatform'))}>Enroll to Private</Button>
        <Button onClick={()=>(createHandler('PriCertificate'))}> Private Certificate</Button>
        <Modal
              open={isClicked}
              onClose={closeHandler}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Form type={event} onClose={closeHandler}/>
              </Box>
            </Modal>
            {/* <Usertable/> */}
      </Main>
    </>)
}


export default StudentPage;