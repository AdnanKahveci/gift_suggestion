import Product from "../../../models/Product";
import dbConnect from "../../../util/dbConnect";

const handler = async (req, res) => {
  await dbConnect();
  const {
    method,
    query: { id },
  } = req;

  if (method === "GET") {
    try {
      const product = await Product.findById(id);
      res.status(200).json(product);
    } catch (err) {
      console.log(err);
    }
  }
  if (method === "PUT") {
    try {
      const product = await Product.findByIdAndUpdate(id, req.body, {
        new: true,
      });
      res.status(200).json(product);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Server error" });
    }
  }
  
  if (method === "DELETE") {
    try {
      const product = await Product.findByIdAndDelete(id);
      res.status(200).json(product);
    } catch (err) {
      console.log(err);
    }
  }
};

export default handler;