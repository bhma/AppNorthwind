import { Component, Input, OnChanges, OnInit } from '@angular/core';
import { BsModalRef } from 'ngx-bootstrap/modal';

@Component({
    selector: 'alert',
    templateUrl: './alert-modal.component.html',
    styleUrls: ['./alert-modal.component.css']
})
export class AlertModalComponent implements OnInit, OnChanges {
    @Input() message: string;
    @Input() type: string;

    constructor(
        public bsModalRef: BsModalRef
    ) { }

    ngOnInit(): void {

    }

    ngOnChanges() {
        console.log(this.message);
    }

    onClose() {
        this.bsModalRef.hide();
    }

}
