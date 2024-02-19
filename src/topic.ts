import { Kafka } from "kafkajs";

createTopic();
async function createTopic() {
  try {
    const kafka = new Kafka({
      clientId: "myapp",
      brokers: ["localhost:9092"],
    });

    const admin = kafka.admin();

    // Connect
    console.log("Connecting...");
    await admin.connect();
    console.log("Connected!");

    // Create topic
    await admin.createTopics({
      topics: [{ topic: "payments", numPartitions: 1 }],
    });
    console.log("Created Successfully!");

    // Disconnect
    await admin.disconnect();
  } catch (e) {
    console.error(`Error: ${e}`);
  } finally {
    process.exit();
  }
}
