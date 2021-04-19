import { jsonGetch } from "./jsonFetch";
import React, { useState, useEffect} from "react";

const Stats = (props) => {
    const [stats, setStats] = useState([])

    const filterData = response => {
        //Dates are zero based so October is 9
        const startDate = new Date(2017, 9, 31);
        const draws = response.filter( each => {
            const strDate = each.draw_date.slice(0,
                each.draw_date.indexOf("T"));
            const arr = strDate.split("-");
            const drawDate = new Date(arr[0], arr[1] -1, arr[2]);
            if(!(drawDate < startDate) ){
                return each;
            }
        })
        setStats(draws);
    }


    const drawInfo = stats.map( each => {
        return (
            <div key={each.draw_date}>
                {each.winning_numbers} {each.mega_ball} {each.multiplier}
            </div>
        )
    })



   useEffect( () => {
    //info https://data.ny.gov/Government-Finance/Lottery-Mega-Millions-Winning-Numbers-Beginning-20/5xaw-6ayf
    //See APIKeySecret.json file not on git hub
    //Based on 362 drawings since Tuesday, October 31, 2017
    jsonGetch("https://data.ny.gov/resource/5xaw-6ayf.json", filterData )

   },[])


    return (
        <div>
            {drawInfo}
        </div>
    )
}

export default Stats
