const fs = require('fs').promises;


class Archivo {
    constructor(fileName) {
        this.fileName = fileName;
        
    }

   async save(obj) {

        await fs.readFile(this.fileName, 'utf-8', (err, dat) => {
            if(err) console.log('error', err);
            const data = JSON.parse(obj);
            const objects = JSON.parse(dat);
            const lenght = objects.length;
            const dataId = lenght + 1;
            data.id = dataId;
            const newObject = [...objects, data];
            fs.writeFile(this.fileName, JSON.stringify(newObject), (err) => {
                if(err) console.log('error', err);
                console.log(`guardado el id ${dataId}`);
        } );
        })
    }

    async getById(id) {
        const idRes = await fs.readFile(this.fileName, 'utf-8', (err, data) => {
            if(err) console.log('error', err);
            const objects = JSON.parse(data);
            const objById = objects.find(item => item.id === id);
            return objById;
        } );
        return idRes;
    }

    async getAll() {
            const res = await fs.readFile(this.fileName, 'utf-8', (err, data) => {
                if(err) console.log('error', err);
                return data;
            })
            return res;
    }


    async deleteById(id) {
        await fs.readFile(this.fileName, 'utf-8', (err, data) => {
            if(err) console.log('error', err);
            const objects = JSON.parse(data);
            delete objects[id - 1];
            fs.writeFile(this.fileName, JSON.stringify(objects), (err) => {
                if(err) console.log('error', err);
                console.log(`eliminado el id ${id}`);
            });
        } );
    }

    async deleteAll() {
            await fs.writeFile(this.fileName, '', (err) => {
                if(err) console.log('error', err);
            } );
    }
}

module.exports = Archivo;