import { useEffect, } from "react";
import { useLocation, useParams } from "react-router-dom";

export function FolhaDePonto(){
    const params = useParams()
    const {state} = useLocation()

    useEffect(() => {
        console.log("in fdp")
        console.log(state)
    }, [])

}