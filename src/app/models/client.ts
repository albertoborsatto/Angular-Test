import { v4 as uuidv4 } from 'uuid';

export class Client {
  id?: string;
  name?: string;
  email?: string;
  cpf?: string;
  birthdate?: string;

  constructor(name: string, email: string, cpf: string, birthdate: string) {
    this.id = uuidv4();
    this.name = name;
    this.email = email;
    this.cpf = cpf;
    this.birthdate = birthdate;
  }

  printClient(): void {
    console.log(`Client Info:
      ID: ${this.id}
      Name: ${this.name}
      Email: ${this.email}
      CPF: ${this.cpf}
      Birthdate: ${this.birthdate}`);
  }
}
