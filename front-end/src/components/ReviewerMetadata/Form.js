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
import Compound from './InputTypes/Compound';
import Fraction from './InputTypes/Fraction';
import Radio from './InputTypes/Radio';
import TextField from './InputTypes/TextField';

// Custom styles
import './Form.css';

// Constants
import { questions } from './Constants';


export default function ReviewerMetadataForm() {
    // USER DATA
    const [userEmail, setUserEmail] = useState("");
    const [Data, setData] = useState({});
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

            if (label === "Email Address") {
                answerPlaceholders[label] = userEmail;
            }
            else if (type === "compound" && typeof(activeMetadata[label]) !== "object") {
                answerPlaceholders[label] = {"Yes/No": null, "How?": null};
            }
            else if (type === "fraction" && typeof(activeMetadata[label]) !== "object") {
                answerPlaceholders[label] = {"TV": null, "Literature": null};
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


    const getData = async () => {
        const requestOptions = {
            headers: {
              'Content-Type': 'application/json'
            }
        };

        await fetch("http://127.0.0.1:5000/-data", requestOptions)
            .then(function (response) {
                if (response.status !== 200) {
                    return Promise.reject(`${response.status} ${response.statusText}`);
                };

                return response.json();
            })
            .then(data => {
                setUserEmail(data.userEmail);
                setData(data);
            })
            .catch(error => {
                const text = `Failed to retrive user data. ${error.toString()}`;
                setAlertMessageObj({text, "severity": "error", "duration": 10_000});
                setAlertIsActive(true);
            });
    };


    const getMetadata = async () => {
        const requestOptions = {
            headers: {
              'Content-Type': 'application/json'
            }
        };

        await fetch("http://127.0.0.1:5000/-metadata", requestOptions)
            .then(function (response) {
                return response.json();
            })
            .then(response => {
                if (response === "Nothing") {
                    return Promise.reject(`${response.status} ${response.statusText}`);
                };

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
        return label === "Reviwer" || label === "Email Address";
    };


    const assignDefaultValue = (questionObj) => {
        const { label, type } = questionObj;
        let defaultValue;
        let defaultValue2;

        if (type === "number" && isNaN(activeMetadata[label])) {
            defaultValue = null;
        }
        else if (type === "compound") {
            try {
                defaultValue = activeMetadata[label]["Yes/No"];
                defaultValue2 = activeMetadata[label]["How?"];
            }
            catch {
                defaultValue = undefined;
                defaultValue2 = undefined;
            }    
        }
        else if (type === "fraction") {
            try {
                defaultValue = activeMetadata[label]["TV"];
                defaultValue2 = activeMetadata[label]["Literature"];
            }
            catch {
                defaultValue = undefined;
                defaultValue2 = undefined;
            }    
        }
        else if (label === "Email Address") {
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
        else if (type === "compound") {
            return <Compound inputSettings={inputSettings} />
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
        
        await fetch("http://127.0.0.1:5000/-metadata", requestOptions)
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
        getData();
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
                        Complete the form below to establish or update your reviewer metadata.
                    </Typography>
                </div>
                <form autoComplete="off" id="registrationForm" onSubmit={(event) => { event.preventDefault(); setConfirmationPromptIsOpen(true); }}>
                    { Object.keys(activeMetadata).length < 1 || Object.keys(answers).length === 0
                        ? <LoadingScreen />
                        : <>                   
                            <label className="groupHeader" variant="h5">
                                {"header1"}
                            </label>
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
