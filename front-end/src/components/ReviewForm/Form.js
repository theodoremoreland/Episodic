// React
import React, {useState, useEffect} from 'react';

// Material UI
import Button from '@material-ui/core/Button';
import FormControl from '@material-ui/core/FormControl';
import Typography from '@material-ui/core/Typography';

// Custom utils
import { toPartialISOString } from './DateFormatters';
import { determineCurrentSaturday } from './DateFilters';

// Custom Components
import Alert from '../Alert';
import ConfirmationPrompt from '../ConfirmationPrompt';
import LoadingScreen from './LoadingScreen/LoadingScreen';
import DatePicker from './InputTypes/DatePicker';
import SingleTextField from './InputTypes/SingleTextField';
import DoubleDropdown from './InputTypes/DoubleDropdown';
import Elaborate from './InputTypes/Elaborate';
import Dropdown from './InputTypes/Dropdown';

// Custom styles
import './Form.css';


export default function ReviewForm() {
    // USER DATA
    const userEmail = "dev@demo.dev";
    // FORM STATE
    const [date, setDate] = useState(determineCurrentSaturday());
    const [series, setSeriesData] = useState(undefined);
    const [questions, setQuestions] = useState([]);
    const [answers, setAnswers] = useState({"Week Ending" : toPartialISOString(date)});
    const [answersOnReset, setAnswersOnReset] = useState(null);
    // CONFIRMATION PROMPT STATE
    const [confirmationPromptIsOpen, setConfirmationPromptIsOpen] = useState(false);
    // ALERT STATE
    const [alertIsActive, setAlertIsActive] = useState(false);
    const [alertMessageObj, setAlertMessageObj] = useState({text: "", severity: "", duration: 0});

    
    const initializeAnswers = (questions, userEmail) => {
        const placeholderAnswers = {};
    
        questions.forEach(obj => {
            if (obj.inputType === "DoubleDropdown") {
                placeholderAnswers[obj.question] = { "anime" : null, "manga" : null };
            }
            else if (obj.question === "Email") {
                placeholderAnswers[obj.question] = userEmail;
            }
            else if (obj.question === "Series") {
                placeholderAnswers[obj.question] = series[0];
            }
            else {
                placeholderAnswers[obj.question] = null;
            }
        });
    
        setAnswers({...answers, ...placeholderAnswers});
        setAnswersOnReset({...answers, ...placeholderAnswers}); // Image of form data before user updates.
    };


    const getSeries = async () => {
        const requestOptions = {
            method: 'GET',
            headers: {
              'Content-Type': 'application/json'
            }
        };

        await fetch(`${process.env.REACT_APP_EPISODIC_API_ENDPOINT}/series`, requestOptions)
            .then(function (response) {
                if (response.status !== 200) {
                    return Promise.reject(`${response.status} ${response.statusText}`);
                };

                return response.json();
            })
            .then(function (data) {
                setSeriesData(data);
            })
            .catch(error => {
                const text = `Failed to retrive user series data. ${error.toString()}`;
                setAlertMessageObj({
                    text,
                    "severity": "error",
                    "duration": 10_000
                });
                setAlertIsActive(true);
            });
    };


    const getQuestions = async () => {
        const requestOptions = {
            headers: {
              'Content-Type': 'application/json'
            }
        };

        await fetch(`${process.env.REACT_APP_EPISODIC_API_ENDPOINT}/get-review-questions`, requestOptions)
            .then(function (response) {
                if (response.status !== 200) {
                    return Promise.reject(`${response.status} ${response.statusText}`);
                };

                return response.json();
            })
            .then(function (data) {
                console.log(data)
                setQuestions(data);
                initializeAnswers(data, userEmail, series);
            })
            .catch(error => {
                setAlertMessageObj({
                    "text": `Failed to retrieve questions ${error.toString()}`,
                    "severity": "error",
                    "duration": 10_000
                })
                setAlertIsActive(true);
            });
    };


    const renderQuestion = (questionObj) => {
        const email = userEmail;
        const { 
            question,
            hoverText,
            inputType,
            required,
         } = questionObj;

        const inputSettings = {
            "key": question,
            question,
            hoverText,
            required,
            inputType,
            series,
            email,
            answers,
            setAnswers
        };

        if (inputType === "SingleTextField") {
            return <SingleTextField inputSettings={inputSettings} />
        }
        else if (inputType === "DoubleDropdown") {
            return <DoubleDropdown inputSettings={inputSettings} />
        }
        else if (inputType === "Elaborate") {
            return <Elaborate inputSettings={inputSettings} />
        }
        else if (question === "Series") {
            return <Dropdown inputSettings={inputSettings} options={series} />
        }
        else if (inputType === "Dropdown") {
            return <Dropdown inputSettings={inputSettings} options={[null, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10]} />
        }
    };


    const submitReviews = async () => {
        const requestOptions = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body : JSON.stringify({...answers}),
            response: true
        };
        
        await fetch(`${process.env.REACT_APP_EPISODIC_API_ENDPOINT}/submit-review`, requestOptions)
            .then(async response => {

                if (response.status !== 201) {
                    return Promise.reject(response.statusText);
                }

                setAlertMessageObj({
                    "text": "Your review has been successfully submitted! You can now submit another review or exit.",
                    "severity": "success",
                    "duration": 6_000
                });
                setAlertIsActive(true);
                setAnswers(answersOnReset);
                document.querySelector("form").reset();
            })
            .catch(error => {
                setAlertMessageObj({
                    "text": `There was an error: ${error.toString()}`,
                    "severity": "error",
                    "duration": 10_000
                })
                setAlertIsActive(true);
            });
    };


    // Fetch questions on load
    useEffect(() => {
        window.scrollTo(0, 0); // Scroll to top of page.
        getSeries();
    }, []); // eslint-disable-line react-hooks/exhaustive-deps

    // Fetch questions after fetching school data
    useEffect(() => {
        if (series !== undefined) {
            getQuestions();
        }
    }, [series]); // eslint-disable-line react-hooks/exhaustive-deps

    
    return (
        <>
            <section className="form-section">
                <div className="formHeader">
                    <Typography className="pageTitle" variant="h2">
                        Review Form
                    </Typography>
                    <p className="form-description">
                        Complete the form below to submit a review.
                    </p>
                </div>
                <form id="reviewForm" autoComplete="off" onSubmit={(event) => { event.preventDefault(); setConfirmationPromptIsOpen(true); }}>
                    { series === undefined || questions[0] === undefined
                        ? <LoadingScreen />
                        :   <>
                            <FormControl className="reviewFormContent">
                                <DatePicker 
                                    date={date}
                                    setDate={setDate}
                                    answers={answers}
                                    setAnswers={setAnswers}
                                />
                                { questions.filter(questionObj => questionObj.questionGroup === "").map((questionObj) => renderQuestion(questionObj)) }
                                <label className="groupHeader" variant="h5">
                                    {"Anime Vs Manga"}
                                </label>
                                { questions.filter(questionObj => questionObj.questionGroup === "Anime Vs Manga").map((questionObj) => renderQuestion(questionObj)) }
                                <label className="groupHeader" variant="h5">
                                    {"Anime"}
                                </label>
                                { questions.filter(questionObj => questionObj.questionGroup === "Anime").map((questionObj) => renderQuestion(questionObj)) }
                                <label className="groupHeader" variant="h5">
                                    {"Expectations"}
                                </label>
                                { questions.filter(questionObj => questionObj.questionGroup === "Expectations").map((questionObj) => renderQuestion(questionObj)) }
                            </FormControl>
                            <Button id="submit-button" type="submit" variant="contained" color="primary">
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
                submit={submitReviews}
            />
            
            <Alert 
                alertMessageObj={alertMessageObj}
                alertIsActive={alertIsActive}
                setAlertIsActive={setAlertIsActive}
            />
        </>      
    );
};