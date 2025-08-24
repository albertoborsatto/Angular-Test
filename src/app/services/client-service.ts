import { Injectable } from '@angular/core';
import { Client } from '../models/client';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  saveClient(client: Client): void {
    try {
      localStorage.setItem(client.id || '', JSON.stringify(client));
    } catch (error) {
      console.error('Error saving client to localStorage', error);
    }
  }

  getClientById(id: string): Client | null {
    try {
      const clientData = localStorage.getItem(id);
      if (clientData) {
        return JSON.parse(clientData) as Client;
      }
      return null;
    } catch (error) {
      console.error('Error retrieving client from localStorage', error);
      return null;
    }
  }

  getAllClients(): Client[] {
    const clients: Client[] = [];

    for (let i = 0; i < localStorage.length; i++) {
      try {
        const key = localStorage.key(i);
        if (key) {
          const clientData = localStorage.getItem(key);
          if (clientData) {
            const client = JSON.parse(clientData) as Client;
            clients.push(client);
          }
        }
      } catch (error) {
        console.error('Error retrieving clients from localStorage', error);
      }
    }

    return clients;
  }

  deleteClient(id: string): void {
    try {
      localStorage.removeItem(id);
    } catch (error) {
      console.error('Error deleting client from localStorage', error);
    }
  }

  updateClient(updatedClient: Client, id: string): void {
    try {
      const client = this.getClientById(id);

      if (client) {
        const newClient = { ...updatedClient, id: id };
        localStorage.setItem(id, JSON.stringify(newClient));
      }
    } catch (error) {
      console.error('Error updating client in localStorage', error);
    }
  }

  filterClientsByName(name: string): Client[] {
    const clientName = name.toLowerCase().trim();

    try {
      const allClients = this.getAllClients();

      return allClients.filter((client) => client.name!.toLowerCase().includes(clientName));
    } catch (error) {
      console.error('Error filtering clients by name', error);
      return [];
    }
  }
}
