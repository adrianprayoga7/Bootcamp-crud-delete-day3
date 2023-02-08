//import file contact di file app.js
const contact = require('./contact');

const yargs = require('yargs');

//fungsi untuk input
yargs.command ({
      command: 'add',
      describe: 'add new contact',
      builder: {
          nama: {
              describe: 'Contact Nama',
              demandOption: true,
              type:'string',
          },
          tlp : {
              describe: 'contact Telepon',
              demandOption: true,
              type: 'string',
          },
          email: {
              describe: 'contact Email',
              demandOption: false,
              type: 'string',
          },
      },
      handler(argv) {
          contact.answer(argv.nama, argv.tlp, argv.email);
      },
  });

  //fungsi untuk mencari detail kontak
  yargs.command ({
    command: "detail",
    describe: "Detail Contact",
    builder: {
        nama: {
            describe: "Contact Nama",
            demandOption: true,
            type: "string"
        }
    },
    handler(argv) {
        contact.detailContact(argv.nama, argv.email);
    },
  });

  //fungsi untuk mencari list kontak
  yargs.command ({
    command: "list",
    describe: "List Contact",
    handler: () => {
        contact.listContact();
    }
  });

  //fungsi untuk menghapus kontak
  yargs.command ({
    command: "delete",
    describe: "Delete Contact",
    builder: {
        nama: {
            describe: "Contact Nama",
            demandOption: true,
            type: "string",
        }
    },
    handler(argv) {
        contact.deleteContact(argv.nama);
    },
  });

  
  //tujuannya untuk menjalankan kode di yargs.command
  //yargs.parse harus selalu ada
  yargs.parse();