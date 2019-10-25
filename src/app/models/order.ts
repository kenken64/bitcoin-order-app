export class Order {
    constructor(
        public contactNo: string,
        public name: string,
        public gender: string,
        public dob: string,
        public orderDate: string,
        public orderType: string,
        public orderUnit: number,
        public price: number,
        public qrUrl: string,
        public address: string,
        public amt: number,
        public id?: number ) { }
}
