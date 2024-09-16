// import React, { useState } from "react";
// import {
//   Stepper,
//   Step,
//   StepLabel,
//   Button,
//   Typography,
// } from "@material-ui/core";
// import { makeStyles } from "@material-ui/core/styles";
// import RegisterBuyComponent from "./RegisterBuyComponent";
// import RegisterLoteComponent from "./RegisterLoteComponent";
// import RegisterMoveInventoryComponent from "./RegisterMoveInventoryComponent";
// import { Paper } from "@mui/material";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     width: "100%",
//     display: "flex",
//     flexDirection: "column",
//     justifyContent: "center",
//     alignItems: "center",
//     marginTop: theme.spacing(1),
//   },
//   button: {
//     marginRight: theme.spacing(1),
//   },
//   instructions: {
//     marginTop: theme.spacing(2),
//     marginBottom: theme.spacing(2),
//   },
// }));

// function getSteps() {
//   return ["Registro de Compra", "Movimiento de Inventario"];
// }

// function getStepContent(stepIndex, products, proveedores) {
//   switch (stepIndex) {
//     case 0:
//       return (
//         <RegisterBuyComponent products={products} proveedores={proveedores} />
//       );
//     case 1:
//       return <RegisterMoveInventoryComponent />;
//     default:
//       return "Paso desconocido";
//   }
// }
// const FormInventoryComponent = ({ products, proveedores }) => {
//   const classes = useStyles();
//   const [activeStep, setActiveStep] = useState(0);
//   const steps = getSteps();

//   const handleNext = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep + 1);
//   };

//   const handleBack = () => {
//     setActiveStep((prevActiveStep) => prevActiveStep - 1);
//   };

//   const handleReset = () => {
//     setActiveStep(0);
//   };

//   return (
//     <Paper
//       elevation={3}
//       style={{
//         padding: "20px",
//         backgroundColor: "#fff",
//         boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
//         marginTop: "1rem",
//       }}
//     >
//       <div className={classes.root}>
//         <div style={{ width: "70%" }}>
//           <Stepper activeStep={activeStep}>
//             {steps.map((label) => (
//               <Step key={label}>
//                 <StepLabel>{label}</StepLabel>
//               </Step>
//             ))}
//           </Stepper>
//         </div>
//         <div style={{ width: "100%", padding: "1rem" }}>
//           {activeStep === steps.length ? (
//             <div>
//               <Typography className={classes.instructions}>
//                 Todos los pasos completados
//               </Typography>
//               <Button onClick={handleReset} className={classes.button}>
//                 Reiniciar
//               </Button>
//             </div>
//           ) : (
//             <div style={{ width: "100%" }}>
//               {getStepContent(activeStep, products, proveedores)}
//               <div style={{ display: "flex", justifyContent: "flex-end" }}>
//                 <Button
//                   disabled={activeStep === 0}
//                   onClick={handleBack}
//                   className={classes.button}
//                 >
//                   Atrás
//                 </Button>
//                 <Button
//                   variant="contained"
//                   color="primary"
//                   onClick={handleNext}
//                   className={classes.button}
//                 >
//                   {activeStep === steps.length - 1 ? "Finalizar" : "Siguiente"}
//                 </Button>
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </Paper>
//   );
// };

// export default FormInventoryComponent;
