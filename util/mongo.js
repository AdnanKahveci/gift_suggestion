import { MongoClient } from "mongodb"; // MongoDB istemcisini içe aktarır

const uri = process.env.MONGODB_URI; // MongoDB URI'sini alır

// MongoDB URI tanımlanmamışsa hata fırlat
if (!uri) {
  throw new Error("Please add your Mongo URI to .env.local");
}

let client;
let clientPromise;

// Geliştirme veya üretim moduna göre istemci oluştur
if (process.env.NODE_ENV === "development") {
  // Geliştirme modunda, HMR (Hot Module Replacement) nedeniyle modül yeniden yüklemelerinde
  // değerin korunması için global bir değişken kullanılır.
  if (!global._mongoClientPromise) {
    client = new MongoClient(uri);
    global._mongoClientPromise = client.connect();
  }
  clientPromise = global._mongoClientPromise;
} else {
  // Üretim modunda global bir değişken kullanmamak daha iyidir.
  client = new MongoClient(uri);
  clientPromise = client.connect();
}

// Bir modül kapsamında MongoClient promise döndürülür.
// Bu şekilde, istemci işlevler arasında paylaşılabilir.
export default clientPromise;
