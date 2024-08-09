import mongoose from "mongoose"; // Mongoose'ü içe aktarır

const MONGODB_URI = process.env.MONGODB_URI; // MongoDB URI'sini alır

if (!MONGODB_URI) {
  // MONGODB_URI tanımlı değilse hata fırlatır
  throw new Error(
    "Please define the MONGODB_URI environment variable inside .env.local"
  );
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
let cached = global.mongoose; // global bir değişken kullanarak bağlantıyı önbelleğe alır

if (!cached) {
  cached = global.mongoose = { conn: null, promise: null };
}

async function dbConnect() {
  if (cached.conn) {
    // Bağlantı önbelleğe alındıysa, bağlantıyı döndürür
    return cached.conn;
  }

  if (!cached.promise) {
    // Bağlantı yoksa, bağlantıyı oluşturur
    const opts = {
      bufferCommands: false,
    };

    cached.promise = mongoose.connect(MONGODB_URI, opts).then((mongoose) => {
      return mongoose;
    });
  }
  cached.conn = await cached.promise;
  return cached.conn;
}

console.log("Connected to MongoDB"); // MongoDB'ye bağlandıktan sonra konsola bağlantı durumu yazdırır

export default dbConnect; // dbConnect fonksiyonunu dışa aktarır
