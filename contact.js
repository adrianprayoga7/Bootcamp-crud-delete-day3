const fs = require('fs');
const validator = require('validator');

//membuat dan mengecek folder bernama data
if (!fs.existsSync('data')) {
  fs.mkdirSync('data');
}

//membuat dan mengecek file bernama contacts.json
if (!fs.existsSync('data/contacts.json')) {
  fs.writeFileSync ('data/contacts.json', '[]', 'utf-8');
}

//load data kontak dari contacts.json
const loadContact = () => {
    const file = fs.readFileSync('data/contacts.json', 'utf-8');
    const contacts = JSON.parse(file);
    return contacts;
}

//melihat detail contact
const detailContact = nama => {
    const contacts = loadContact();
    console.log("Detail contact yang dicari: ");
    const contact = contacts.find((contact) => contact.nama.toLowerCase() === nama.toLowerCase());
    if (!contact) {
        console.log((`${nama} tidak ditemukan!`));
        return false;
    } else {
        console.log(contact.nama);
        console.log(contact.tlp);
        console.log(contact.email);
    }
}

//melihat list contact
const listContact = () => {
  const contacts = loadContact();
  console.log("Contact List : ");
  contacts.forEach((contact, i) => {
    console.log(`${i + 1}. ${contact.nama} - ${contact.tlp}`);
  });
};

//tujuannya untuk hapus kontak berdasarkan nama
const deleteContact = nama => {
    const contacts = loadContact();
    const filterContact = contacts.filter((contact) => contact.nama.toLowerCase() !== nama.toLowerCase());
    fs.writeFileSync('data/contacts.json', JSON.stringify(filterContact));
    console.log("Contact Telah Dihapus!");
}

//tujuannya untuk parsing data dari nama,tlp,email ke contacts.json
const answer = (nama,tlp,email) => {
  const contact = {nama,tlp,email};
  const file = fs.readFileSync('data/contacts.json', 'utf-8');
  const contacts = JSON.parse(file);

//tujuannya untuk mengecek duplikat 
const duplicate = contacts.find(contact => contact.nama === nama);
if(duplicate) {
    console.log("Nama duplikat");
    return false;
}

//untuk validasi email jika yang di inputkan bukan format email
const validasiEmail = validator.isEmail(contact.email);
if (validasiEmail == false) {
  console.log("email tidak valid");
  return false;
};

//untuk validasi notlp jika yang diinputkan bukan format id
const validasiTlp = validator.isMobilePhone(contact.tlp, 'id-ID');
if (validasiTlp == false) {
  console.log("Nomor Telepon tidak valid");
  return false;
}

//tujuannya untuk push ke contacts.json apa yang sudah diinputkan
contacts.push(contact);
fs.writeFileSync('data/contacts.json', JSON.stringify(contacts));
console.log('Terima kasih');
};

module.exports = {answer, detailContact, loadContact, listContact, deleteContact, editContact};