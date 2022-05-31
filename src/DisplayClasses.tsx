import React, { ChangeEvent, FormEvent, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { MiniextState } from "./miniextReducer";
import { ArrClasses } from "./miniextReducer";
import { addClasses, updateLoginStatus } from "./actions";


import './App.css';

export const ClassesBox = () => {
    const classes = useSelector<MiniextState, MiniextState["classes"]>((state) => state.classes)
    const status = useSelector<MiniextState, MiniextState["status"]>((state) => state.status);
    const dispatch = useDispatch();    
    return (
        <>
            <div>               
                {classes.flat().map((studentClass, i) => {                    
                    return (
                        <div className="DisplayBox" key={i}>
                            <h3>Name</h3>
                            <p>{studentClass.Name}</p>

                            <h3>Stundents</h3>
                            <p>{studentClass['Students']}</p>
                        </div>

                    )
                }
                )}
                
              </div>
        </>
    )
}