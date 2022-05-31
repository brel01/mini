import React, { useState } from 'react';
import './App.css';
import { NameInput } from "./NameInput";
import { ClassesBox } from "./DisplayClasses";
import { classesData } from "./classesData";
import { studentsData } from "./studentData";

import { useDispatch, useSelector } from "react-redux";
import { addClasses, updateLoginStatus } from "./actions";
import { MiniextState } from "./miniextReducer";

function App() {    
    const status = useSelector<MiniextState, MiniextState["status"]>((state) => state.status);
    const dispatch = useDispatch()

    const [isStudentNameValid, updateStudentNameValid] = useState({ valid: true, errorText: "" });
    const [pageLoader, updatePgeLoader] = useState(true);

    /* The function below "getClassesDetails fetches the students details, returns an array
     of the classes in which the student enrolled in */
    const getStudentClasses = (studentName: string) => {
        let name = studentName.toLowerCase();
        let studentClasses = [];                
        let studentDetails = [];

        for (let i: number = 0; i < studentsData.length; i++) {
            if (studentsData[i]['Name'].toLowerCase() == name) {                
                console.log(studentDetails.push(studentsData[i]['Classes']));
            }
        }        

        if (studentDetails.length > 0) {
            updateStudentNameValid({valid: true, errorText: "" });  //set user valid as true
            studentClasses.push(studentDetails[0].split(","));
        } else {            
            updateStudentNameValid({ valid: false, errorText: "Requested data not available"}); //set user valid as false when the students data is not available
        }
        return getClassesDetails(studentClasses);

    }

    /*The function getClassesDetails receives the parameter classes, an array containg the list of 
     classes a student enrolled to. It returns a dimensional array containing name of the class and the 
     name of the students enrolled*/
    const getClassesDetails = (classes: any) => {
        let classDetails = [];
        for (let i: number = 0; i < classes.length; i++) {
            for (let j: number = 0; j < classes[i].length; j++) {

                let details = classesData.filter((data: any) => {
                    let filteredData = data.Name.search(classes[i][j]) != -1;                    
                    return filteredData
                });
                classDetails.push(details);
            }
        }
        return classDetails;
    }

    const searchName = (studentName: string) => {
        return getStudentClasses(studentName);
    }


    const onSearchName = (name: string) => {
        updateStudentNameValid({ valid: true, errorText: "" });

        let newClasses = searchName(name).flat()
        dispatch(addClasses(newClasses)); // update classes state

        let loggedIn = false;

        if (newClasses.length > 0) {
            loggedIn = true;
        } 
        dispatch(updateLoginStatus({ Name: name, LoggedIn: loggedIn })); // update login status state 

        setTimeout(
           () => {
               updatePgeLoader(false);
            }, 1000
        )
    }

    const onLogout = () => {
        let name = "";
        let loggedIn = false;        
        dispatch(updateLoginStatus({ Name: name, LoggedIn: loggedIn }));
        dispatch(addClasses([]));
    }
    return (
        <>
            <section>
                <div>                
                    {status.flat()[0]['LoggedIn']
                        ?
                        <div>
                            {!pageLoader
                                ?
                                <div>
                                    <div className="ButtonBox">
                                        <button onClick={() => { onLogout() }}>Logout</button>
                                    </div>
                                    <div className="Container">
                                        <ClassesBox />
                                    </div>
                                </div>
                                :
                                <div className="Container">
                                    <p>Loading....</p>
                                </div>
                            }
                        </div>
                        :
                        <div className="Container">
                            <NameInput submitName={onSearchName} />
                            {!isStudentNameValid.valid ? <div><br/> <hr/> <p> Requested data not available </p> </div> : null}
                        </div>
                    }
                
                </div>
            </section>
        </>
    );
}

export default App;
