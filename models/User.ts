// User.ts
export class User {
    // Private attributes
    private firstName: string;
    private lastName: string;
    private pronouns: string;
    private occupation: string;
    private gender: string;
    private birthday: Date;
  
    constructor(
      firstName: string,
      lastName: string,
      pronouns: string,
      occupation: string,
      gender: string,
      birthday: Date
    ) {
      this.firstName = firstName;
      this.lastName = lastName;
      this.pronouns = pronouns;
      this.occupation = occupation;
      this.gender = gender;
      this.birthday = birthday;
    }
  
    // Getter functions for each attribute
    public getFirstName(): string {
      return this.firstName;
    }
  
    public getLastName(): string {
      return this.lastName;
    }
  
    public getPronouns(): string {
      return this.pronouns;
    }
  
    public getOccupation(): string {
      return this.occupation;
    }
  
    public getGender(): string {
      return this.gender;
    }
  
    public getBirthday(): Date {
      return this.birthday;
    }
  
    public getFullName(): string {
      return `${this.firstName} ${this.lastName}`;
    }
  }
  