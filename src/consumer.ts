import { Kafka } from "kafkajs";

run();
async function run() {
  try {
    const kafka = new Kafka({
      clientId: "myapp",
      brokers: ["localhost:9092"],
    });

    const consumer = kafka.consumer({ groupId: "payor" });

    // Connect
    console.log("Connecting...");
    await consumer.connect();
    console.log("Connected!");

    consumer.subscribe({ topic: "test", fromBeginning: true });
    await consumer.run({
      eachMessage: async (result) => {
        try {
          console.log(
            `RVD Msg ${result.message.value} on partiton ${result.partition}`
          );
        } catch (e) {
          console.error(e);
        }
      },
    });
  } catch (e) {
    console.error(`Error: ${e}`);
  }
}
