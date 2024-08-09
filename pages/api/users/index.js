import dbConnect from "@/util/dbConnect"; // Veritabanına bağlanmak için yardımcı fonksiyon
import User from "@/models/User"; // Kullanıcı modeli

const handler = async (req, res) => {
  await dbConnect(); // Veritabanına bağlan

  const { method } = req; // İstek yöntemini al

  if (method === "GET") {
    // GET isteği ise
    try {
      // Tüm kullanıcıları bul
      const users = await User.find();
      // Kullanıcıları başarıyla döndür
      res.status(200).json(users);
    } catch (err) {
      console.log(err); // Hata oluşursa konsola yazdır
    }
  }

  if (method === "POST") {
    // POST isteği ise
    try {
      // Yeni kullanıcı oluştur ve veritabanına ekle
      const newUser = await User.create(req.body);
      // Yeni kullanıcıyı başarıyla döndür
      res.status(200).json(newUser);
    } catch (err) {
      console.log(err); // Hata oluşursa konsola yazdır
    }
  }
};

export default handler;
