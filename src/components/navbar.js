"use client"
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { mqttClient } from "@/lib/mqttclient";

export default function Navbar() {
  // Function to handle publishing the message on button click
  const handleAlertClick = () => {
    const brokerUrl = 'ws://172.20.10.4:9001';
    const options = {
      username: 'user3',
      password: 'hello3',
    };

    // Connect to MQTT broker if not already connected
    if (!mqttClient.isConnected) {
      mqttClient.connect(brokerUrl, options);
    }

    // Publish the message to the topic
    if (mqttClient.isConnected) {
      mqttClient.publish("esp32/buzzer", "1");
    } else {
      console.error("MQTT client is not connected");
    }
  };

  return (
    <nav className="flex row bg-blue-900 p-2 text-white justify-center">
      <ul className="flex flex-row justify-center gap-4 font-bold items-center">
        <Link href="/"><li>dashboard</li></Link>
        <Link href="/map"><li>map</li></Link>
        <Link href="/calibrate"><li>calibrate</li></Link>
        <li>
          <Button onClick={handleAlertClick} className="bg-red-500 rounded">
            ALERT
          </Button>
        </li>
      </ul>
    </nav>
  );
}
