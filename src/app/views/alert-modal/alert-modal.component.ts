import { Component, Input, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'alert',
    templateUrl: './alert-modal.component.html',
    styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent implements OnInit {
    @Input() message: string;
    @Input() type: string;

    constructor(
        public bsModalRef: BsModalRef
    ) { }

    ngOnInit(): void {
    }

    onClose(){
        this.bsModalRef.hide();
    }

}
