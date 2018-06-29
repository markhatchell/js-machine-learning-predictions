class Brain {
    constructor() {
        this.fields = new Set();
        this.data = new Map();
    }
    setChild(children, child) {
        const childId = JSON.stringify(child);
        let childObject = children.get(childId);
        if (!childObject) {
            childObject = {
                probability: 1,
                data: child,
            };
            children.set(childId, childObject);
        } else {
            childObject.probability += 1;
        }
    }
    addData(fields, item, data, level = 0) {
        level += 1;
        if (level > fields.length) {
            return;
        }
        fields.forEach((field) => {
            const fieldValue = item[field];
            let fieldBranch = data.get(field);
            if (!fieldBranch) {
                fieldBranch = {
                    values: new Map(),
                    children: new Map(),
                };
                data.set(field, fieldBranch);
            }
            this.setChild(fieldBranch.children, item);
            let fieldBranchForValue = fieldBranch.values.get(fieldValue);
            if (!fieldBranchForValue) {
                fieldBranchForValue = new Map();
                fieldBranch.values.set(fieldValue, fieldBranchForValue);
            }
            this.addData(fields, item, fieldBranchForValue, level);
        });
    }
    train(item) {
        const fields = Object.keys(item).sort();
        this.addData(fields, item, this.data);
    }
    trainList(dataSet) {
        dataSet.forEach((item) => this.train(item));
    }
    findMostProbableData(dataSet) {
        const dataArray = [...dataSet.values()].sort((a, b) => a.probability < b.probability);
        return dataArray[0];
    }
    guessDeep(field, obj, layer) {
        return layer.get(field).values.get(obj[field]);
    }
    guess(obj, whatFieldYouWant) {
        let value;
        try {
            const fields = Object.keys(obj).sort();
            let data = this.data;
            for (let i = 0; i < fields.length; i += 1) {
                data = this.guessDeep(fields[i], obj, data);
            }
            value = this.findMostProbableData(data.get(whatFieldYouWant).children)
                .data[whatFieldYouWant];
        } catch(e) {
        }
        return value;
    }
}

module.exports = Brain;