import React,{useState} from "react";
import { styled } from '@mui/material/styles';
import Form from './Form';
import Button from '@mui/material/Button';
import Web3 from "web3";
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Usertable from "../../components/Usertable";
import { regularBoardAbi,regularBoardContractAddress } from "./RegularBoard";


const drawerWidth = 240;

const Regulated =(props)=>{


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
      const [boardNameOptions,setBoardNameOptions]= ([]);


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
        <Button onClick={()=>(createHandler('Board'))}>Create Board</Button>
        <Button onClick={()=>(createHandler('College'))}>Create College</Button>
        <Button onClick={()=>(createHandler('Course'))}> Register Course as college</Button>
       
        <Modal
              open={isClicked}
              onClose={closeHandler}
              aria-labelledby="modal-modal-title"
              aria-describedby="modal-modal-description"
            >
              <Box sx={style}>
                <Form type={event} onClose={closeHandler} boardNameOptions={boardNameOptions}/>
              </Box>
            </Modal>
            <br/>
            <br/>
            <br/>
            <br/>
            {/* <Usertable/> */}
      </Main>
    </>)
}


export default Regulated;