// pages/map-page.js
"use client";
import dynamic from 'next/dynamic'
import {useState,useEffect} from 'react';
import { mqttClient } from "@/lib/mqttclient";
// Dynamically import the Map component to prevent SSR issues
const Map = dynamic(() => import('@/components/map'), {
    ssr: false
})

export default function map(){

        const [markers,setMarkers]=useState([
            {
                position: [17.447969,78.348296],
                popup: "Inesh bhai aithe hai!"
            }
        ])

        const [center , setCenter]=useState([17.447969,78.348296]);

        useEffect(() => {
            // Connect to your MQTT broker
            mqttClient.connect('mqtt://172.20.10.4:9001', {
              username: 'user3',
              password: 'hello3',
            });
        
            // Subscribe to a topic
            mqttClient.subscribe('esp32/map', (message) => {
            const coord = message.split(",").map(parseFloat);
            const newMarker = [
                {
                    position: coord,
                    popup: "Inesh bhai aithe hai!"
                }
            ]
              setMarkers(newMarker);
              setCenter(coord);
              
            });
        
           
        
            // Cleanup on component unmount
            return () => {
              mqttClient.disconnect();
            };
          }, []);

       
   
        
        return (
          

            <div className="p-4 ">
               
                <Map markers={markers} center={markers[0].position}/>
            </div>
         
        )

}