import { Injectable } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { AlertModalComponent } from './../views/alert-modal/alert-modal.component';

enum AlertTypes{
    WARN = 'warning',
    SUCCESS = 'success',
    DANGER = 'danger',
}

@Injectable({
    providedIn: 'root'
})
export class AlertService {

    constructor(
        private modalService: BsModalService
    ) { }

    private showAlert(msg: string, type: AlertTypes){
        const bsModalRef: BsModalRef = this.modalService.show(AlertModalComponent);
        bsModalRef.content.type = type;
        bsModalRef.content.message = msg;
    }

    alertWarning(msg: string){
        this.showAlert(msg, AlertTypes.WARN);
    }

    alertSuccess(msg: string){
        this.showAlert(msg, AlertTypes.SUCCESS);
    }
    
    alertDanger(msg: string){
        this.showAlert(msg, AlertTypes.DANGER);
    }
}
