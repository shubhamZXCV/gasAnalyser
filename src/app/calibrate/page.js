"use client"
import CalibrateCard from "@/components/calibratecard";
import { useState } from "react";



export default function Calibrate(){
    const [formData, setFormData] = useState({
        sensor: "",
        temperature: 0,
        humidity: 0,
        resistance: 0,
        ppm: 0,
      });

      const [ro,setRo]=useState(0);

    return (
        <div className="flex justify-center flex-col items-center">

            <div className="m-24">

            <CalibrateCard formData={formData} setFormData={setFormData} ro={ro} setRo={setRo}/>
            </div>

            <div>
                Ro: {ro}
            </div>
           
        </div>
    );
}