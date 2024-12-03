"use client";
import DataTable from "@/components/weathertable";
import LineGraph from "@/components/linegraph";
import GasTable from "@/components/gastable";
import { mqttClient } from "@/lib/mqttclient";
import { useState, useEffect } from "react";

const chartData = [
  { month: "January", desktop: 186 },
  { month: "February", desktop: 305 },
  { month: "March", desktop: 237 },
  { month: "April", desktop: 73 },
  { month: "May", desktop: 209 },
  { month: "June", desktop: 214 },
];

export default function dashboard() {

  const [tempData, setTempData] = useState([]);
  const [currTemp, setCurrTemp] = useState(0);

  const [humData, setHumData] = useState([]);
  const [currHum, setCurrHum] = useState(0);

  const [coData, setCoData] = useState([]);
  const [currCo, setCurrCo] = useState(0);

  const [lpgData, setLpgData] = useState([]);
  const [currLpg, setCurrLpg] = useState(0);

  const [h2sData, setH2sData] = useState([]);
  const [currH2s, setCurrH2s] = useState(0);

  const [mq7Data, setMq7Data] = useState([]);
  const [currMq7, setCurrMq7] = useState(0);

  const [mq9Data, setMq9Data] = useState([]);
  const [currMq9, setCurrMq9] = useState(0);

  const [mq136Data, setMq136Data] = useState([]);
  const [currMq136, setCurrMq136] = useState(0);

  useEffect(() => {
    // Connect to your MQTT broker
    mqttClient.connect("mqtt://172.20.10.4:9001", {
      username: "user3",
      password: "hello3",
    });

    mqttClient.subscribe("esp32/temp", (message) => {
      const now = new Date();
      const time = now.toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });

    

      const temp = parseFloat(message);
      setCurrTemp(temp);
      // console.log(currTemp);

      // Update tempData properly with the new format matching chartData structure
      setTempData((prevData) => {
        // Keep only the last 10 readings to avoid overwhelming the graph
        const newData = [
          ...prevData,
          {
            time: time, // Using 'month' as the x-axis label to match chartData structure
            desktop: temp, // Using 'desktop' as the y-axis value to match chartData structure
          },
        ].slice(-5);
        return newData;
      });
    });

    mqttClient.subscribe("esp32/hum", (message) => {
      const now = new Date();
      const time = now.toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });

    

      const hum = parseFloat(message);
      setCurrHum(hum);
      // console.log(currTemp);

      // Update tempData properly with the new format matching chartData structure
      setHumData((prevData) => {
        // Keep only the last 10 readings to avoid overwhelming the graph
        const newData = [
          ...prevData,
          {
            time: time, // Using 'month' as the x-axis label to match chartData structure
            desktop: hum, // Using 'desktop' as the y-axis value to match chartData structure
          },
        ].slice(-5);
        return newData;
      });
    });

    mqttClient.subscribe("esp32/mq", (message) => {
      const now = new Date();
      const time = now.toLocaleString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      });

      console.log(message);
      const data = message.split(',').map(parseFloat);

      setCurrCo(data[1]);
      setCurrLpg(data[3]);
      setCurrH2s(data[5]);
      setCurrMq7(data[0]);
      setCurrMq9(data[2]);
      setCurrMq136(data[4]);

     
      // console.log(currTemp);

      // Update tempData properly with the new format matching chartData structure
      setCoData((prevData) => {
        // Keep only the last 10 readings to avoid overwhelming the graph
        const newData = [
          ...prevData,
          {
            time: time, // Using 'month' as the x-axis label to match chartData structure
            desktop: data[1], // Using 'desktop' as the y-axis value to match chartData structure
          },
        ].slice(-5);
        return newData;
      });

      setLpgData((prevData) => {
        // Keep only the last 10 readings to avoid overwhelming the graph
        const newData = [
          ...prevData,
          {
            time: time, // Using 'month' as the x-axis label to match chartData structure
            desktop: data[3], // Using 'desktop' as the y-axis value to match chartData structure
          },
        ].slice(-5);
        return newData;
      });

      setH2sData((prevData) => {
        // Keep only the last 10 readings to avoid overwhelming the graph
        const newData = [
          ...prevData,
          {
            time: time, // Using 'month' as the x-axis label to match chartData structure
            desktop: data[5], // Using 'desktop' as the y-axis value to match chartData structure
          },
        ].slice(-5);
        return newData;
      });

      setMq7Data((prevData) => {
        // Keep only the last 10 readings to avoid overwhelming the graph
        const newData = [
          ...prevData,
          {
            time: time, // Using 'month' as the x-axis label to match chartData structure
            desktop: data[0], // Using 'desktop' as the y-axis value to match chartData structure
          },
        ].slice(-5);
        return newData;
      });

      setMq9Data((prevData) => {
        // Keep only the last 10 readings to avoid overwhelming the graph
        const newData = [
          ...prevData,
          {
            time: time, // Using 'month' as the x-axis label to match chartData structure
            desktop: data[2], // Using 'desktop' as the y-axis value to match chartData structure
          },
        ].slice(-5);
        return newData;
      });

      setMq136Data((prevData) => {
        // Keep only the last 10 readings to avoid overwhelming the graph
        const newData = [
          ...prevData,
          {
            time: time, // Using 'month' as the x-axis label to match chartData structure
            desktop: data[4], // Using 'desktop' as the y-axis value to match chartData structure
          },
        ].slice(-5);
        return newData;
      });
    });



    // Cleanup on component unmount
    return () => {
      mqttClient.disconnect();
    };
  }, []);

  return (
    <div className="flex flex-row h-full w-full">
      <div className="h-full flex-3">
        <h1 className="p-4 text-xl">Weather</h1>

        <div className="flex w-full  p-4 gap-4">
          <div className="w-96">
            <LineGraph
              title="Humidity"
              description="real-time humidity"
              chartData={humData}
            />
          </div>
          <div className="w-96">
            <LineGraph
              title="Temperature"
              description="real-time temperature"
              chartData={tempData}
            />
          </div>
        </div>
        <h1 className="p-4 text-xl">Gas PPM</h1>

        <div className="flex w-full  p-4 gap-4">
          <div className="w-96">
            <LineGraph
              title="CO"
              description="real-time ppm of CO"
              chartData={coData}
            />
          </div>
          <div className="w-96">
            <LineGraph
              title="LPG"
              description="real-time ppm of NH3"
              chartData={lpgData}
            />
          </div>
          <div className="w-96">
            <LineGraph
              title="H2S"
              description="real-time ppm of H2S"
              chartData={h2sData}
            />
          </div>
        </div>

        <h1 className="p-4 text-xl">Resistance</h1>

        <div className="flex w-full  p-4 gap-4">
          <div className="w-96">
            <LineGraph
              title="CO"
              description="real-time resistance of MQ7"
              chartData={mq7Data}
            />
          </div>
          <div className="w-96">
            <LineGraph
              title="LPG"
              description="real-time resistance of MQ9"
              chartData={mq9Data}
            />
          </div>
          <div className="w-96">
            <LineGraph
              title="H2S"
              description="real-time resistance of MQ136"
              chartData={mq136Data}
            />
          </div>
        </div>
        <h1 className="p-4 text-xl">Power</h1>

        <div className="flex w-full  p-4 gap-4">
          <div className="w-96">
            <LineGraph
              title="CO"
              description="real-time power of MQ7"
              chartData={chartData}
            />
          </div>
          <div className="w-96">
            <LineGraph
              title="NH3"
              description="real-time power of MQ9"
              chartData={chartData}
            />
          </div>
          <div className="w-96">
            <LineGraph
              title="H2S"
              description="real-time power of MQ136"
              chartData={chartData}
            />
          </div>
        </div>
      </div>

      <div className="flex-1 p-4">
        <div className="m-2">
          <DataTable temp={currTemp} hum={currHum}/>
        </div>
        <div className=" m-2">
          <GasTable co={currCo} lpg={currLpg} h2s={currH2s} mq7={currMq7} mq9={currMq9} mq136={currMq136}/>
        </div>
      </div>
    </div>
  );
}
