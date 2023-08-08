import React,{useState} from "react";
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Form from './FormPrivate';
const drawerWidth = 240;

const Private =(props)=>{

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


    const [tokenId,setTokenId] = useState("");

  

      const tokenChangeHandler = (event) => {
        setTokenId(event.target.value);
      };

      const submitHandler = (event) => {
        event.preventDefault();
        
        /// Check button implementation 
        //// put below inside a funcition.
        
      //  
      //   const organisationContract = new web3.eth.Contract(organizationAbi,organizationContractAddress);
      //  const result2 = await organisationContract.methods.validateTransacript("inputfromuser").call({form:account});
      //  console.log('check certi',result2);




        setTokenId("");
      
      };

      const closeHandler = ()=>{
        setTokenId("");
      }


    return(<>
     <Main open={props.open}>
        <DrawerHeader />
        <Box sx={style}>
          <Form type="Token" onClose={closeHandler}/>
        </Box>
      </Main>
    </>)
}


export default Private;