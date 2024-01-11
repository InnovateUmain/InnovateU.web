import React, { useEffect, useState } from 'react';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import { IoMdCloseCircle } from "react-icons/io";
const Lodal = () => {
    const [width,setWidth]= useState(0);
    const [open, setOpen] = useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);
        useEffect(()=>{
          var w = window.innerWidth;
         if(w>=500){
          setWidth(500);
         }
         else{
          setWidth(350);
         }
          
         },[])
         const style = {
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          width: {width},
          bgcolor: 'background.paper',
          border: '2px solid purple',
          boxShadow: 24,
          borderRadius: "6px",
          p: 4,
        };

  return (
    <div>
      <Modal
  open={open}
  onClose={handleClose}
  aria-labelledby="modal-modal-title"
  aria-describedby="modal-modal-description"
>
  <Box sx={style}>
  <div className='absolute top-2 right-2 text-purple-600' onClick={handleClose}>
    <IoMdCloseCircle className='text-4xl'/>
    </div>
  
  </Box>
</Modal>
    </div>
  )
}

export default Lodal
