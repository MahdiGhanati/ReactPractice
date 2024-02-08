export class MappedBill {

    constructor(data) {
        this.Description = null || data.Description + " شرح "
        this.id = null || data.id + 5
        this.Power = null || data.Power*0.5
        this.Item = null || data.Item
    }

}