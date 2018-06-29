class Brain {
    constructor() {
        this.fields = new Set();
        this.data = new Map();
    }
    addFieldSet(field, fieldValue, data) {
        if (!this.data.has(field)) {
            this.data.set(field, new Map());
        }

        if (!this.data.get(field).has(fieldValue)) {
            this.data.get(field).set(fieldValue, new Map());
        }

        if (this.data.get(field).get(fieldValue).get(JSON.stringify(data))) {
            this.data.get(field).get(fieldValue).get(JSON.stringify(data)).probability += 1;
        } else {
            this.data.get(field).get(fieldValue).set(JSON.stringify(data), {
                probability: 1,
                properties: data,
            });
        }
    }
    train(item) {
        const fields = Object.keys(item);
        fields.forEach((field) => {
            const dataToLearn = Object.assign({}, item);
            const fieldValue = dataToLearn[field];
            delete dataToLearn[field];
            this.addFieldSet(field, fieldValue, dataToLearn);
        });
    }
    trainList(dataSet) {
        dataSet.forEach((item) => this.train(item));
    }
    guess(field = '', fieldValue = '') {
        const fieldData = this.data.get(field);
        if (!fieldData) {
            return undefined;
        }
        const fieldDataForValue = fieldData.get(fieldValue);
        if (!fieldDataForValue) {
            return undefined;
        }
        const list = [...fieldDataForValue.values()].sort((a, b) => a.probability < b.probability);
        return list[0];

    }
}

module.exports = Brain;