import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-messages',
  templateUrl: './messages.page.html',
  styleUrls: ['./messages.page.scss'],
})
export class MessagesPage implements OnInit {

  private EffectiveDate: string;
  private Rate: number;
  private hasFiles: string;

  constructor(private route: ActivatedRoute) { 
     this.EffectiveDate = this.route.snapshot.params['EffectiveDate'];
     this.Rate = this.route.snapshot.params['Rate'];
     this.hasFiles = this.route.snapshot.params['hasFiles'];
  }

  ngOnInit() {
  }

}
