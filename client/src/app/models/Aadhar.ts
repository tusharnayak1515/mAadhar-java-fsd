import User from "./User";

class Aadhar {
    constructor(
      public id: number,
      public aadharNumber: string,
      public duplicates: number,
      public status: string,
      public issueDate: string,
      public user: User
    ) {}
  }
  
  export default Aadhar;
  