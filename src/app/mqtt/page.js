// utils/mqtt.js
"use client"
import { mqttClient } from '@/lib/mqttclient';

// Example usage in a Next.js component:
// pages/mqtt-example.js
import { useEffect, useState } from 'react';
// import { mqttClient } from '../utils/mqtt';

export default function MQTTExample() {
  const [message, setMessage] = useState('');
  const [publishMessage, setPublishMessage] = useState('');

  useEffect(() => {
    // Connect to your MQTT broker
    mqttClient.connect('mqtt://172.20.10.4:1883', {
      username: 'user3', // if required
      password: 'hello3', // if required
      // protocolId: 'MQIsdp', protocolVersion: 3,
      // clientId: 'bgtestnodejs',
    });

    // Subscribe to a topic
    mqttClient.subscribe('test/topic', (message) => {
      setMessage(message);
    });

    // Cleanup on component unmount
    return () => {
      mqttClient.disconnect();
    };
  }, []);

  const handlePublish = () => {
    mqttClient.publish('test/topic', publishMessage);
    setPublishMessage('');
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">MQTT Example</h1>
      
      <div className="mb-4">
        <h2 className="text-xl mb-2">Received Messages:</h2>
        <div className="p-2 border rounded">
          {message || 'No messages received'}
        </div>
      </div>

      <div className="mb-4">
        <h2 className="text-xl mb-2">Publish Message:</h2>
        <input
          type="text"
          value={publishMessage}
          onChange={(e) => setPublishMessage(e.target.value)}
          className="border p-2 mr-2"
          placeholder="Enter message"
        />
        <button
          onClick={handlePublish}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Publish
        </button>
      </div>
    </div>
  );
}