import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {ClientService} from '../../../service/client.service';
import {ActivatedRoute} from '@angular/router';
import {Client} from '../../../model/client';

@Component({
  selector: 'app-detail-client',
  templateUrl: './detail-client.component.html',
  styleUrls: ['./detail-client.component.scss']
})
export class DetailClientComponent implements OnInit {

  @Output() clientObserver: EventEmitter<Client> = new EventEmitter();
  private client: Client = {} as Client;

  constructor(private clientService: ClientService,
              private activatedRoute: ActivatedRoute) {
  }

  ngOnInit(): void {
    this.activatedRoute.paramMap
      .subscribe(pMap => {
        const clientId = pMap.get('clientId');
        this.clientService.getClient(clientId)
          .subscribe(client => {
            this.client = client;
            this.clientObserver.emit(client);
          });
      });
  }

}
