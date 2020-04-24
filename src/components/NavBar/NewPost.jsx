import React, { useState } from "react";
import Container from "@material-ui/core/Container";

import TextField from "@material-ui/core/TextField";
import Typography from "@material-ui/core/Typography";

import { makeStyles } from "@material-ui/core";
import CircularProgress from "@material-ui/core/CircularProgress";
import Button from "@material-ui/core/Button";
import TextareaAutosize from "@material-ui/core/TextareaAutosize";
import Modal from "@material-ui/core/Modal";
import Step from "@material-ui/core/Step";
import StepLabel from "@material-ui/core/Modal";
import StepContent from "@material-ui/core/StepContent";
import Stepper from "@material-ui/core/Stepper";
import Paper from "@material-ui/core/Paper";





import { useAuth } from "../../contexts/user.provider";

const useStyles = makeStyles((theme) => ({
  formControl: {
    marginTop: 200,
    textAlign: "center",
    backgroundColor: "#eef",
    padding: 50,
  },
  modal: {
    position: "absolute",
    width: 400,
  },
  form: {
    textAlign: "center",
  },
  image: {
    maxWidth: 64,
    margin: "20px auto 20px auto",
  },
  pageTitle: {
    margin: "10px auto 10px auto",
  },
  textField: {
    margin: "10px auto 10px auto",
  },
  textArea: {
    margin: "10px auto 10px auto",
    witdh: '100%'
  },
  button: {
    marginTop: 20,
    position: "relative",
  },
  customError: {
    color: "red",
    fontSize: "0.8rem",
    marginTop: 16,
  },
  progress: {
    position: "absolute",
  },
  stepperButton: {
    marginTop: theme.spacing(1),
    marginRight: theme.spacing(1),

  }
}));

const getSteps =  () => ['Create a post', 'Make a plan'];
const getStepContent = (step) => {
    switch (step) {
        case 0: return 'Automatically Created';
        case 1: return 'Pick a date for the plan. You can go back to step-1 if you do not want to make a plan now';
        default:
        return 'Unknown Step'
    }
}

const NewPost = () => {
  const classes = useStyles();
  const auth = useAuth();
  const authErrors = auth.errors;
  const authUser = auth.user;
    const steps = getSteps();

  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const [modalOpen, setModalOpen] = useState(false);
  const [errors, setErrors] = useState({
    url: "",
    title: "",
    description: "",
    dates: "",
  });

  const [post, setPost] = useState({
    url: "",
    title: "",
    description: "",
    pictureUrl: "",
    status: "created",
    dates: {
      created: new Date().toDateString(),
      planned: "",
      postponed: "",
      cancelled: "",
      completed: "",
    },
    tag: [],
  });

  const [activeStep, setActiveStep] = useState();
   
  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };


  const handleModalOpen = () => {
    setModalOpen(true);
  };

  const handleModalClose = () => {
    setModalOpen(false);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

  };

  const handleChange = (e) => {
    setPost({ ...post, [e.target.name]: e.target.value });
  };



  const ModalBody = (
    <Container
      maxWidth="md"
      disableGutters={true}
      className={classes.formControl}
    >
      <Typography variant="h4">NEW POST</Typography>
      <form noValidate onSubmit={handleSubmit}>
        <TextField
          id="url"
          name="url"
          type="text"
          label="URL"
          className={classes.textField}
          helperText={errors.url}
          error={errors.url ? true : false}
          value={post.url}
          defaultValue="Title, Description and ImageUrl will be set when this field is filled"
          onChange={handleChange}
          fullWidth
          required
        />
        <TextField
          id="title"
          name="title"
          type="text"
          label="Title"
          className={classes.textField}
          helperText={errors.title}
          error={errors.title ? true : false}
          value={post.title}
          onChange={handleChange}
          fullWidth
          required
        />
    

        <TextField
          id="description"
          name="description"
          type="text"
          label="Description"
          className={classes.textArea}
          helperText={errors.description}
          error={errors.description ? true : false}
          value={post.description}
          onChange={handleChange}
          fullWidth
          multiline
          required
        />


        <TextField
          id="image"
          name="image"
          type="text"
          label="Image Url"
          className={classes.textArea}
          helperText={errors.image}
          error={errors.image ? true : false}
          value={post.imageUrl}
          onChange={handleChange}
          fullWidth
          multiline
          required
        />  
        
      {/* <Stepper activeStep={activeStep} orientation="vertical">
        {steps.map((label, index) => (
          <Step key={label}>
            <StepLabel>{label}</StepLabel>
            <StepContent>
              <Typography>{getStepContent(index)}</Typography>
              <div className={classes.actionsContainer}>
                <div>
                  <Button
                    disabled={activeStep === 0}
                    onClick={handleBack}
                    className={classes.stepperButton}
                  >
                    Back
                  </Button>
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={handleNext}
                    className={classes.stepperButton}
                  >
                    {activeStep === steps.length - 1 ? 'Finish' : 'Next'}
                  </Button>
                </div>
              </div>
            </StepContent>
          </Step>
        ))}
      </Stepper>
      {activeStep === steps.length && (
        <Paper square elevation={0} className={classes.resetContainer}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} className={classes.stepperButton}>
            Reset
          </Button>
        </Paper>
      )}
     */}
      
        <Button
          type="submit"
          variant="contained"
          color="primary"
          className={classes.button}
          disabled={authUser.loading}
        >

          Submit
          {authUser.loading && (
            <CircularProgress size={30} className={classes.progress} />
          )}
        </Button>
      </form>
    </Container>
  );

  return (
    <React.Fragment>
      <Button color="inherit" onClick={handleModalOpen}>
        NEW
      </Button>
      <Modal
        open={modalOpen}
        onClose={handleModalClose}
        aria-labelledby="Login"
      >
        {ModalBody}
      </Modal>
    </React.Fragment>
  );
};

export default NewPost;
