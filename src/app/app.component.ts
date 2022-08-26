import { Component, OnInit, Input } from '@angular/core';
import { Citizen } from './citizen';
import { CitizenService } from './citizenservice';
import { ConfirmationService } from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  
    styleUrls: ['./app.component.scss']
})
export class AppComponent { 
    citizenDialog!: boolean;

    citizens!: Citizen[];

    citizen!: Citizen;

    selectedCitizens!: Citizen[];

    submitted!: boolean;

    error:any;

    constructor(private citizenService: CitizenService, private messageService: MessageService, private confirmationService: ConfirmationService) { }

    ngOnInit(): void {
        this.citizenService.getConfig().subscribe((value:any) => {this.citizens= value.result.data;
        })
      }

    openNew() {
        this.citizen = new Citizen();
        this.submitted = false;
        this.citizenDialog = true;
    }

    deleteSelectedCitizens() {
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete the selected citizens?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.citizens = this.citizens.filter(val => !this.selectedCitizens.includes(val));
                this.selectedCitizens = [];
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Citizens Deleted', life: 3000});
                
            }
        });
    }

    editCitizen(citizen: Citizen) {
        this.citizen = new Citizen();
        this.citizenDialog = true;
    }

    deleteCitizen(citizen: Citizen) {
        console.log(this.citizen);
        this.confirmationService.confirm({
            message: 'Are you sure you want to delete ' + citizen.fullName + '?',
            header: 'Confirm',
            icon: 'pi pi-exclamation-triangle',
            accept: () => {
                this.citizens = this.citizens.filter(val => val.id !== citizen.id);
                this.citizen = new Citizen();
                this.messageService.add({severity:'success', summary: 'Successful', detail: 'Citizen Deleted', life: 3000});
                this.citizenService.deleteConfig(this.citizen.id);
            }
        });
    }

    hideDialog() {
        this.citizenDialog = false;
        this.submitted = false;
    }
    
    saveCitizen() {
        // this.submitted = true;

        // if (this.citizens.fullName.trim()) {
        //     if (this.citizen.id) {
        //         this.citizens[this.findIndexById(this.citizens.id)] = this.citizen;                
        //         this.messageService.add({severity:'success', summary: 'Successful', detail: 'Citizen Updated', life: 3000});
        //     }
        //     else {
        //         this.citizen.id = this.createId();
        //         this.citizens.push(this.citizen);
        //         this.messageService.add({severity:'success', summary: 'Successful', detail: 'Citizen Created', life: 3000});
        //     }

        //     this.citizens = [...this.citizens];
        //     this.citizenDialog = false;
        //     this.citizen = new Citizen();
        // }
    }

    // findIndexById(id: string): number {
    //     let index = -1;
    //     for (let i = 0; i < this.citizens.length; i++) {
    //         if (this.citizens[i].id === id) {
    //             index = i;
    //             break;
    //         }
    //     }

    //     return index;
    // }

    // createId(): string {
    //     let id = '';
    //     var chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    //     for ( var i = 0; i < 5; i++ ) {
    //         id += chars.charAt(Math.floor(Math.random() * chars.length));
    //     }
    //     return id;
    // }
}
