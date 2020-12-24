// React 
import React, {useState, useEffect} from 'react';

// Material UI
import Skeleton from '@material-ui/lab/Skeleton';
import { Container, Grid, Typography } from '@material-ui/core';

// Custom components
import TotalCases from './TotalCases';
import CasesPerHundred from './CasesPerHundred';
import TotalQuarantined from './TotalQuarantined';
import SchoolExposures from './SchoolExposures';
import SchoolPopulation from './SchoolPopulation';
import ExposureOverview from './ExposureOverview';

// Styles
import './Container.css';

function DashboardContainer() {
  const [filterSchoolValue, setFilterSchoolValue] = useState(undefined);

  const [schoolPopulation, setSchoolPopulation] = useState(undefined);

  const [schoolStudentCases, setSchoolStudentCases] = useState(undefined);
  const [schoolFacultyCases, setSchoolFacultyCases] = useState(undefined);
  const [schoolPostiveCases, setSchoolPostiveCases] = useState(undefined);
  const [schoolCasesSinceWeekPrior, setSchoolCasesSinceWeekPrior] = useState(undefined);
  const [schoolCasesChangeFromLastWeek, setSchoolCasesChangeFromLastWeek] = useState(undefined);

  const [schoolCasesDueToExposure, setSchoolCasesDueToExposure] = useState(undefined);
  const [schoolCasesDueToExposureSinceWeekPrior, setSchoolCasesDueToExposureSinceWeekPrior] = useState(undefined);
  const [schoolCasesDueToExposureChangeFromLastWeek, setSchoolCasesDueToExposureChangeFromLastWeek] = useState(undefined);

  const [schoolQuarantined, setSchoolQuarantined] = useState(undefined);
  const [schoolQuarantinedSinceWeekPrior, setSchoolQuarantinedSinceWeekPrior] = useState(undefined);
  const [schoolQuarantinedChangeFromLastWeek, setSchoolQuarantinedChangeFromLastWeek] = useState(undefined);

  const [schoolLastReportDate, setSchoolLastReportDate] = useState(undefined);

  const [schoolPerHundred, setSchoolPerHundred] = useState(undefined);
  const [totalPerHundred, setTotalPerHundred] = useState(undefined);

  const getDashboard = async () => {
    const requestOptions = {
        headers: {
          'Content-Type': 'application/json'
        }
    };

    await fetch("http://127.0.0.1:5000/dashboard", requestOptions)
      .then(function (response) {
        if (response.status !== 200) {
            return Promise.reject(`${response.status} ${response.statusText}`);
        };

        return response.json();
      })
      .then(response => {
        setFilterSchoolValue(response.case_data.school || '???');

        setSchoolPopulation(response.case_data.school_population || 0);

        setSchoolStudentCases(response.case_data.school_student_cases || 0);
        setSchoolFacultyCases(response.case_data.school_faculty_cases || 0);
        setSchoolPostiveCases(response.case_data.all_school_cases || 0);
        setSchoolCasesSinceWeekPrior(response.case_data.school_cases_since_week_prior || 0);
        setSchoolCasesChangeFromLastWeek(response.case_data.school_cases_change_from_last_week || 0);

        setSchoolCasesDueToExposure(response.case_data.school_cases_due_to_exposure || 0);
        setSchoolCasesDueToExposureSinceWeekPrior(response.case_data.school_cases_due_to_exposure_since_week_prior || 0);
        setSchoolCasesDueToExposureChangeFromLastWeek(response.case_data.school_cases_due_to_exposure_change_from_last_week || 0);

        setSchoolQuarantined(response.case_data.school_quarantined || 0);
        setSchoolQuarantinedSinceWeekPrior(response.case_data.school_quarantined_since_week_prior || 0);
        setSchoolQuarantinedChangeFromLastWeek(response.case_data.school_quarantined_change_from_last_week || 0);

        setSchoolLastReportDate(response.case_data.school_last_report_date || 'N/A');

        setSchoolPerHundred(response.school_per100);
        setTotalPerHundred(response.total_per100);
      })
      .catch(error => {
          const text = `Error receiving dashboard data. ${error.toString()}.`;
          console.log(text);
      });
  };

  useEffect(() => {
    window.scrollTo(0, 0); 
    getDashboard();
  }, []);

  return (
    <Container maxWidth={false}>
      <Grid container spacing={3}>
        <Grid item id="dashboardTitleContainer" xs={12}>
          { filterSchoolValue === undefined
              ? <Skeleton variant="rect" height={40} width={"30%"}/>
              : <div>
                  <Typography id="dashboardTitle">
                    Weekly Metrics for {filterSchoolValue}
                  </Typography>
                  <Typography id="dashboardSubTitle">
                    Last Report: {schoolLastReportDate}
                  </Typography>
                </div>
          }
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          {
            schoolPostiveCases === undefined || schoolCasesSinceWeekPrior === undefined || schoolCasesChangeFromLastWeek === undefined
              ? <Skeleton id="input" variant="rect" height={200}/>
              : <TotalCases totalPostiveCases = {schoolPostiveCases} schoolCasesSinceWeekPrior = {schoolCasesSinceWeekPrior} totalCasesChangeFromLastWeek = {schoolCasesChangeFromLastWeek} />
          }
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          {
            schoolCasesDueToExposure === undefined || schoolCasesDueToExposureSinceWeekPrior === undefined || schoolCasesDueToExposureChangeFromLastWeek === undefined
            ? <Skeleton id="input" variant="rect" height={200}/>
            : <SchoolExposures totalCasesDueToExposure = {schoolCasesDueToExposure} schoolCasesDueToExposureSinceWeekPrior = {schoolCasesDueToExposureSinceWeekPrior} totalCasesDueToExposureChangeFromLastWeek = {schoolCasesDueToExposureChangeFromLastWeek} />
          }
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          {
            schoolQuarantined === undefined || schoolQuarantinedSinceWeekPrior === undefined || schoolQuarantinedChangeFromLastWeek === undefined
            ? <Skeleton id="input" variant="rect" height={200}/>
            : <TotalQuarantined totalQuarantined = {schoolQuarantined} schoolQuarantinedSinceWeekPrior = {schoolQuarantinedSinceWeekPrior} totalQuarantinedChangeFromLastWeek = {schoolQuarantinedChangeFromLastWeek} />
          }
        </Grid>
        <Grid item lg={3} sm={6} xl={3} xs={12}>
          {
            schoolPopulation === undefined
            ? <Skeleton id="input" variant="rect" height={200}/>
            : <SchoolPopulation totalPopulation = {schoolPopulation} />
          }
        </Grid>
        <Grid item lg={8} md={12} xl={9} xs={12}>
          {
            schoolPerHundred === undefined || totalPerHundred === undefined
            ? <Skeleton id="input" variant="rect" height={600}/>
            : <CasesPerHundred schoolPerHundred = {schoolPerHundred} totalPerHundred = {totalPerHundred} />
          }
        </Grid>
        <Grid item lg={4} md={6} xl={3} xs={12}>
          {
            schoolStudentCases === undefined || schoolFacultyCases === undefined
            ? <Skeleton id="input" variant="rect" height={600}/> 
            : <ExposureOverview totalStudentCases = {schoolStudentCases} totalFacultyCases = {schoolFacultyCases} />
          }
        </Grid>
      </Grid>
    </Container>
  );
};

export default DashboardContainer;
