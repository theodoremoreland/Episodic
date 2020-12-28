// React
import React, {useState, useEffect} from 'react';

// Material UI
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

// Custom Components
import Alert from '../Alert';
import ConfirmationPrompt from '../ConfirmationPrompt';
import LoadingScreen from './LoadingScreen/LoadingScreen';
import Checkbox from './InputTypes/Checkbox';
import Fraction from './InputTypes/Fraction';
import Radio from './InputTypes/Radio';
import TextField from './InputTypes/TextField';

// Custom styles
import './Form.css';

// Constants
import { questions } from './Constants';

export default function ReviewerMetadataForm() {
    // USER DATA
    const userEmail = "dev5@demo.dev";
    const [activeMetadata, setActiveMetaData] = useState({});
    // FORM STATE
    const [answers, setAnswers] = useState({});
    const [previousSubmission, setPreviousSubmission] = useState(null);
    // CONFIRMATION PROMPT STATE
    const [confirmationPromptIsOpen, setConfirmationPromptIsOpen] = useState(false);
    // ALERT STATE
    const [alertIsActive, setAlertIsActive] = useState(false);
    const [alertMessageObj, setAlertMessageObj] = useState({"severity": "", "text": "", "duration": 0});


    const initializeAnswers = () => {
        // Creates necessary data structures for answer data.
        // Adds active metadata to answer data where applicable.

        const answerPlaceholders = {};

        for (let question of questions) {
            const label = question.label;
            const type = question.type;

            if (label === "Email") {
                answerPlaceholders[label] = userEmail;
            }
            else if (type === "fraction" && typeof(activeMetadata[label]) !== "object") {
                answerPlaceholders[label] = {"anime": null, "manga": null};
            }
            else if (type === "checkbox" && !Array.isArray(activeMetadata[label])) {
                answerPlaceholders[label] = [];
            }
            else if (activeMetadata[label] !== undefined) {
                answerPlaceholders[label] = activeMetadata[label];
            }
            else {
                answerPlaceholders[label] = null;
            }
        }
        setAnswers(answerPlaceholders);
    };


    const getMetadata = async () => {
        const requestOptions = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
        };

        await fetch(`${process.env.REACT_APP_EPISODIC_API_ENDPOINT}/get-reviewer-metadata?email=${userEmail}`, requestOptions)
            .then(function (response) {
                if (response.status !== 200) {
                    return Promise.reject(`${response.status} ${response.statusText}`);
                };

                return response.json();
            })
            .then(response => {
                setActiveMetaData(response);
            })
            .catch(error => {
                const text = `No previous metadata found. Complete the form to create first entry.`;
                setActiveMetaData({error});
                setAlertMessageObj({text, "severity": "warning", "duration": 6_000});
                setAlertIsActive(true);
            });
    };


    const fieldShouldBeDisabled = (label) => {
        return label === "Reviewer" || label === "Email";
    };


    const assignDefaultValue = (questionObj) => {
        const { label, type } = questionObj;
        let defaultValue;
        let defaultValue2;

        if (type === "number" && isNaN(activeMetadata[label])) {
            defaultValue = null;
        }
        else if (type === "fraction") {
            try {
                defaultValue = activeMetadata[label]["anime"];
                defaultValue2 = activeMetadata[label]["manga"];
            }
            catch {
                defaultValue = undefined;
                defaultValue2 = undefined;
            }    
        }
        else if (label === "Email") {
            defaultValue = userEmail;
        }
        else {
            defaultValue = activeMetadata[label];
        }
        return {defaultValue, defaultValue2};
    };


    const renderQuestion = (questionObj) => {
        const { 
            label,
            label2,
            type,
            multiline,
            options
         } = questionObj;
        const {defaultValue, defaultValue2} = assignDefaultValue(questionObj);
        const disabled = fieldShouldBeDisabled(label);
        const inputSettings = {
            "key": label,
            label,
            label2,
            defaultValue,
            defaultValue2,
            options,
            type,
            disabled,
            multiline,
            answers,
            setAnswers
        };

        if (type === "radio") {
            return <Radio inputSettings={inputSettings} />
        }
        else if (type === "checkbox") {
            return <Checkbox inputSettings={inputSettings} />
        }
        else if (type === "fraction") {
            return <Fraction inputSettings={inputSettings} />
        }
        else {
            return <TextField inputSettings={inputSettings} />
        }
    };


    const submitMetadata = async () => {
        const newSubmission = JSON.stringify({...answers});

        if (newSubmission === previousSubmission) {
            setAlertMessageObj({text: "Cannot submit the same data twice.", "severity": "warning", "duration": 6_000});
            setAlertIsActive(true);
            return undefined;
        }

        const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body : newSubmission,
        };
        
        await fetch(`${process.env.REACT_APP_EPISODIC_API_ENDPOINT}/submit-reviewer-metadata`, requestOptions)
            .then(async response => {

                if (response.status !== 201) {
                    return Promise.reject(response.statusText);
                }

                setPreviousSubmission(newSubmission);
                setAlertMessageObj({"text": "Metadata for your account has been successfully submitted!", "severity": "success", "duration": 6_000});
                setAlertIsActive(true);
            })
            .catch(error => {
                setAlertMessageObj({"text": error.toString(), "severity": "error", "duration": 10_000});
                setAlertIsActive(true);
            });
    };


    // Fetch previously submitted  data on load.
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top of page.
        getMetadata();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Ensures that Form state and Form view are in sync. 
    useEffect(() => {
        initializeAnswers();
    }, [activeMetadata]); // eslint-disable-line react-hooks/exhaustive-deps


    return (
        <>
            <section className="form-section">
                <div className="formHeader">
                    <Typography className="pageTitle" variant="h2">
                        Reviewer Metadata
                    </Typography>
                    <Typography className="form-description" variant="h6">
                        Complete the form below to establish or update your reviewer profile.
                        This data is used to find correlations between reviews and reviewers.
                    </Typography>
                </div>
                <form autoComplete="off" id="registrationForm" onSubmit={(event) => { event.preventDefault(); setConfirmationPromptIsOpen(true); }}>
                    { Object.keys(activeMetadata).length < 1 || Object.keys(answers).length === 0
                        ? <LoadingScreen />
                        : <>                   
                            { questions.map((questionObj) => renderQuestion(questionObj)) }

                            <Button
                                id="submit-button"
                                type="submit"
                                variant="contained"
                                color="primary"
                            >
                                Submit
                            </Button>
                        </>
                    }
                </form>  
            </section>

            <ConfirmationPrompt 
                answers={answers}
                confirmationPromptIsOpen={confirmationPromptIsOpen}
                setConfirmationPromptIsOpen={setConfirmationPromptIsOpen}
                submit={submitMetadata}
            />
            
            <Alert 
                alertMessageObj={alertMessageObj}
                alertIsActive={alertIsActive}
                setAlertIsActive={setAlertIsActive}
            />
        </>      
    );
};
