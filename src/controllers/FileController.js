
const Box = require("../models/Box");
const File = require("../models/File");

class FileController {
  async store(req, res) {
      console.log('logando o key');
      const box = await Box.findById(req.params.id);
      
      console.log('logando o key');
      console.log(req.file.key);
      const file = await File.create({
          title: req.file.originalname,
          path: req.file.key,
      });

      box.files.push(file);

      await box.save();

      req.io.sockets.in(box.id).emit('file', file);
      
      return res.json(file);
  }
}

module.exports = new FileController();
