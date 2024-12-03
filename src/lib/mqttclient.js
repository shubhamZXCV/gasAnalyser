import mqtt from 'mqtt';

class MQTTClient {
  constructor() {
    this.client = null;
    this.isConnected = false;
  }

  connect(brokerUrl, options = {}) {
    if (this.client) return;
    console.log(options);
    this.client = mqtt.connect(brokerUrl, {
      ...options,
      clientId: `nextjs_${Math.random().toString(16).substr(2, 8)}`,
    });

    this.client.on('connect', () => {
      console.log('Connected to MQTT broker');
      this.isConnected = true;
    });

    this.client.on('error', (err) => {
      console.error('MQTT connection error:', err);
      this.isConnected = false;
    });

    this.client.on('close', () => {
      console.log('MQTT connection closed');
      this.isConnected = false;
    });
  }

  subscribe(topic, callback) {
    if (!this.client) return;
    
    this.client.subscribe(topic, (err) => {
      if (err) {
        console.error('Subscribe error:', err);
        return;
      }
      console.log(`Subscribed to ${topic}`);
    });

    this.client.on('message', (receivedTopic, message) => {
      if (topic === receivedTopic) {
        callback(message.toString());
      }
    });
  }

  publish(topic, message) {
    if (!this.client) return;
    
    this.client.publish(topic, message, (err) => {
      if (err) {
        console.error('Publish error:', err);
        return;
      }
      console.log(`Published message to ${topic}`);
    });
  }

  disconnect() {
    if (this.client) {
      this.client.end();
      this.client = null;
      this.isConnected = false;
    }
  }
}

// Export a singleton instance
export const mqttClient = new MQTTClient();