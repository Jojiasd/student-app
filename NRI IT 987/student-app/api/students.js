import { put, list, del } from "@vercel/blob";

const FILE_NAME = "students.json";

export default async function handler(req, res) {
  // GET STUDENTS
  if (req.method === "GET") {
    try {
      const blobs = await list();
      const file = blobs.blobs.find(b => b.pathname === FILE_NAME);

      if (!file) return res.json([]);

      const response = await fetch(file.url);
      const data = await response.json();

      return res.json(data);
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  // POST STUDENT
  if (req.method === "POST") {
    try {
      const body = req.body;

      const blobs = await list();
      const file = blobs.blobs.find(b => b.pathname === FILE_NAME);

      let students = [];

      if (file) {
        const oldData = await fetch(file.url);
        students = await oldData.json();
      }

      students.push({
        name: body.name,
        age: body.age
      });

      await put(FILE_NAME, JSON.stringify(students), {
        access: "public",
        contentType: "application/json",
        overwrite: true
      });

      return res.json({ success: true });
    } catch (err) {
      return res.status(500).json({ error: err.message });
    }
  }

  return res.status(405).json({ error: "Method not allowed" });
}
