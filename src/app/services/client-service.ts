import { Injectable } from '@angular/core';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {
  saveClient(client: Client): void {
    localStorage.setItem(client.id || '', JSON.stringify(client));
  }

  getClientById(id: string): Client | null {
    const clientData = localStorage.getItem(id);
    if (clientData) {
      return JSON.parse(clientData) as Client;
    }
    return null;
  }

  getAllClients(): Client[] {
    const clients: Client[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      const key = localStorage.key(i);
      if (key) {
        const clientData = localStorage.getItem(key);
        if (clientData) {
          const client = JSON.parse(clientData) as Client;
          clients.push(client);
        }
      }
    }

    return clients;
  }
}
