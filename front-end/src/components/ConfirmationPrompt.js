
// React
import React from 'react';

// Material UI
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

export default function ConfirmationPrompt(props) {
    const {
        answers,
        confirmationPromptIsOpen,
        setConfirmationPromptIsOpen,
        submit
    } = props;
    
    const closeConfirmationPrompt = () => {
        setConfirmationPromptIsOpen(false);
    };

    const confirmSubmission = () => {
        submit();
        setConfirmationPromptIsOpen(false);
    };

    const answerREPR = (answer) => {
        let string = "";

        if (answer === null || answer === undefined) {
            string = "null";
        }
        else if (Array.isArray(answer)) {
            string += "[";
            const finalElement = answer[answer.length - 1];
            for (let element of answer) {
                string += element;
                string = element !== finalElement ? string + ", " : string;
            }
            string += "]";
        }
        else if (typeof(answer) === "object") {
            const keys = Object.keys(answer);
            const finalKey = keys[keys.length - 1];
            for (let key of keys) {
                string += `${key}: ${answer[key]}`;
                string = key !== finalKey ? string + " | " : string;
            }
        }
        else {
            string = answer;
        }
        return string;
    };
    
    return (
        <>
            {/* -----------CONFIRMATION PROMPT AFTER SUBMIT----------- */}
            <Dialog
                open={confirmationPromptIsOpen}
                onClose={closeConfirmationPrompt}
                aria-labelledby="confirmationTitle"
                aria-describedby="confirmationBody"
            >
                <DialogTitle id="confirmationTitle">Submit the following data?</DialogTitle>
                <DialogContent>
                    { Object.keys(answers).map(answer => 
                        <div key={`confirm-${answer}`}>
                            <h4 className="confirmationQuestion">
                                {answer}:
                            </h4>
                            <DialogContentText id="confirmationBody">
                                {answerREPR(answers[answer])}
                            </DialogContentText>
                        </div>
                        )
                    }
                </DialogContent>
                <DialogActions>
                <Button onClick={confirmSubmission} color="primary">
                    Submit
                </Button>
                <Button onClick={closeConfirmationPrompt} color="primary" autoFocus>
                    Cancel
                </Button>
                </DialogActions>
            </Dialog>
        </>
    );
}