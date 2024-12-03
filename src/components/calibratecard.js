"use client"
import {useState} from "react";
import { Button } from "@/components/ui/button";
import {calculate_Ro_mq136,calculate_Ro_mq7,calculate_Ro_mq9} from "@/lib/formula"
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CalibrateCard({formData,setFormData,ro,setRo}) {
  // Initialize state to store input values
  

  // Handle input changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    // Convert the input value to a float, using 0 if the input is invalid
    const floatValue = parseFloat(value);
    setFormData((prevData) => ({
      ...prevData,
      [name]: isNaN(floatValue) ? 0 : floatValue,
    }));
  };

  // Handle sensor selection change
  const handleSensorChange = (value) => {
    setFormData((prevData) => ({
      ...prevData,
      sensor: value,
    }));
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    console.log("Form Data:", formData); // Log the current form data
    let ro=0;
    let ppm=formData.ppm;
    let rs=formData.resistance;
    let temp = formData.temperature;
    let hum = formData.humidity;
    if(formData.sensor=="mq7"){
      ro=calculate_Ro_mq7(rs,ppm,temp,hum);
      
    }else if(formData.sensor=="mq9"){
      ro=calculate_Ro_mq9(rs,ppm,temp,hum);
      
    }else if(formData.sensor=="mq136"){
      
      ro=calculate_Ro_mq136(rs,ppm,temp,hum);
    }
    console.log("ro ");
    console.log(ro);
    setRo(ro);
    // return ro;
  };

  return (
    <Card className="w-[350px]">
      <CardHeader>
        <CardTitle>Calibrate Your Sensor</CardTitle>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit}>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="sensor">Sensor</Label>
              <Select onValueChange={handleSensorChange}>
                <SelectTrigger id="sensor">
                  <SelectValue placeholder="choose your sensor" />
                </SelectTrigger>
                <SelectContent position="popper">
                  <SelectItem value="mq7">MQ 7</SelectItem>
                  <SelectItem value="mq9">MQ 9</SelectItem>
                  <SelectItem value="mq135">MQ 135</SelectItem>
                  <SelectItem value="mq136">MQ 136</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="temperature">Temperature</Label>
              <Input
                id="temperature"
                name="temperature"
                placeholder="Enter current temperature"
                value={formData.temperature || ""}
                onChange={handleChange}
                type="text" // Changed to text
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="humidity">Humidity</Label>
              <Input
                id="humidity"
                name="humidity"
                placeholder="Enter current humidity"
                value={formData.humidity || ""}
                onChange={handleChange}
                type="text" // Changed to text
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="resistance">Resistance</Label>
              <Input
                id="resistance"
                name="resistance"
                placeholder="Enter current resistance"
                value={formData.resistance || ""}
                onChange={handleChange}
                type="text" // Changed to text
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Label htmlFor="ppm">PPM</Label>
              <Input
                id="ppm"
                name="ppm"
                placeholder="Enter current ppm"
                value={formData.ppm || ""}
                onChange={handleChange}
                type="text" // Changed to text
              />
            </div>
          </div> 
          <CardFooter className="flex  items-center justify-center  p-2">
            <Button type="submit" className="mx-auto rounded">
              Calibrate
            </Button>
          </CardFooter>
        </form>
      </CardContent>
    </Card>
  );
}
